import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { TransactionType, PaymentMethod } from '../entities/transaction.entity';

export class CreateTransactionDto {
    @IsNumber()
    amount: number;

    @IsEnum(TransactionType)
    type: TransactionType;

    @IsEnum(PaymentMethod)
    @IsOptional()
    method?: PaymentMethod;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    customerId?: string;

    @IsString()
    gameNetId: string;

    @IsString()
    @IsOptional()
    registeredById?: string;
}
