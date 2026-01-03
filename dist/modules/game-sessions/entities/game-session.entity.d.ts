import { GameNet } from '../../game-net/entities/game-net.entity';
import { Device } from '../../devices/entities/device.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { User } from '../../users/entities/user.entity';
export declare enum PaymentMethod {
    CASH = "CASH",
    POS = "POS",
    CARD_TO_CARD = "CARD_TO_CARD",
    WALLET = "WALLET"
}
export declare class GameSession {
    id: string;
    stationNumber: number;
    status: string;
    deviceId: string;
    device: Device;
    customerId: string;
    customer: Customer;
    gameNetId: string;
    gameNet: GameNet;
    startTime: Date;
    endTime: Date;
    startedById: string;
    startedBy: User;
    totalPrice: number;
    durationMinutes: number;
    isPaid: boolean;
    paymentMethod: PaymentMethod;
    extraControllers: number;
    limitMinutes: number;
    createdAt: Date;
}
