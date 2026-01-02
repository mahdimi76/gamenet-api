import { Role } from '../entities/user.entity';
export declare class CreateUserDto {
    name: string;
    email?: string;
    phoneNumber?: string;
    password: string;
    role?: Role;
    gameNetId?: string;
}
