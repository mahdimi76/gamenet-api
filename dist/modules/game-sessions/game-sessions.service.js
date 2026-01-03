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
exports.GameSessionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const game_session_entity_1 = require("./entities/game-session.entity");
let GameSessionsService = class GameSessionsService {
    sessionsRepository;
    constructor(sessionsRepository) {
        this.sessionsRepository = sessionsRepository;
    }
    async create(createSessionDto) {
        const session = this.sessionsRepository.create(createSessionDto);
        return this.sessionsRepository.save(session);
    }
    async findAll() {
        return this.sessionsRepository.find({
            relations: ['device', 'customer', 'startedBy'],
        });
    }
    async findByGameNet(gameNetId, status) {
        const where = { gameNetId };
        if (status)
            where.status = status;
        return this.sessionsRepository.find({
            where,
            relations: ['device', 'customer', 'startedBy'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        return this.sessionsRepository.findOne({
            where: { id },
            relations: ['device', 'customer', 'startedBy'],
        });
    }
    async findActiveByDevice(deviceId) {
        return this.sessionsRepository.findOne({
            where: { deviceId, status: 'ACTIVE' },
        });
    }
    async update(id, updateSessionDto) {
        await this.sessionsRepository.update(id, updateSessionDto);
        return this.findOne(id);
    }
    async endSession(id, endSessionDto) {
        await this.sessionsRepository.update(id, {
            ...endSessionDto,
            status: 'COMPLETED',
            endTime: new Date(),
        });
        return this.findOne(id);
    }
    async getUnpaidSessions(gameNetId) {
        return this.sessionsRepository.find({
            where: { gameNetId, isPaid: false, status: 'COMPLETED' },
            relations: ['customer', 'device'],
        });
    }
};
exports.GameSessionsService = GameSessionsService;
exports.GameSessionsService = GameSessionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(game_session_entity_1.GameSession)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GameSessionsService);
//# sourceMappingURL=game-sessions.service.js.map