import { DevicesService } from './devices.service';
import { CreateDeviceDto, UpdateDeviceDto } from './dto/device.dto';
export declare class DevicesController {
    private readonly devicesService;
    constructor(devicesService: DevicesService);
    create(createDeviceDto: CreateDeviceDto): Promise<import("./entities/device.entity").Device>;
    findAll(gameNetId?: string): Promise<import("./entities/device.entity").Device[]>;
    findOne(id: string): Promise<import("./entities/device.entity").Device | null>;
    update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<import("./entities/device.entity").Device | null>;
    updateStatus(id: string, body: {
        status: string;
        startTime?: Date;
    }): Promise<import("./entities/device.entity").Device | null>;
    remove(id: string): Promise<void>;
}
