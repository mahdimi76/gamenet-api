import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(identifier: string, password: string): Promise<{
        id: string;
        name: string;
        email: string;
        phoneNumber: string;
        role: import("../users/entities/user.entity").Role;
        gameNetId: string;
        createdAt: Date;
    } | null>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            phoneNumber: string;
            role: import("../users/entities/user.entity").Role;
            gameNetId: string;
            createdAt: Date;
        };
        access_token: string;
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        phoneNumber: string;
        role: import("../users/entities/user.entity").Role;
        gameNetId: string;
        createdAt: Date;
    } | null>;
}
