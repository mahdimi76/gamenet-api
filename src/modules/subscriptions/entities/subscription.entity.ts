import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { GameNet } from '../../game-net/entities/game-net.entity';

export enum SubscriptionStatus {
    ACTIVE = 'ACTIVE',
    TRIAL = 'TRIAL',
    EXPIRED = 'EXPIRED',
}

@Entity('plans')
export class Plan {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column()
    durationDays: number;

    @Column({ default: -1 })
    limitSystems: number;

    @Column({ default: -1 })
    limitBuffet: number;

    @Column({ type: 'text', nullable: true })
    features: string;

    @Column({ default: false })
    isDefault: boolean;

    @OneToMany(() => Subscription, (sub) => sub.plan)
    subscriptions: Subscription[];
}

@Entity('subscriptions')
export class Subscription {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column({ type: 'enum', enum: SubscriptionStatus, default: SubscriptionStatus.ACTIVE })
    status: SubscriptionStatus;

    @Column()
    planId: string;

    @ManyToOne(() => Plan, (plan) => plan.subscriptions)
    @JoinColumn({ name: 'planId' })
    plan: Plan;

    @Column({ unique: true })
    gameNetId: string;

    @OneToOne(() => GameNet, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'gameNetId' })
    gameNet: GameNet;
}
