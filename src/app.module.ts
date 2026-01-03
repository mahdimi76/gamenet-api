import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';

// ماژول‌های اپلیکیشن
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { GameNetModule } from './modules/game-net/game-net.module';
import { DevicesModule } from './modules/devices/devices.module';
import { CustomersModule } from './modules/customers/customers.module';
import { ProductsModule } from './modules/products/products.module';
import { GameSessionsModule } from './modules/game-sessions/game-sessions.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { OrdersModule } from './modules/orders/orders.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ServicesModule } from './modules/services/services.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BackupModule } from './modules/backup/backup.module';

@Module({
  imports: [
    // بارگذاری متغیرهای محیطی
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // اتصال به دیتابیس با TypeORM
    TypeOrmModule.forRoot(typeOrmConfig()),
    // ماژول‌های اپلیکیشن
    AuthModule,
    UsersModule,
    GameNetModule,
    DevicesModule,
    CustomersModule,
    ProductsModule,
    GameSessionsModule,
    TransactionsModule,
    OrdersModule,
    SettingsModule,
    ServicesModule,
    SubscriptionsModule,
    DashboardModule,
    BackupModule,
  ],
})
export class AppModule { }
