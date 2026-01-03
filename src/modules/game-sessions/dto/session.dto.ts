import { IsString, IsNumber, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { PaymentMethod } from '../entities/game-session.entity';

export class CreateSessionDto {
    @IsNumber()
    stationNumber: number;

    @IsString()
    @IsOptional()
    deviceId?: string;

    @IsString()
    @IsOptional()
    customerId?: string;

    @IsString()
    gameNetId: string;

    @IsString()
    @IsOptional()
    startedById?: string;

    @IsNumber()
    @IsOptional()
    extraControllers?: number;

    @IsNumber()
    @IsOptional()
    limitMinutes?: number;
}

export class EndSessionDto {
    @IsNumber()
    @IsOptional()
    totalPrice?: number;

    @IsNumber()
    @IsOptional()
    durationMinutes?: number;

    @IsBoolean()
    @IsOptional()
    isPaid?: boolean;

    @IsEnum(PaymentMethod)
    @IsOptional()
    paymentMethod?: PaymentMethod;
}

export class UpdateSessionDto {
    @IsString()
    @IsOptional()
    status?: string;

    @IsNumber()
    @IsOptional()
    extraControllers?: number;

    @IsNumber()
    @IsOptional()
    limitMinutes?: number;
}
