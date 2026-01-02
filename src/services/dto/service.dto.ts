import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateServiceDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    gameNetId: string;
}

export class UpdateServiceDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsNumber()
    @IsOptional()
    price?: number;
}

export class AddSessionServiceDto {
    @IsString()
    sessionId: string;

    @IsString()
    serviceId: string;

    @IsNumber()
    @IsOptional()
    quantity?: number;
}
