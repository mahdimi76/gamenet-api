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
exports.Settings = void 0;
const typeorm_1 = require("typeorm");
const game_net_entity_1 = require("../../game-net/entities/game-net.entity");
let Settings = class Settings {
    id;
    storeName;
    phoneNumber;
    address;
    logoUrl;
    extraControllerRate;
    gameNetId;
    gameNet;
    updatedAt;
};
exports.Settings = Settings;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Settings.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'گیم‌نت من' }),
    __metadata("design:type", String)
], Settings.prototype, "storeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Settings.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Settings.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Settings.prototype, "logoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 10000 }),
    __metadata("design:type", Number)
], Settings.prototype, "extraControllerRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Settings.prototype, "gameNetId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => game_net_entity_1.GameNet, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'gameNetId' }),
    __metadata("design:type", game_net_entity_1.GameNet)
], Settings.prototype, "gameNet", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Settings.prototype, "updatedAt", void 0);
exports.Settings = Settings = __decorate([
    (0, typeorm_1.Entity)('settings')
], Settings);
//# sourceMappingURL=settings.entity.js.map