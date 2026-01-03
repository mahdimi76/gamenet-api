import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Customer } from '../customers/entities/customer.entity';
import { GameSession } from '../game-sessions/entities/game-session.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { Device } from '../devices/entities/device.entity';

@Injectable()
export class BackupService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Customer) private customersRepository: Repository<Customer>,
        @InjectRepository(GameSession) private gameSessionsRepository: Repository<GameSession>,
        @InjectRepository(Transaction) private transactionsRepository: Repository<Transaction>,
        @InjectRepository(Product) private productsRepository: Repository<Product>,
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        @InjectRepository(Device) private devicesRepository: Repository<Device>,
    ) { }

    async exportData(gameNetId: string) {
        const [users, customers, sessions, transactions, products, orders, devices] = await Promise.all([
            this.usersRepository.find({ where: { gameNetId } }),
            this.customersRepository.find({ where: { gameNetId } }),
            this.gameSessionsRepository.find({ where: { gameNetId } }),
            this.transactionsRepository.find({ where: { gameNetId } }),
            this.productsRepository.find({ where: { gameNetId } }),
            this.ordersRepository.find({ where: { gameNetId }, relations: ['items'] }),
            this.devicesRepository.find({ where: { gameNetId } }),
        ]);

        return {
            exportDate: new Date(),
            gameNetId,
            data: {
                users,
                customers,
                sessions,
                transactions,
                products,
                orders,
                devices
            }
        };
    }
}
