import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/order.dto';
import { Auth } from '../common';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Auth()
    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Auth()
    @Get()
    findAll(@Query('gameNetId') gameNetId?: string) {
        if (gameNetId) {
            return this.ordersService.findByGameNet(gameNetId);
        }
        return this.ordersService.findAll();
    }

    @Auth()
    @Get('session/:sessionId')
    findBySession(@Param('sessionId') sessionId: string) {
        return this.ordersService.findBySession(sessionId);
    }

    @Auth()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(id);
    }
}
