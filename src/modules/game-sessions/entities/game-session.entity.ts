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
import { Device } from '../../devices/entities/device.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { User } from '../../users/entities/user.entity';
import { Order } from '../../orders/entities/order.entity';
import { SessionService } from '../../services/entities/service.entity';

export enum PaymentMethod {
    CASH = 'CASH',
    POS = 'POS',
    CARD_TO_CARD = 'CARD_TO_CARD',
    WALLET = 'WALLET',
}

@Entity('game_sessions')
export class GameSession {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    stationNumber: number;

    @Column({ default: 'ACTIVE' })
    status: string; // ACTIVE, COMPLETED, CANCELLED

    @Column({ nullable: true })
    deviceId: string;

    @ManyToOne(() => Device)
    @JoinColumn({ name: 'deviceId' })
    device: Device;

    @Column({ nullable: true })
    customerId: string;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customerId' })
    customer: Customer;

    @Column()
    gameNetId: string;

    @ManyToOne(() => GameNet, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'gameNetId' })
    gameNet: GameNet;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    startTime: Date;

    @Column({ nullable: true })
    endTime: Date;

    @Column({ nullable: true })
    startedById: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'startedById' })
    startedBy: User;

    @Column({ nullable: true })
    totalPrice: number;

    @Column({ nullable: true })
    durationMinutes: number;

    @Column({ default: false })
    isPaid: boolean;

    @Column({ type: 'enum', enum: PaymentMethod, nullable: true })
    paymentMethod: PaymentMethod;

    @Column({ default: 0 })
    extraControllers: number;

    @Column({ nullable: true })
    limitMinutes: number;

    @CreateDateColumn()
    createdAt: Date;

    // Relations
    @OneToMany(() => Order, order => order.gameSession)
    orders: Order[];

    @OneToMany(() => SessionService, ss => ss.session)
    services: SessionService[];
}
