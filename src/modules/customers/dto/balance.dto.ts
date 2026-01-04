import { IsNumber, IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class UpdateBalanceDto {
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsEnum(['DEPOSIT', 'USAGE'])
    @IsNotEmpty()
    type: 'DEPOSIT' | 'USAGE';

    @IsEnum(['CASH', 'POS', 'CARD_TO_CARD', 'WALLET'])
    @IsNotEmpty()
    method: 'CASH' | 'POS' | 'CARD_TO_CARD' | 'WALLET';

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    registeredById?: string; // Will be injected from controller
}
