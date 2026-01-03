import { Repository } from 'typeorm';
import { Order, OrderItem } from './entities/order.entity';
import { CreateOrderDto } from './dto/order.dto';
export declare class OrdersService {
    private ordersRepository;
    private orderItemsRepository;
    constructor(ordersRepository: Repository<Order>, orderItemsRepository: Repository<OrderItem>);
    create(createOrderDto: CreateOrderDto): Promise<Order | null>;
    findAll(): Promise<Order[]>;
    findByGameNet(gameNetId: string): Promise<Order[]>;
    findOne(id: string): Promise<Order | null>;
    findBySession(gameSessionId: string): Promise<Order[]>;
}
