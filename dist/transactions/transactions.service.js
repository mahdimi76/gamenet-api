"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("./entities/transaction.entity");
let TransactionsService = class TransactionsService {
    transactionsRepository;
    constructor(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    async create(createTransactionDto) {
        const transaction = this.transactionsRepository.create(createTransactionDto);
        return this.transactionsRepository.save(transaction);
    }
    async findAll() {
        return this.transactionsRepository.find({
            relations: ['customer', 'registeredBy'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByGameNet(gameNetId) {
        return this.transactionsRepository.find({
            where: { gameNetId },
            relations: ['customer', 'registeredBy'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByCustomer(customerId) {
        return this.transactionsRepository.find({
            where: { customerId },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        return this.transactionsRepository.findOne({
            where: { id },
            relations: ['customer', 'registeredBy'],
        });
    }
    async getStats(gameNetId, startDate, endDate) {
        const transactions = await this.transactionsRepository.find({
            where: {
                gameNetId,
                createdAt: (0, typeorm_2.Between)(startDate, endDate),
            },
        });
        const totalRevenue = transactions
            .filter((t) => t.type === 'USAGE')
            .reduce((sum, t) => sum + t.amount, 0);
        const totalDeposits = transactions
            .filter((t) => t.type === 'DEPOSIT')
            .reduce((sum, t) => sum + t.amount, 0);
        return { totalRevenue, totalDeposits, count: transactions.length };
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map