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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const service_entity_1 = require("./entities/service.entity");
let ServicesService = class ServicesService {
    servicesRepository;
    sessionServicesRepository;
    constructor(servicesRepository, sessionServicesRepository) {
        this.servicesRepository = servicesRepository;
        this.sessionServicesRepository = sessionServicesRepository;
    }
    async create(createServiceDto) {
        const service = this.servicesRepository.create(createServiceDto);
        return this.servicesRepository.save(service);
    }
    async findAll() {
        return this.servicesRepository.find();
    }
    async findByGameNet(gameNetId) {
        return this.servicesRepository.find({ where: { gameNetId } });
    }
    async findOne(id) {
        return this.servicesRepository.findOne({ where: { id } });
    }
    async update(id, updateServiceDto) {
        await this.servicesRepository.update(id, updateServiceDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.servicesRepository.delete(id);
    }
    async addToSession(dto) {
        const sessionService = this.sessionServicesRepository.create(dto);
        return this.sessionServicesRepository.save(sessionService);
    }
    async findSessionServices(sessionId) {
        return this.sessionServicesRepository.find({
            where: { sessionId },
            relations: ['service'],
        });
    }
    async removeFromSession(id) {
        await this.sessionServicesRepository.delete(id);
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __param(1, (0, typeorm_1.InjectRepository)(service_entity_1.SessionService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ServicesService);
//# sourceMappingURL=services.service.js.map