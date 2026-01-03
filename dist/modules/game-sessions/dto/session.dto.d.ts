import { PaymentMethod } from '../entities/game-session.entity';
export declare class CreateSessionDto {
    stationNumber: number;
    deviceId?: string;
    customerId?: string;
    gameNetId: string;
    startedById?: string;
    extraControllers?: number;
    limitMinutes?: number;
}
export declare class EndSessionDto {
    totalPrice?: number;
    durationMinutes?: number;
    isPaid?: boolean;
    paymentMethod?: PaymentMethod;
}
export declare class UpdateSessionDto {
    status?: string;
    extraControllers?: number;
    limitMinutes?: number;
}
