import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { GameNet } from '../../game-net/entities/game-net.entity';
import { User } from '../../users/entities/user.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { GameSession } from '../../game-sessions/entities/game-session.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    gameNetId: string;

    @ManyToOne(() => GameNet, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'gameNetId' })
    gameNet: GameNet;

    @Column()
    soldById: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'soldById' })
    soldBy: User;

    @Column({ nullable: true })
    customerId: string;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customerId' })
    customer: Customer;

    @Column({ nullable: true })
    gameSessionId: string;

    @ManyToOne(() => GameSession)
    @JoinColumn({ name: 'gameSessionId' })
    gameSession: GameSession;

    @OneToMany(() => OrderItem, (item) => item.order)
    items: OrderItem[];

    @Column({ default: false })
    isPaid: boolean;

    @Column({ nullable: true })
    paymentMethod: string;

    @Column({ type: 'decimal', precision: 10, scale: 0, default: 0 })
    totalPrice: number;

    @CreateDateColumn()
    createdAt: Date;
}

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    orderId: string;

    @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orderId' })
    order: Order;

    @Column()
    productId: string;

    @Column()
    quantity: number;

    @Column()
    buyPriceSnapshot: number;

    @Column()
    sellPriceSnapshot: number;

    @Column({ default: 0 })
    totalPrice: number;
}
