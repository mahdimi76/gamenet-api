import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { GameNet } from '../../game-net/entities/game-net.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    buyPrice: number;

    @Column()
    sellPrice: number;

    @Column({ default: 0 })
    stock: number;

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
