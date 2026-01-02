import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { GameNet } from '../../game-net/entities/game-net.entity';

@Entity('devices')
export class Device {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    type: string; // PS4, PS5, XBOX, PC, OTHER

    @Column({ default: 0 })
    hourlyRate: number;

    @Column({ default: 0 })
    extraRate: number;

    @Column({ default: 'AVAILABLE' })
    status: string; // AVAILABLE, BUSY, MAINTENANCE

    @Column({ nullable: true })
    startTime: Date;

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
