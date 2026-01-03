import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
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

    async updateBalance(id: string, amount: number): Promise<Customer | null> {
        const customer = await this.findOne(id);
        if (customer) {
            customer.balance += amount;
            return this.customersRepository.save(customer);
        }
        return null;
    }

    async remove(id: string): Promise<void> {
        await this.customersRepository.delete(id);
    }
}
