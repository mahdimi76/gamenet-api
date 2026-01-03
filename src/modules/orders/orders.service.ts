import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderItem } from './entities/order.entity';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private orderItemsRepository: Repository<OrderItem>,
    ) { }

    async create(createOrderDto: CreateOrderDto): Promise<Order | null> {
        const { items, ...orderData } = createOrderDto;

        const order = this.ordersRepository.create(orderData);
        const savedOrder = await this.ordersRepository.save(order);

        for (const item of items) {
            const orderItem = this.orderItemsRepository.create({
                ...item,
                orderId: savedOrder.id,
                totalPrice: item.quantity * item.sellPriceSnapshot,
            });
            await this.orderItemsRepository.save(orderItem);
        }

        return this.findOne(savedOrder.id);
    }

    async findAll(): Promise<Order[]> {
        return this.ordersRepository.find({
            relations: ['items', 'soldBy', 'customer', 'gameSession'],
            order: { createdAt: 'DESC' },
        });
    }

    async findByGameNet(gameNetId: string): Promise<Order[]> {
        return this.ordersRepository.find({
            where: { gameNetId },
            relations: ['items', 'soldBy', 'customer'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Order | null> {
        return this.ordersRepository.findOne({
            where: { id },
            relations: ['items', 'soldBy', 'customer', 'gameSession'],
        });
    }

    async findBySession(gameSessionId: string): Promise<Order[]> {
        return this.ordersRepository.find({
            where: { gameSessionId },
            relations: ['items'],
        });
    }
}
