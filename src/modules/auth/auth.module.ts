import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { jwtConfig } from '../../config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameNet } from '../game-net/entities/game-net.entity';
import { User } from '../users/entities/user.entity';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        TypeOrmModule.forFeature([GameNet, User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: (configService.get<string>('JWT_EXPIRES_IN') || '7d') as any },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule { }
