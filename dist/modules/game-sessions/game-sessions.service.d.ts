import { Repository } from 'typeorm';
import { GameSession } from './entities/game-session.entity';
import { CreateSessionDto, EndSessionDto, UpdateSessionDto } from './dto/session.dto';
export declare class GameSessionsService {
    private sessionsRepository;
    constructor(sessionsRepository: Repository<GameSession>);
    create(createSessionDto: CreateSessionDto): Promise<GameSession>;
    findAll(): Promise<GameSession[]>;
    findByGameNet(gameNetId: string, status?: string): Promise<GameSession[]>;
    findOne(id: string): Promise<GameSession | null>;
    findActiveByDevice(deviceId: string): Promise<GameSession | null>;
    update(id: string, updateSessionDto: UpdateSessionDto): Promise<GameSession | null>;
    endSession(id: string, endSessionDto: EndSessionDto): Promise<GameSession | null>;
    getUnpaidSessions(gameNetId: string): Promise<GameSession[]>;
}
