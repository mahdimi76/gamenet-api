import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { GameNet } from '../../game-net/entities/game-net.entity';

@Entity('settings')
export class Settings {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: 'گیم‌نت من' })
    storeName: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ nullable: true })
    logoUrl: string;

    @Column({ default: 10000 })
    extraControllerRate: number;

    @Column({ unique: true })
    gameNetId: string;

    @OneToOne(() => GameNet, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'gameNetId' })
    gameNet: GameNet;

    @UpdateDateColumn()
    updatedAt: Date;
}
