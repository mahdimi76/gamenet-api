import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/transaction.dto';
export declare class TransactionsService {
    private transactionsRepository;
    constructor(transactionsRepository: Repository<Transaction>);
    create(createTransactionDto: CreateTransactionDto): Promise<Transaction>;
    findAll(): Promise<Transaction[]>;
    findByGameNet(gameNetId: string): Promise<Transaction[]>;
    findByCustomer(customerId: string): Promise<Transaction[]>;
    findOne(id: string): Promise<Transaction | null>;
    getStats(gameNetId: string, startDate: Date, endDate: Date): Promise<{
        totalRevenue: number;
        totalDeposits: number;
        count: number;
    }>;
}
