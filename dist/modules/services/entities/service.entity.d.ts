import { GameNet } from '../../game-net/entities/game-net.entity';
import { GameSession } from '../../game-sessions/entities/game-session.entity';
export declare class Service {
    id: string;
    name: string;
    price: number;
    gameNetId: string;
    gameNet: GameNet;
    sessionServices: SessionService[];
    createdAt: Date;
}
export declare class SessionService {
    id: string;
    sessionId: string;
    session: GameSession;
    serviceId: string;
    service: Service;
    quantity: number;
    addedAt: Date;
}
