import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto, UpdateServiceDto, AddSessionServiceDto } from './dto/service.dto';
import { Auth } from '../common';

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) { }

    @Auth()
    @Post()
    create(@Body() createServiceDto: CreateServiceDto) {
        return this.servicesService.create(createServiceDto);
    }

    @Auth()
    @Get()
    findAll(@Query('gameNetId') gameNetId?: string) {
        if (gameNetId) {
            return this.servicesService.findByGameNet(gameNetId);
        }
        return this.servicesService.findAll();
    }

    @Auth()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.servicesService.findOne(id);
    }

    @Auth()
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
        return this.servicesService.update(id, updateServiceDto);
    }

    @Auth()
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.servicesService.remove(id);
    }

    // Session Services
    @Auth()
    @Post('session')
    addToSession(@Body() dto: AddSessionServiceDto) {
        return this.servicesService.addToSession(dto);
    }

    @Auth()
    @Get('session/:sessionId')
    findSessionServices(@Param('sessionId') sessionId: string) {
        return this.servicesService.findSessionServices(sessionId);
    }

    @Auth()
    @Delete('session/:id')
    removeFromSession(@Param('id') id: string) {
        return this.servicesService.removeFromSession(id);
    }
}
