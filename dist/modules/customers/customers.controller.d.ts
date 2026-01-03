import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(createCustomerDto: CreateCustomerDto): Promise<import("./entities/customer.entity").Customer>;
    findAll(gameNetId?: string): Promise<import("./entities/customer.entity").Customer[]>;
    findByPhone(gameNetId: string, phoneNumber: string): Promise<import("./entities/customer.entity").Customer | null>;
    findOne(id: string): Promise<import("./entities/customer.entity").Customer | null>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<import("./entities/customer.entity").Customer | null>;
    updateBalance(id: string, body: {
        amount: number;
    }): Promise<import("./entities/customer.entity").Customer | null>;
    remove(id: string): Promise<void>;
}
