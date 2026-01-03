import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingsDto, UpdateSettingsDto } from './dto/settings.dto';
import { Auth } from '../../common';

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) { }

    @Auth()
    @Post()
    create(@Body() createSettingsDto: CreateSettingsDto) {
        return this.settingsService.create(createSettingsDto);
    }

    @Auth()
    @Get()
    findByGameNet(@Query('gameNetId') gameNetId: string) {
        return this.settingsService.findByGameNet(gameNetId);
    }

    @Auth()
    @Put()
    upsert(
        @Query('gameNetId') gameNetId: string,
        @Body() updateSettingsDto: UpdateSettingsDto,
    ) {
        return this.settingsService.upsert(gameNetId, updateSettingsDto);
    }
}
