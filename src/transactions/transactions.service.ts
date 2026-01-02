import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
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
        const transactions = await this.transactionsRepository.find({
            where: {
                gameNetId,
                createdAt: Between(startDate, endDate),
            },
        });

        const totalRevenue = transactions
            .filter((t) => t.type === 'USAGE')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalDeposits = transactions
            .filter((t) => t.type === 'DEPOSIT')
            .reduce((sum, t) => sum + t.amount, 0);

        return { totalRevenue, totalDeposits, count: transactions.length };
    }
}
