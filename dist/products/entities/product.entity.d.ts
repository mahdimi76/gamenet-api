import { GameNet } from '../../game-net/entities/game-net.entity';
export declare class Product {
    id: string;
    name: string;
    buyPrice: number;
    sellPrice: number;
    stock: number;
    gameNetId: string;
    gameNet: GameNet;
    createdAt: Date;
    updatedAt: Date;
}
