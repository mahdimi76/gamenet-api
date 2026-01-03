import { GameSessionsService } from './game-sessions.service';
import { CreateSessionDto, EndSessionDto, UpdateSessionDto } from './dto/session.dto';
export declare class GameSessionsController {
    private readonly gameSessionsService;
    constructor(gameSessionsService: GameSessionsService);
    create(createSessionDto: CreateSessionDto): Promise<import("./entities/game-session.entity").GameSession>;
    findAll(gameNetId?: string, status?: string): Promise<import("./entities/game-session.entity").GameSession[]>;
    getUnpaid(gameNetId: string): Promise<import("./entities/game-session.entity").GameSession[]>;
    findOne(id: string): Promise<import("./entities/game-session.entity").GameSession | null>;
    update(id: string, updateSessionDto: UpdateSessionDto): Promise<import("./entities/game-session.entity").GameSession | null>;
    endSession(id: string, endSessionDto: EndSessionDto): Promise<import("./entities/game-session.entity").GameSession | null>;
}
