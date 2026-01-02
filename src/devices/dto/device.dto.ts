import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export class CreateDeviceDto {
    @IsString()
    name: string;

    @IsString()
    type: string;

    @IsNumber()
    @IsOptional()
    hourlyRate?: number;

    @IsNumber()
    @IsOptional()
    extraRate?: number;

    @IsString()
    gameNetId: string;
}

export class UpdateDeviceDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    type?: string;

    @IsNumber()
    @IsOptional()
    hourlyRate?: number;

    @IsNumber()
    @IsOptional()
    extraRate?: number;

    @IsString()
    @IsOptional()
    status?: string;
}
