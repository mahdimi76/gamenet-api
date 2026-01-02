import { Controller, Get, Post, Body, Param, Patch, Query } from '@nestjs/common';
import { GameSessionsService } from './game-sessions.service';
import { CreateSessionDto, EndSessionDto, UpdateSessionDto } from './dto/session.dto';
import { Auth } from '../common';

@Controller('game-sessions')
export class GameSessionsController {
    constructor(private readonly gameSessionsService: GameSessionsService) { }

    @Auth()
    @Post()
    create(@Body() createSessionDto: CreateSessionDto) {
        return this.gameSessionsService.create(createSessionDto);
    }

    @Auth()
    @Get()
    findAll(
        @Query('gameNetId') gameNetId?: string,
        @Query('status') status?: string,
    ) {
        if (gameNetId) {
            return this.gameSessionsService.findByGameNet(gameNetId, status);
        }
        return this.gameSessionsService.findAll();
    }

    @Auth()
    @Get('unpaid')
    getUnpaid(@Query('gameNetId') gameNetId: string) {
        return this.gameSessionsService.getUnpaidSessions(gameNetId);
    }

    @Auth()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.gameSessionsService.findOne(id);
    }

    @Auth()
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
        return this.gameSessionsService.update(id, updateSessionDto);
    }

    @Auth()
    @Patch(':id/end')
    endSession(@Param('id') id: string, @Body() endSessionDto: EndSessionDto) {
        return this.gameSessionsService.endSession(id, endSessionDto);
    }
}
