import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { GameNet } from '../../game-net/entities/game-net.entity';

export enum CustomerRank {
    BRONZE = 'BRONZE',
    SILVER = 'SILVER',
    GOLD = 'GOLD',
    PALLADIUM = 'PALLADIUM',
}

@Entity('customers')
@Index(['gameNetId', 'phoneNumber'], { unique: true })
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    birthDate: Date;

    @Column({ default: 0 })
    balance: number;

    @Column({ type: 'enum', enum: CustomerRank, default: CustomerRank.BRONZE })
    rank: CustomerRank;

    @Column({ default: 0 })
    totalSpent: number;

    @Column({ default: 0 })
    totalMinutes: number;

    @Column()
    gameNetId: string;

    @ManyToOne(() => GameNet, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'gameNetId' })
    gameNet: GameNet;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
