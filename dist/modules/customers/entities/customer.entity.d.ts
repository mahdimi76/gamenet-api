import { GameNet } from '../../game-net/entities/game-net.entity';
export declare enum CustomerRank {
    BRONZE = "BRONZE",
    SILVER = "SILVER",
    GOLD = "GOLD",
    PALLADIUM = "PALLADIUM"
}
export declare class Customer {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    birthDate: Date;
    balance: number;
    rank: CustomerRank;
    totalSpent: number;
    totalMinutes: number;
    gameNetId: string;
    gameNet: GameNet;
    createdAt: Date;
    updatedAt: Date;
}
