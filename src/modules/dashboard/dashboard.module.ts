import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Device } from '../devices/entities/device.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Customer } from '../customers/entities/customer.entity';
import { GameSession } from '../game-sessions/entities/game-session.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Device, Transaction, Customer, GameSession]),
    ],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule { }
