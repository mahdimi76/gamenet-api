import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    buyPrice: number;

    @IsNumber()
    sellPrice: number;

    @IsNumber()
    @IsOptional()
    stock?: number;

    @IsString()
    gameNetId: string;
}

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsNumber()
    @IsOptional()
    buyPrice?: number;

    @IsNumber()
    @IsOptional()
    sellPrice?: number;

    @IsNumber()
    @IsOptional()
    stock?: number;
}
