import { IsEnum, IsBoolean, IsOptional, IsString } from 'class-validator';

export enum PaymentMethod {
    CASH = 'CASH',
    POS = 'POS',
    CARD_TO_CARD = 'CARD_TO_CARD',
    WALLET = 'WALLET',
}

export class PaySessionDto {
    @IsEnum(PaymentMethod)
    method: PaymentMethod;

    @IsBoolean()
    isPaid: boolean;
}
