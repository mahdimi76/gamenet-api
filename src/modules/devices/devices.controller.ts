import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto, UpdateDeviceDto } from './dto/device.dto';
import { Auth, CurrentUser } from '../../common';

@Controller('devices')
export class DevicesController {
    constructor(private readonly devicesService: DevicesService) { }

    @Auth()
    @Post()
    create(@Body() createDeviceDto: CreateDeviceDto) {
        return this.devicesService.create(createDeviceDto);
    }

    @Auth()
    @Get()
    findAll(@Query('gameNetId') gameNetId?: string) {
        if (gameNetId) {
            return this.devicesService.findByGameNet(gameNetId);
        }
        return this.devicesService.findAll();
    }

    @Auth()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.devicesService.findOne(id);
    }

    @Auth()
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto, @CurrentUser('gameNetId') gameNetId: string) {
        return this.devicesService.update(id, updateDeviceDto, gameNetId);
    }

    @Auth()
    @Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body() body: { status: string; startTime?: Date }, @CurrentUser('gameNetId') gameNetId: string) {
        return this.devicesService.updateStatus(id, body.status, gameNetId, body.startTime);
    }

    @Auth()
    @Delete(':id')
    remove(@Param('id') id: string, @CurrentUser('gameNetId') gameNetId: string) {
        return this.devicesService.remove(id, gameNetId);
    }
}
