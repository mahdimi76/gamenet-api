import { GameNet } from '../../game-net/entities/game-net.entity';
export declare enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    STAFF = "STAFF"
}
export declare class User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: Role;
    gameNetId: string;
    gameNet: GameNet;
    createdAt: Date;
}
