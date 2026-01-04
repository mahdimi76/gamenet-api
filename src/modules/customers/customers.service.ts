import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { Transaction } from '../transactions/entities/transaction.entity';
import { UpdateBalanceDto } from './dto/balance.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
    ) { }

    async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        const customer = this.customersRepository.create(createCustomerDto);
        return this.customersRepository.save(customer);
    }

    async findAll(): Promise<Customer[]> {
        return this.customersRepository.find();
    }

    async findByGameNet(gameNetId: string): Promise<Customer[]> {
        return this.customersRepository.find({
            where: { gameNetId },
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Customer | null> {
        return this.customersRepository.findOne({ where: { id } });
    }

    async findByPhone(gameNetId: string, phoneNumber: string): Promise<Customer | null> {
        return this.customersRepository.findOne({
            where: { gameNetId, phoneNumber }
        });
    }

    async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer | null> {
        await this.customersRepository.update(id, updateCustomerDto);
        return this.findOne(id);
    }

    async updateBalance(id: string, updateBalanceDto: UpdateBalanceDto): Promise<Customer | null> {
        const customer = await this.findOne(id);
        if (customer) {
            // آپدیت موجودی مشتری
            if (updateBalanceDto.type === 'DEPOSIT') {
                customer.balance = Number(customer.balance) + updateBalanceDto.amount;
            } else {
                customer.balance = Number(customer.balance) - updateBalanceDto.amount;
            }

            // اگر از نوع استفاده (خرید) باشد، مجموع خرید را هم اضافه کن
            if (updateBalanceDto.type === 'USAGE') {
                customer.totalSpent = Number(customer.totalSpent || 0) + updateBalanceDto.amount;
            }

            const savedCustomer = await this.customersRepository.save(customer);

            // ثبت تراکنش
            const transaction = this.transactionsRepository.create({
                gameNetId: customer.gameNetId,
                customerId: customer.id,
                amount: updateBalanceDto.amount,
                type: updateBalanceDto.type,
                method: updateBalanceDto.method,
                description: updateBalanceDto.description || (updateBalanceDto.type === 'DEPOSIT' ? 'شارژ دستی کیف پول' : 'کسر دستی از کیف پول'),
                registeredById: updateBalanceDto.registeredById,
            } as any);
            await this.transactionsRepository.save(transaction);

            return savedCustomer;
        }
        return null;
    }

    async remove(id: string): Promise<void> {
        await this.customersRepository.delete(id);
    }
}
