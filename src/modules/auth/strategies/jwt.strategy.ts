import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private usersService: UsersService,
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'secretKey',
        });
    }

    async validate(payload: any) {
        // استعلام از دیتابیس برای اطمینان از وجود کاربر
        const user = await this.usersService.findOne(payload.sub);

        if (!user) {
            // اگر کاربر پاک شده باشد، دسترسی قطع می‌شود
            throw new UnauthorizedException('کاربر یافت نشد یا دسترسی مسدود شده است.');
        }

        return {
            id: user.id,
            email: user.email,
            role: user.role,
            gameNetId: user.gameNetId,
        };
    }
}
