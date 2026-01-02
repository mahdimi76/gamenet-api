import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
export declare class CustomersService {
    private customersRepository;
    constructor(customersRepository: Repository<Customer>);
    create(createCustomerDto: CreateCustomerDto): Promise<Customer>;
    findAll(): Promise<Customer[]>;
    findByGameNet(gameNetId: string): Promise<Customer[]>;
    findOne(id: string): Promise<Customer | null>;
    findByPhone(gameNetId: string, phoneNumber: string): Promise<Customer | null>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer | null>;
    updateBalance(id: string, amount: number): Promise<Customer | null>;
    remove(id: string): Promise<void>;
}
