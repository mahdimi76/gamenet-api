import { GameNet } from '../../game-net/entities/game-net.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { User } from '../../users/entities/user.entity';
export declare enum TransactionType {
    DEPOSIT = "DEPOSIT",
    USAGE = "USAGE",
    REFUND = "REFUND"
}
export declare enum PaymentMethod {
    CASH = "CASH",
    POS = "POS",
    CARD_TO_CARD = "CARD_TO_CARD",
    WALLET = "WALLET"
}
export declare class Transaction {
    id: string;
    amount: number;
    type: TransactionType;
    method: PaymentMethod;
    description: string;
    customerId: string;
    customer: Customer;
    gameNetId: string;
    gameNet: GameNet;
    registeredById: string;
    registeredBy: User;
    createdAt: Date;
}
