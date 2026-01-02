import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { CreateDeviceDto, UpdateDeviceDto } from './dto/device.dto';
export declare class DevicesService {
    private devicesRepository;
    constructor(devicesRepository: Repository<Device>);
    create(createDeviceDto: CreateDeviceDto): Promise<Device>;
    findAll(): Promise<Device[]>;
    findByGameNet(gameNetId: string): Promise<Device[]>;
    findOne(id: string): Promise<Device | null>;
    update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<Device | null>;
    updateStatus(id: string, status: string, startTime?: Date): Promise<Device | null>;
    remove(id: string): Promise<void>;
}
