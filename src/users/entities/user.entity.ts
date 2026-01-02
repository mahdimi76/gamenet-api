import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

export enum Role {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    STAFF = 'STAFF',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    name: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ unique: true, nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.ADMIN })
    role: Role;

    @Column({ nullable: true })
    gameNetId: string;

    @CreateDateColumn()
    createdAt: Date;
}
