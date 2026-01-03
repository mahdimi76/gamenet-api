import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/transaction.dto';
import { GameSession } from '../game-sessions/entities/game-session.entity';
import { OrderItem } from '../orders/entities/order.entity';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
        @InjectRepository(GameSession)
        private gameSessionsRepository: Repository<GameSession>,
        @InjectRepository(OrderItem)
        private orderItemsRepository: Repository<OrderItem>,
    ) { }

    async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        const transaction = this.transactionsRepository.create(createTransactionDto);
        return this.transactionsRepository.save(transaction);
    }

    async findAll(): Promise<Transaction[]> {
        return this.transactionsRepository.find({
            relations: ['customer', 'registeredBy'],
            order: { createdAt: 'DESC' },
        });
    }

    async findByGameNet(gameNetId: string): Promise<Transaction[]> {
        return this.transactionsRepository.find({
            where: { gameNetId },
            relations: ['customer', 'registeredBy'],
            order: { createdAt: 'DESC' },
        });
    }

    async findByCustomer(customerId: string): Promise<Transaction[]> {
        return this.transactionsRepository.find({
            where: { customerId },
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Transaction | null> {
        return this.transactionsRepository.findOne({
            where: { id },
            relations: ['customer', 'registeredBy'],
        });
    }

    async getStats(gameNetId: string, startDate: Date, endDate: Date) {
        // ۱. دریافت تراکنش‌ها
        const transactions = await this.transactionsRepository.find({
            where: {
                gameNetId,
                createdAt: Between(startDate, endDate),
            },
            relations: ['customer'],
            order: { createdAt: 'DESC' }
        });

        // ۲. محاسبه روش‌های پرداخت و درآمد واقعی
        const methods = {
            CASH: 0,
            POS: 0,
            CARD_TO_CARD: 0,
            WALLET: 0
        };

        let totalIncome = 0;

        transactions.forEach(t => {
            if (t.method !== 'WALLET') {
                if (methods[t.method]) {
                    methods[t.method] += t.amount;
                } else {
                    methods[t.method] = t.amount; // Initialize if undefined
                }

                if (t.type === 'DEPOSIT') {
                    totalIncome += t.amount;
                }
            } else if (t.type === 'USAGE') {
                methods.WALLET += t.amount;
            }
        });

        // ۳. آمار بوفه (سود و فروش)
        const orderItems = await this.orderItemsRepository.find({
            where: {
                order: {
                    gameNetId,
                    createdAt: Between(startDate, endDate)
                }
            },
            relations: ['order']
        });

        let buffetGrossSales = 0;
        let buffetNetProfit = 0;

        orderItems.forEach(item => {
            buffetGrossSales += item.totalPrice;
            const cost = (item.buyPriceSnapshot || 0) * item.quantity;
            buffetNetProfit += (item.totalPrice - cost);
        });

        // ۴. آمار نسیه‌ها (Unpaid Sessions)
        const unpaidSessions = await this.gameSessionsRepository.find({
            where: {
                gameNetId,
                status: 'COMPLETED',
                isPaid: false,
            }
        });

        const unpaidAmount = unpaidSessions.reduce((sum, s) => sum + (s.totalPrice || 0), 0);
        const unpaidCount = unpaidSessions.length;

        // ۵. نمودار ۷ روزه
        const chartData: { date: Date; amount: number }[] = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const startOfDay = new Date(date.setHours(0, 0, 0, 0));
            const endOfDay = new Date(date.setHours(23, 59, 59, 999));

            const dayIncome = await this.transactionsRepository
                .createQueryBuilder('transaction')
                .where('transaction.gameNetId = :gameNetId', { gameNetId })
                .andWhere('transaction.createdAt BETWEEN :start AND :end', { start: startOfDay, end: endOfDay })
                .andWhere('transaction.method != :method', { method: 'WALLET' })
                .andWhere('transaction.type = :type', { type: 'DEPOSIT' })
                .select('SUM(transaction.amount)', 'sum')
                .getRawOne();

            chartData.push({
                date: startOfDay,
                amount: parseInt(dayIncome.sum) || 0
            });
        }

        return {
            totalIncome,
            methods,
            buffetStats: {
                sales: buffetGrossSales,
                profit: buffetNetProfit
            },
            unpaidAmount,
            unpaidCount,
            chartData,
            transactions
        };
    }
}
