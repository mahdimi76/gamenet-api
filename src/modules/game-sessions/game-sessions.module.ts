import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameSessionsService } from './game-sessions.service';
import { GameSessionsController } from './game-sessions.controller';
import { GameSession } from './entities/game-session.entity';

import { Transaction } from '../transactions/entities/transaction.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Device } from '../devices/entities/device.entity';

@Module({
    imports: [TypeOrmModule.forFeature([GameSession, Transaction, Customer, Device])],
    controllers: [GameSessionsController],
    providers: [GameSessionsService],
    exports: [GameSessionsService],
})
export class GameSessionsModule { }
