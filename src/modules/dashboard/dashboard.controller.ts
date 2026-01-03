import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Auth } from '../../common';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Auth()
    @Get('stats')
    getStats(@Query('gameNetId') gameNetId: string) {
        return this.dashboardService.getStats(gameNetId);
    }
}
