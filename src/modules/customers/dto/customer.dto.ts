import { IsString, IsEmail, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    name: string;

    @IsString()
    phoneNumber: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsDateString()
    @IsOptional()
    birthDate?: string;

    @IsString()
    gameNetId: string;
}

export class UpdateCustomerDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsDateString()
    @IsOptional()
    birthDate?: string;

    @IsNumber()
    @IsOptional()
    balance?: number;
}
