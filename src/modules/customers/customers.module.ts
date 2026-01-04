import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './entities/customer.entity';
import { Transaction } from '../transactions/entities/transaction.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Customer, Transaction])],
    controllers: [CustomersController],
    providers: [CustomersService],
    exports: [CustomersService],
})
export class CustomersModule { }
