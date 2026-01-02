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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
let OrdersService = class OrdersService {
    ordersRepository;
    orderItemsRepository;
    constructor(ordersRepository, orderItemsRepository) {
        this.ordersRepository = ordersRepository;
        this.orderItemsRepository = orderItemsRepository;
    }
    async create(createOrderDto) {
        const { items, ...orderData } = createOrderDto;
        const order = this.ordersRepository.create(orderData);
        const savedOrder = await this.ordersRepository.save(order);
        for (const item of items) {
            const orderItem = this.orderItemsRepository.create({
                ...item,
                orderId: savedOrder.id,
                totalPrice: item.quantity * item.sellPriceSnapshot,
            });
            await this.orderItemsRepository.save(orderItem);
        }
        return this.findOne(savedOrder.id);
    }
    async findAll() {
        return this.ordersRepository.find({
            relations: ['items', 'soldBy', 'customer', 'gameSession'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByGameNet(gameNetId) {
        return this.ordersRepository.find({
            where: { gameNetId },
            relations: ['items', 'soldBy', 'customer'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        return this.ordersRepository.findOne({
            where: { id },
            relations: ['items', 'soldBy', 'customer', 'gameSession'],
        });
    }
    async findBySession(gameSessionId) {
        return this.ordersRepository.find({
            where: { gameSessionId },
            relations: ['items'],
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map