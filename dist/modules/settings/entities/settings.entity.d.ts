import { GameNet } from '../../game-net/entities/game-net.entity';
export declare class Settings {
    id: string;
    storeName: string;
    phoneNumber: string;
    address: string;
    logoUrl: string;
    extraControllerRate: number;
    gameNetId: string;
    gameNet: GameNet;
    updatedAt: Date;
}
