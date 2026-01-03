import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderItem } from './entities/order.entity';
import { CreateOrderDto } from './dto/order.dto';
import { Product } from '../products/entities/product.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Transaction, TransactionType, PaymentMethod } from '../transactions/entities/transaction.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private orderItemsRepository: Repository<OrderItem>,
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
    ) { }

    async create(createOrderDto: CreateOrderDto): Promise<Order | null> {
        const { items, ...orderData } = createOrderDto;
        let orderTotal = 0;

        // 1. بررسی موجودی محصولات و محاسبه قیمت کل
        for (const item of items) {
            const product = await this.productsRepository.findOneBy({ id: item.productId });
            if (!product) throw new NotFoundException(`محصول با شناسه ${item.productId} یافت نشد`);
            if (product.stock < item.quantity) throw new BadRequestException(`موجودی کالا برای ${product.name} کافی نیست`);

            orderTotal += item.quantity * item.sellPriceSnapshot;
        }

        // 2. بررسی موجودی کیف پول (در صورت پرداخت با کیف پول)
        let customer: Customer | null = null;
        if (createOrderDto.paymentMethod === 'WALLET') {
            if (!createOrderDto.customerId) throw new BadRequestException('برای پرداخت با کیف پول، شناسه مشتری الزامی است');
            customer = await this.customersRepository.findOneBy({ id: createOrderDto.customerId });
            if (!customer) throw new BadRequestException('مشتری یافت نشد');
            if (Number(customer.balance) < orderTotal) throw new BadRequestException('موجودی کیف پول کافی نیست');
        } else if (createOrderDto.customerId) {
            customer = await this.customersRepository.findOneBy({ id: createOrderDto.customerId });
        }

        // 3. ایجاد سفارش پایه
        const order = this.ordersRepository.create({
            ...orderData,
            isPaid: createOrderDto.paymentMethod === 'WALLET' ? true : (createOrderDto.isPaid ?? false),
            paymentMethod: createOrderDto.paymentMethod,
            totalPrice: orderTotal
        });
        const savedOrder = await this.ordersRepository.save(order);

        // 4. ثبت آیتم‌ها و کسر موجودی
        for (const item of items) {
            const orderItem = this.orderItemsRepository.create({
                ...item,
                orderId: savedOrder.id,
                totalPrice: item.quantity * item.sellPriceSnapshot,
            });
            await this.orderItemsRepository.save(orderItem);

            // کسر موجودی محصول
            await this.productsRepository.decrement({ id: item.productId }, 'stock', item.quantity);
        }

        // 5. اعمال پرداخت (کیف پول یا ثبت تراکنش نقدی)
        if (createOrderDto.paymentMethod === 'WALLET' && customer) {
            // کسر از کیف پول
            customer.balance = Number(customer.balance) - orderTotal;
            customer.totalSpent = Number(customer.totalSpent || 0) + orderTotal;
            await this.customersRepository.save(customer);

            // ثبت تراکنش
            await this.transactionsRepository.save({
                gameNetId: savedOrder.gameNetId,
                customerId: savedOrder.customerId,
                amount: orderTotal,
                type: TransactionType.USAGE,
                method: PaymentMethod.WALLET,
                description: `خرید از بوفه`,
                registeredById: savedOrder.soldById
            });

        } else if (createOrderDto.isPaid) {
            const method = createOrderDto.paymentMethod as PaymentMethod || PaymentMethod.CASH;

            // ثبت تراکنش برای پرداخت نقدی/کارتخوان جهت آمار
            await this.transactionsRepository.save({
                gameNetId: savedOrder.gameNetId,
                customerId: savedOrder.customerId,
                amount: orderTotal,
                type: TransactionType.USAGE,
                method: method,
                description: `خرید از بوفه`,
                registeredById: savedOrder.soldById
            });

            if (customer) {
                customer.totalSpent = Number(customer.totalSpent || 0) + orderTotal;
                await this.customersRepository.save(customer);
            }
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
