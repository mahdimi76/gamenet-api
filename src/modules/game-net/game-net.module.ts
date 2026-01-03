import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameNet } from './entities/game-net.entity';

@Module({
    imports: [TypeOrmModule.forFeature([GameNet])],
    exports: [TypeOrmModule],
})
export class GameNetModule { }
