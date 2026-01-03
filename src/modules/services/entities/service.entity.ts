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
import { GameSession } from '../../game-sessions/entities/game-session.entity';

@Entity('services')
export class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    gameNetId: string;

    @ManyToOne(() => GameNet, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'gameNetId' })
    gameNet: GameNet;

    @OneToMany(() => SessionService, (ss) => ss.service)
    sessionServices: SessionService[];

    @CreateDateColumn()
    createdAt: Date;
}

@Entity('session_services')
export class SessionService {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    sessionId: string;

    @ManyToOne(() => GameSession, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sessionId' })
    session: GameSession;

    @Column()
    serviceId: string;

    @ManyToOne(() => Service)
    @JoinColumn({ name: 'serviceId' })
    service: Service;

    @Column({ default: 1 })
    quantity: number;

    @CreateDateColumn()
    addedAt: Date;
}
