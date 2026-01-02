import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<import("./entities/order.entity").Order | null>;
    findAll(gameNetId?: string): Promise<import("./entities/order.entity").Order[]>;
    findBySession(sessionId: string): Promise<import("./entities/order.entity").Order[]>;
    findOne(id: string): Promise<import("./entities/order.entity").Order | null>;
}
