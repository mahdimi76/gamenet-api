import { ServicesService } from './services.service';
import { CreateServiceDto, UpdateServiceDto, AddSessionServiceDto } from './dto/service.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    create(createServiceDto: CreateServiceDto): Promise<import("./entities/service.entity").Service>;
    findAll(gameNetId?: string): Promise<import("./entities/service.entity").Service[]>;
    findOne(id: string): Promise<import("./entities/service.entity").Service | null>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<import("./entities/service.entity").Service | null>;
    remove(id: string): Promise<void>;
    addToSession(dto: AddSessionServiceDto): Promise<import("./entities/service.entity").SessionService>;
    findSessionServices(sessionId: string): Promise<import("./entities/service.entity").SessionService[]>;
    removeFromSession(id: string): Promise<void>;
}
