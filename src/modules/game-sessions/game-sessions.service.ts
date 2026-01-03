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

    async endSession(id: string, endSessionDto: EndSessionDto): Promise<GameSession | null> {
        await this.sessionsRepository.update(id, {
            ...endSessionDto,
            status: 'COMPLETED',
            endTime: new Date(),
        });
        return this.findOne(id);
    }

    async getUnpaidSessions(gameNetId: string): Promise<GameSession[]> {
        return this.sessionsRepository.find({
            where: { gameNetId, isPaid: false, status: 'COMPLETED' },
            relations: ['customer', 'device'],
        });
    }
}
