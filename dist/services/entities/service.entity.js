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
exports.SessionService = exports.Service = void 0;
const typeorm_1 = require("typeorm");
const game_net_entity_1 = require("../../game-net/entities/game-net.entity");
const game_session_entity_1 = require("../../game-sessions/entities/game-session.entity");
let Service = class Service {
    id;
    name;
    price;
    gameNetId;
    gameNet;
    sessionServices;
    createdAt;
};
exports.Service = Service;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Service.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Service.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Service.prototype, "gameNetId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => game_net_entity_1.GameNet, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'gameNetId' }),
    __metadata("design:type", game_net_entity_1.GameNet)
], Service.prototype, "gameNet", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SessionService, (ss) => ss.service),
    __metadata("design:type", Array)
], Service.prototype, "sessionServices", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Service.prototype, "createdAt", void 0);
exports.Service = Service = __decorate([
    (0, typeorm_1.Entity)('services')
], Service);
let SessionService = class SessionService {
    id;
    sessionId;
    session;
    serviceId;
    service;
    quantity;
    addedAt;
};
exports.SessionService = SessionService;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SessionService.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SessionService.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => game_session_entity_1.GameSession, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'sessionId' }),
    __metadata("design:type", game_session_entity_1.GameSession)
], SessionService.prototype, "session", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SessionService.prototype, "serviceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Service),
    (0, typeorm_1.JoinColumn)({ name: 'serviceId' }),
    __metadata("design:type", Service)
], SessionService.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], SessionService.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SessionService.prototype, "addedAt", void 0);
exports.SessionService = SessionService = __decorate([
    (0, typeorm_1.Entity)('session_services')
], SessionService);
//# sourceMappingURL=service.entity.js.map