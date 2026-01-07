import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { GameNet } from '../../game-net/entities/game-net.entity';
import { GameSession } from '../../game-sessions/entities/game-session.entity';

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

    @Column({ type: 'datetime', nullable: true })
    startTime: Date | null;

    @Column()
    gameNetId: string;

    @Column({ type: 'json', nullable: true })
    config: {
        ipAddress?: string;
        consoleModel?: string;
        // Pricing Variants: { "1": 20000, "2": 30000, "ONLINE": 25000 ... }
        pricingVariants?: Record<string, number>;
        // Dynamic Rules: [{ start: "23:00", end: "08:00", factor: 1.5, ... }]
        dynamicRules?: any[];
    };

    @ManyToOne(() => GameNet, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'gameNetId' })
    gameNet: GameNet;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => GameSession, session => session.device)
    sessions: GameSession[];
}
