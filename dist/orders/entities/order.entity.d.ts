import { GameNet } from '../../game-net/entities/game-net.entity';
import { User } from '../../users/entities/user.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { GameSession } from '../../game-sessions/entities/game-session.entity';
export declare class Order {
    id: string;
    gameNetId: string;
    gameNet: GameNet;
    soldById: string;
    soldBy: User;
    customerId: string;
    customer: Customer;
    gameSessionId: string;
    gameSession: GameSession;
    items: OrderItem[];
    createdAt: Date;
}
export declare class OrderItem {
    id: string;
    orderId: string;
    order: Order;
    productId: string;
    quantity: number;
    buyPriceSnapshot: number;
    sellPriceSnapshot: number;
    totalPrice: number;
}
