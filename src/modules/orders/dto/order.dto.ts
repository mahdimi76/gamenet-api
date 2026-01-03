import { IsString, IsNumber, IsArray, ValidateNested, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
    @IsString()
    productId: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    buyPriceSnapshot: number;

    @IsNumber()
    sellPriceSnapshot: number;

    @IsNumber()
    @IsOptional()
    totalPrice?: number;
}

export class CreateOrderDto {
    @IsString()
    gameNetId: string;

    @IsString()
    soldById: string;

    @IsString()
    @IsOptional()
    customerId?: string;

    @IsString()
    @IsOptional()
    gameSessionId?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @IsBoolean()
    @IsOptional()
    isPaid?: boolean;

    @IsString()
    @IsOptional()
    paymentMethod?: string;
}
