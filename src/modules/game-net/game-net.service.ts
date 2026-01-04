import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameNet } from './entities/game-net.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class GameNetService {
    constructor(
        @InjectRepository(GameNet)
        private gameNetRepository: Repository<GameNet>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findAll() {
        // دریافت تمام گیم‌نت‌ها به همراه شمارش سشن‌ها
        // در TypeORM برای شمارش رابطه‌ها می‌توانیم از query builder یا loadRelationCountAndMap استفاده کنیم
        const gameNets = await this.gameNetRepository.createQueryBuilder('gameNet')
            .leftJoin('game_sessions', 'gs', 'gs.gameNetId = gameNet.id')
            .select('gameNet.id', 'id')
            .addSelect('gameNet.name', 'name')
            .addSelect('gameNet.isActive', 'isActive')
            .addSelect('COUNT(gs.id)', 'sessionCount')
            .groupBy('gameNet.id')
            .getRawMany();

        // تبدیل خروجی raw به ساختار مورد نظر فرانت (gn._count.gameSessions)
        return gameNets.map(gn => ({
            id: gn.id,
            name: gn.name,
            isActive: gn.isActive === 1 || gn.isActive === true,
            _count: {
                gameSessions: parseInt(gn.sessionCount) || 0
            }
        }));
    }

    async getStats() {
        const gameNetsCount = await this.gameNetRepository.count();
        const usersCount = await this.usersRepository.count();

        return {
            gameNetsCount,
            usersCount
        };
    }
}
