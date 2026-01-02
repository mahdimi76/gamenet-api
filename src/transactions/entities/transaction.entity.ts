import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { GameNet } from '../../game-net/entities/game-net.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { User } from '../../users/entities/user.entity';

export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    USAGE = 'USAGE',
    REFUND = 'REFUND',
}

export enum PaymentMethod {
    CASH = 'CASH',
    POS = 'POS',
    CARD_TO_CARD = 'CARD_TO_CARD',
    WALLET = 'WALLET',
}

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    amount: number;

    @Column({ type: 'enum', enum: TransactionType })
    type: TransactionType;

    @Column({ type: 'enum', enum: PaymentMethod, default: PaymentMethod.CASH })
    method: PaymentMethod;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    customerId: string;

    @ManyToOne(() => Customer, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'customerId' })
    customer: Customer;

    @Column()
    gameNetId: string;

    @ManyToOne(() => GameNet, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'gameNetId' })
    gameNet: GameNet;

    @Column({ nullable: true })
    registeredById: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'registeredById' })
    registeredBy: User;

    @CreateDateColumn()
    createdAt: Date;
}
