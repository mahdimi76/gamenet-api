import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(createTransactionDto: CreateTransactionDto): Promise<import("./entities/transaction.entity").Transaction>;
    findAll(gameNetId?: string): Promise<import("./entities/transaction.entity").Transaction[]>;
    findByCustomer(customerId: string): Promise<import("./entities/transaction.entity").Transaction[]>;
    getStats(gameNetId: string, startDate: string, endDate: string): Promise<{
        totalRevenue: number;
        totalDeposits: number;
        count: number;
    }>;
    findOne(id: string): Promise<import("./entities/transaction.entity").Transaction | null>;
}
