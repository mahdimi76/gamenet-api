import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { CreateDeviceDto, UpdateDeviceDto } from './dto/device.dto';

@Injectable()
export class DevicesService {
    constructor(
        @InjectRepository(Device)
        private devicesRepository: Repository<Device>,
    ) { }

    async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
        const device = this.devicesRepository.create(createDeviceDto);
        return this.devicesRepository.save(device);
    }

    async findAll(): Promise<Device[]> {
        return this.devicesRepository.find();
    }

    async findByGameNet(gameNetId: string): Promise<Device[]> {
        // برگرداندن دستگاه‌ها با session های فعال و خدمات ثبت شده
        return this.devicesRepository
            .createQueryBuilder('device')
            .leftJoinAndSelect('device.sessions', 'session', 'session.status = :status', { status: 'ACTIVE' })
            .leftJoinAndSelect('session.services', 'sessionService')
            .leftJoinAndSelect('sessionService.service', 'service')
            .leftJoinAndSelect('session.orders', 'order')
            .leftJoinAndSelect('order.items', 'orderItem')
            .leftJoinAndSelect('session.customer', 'customer')
            .where('device.gameNetId = :gameNetId', { gameNetId })
            .orderBy('device.createdAt', 'ASC')
            .getMany();
    }

    async findOne(id: string): Promise<Device | null> {
        return this.devicesRepository.findOne({ where: { id } });
    }

    async update(id: string, updateDeviceDto: UpdateDeviceDto, gameNetId: string): Promise<Device | null> {
        const result = await this.devicesRepository.update({ id, gameNetId }, updateDeviceDto);
        if (result.affected === 0) return null;
        return this.findOne(id);
    }

    async updateStatus(id: string, status: string, gameNetId: string, startTime?: Date): Promise<Device | null> {
        const result = await this.devicesRepository.update({ id, gameNetId }, { status, startTime });
        if (result.affected === 0) return null;
        return this.findOne(id);
    }

    async remove(id: string, gameNetId: string): Promise<void> {
        await this.devicesRepository.delete({ id, gameNetId });
    }
}
