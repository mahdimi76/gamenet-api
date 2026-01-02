import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateSettingsDto {
    @IsString()
    @IsOptional()
    storeName?: string;

    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    logoUrl?: string;

    @IsNumber()
    @IsOptional()
    extraControllerRate?: number;

    @IsString()
    gameNetId: string;
}

export class UpdateSettingsDto {
    @IsString()
    @IsOptional()
    storeName?: string;

    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    logoUrl?: string;

    @IsNumber()
    @IsOptional()
    extraControllerRate?: number;
}
