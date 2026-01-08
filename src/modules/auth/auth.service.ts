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
        console.log('🔍 [DEBUG] validateUser called with identifier:', identifier);

        // جستجو با ایمیل یا شماره تلفن
        let user = await this.usersService.findByEmail(identifier);
        console.log('🔍 [DEBUG] findByEmail result:', user ? `Found user: ${user.email}` : 'Not found');

        if (!user) {
            user = await this.usersService.findByPhoneNumber(identifier);
            console.log('🔍 [DEBUG] findByPhoneNumber result:', user ? `Found user: ${user.phoneNumber}` : 'Not found');
        }

        if (!user || !user.password) {
            console.log('❌ [DEBUG] User not found or no password set');
            return null;
        }

        console.log('🔍 [DEBUG] User found. Password in DB starts with:', user.password.substring(0, 20) + '...');
        console.log('🔍 [DEBUG] Password length in DB:', user.password.length);
        console.log('🔍 [DEBUG] Input password:', password);

        const isPasswordValid = await this.usersService.validatePassword(
            password,
            user.password,
        );

        console.log('🔍 [DEBUG] Password validation result:', isPasswordValid);

        if (isPasswordValid) {
            // اگر رمز bcrypt نبود، به bcrypt ارتقا بده
            const isBcrypt = user.password.startsWith('$2') && user.password.length === 60;
            if (!isBcrypt) {
                console.log('🔄 [DEBUG] Upgrading password to bcrypt...');
                const newHashedPassword = await hashPassword(password);
                await this.usersService.update(user.id, { password: newHashedPassword });
                console.log('✅ [DEBUG] Password upgraded to bcrypt successfully');
            }

            const { password: _, ...result } = user;
            return result;
        }

        console.log('❌ [DEBUG] Password validation FAILED');
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
