import { Controller, Get, Post, Body, Param, Patch, Query } from '@nestjs/common';
import { GameSessionsService } from './game-sessions.service';
import { CreateSessionDto, EndSessionDto, UpdateSessionDto } from './dto/session.dto';
import { Auth, CurrentUser } from '../../common';

import { PaySessionDto } from './dto/pay-session.dto';

@Controller('game-sessions')
export class GameSessionsController {
    constructor(private readonly gameSessionsService: GameSessionsService) { }

    @Post()
    create(@Body() createSessionDto: CreateSessionDto) {
        return this.gameSessionsService.create(createSessionDto);
    }

    @Get()
    findAll() {
        return this.gameSessionsService.findAll();
    }

    @Auth()
    @Get('unpaid')
    getUnpaid(@CurrentUser('gameNetId') gameNetId: string) {
        return this.gameSessionsService.getUnpaidSessions(gameNetId);
    }

    @Get('game-net/:id')
    findByGameNet(@Param('id') id: string, @Query('status') status?: string) {
        return this.gameSessionsService.findByGameNet(id, status);
    }

    @Get('device/:id/active')
    findActiveByDevice(@Param('id') id: string) {
        return this.gameSessionsService.findActiveByDevice(id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.gameSessionsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
        return this.gameSessionsService.update(id, updateSessionDto);
    }

    @Patch(':id/end')
    endSession(@Param('id') id: string, @Body() endSessionDto: EndSessionDto) {
        return this.gameSessionsService.endSession(id, endSessionDto);
    }

    @Auth()
    @Patch(':id/payment')
    paySession(@Param('id') id: string, @Body() payDto: PaySessionDto, @CurrentUser('id') userId: string) {
        return this.gameSessionsService.paySession(id, payDto, userId);
    }
}
