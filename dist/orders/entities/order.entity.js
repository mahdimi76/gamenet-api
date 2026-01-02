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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = exports.Order = void 0;
const typeorm_1 = require("typeorm");
const game_net_entity_1 = require("../../game-net/entities/game-net.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const customer_entity_1 = require("../../customers/entities/customer.entity");
const game_session_entity_1 = require("../../game-sessions/entities/game-session.entity");
let Order = class Order {
    id;
    gameNetId;
    gameNet;
    soldById;
    soldBy;
    customerId;
    customer;
    gameSessionId;
    gameSession;
    items;
    createdAt;
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "gameNetId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => game_net_entity_1.GameNet, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'gameNetId' }),
    __metadata("design:type", game_net_entity_1.GameNet)
], Order.prototype, "gameNet", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "soldById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'soldById' }),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "soldBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer),
    (0, typeorm_1.JoinColumn)({ name: 'customerId' }),
    __metadata("design:type", customer_entity_1.Customer)
], Order.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "gameSessionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => game_session_entity_1.GameSession),
    (0, typeorm_1.JoinColumn)({ name: 'gameSessionId' }),
    __metadata("design:type", game_session_entity_1.GameSession)
], Order.prototype, "gameSession", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OrderItem, (item) => item.order),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)('orders')
], Order);
let OrderItem = class OrderItem {
    id;
    orderId;
    order;
    productId;
    quantity;
    buyPriceSnapshot;
    sellPriceSnapshot;
    totalPrice;
};
exports.OrderItem = OrderItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderItem.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Order, (order) => order.items, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'orderId' }),
    __metadata("design:type", Order)
], OrderItem.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderItem.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "buyPriceSnapshot", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "sellPriceSnapshot", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "totalPrice", void 0);
exports.OrderItem = OrderItem = __decorate([
    (0, typeorm_1.Entity)('order_items')
], OrderItem);
//# sourceMappingURL=order.entity.js.map