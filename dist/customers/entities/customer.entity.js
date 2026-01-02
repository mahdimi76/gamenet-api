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
exports.Customer = exports.CustomerRank = void 0;
const typeorm_1 = require("typeorm");
const game_net_entity_1 = require("../../game-net/entities/game-net.entity");
var CustomerRank;
(function (CustomerRank) {
    CustomerRank["BRONZE"] = "BRONZE";
    CustomerRank["SILVER"] = "SILVER";
    CustomerRank["GOLD"] = "GOLD";
    CustomerRank["PALLADIUM"] = "PALLADIUM";
})(CustomerRank || (exports.CustomerRank = CustomerRank = {}));
let Customer = class Customer {
    id;
    name;
    phoneNumber;
    email;
    birthDate;
    balance;
    rank;
    totalSpent;
    totalMinutes;
    gameNetId;
    gameNet;
    createdAt;
    updatedAt;
};
exports.Customer = Customer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Customer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customer.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customer.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Customer.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Customer.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CustomerRank, default: CustomerRank.BRONZE }),
    __metadata("design:type", String)
], Customer.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Customer.prototype, "totalSpent", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Customer.prototype, "totalMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customer.prototype, "gameNetId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => game_net_entity_1.GameNet, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'gameNetId' }),
    __metadata("design:type", game_net_entity_1.GameNet)
], Customer.prototype, "gameNet", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Customer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Customer.prototype, "updatedAt", void 0);
exports.Customer = Customer = __decorate([
    (0, typeorm_1.Entity)('customers'),
    (0, typeorm_1.Index)(['gameNetId', 'phoneNumber'], { unique: true })
], Customer);
//# sourceMappingURL=customer.entity.js.map