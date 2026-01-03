import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { GameNet } from '../game-net/entities/game-net.entity';
import { Role } from '../../common/enums/role.enum';
import { hashPassword } from '../../common/utils';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectRepository(GameNet) private gameNetRepository: Repository<GameNet>,
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

    async register(registerDto: RegisterDto) {
        const { email, phoneNumber } = registerDto;

        // بررسی تکراری نبودن ایمیل یا شماره
        const existingEmail = await this.usersService.findByEmail(email);
        if (existingEmail) throw new BadRequestException('این ایمیل قبلاً ثبت شده است');

        const existingPhone = await this.usersService.findByPhoneNumber(phoneNumber);
        if (existingPhone) throw new BadRequestException('این شماره تلفن قبلاً ثبت شده است');

        const hashedPassword = await hashPassword(registerDto.password);

        // ساخت گیم‌نت و کاربر ادمین به صورت همزمان (Cascade)
        const gameNet = this.gameNetRepository.create({
            name: registerDto.gameNetName,
            users: [
                {
                    name: registerDto.name,
                    email: registerDto.email,
                    phoneNumber: registerDto.phoneNumber,
                    password: hashedPassword,
                    role: Role.ADMIN,
                }
            ]
        });

        await this.gameNetRepository.save(gameNet);

        return { success: true, message: 'ثبت‌نام با موفقیت انجام شد' };
    }

    async getProfile(userId: string) {
        const user = await this.usersService.findOne(userId);
        if (!user) return null;
        const { password: _, ...result } = user;
        return result;
    }
}
