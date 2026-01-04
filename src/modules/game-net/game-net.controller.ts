import { Controller, Get } from '@nestjs/common';
import { GameNetService } from './game-net.service';
import { Auth, Role } from '../../common';

@Controller('game-nets')
export class GameNetController {
    constructor(private readonly gameNetService: GameNetService) { }

    @Auth(Role.SUPER_ADMIN)
    @Get()
    findAll() {
        console.log('📬 GET /game-nets called');
        return this.gameNetService.findAll();
    }

    @Auth(Role.SUPER_ADMIN)
    @Get('stats')
    getStats() {
        console.log('📬 GET /game-nets/stats called');
        return this.gameNetService.getStats();
    }
}
