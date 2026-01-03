import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameSession } from './entities/game-session.entity';
import { CreateSessionDto, EndSessionDto, UpdateSessionDto } from './dto/session.dto';

@Injectable()
export class GameSessionsService {
    constructor(
        @InjectRepository(GameSession)
        private sessionsRepository: Repository<GameSession>,
    ) { }

    async create(createSessionDto: CreateSessionDto): Promise<GameSession> {
        const session = this.sessionsRepository.create(createSessionDto);
        return this.sessionsRepository.save(session);
    }

    async findAll(): Promise<GameSession[]> {
        return this.sessionsRepository.find({
            relations: ['device', 'customer', 'startedBy'],
        });
    }

    async findByGameNet(gameNetId: string, status?: string): Promise<GameSession[]> {
        const where: any = { gameNetId };
        if (status) where.status = status;
        return this.sessionsRepository.find({
            where,
            relations: ['device', 'customer', 'startedBy'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<GameSession | null> {
        return this.sessionsRepository.findOne({
            where: { id },
            relations: ['device', 'customer', 'startedBy'],
        });
    }

    async findActiveByDevice(deviceId: string): Promise<GameSession | null> {
        return this.sessionsRepository.findOne({
            where: { deviceId, status: 'ACTIVE' },
        });
    }

    async update(id: string, updateSessionDto: UpdateSessionDto): Promise<GameSession | null> {
        await this.sessionsRepository.update(id, updateSessionDto);
        return this.findOne(id);
    }

    async endSession(id: string, endSessionDto: EndSessionDto): Promise<any> {
        // دریافت session با تمام relations
        const session = await this.sessionsRepository.findOne({
            where: { id },
            relations: ['device', 'customer', 'orders', 'orders.items', 'services', 'services.service'],
        });

        if (!session || !session.device) {
            return null;
        }

        const endTime = new Date();
        const startTime = new Date(session.startTime);
        const durationMs = endTime.getTime() - startTime.getTime();
        const durationMinutes = Math.ceil(durationMs / 60000);

        // محاسبه قیمت بازی
        const hourlyRate = session.device.hourlyRate || 0;
        const basePrice = (durationMinutes / 60) * hourlyRate;
        const extraControllers = session.extraControllers || 0;
        const extraRate = session.device.extraRate || 0;
        const extraPrice = (durationMinutes / 60) * extraRate * extraControllers;
        const gamePrice = Math.ceil(basePrice + extraPrice);

        // محاسبه قیمت بوفه
        let buffetPrice = 0;
        if (session.orders) {
            session.orders.forEach(order => {
                if (order.items) {
                    order.items.forEach(item => {
                        buffetPrice += item.totalPrice || 0;
                    });
                }
            });
        }

        // محاسبه قیمت خدمات
        let servicesPrice = 0;
        if (session.services) {
            session.services.forEach(s => {
                servicesPrice += (s.quantity || 1) * (s.service?.price || 0);
            });
        }

        const totalPrice = gamePrice + buffetPrice + servicesPrice;

        // آپدیت session
        await this.sessionsRepository.update(id, {
            endTime,
            durationMinutes,
            totalPrice,
            status: 'COMPLETED',
            isPaid: false,
        });

        return {
            success: true,
            data: {
                id: session.id,
                deviceName: session.device.name,
                duration: durationMinutes,
                gamePrice,
                buffetPrice,
                servicesPrice,
                totalPrice,
                startTime: session.startTime,
                endTime,
                customer: session.customer,
            }
        };
    }

    async getUnpaidSessions(gameNetId: string): Promise<GameSession[]> {
        return this.sessionsRepository.find({
            where: { gameNetId, isPaid: false, status: 'COMPLETED' },
            relations: ['customer', 'device'],
        });
    }
}
