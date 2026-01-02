import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './common/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // بارگذاری متغیرهای محیطی
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // اتصال به دیتابیس با TypeORM
    TypeOrmModule.forRoot(databaseConfig()),
    // ماژول‌های اپلیکیشن
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
