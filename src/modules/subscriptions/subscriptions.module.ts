import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan, Subscription } from './entities/subscription.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Plan, Subscription])],
    exports: [TypeOrmModule],
})
export class SubscriptionsModule { }
