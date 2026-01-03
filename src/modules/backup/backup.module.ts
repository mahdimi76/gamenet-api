import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackupController } from './backup.controller';
import { BackupService } from './backup.service';
import { User } from '../users/entities/user.entity';
import { Customer } from '../customers/entities/customer.entity';
import { GameSession } from '../game-sessions/entities/game-session.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order.entity';
import { Device } from '../devices/entities/device.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Customer,
            GameSession,
            Transaction,
            Product,
            Order,
            OrderItem,
            Device
        ])
    ],
    controllers: [BackupController],
    providers: [BackupService]
})
export class BackupModule { }
