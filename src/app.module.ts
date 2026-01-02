import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './common/config';

// ماژول‌های اپلیکیشن
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GameNetModule } from './game-net/game-net.module';
import { DevicesModule } from './devices/devices.module';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { GameSessionsModule } from './game-sessions/game-sessions.module';
import { TransactionsModule } from './transactions/transactions.module';
import { OrdersModule } from './orders/orders.module';
import { SettingsModule } from './settings/settings.module';
import { ServicesModule } from './services/services.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
