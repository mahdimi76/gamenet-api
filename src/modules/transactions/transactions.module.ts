import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './entities/transaction.entity';

import { GameSession } from '../game-sessions/entities/game-session.entity';
import { OrderItem } from '../orders/entities/order.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, GameSession, OrderItem])],
    controllers: [TransactionsController],
    providers: [TransactionsService],
    exports: [TransactionsService],
})
export class TransactionsModule { }
