import { Repository } from 'typeorm';
import { Service, SessionService } from './entities/service.entity';
import { CreateServiceDto, UpdateServiceDto, AddSessionServiceDto } from './dto/service.dto';
export declare class ServicesService {
    private servicesRepository;
    private sessionServicesRepository;
    constructor(servicesRepository: Repository<Service>, sessionServicesRepository: Repository<SessionService>);
    create(createServiceDto: CreateServiceDto): Promise<Service>;
    findAll(): Promise<Service[]>;
    findByGameNet(gameNetId: string): Promise<Service[]>;
    findOne(id: string): Promise<Service | null>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service | null>;
    remove(id: string): Promise<void>;
    addToSession(dto: AddSessionServiceDto): Promise<SessionService>;
    findSessionServices(sessionId: string): Promise<SessionService[]>;
    removeFromSession(id: string): Promise<void>;
}
