import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(loginDto: LoginDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            phoneNumber: string;
            role: import("../users/entities/user.entity").Role;
            gameNetId: string;
            gameNet: import("../game-net/entities/game-net.entity").GameNet;
            createdAt: Date;
        };
        access_token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        phoneNumber: string;
        role: import("../users/entities/user.entity").Role;
        gameNetId: string;
        gameNet: import("../game-net/entities/game-net.entity").GameNet;
        createdAt: Date;
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        phoneNumber: string;
        role: import("../users/entities/user.entity").Role;
        gameNetId: string;
        gameNet: import("../game-net/entities/game-net.entity").GameNet;
        createdAt: Date;
    } | null>;
}
