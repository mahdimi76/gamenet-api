import { TransactionType, PaymentMethod } from '../entities/transaction.entity';
export declare class CreateTransactionDto {
    amount: number;
    type: TransactionType;
    method?: PaymentMethod;
    description?: string;
    customerId?: string;
    gameNetId: string;
    registeredById?: string;
}
