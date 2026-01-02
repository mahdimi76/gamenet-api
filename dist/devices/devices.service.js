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
exports.DevicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const device_entity_1 = require("./entities/device.entity");
let DevicesService = class DevicesService {
    devicesRepository;
    constructor(devicesRepository) {
        this.devicesRepository = devicesRepository;
    }
    async create(createDeviceDto) {
        const device = this.devicesRepository.create(createDeviceDto);
        return this.devicesRepository.save(device);
    }
    async findAll() {
        return this.devicesRepository.find();
    }
    async findByGameNet(gameNetId) {
        return this.devicesRepository.find({ where: { gameNetId } });
    }
    async findOne(id) {
        return this.devicesRepository.findOne({ where: { id } });
    }
    async update(id, updateDeviceDto) {
        await this.devicesRepository.update(id, updateDeviceDto);
        return this.findOne(id);
    }
    async updateStatus(id, status, startTime) {
        await this.devicesRepository.update(id, { status, startTime });
        return this.findOne(id);
    }
    async remove(id) {
        await this.devicesRepository.delete(id);
    }
};
exports.DevicesService = DevicesService;
exports.DevicesService = DevicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(device_entity_1.Device)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DevicesService);
//# sourceMappingURL=devices.service.js.map