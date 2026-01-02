import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(identifier: string, password: string) {
        // جستجو با ایمیل یا شماره تلفن
        let user = await this.usersService.findByEmail(identifier);
        if (!user) {
            user = await this.usersService.findByPhoneNumber(identifier);
        }

        if (!user || !user.password) {
            return null;
        }

        const isPasswordValid = await this.usersService.validatePassword(
            password,
            user.password,
        );

        if (isPasswordValid) {
            const { password: _, ...result } = user;
            return result;
        }

        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.identifier, loginDto.password);

        if (!user) {
            throw new UnauthorizedException('ایمیل/شماره تلفن یا رمز عبور اشتباه است');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            gameNetId: user.gameNetId,
        };

        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    }

    async getProfile(userId: string) {
        const user = await this.usersService.findOne(userId);
        if (!user) return null;
        const { password: _, ...result } = user;
        return result;
    }
}
