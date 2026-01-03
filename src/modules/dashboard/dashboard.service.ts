import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, Between } from 'typeorm';
import { Device } from '../devices/entities/device.entity';
import { Transaction, TransactionType } from '../transactions/entities/transaction.entity';
import { Customer } from '../customers/entities/customer.entity';
import { GameSession } from '../game-sessions/entities/game-session.entity';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Device)
        private devicesRepository: Repository<Device>,
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
        @InjectRepository(GameSession)
        private sessionsRepository: Repository<GameSession>,
    ) { }

    async getStats(gameNetId: string) {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const todayEnd = new Date(todayStart);
        todayEnd.setDate(todayEnd.getDate() + 1);

        const weekStart = new Date(todayStart);
        weekStart.setDate(weekStart.getDate() - 7);

        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        // دستگاه‌ها
        const devices = await this.devicesRepository.find({
            where: { gameNetId },
            select: ['id', 'status'],
        });
        const activeDevices = devices.filter(d => d.status === 'BUSY').length;
        const totalDevices = devices.length;

        // درآمد امروز
        const todayTransactions = await this.transactionsRepository.find({
            where: {
                gameNetId,
                type: TransactionType.USAGE,
                createdAt: Between(todayStart, todayEnd),
            },
        });
        const todayRevenue = todayTransactions.reduce((sum, t) => sum + Number(t.amount), 0);

        // درآمد هفته
        const weekTransactions = await this.transactionsRepository.find({
            where: {
                gameNetId,
                type: TransactionType.USAGE,
                createdAt: MoreThanOrEqual(weekStart),
            },
        });
        const weekRevenue = weekTransactions.reduce((sum, t) => sum + Number(t.amount), 0);

        // درآمد ماه
        const monthTransactions = await this.transactionsRepository.find({
            where: {
                gameNetId,
                type: TransactionType.USAGE,
                createdAt: MoreThanOrEqual(monthStart),
            },
        });
        const monthRevenue = monthTransactions.reduce((sum, t) => sum + Number(t.amount), 0);

        // مشتریان جدید این ماه
        const newCustomers = await this.customersRepository.count({
            where: {
                gameNetId,
                createdAt: MoreThanOrEqual(monthStart),
            },
        });

        // نشست‌های فعال
        const activeSessions = await this.sessionsRepository.count({
            where: {
                gameNetId,
                status: 'ACTIVE',
            },
        });

        // آخرین تراکنش‌ها
        const recentTransactions = await this.transactionsRepository.find({
            where: { gameNetId },
            order: { createdAt: 'DESC' },
            take: 5,
            relations: ['customer', 'registeredBy'],
        });

        // داده‌های نمودار ۷ روز
        const chartData: { date: string; revenue: number }[] = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(todayStart);
            date.setDate(date.getDate() - i);
            const nextDay = new Date(date);
            nextDay.setDate(nextDay.getDate() + 1);

            const dayTransactions = await this.transactionsRepository.find({
                where: {
                    gameNetId,
                    type: TransactionType.USAGE,
                    createdAt: Between(date, nextDay),
                },
            });
            const dayRevenue = dayTransactions.reduce((sum, t) => sum + Number(t.amount), 0);

            chartData.push({
                date: date.toLocaleDateString('fa-IR', { month: 'short', day: 'numeric' }),
                revenue: dayRevenue,
            });
        }

        return {
            devices: {
                active: activeDevices,
                total: totalDevices,
                available: totalDevices - activeDevices,
            },
            revenue: {
                today: todayRevenue,
                week: weekRevenue,
                month: monthRevenue,
            },
            customers: {
                newThisMonth: newCustomers,
            },
            sessions: {
                active: activeSessions,
            },
            recentTransactions: recentTransactions.map(t => ({
                id: t.id,
                amount: t.amount,
                type: t.type,
                method: t.method,
                description: t.description,
                createdAt: t.createdAt,
                customer: t.customer ? { name: t.customer.name } : null,
                registeredBy: t.registeredBy ? { name: t.registeredBy.name } : null,
            })),
            chartData,
        };
    }
}
