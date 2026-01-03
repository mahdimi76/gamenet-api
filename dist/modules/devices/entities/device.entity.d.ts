import { GameNet } from '../../game-net/entities/game-net.entity';
export declare class Device {
    id: string;
    name: string;
    type: string;
    hourlyRate: number;
    extraRate: number;
    status: string;
    startTime: Date;
    gameNetId: string;
    gameNet: GameNet;
    createdAt: Date;
    updatedAt: Date;
}
