import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameNet } from './entities/game-net.entity';
import { GameNetService } from './game-net.service';
import { GameNetController } from './game-net.controller';
import { User } from '../users/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([GameNet, User])],
    controllers: [GameNetController],
    providers: [GameNetService],
    exports: [TypeOrmModule, GameNetService],
})
export class GameNetModule { }

