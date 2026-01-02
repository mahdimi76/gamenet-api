import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service, SessionService } from './entities/service.entity';
import { CreateServiceDto, UpdateServiceDto, AddSessionServiceDto } from './dto/service.dto';

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service)
        private servicesRepository: Repository<Service>,
        @InjectRepository(SessionService)
        private sessionServicesRepository: Repository<SessionService>,
    ) { }

    async create(createServiceDto: CreateServiceDto): Promise<Service> {
        const service = this.servicesRepository.create(createServiceDto);
        return this.servicesRepository.save(service);
    }

    async findAll(): Promise<Service[]> {
        return this.servicesRepository.find();
    }

    async findByGameNet(gameNetId: string): Promise<Service[]> {
        return this.servicesRepository.find({ where: { gameNetId } });
    }

    async findOne(id: string): Promise<Service | null> {
        return this.servicesRepository.findOne({ where: { id } });
    }

    async update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service | null> {
        await this.servicesRepository.update(id, updateServiceDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.servicesRepository.delete(id);
    }

    // Session Services
    async addToSession(dto: AddSessionServiceDto): Promise<SessionService> {
        const sessionService = this.sessionServicesRepository.create(dto);
        return this.sessionServicesRepository.save(sessionService);
    }

    async findSessionServices(sessionId: string): Promise<SessionService[]> {
        return this.sessionServicesRepository.find({
            where: { sessionId },
            relations: ['service'],
        });
    }

    async removeFromSession(id: string): Promise<void> {
        await this.sessionServicesRepository.delete(id);
    }
}
