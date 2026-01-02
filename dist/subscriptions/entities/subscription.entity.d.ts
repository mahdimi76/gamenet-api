import { GameNet } from '../../game-net/entities/game-net.entity';
export declare enum SubscriptionStatus {
    ACTIVE = "ACTIVE",
    TRIAL = "TRIAL",
    EXPIRED = "EXPIRED"
}
export declare class Plan {
    id: string;
    name: string;
    price: number;
    durationDays: number;
    limitSystems: number;
    limitBuffet: number;
    features: string;
    isDefault: boolean;
    subscriptions: Subscription[];
}
export declare class Subscription {
    id: string;
    startDate: Date;
    endDate: Date;
    status: SubscriptionStatus;
    planId: string;
    plan: Plan;
    gameNetId: string;
    gameNet: GameNet;
}
