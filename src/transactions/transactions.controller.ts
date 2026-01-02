import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/transaction.dto';
import { Auth } from '../common';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Auth()
    @Post()
    create(@Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionsService.create(createTransactionDto);
    }

    @Auth()
    @Get()
    findAll(@Query('gameNetId') gameNetId?: string) {
        if (gameNetId) {
            return this.transactionsService.findByGameNet(gameNetId);
        }
        return this.transactionsService.findAll();
    }

    @Auth()
    @Get('customer/:customerId')
    findByCustomer(@Param('customerId') customerId: string) {
        return this.transactionsService.findByCustomer(customerId);
    }

    @Auth()
    @Get('stats')
    getStats(
        @Query('gameNetId') gameNetId: string,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ) {
        return this.transactionsService.getStats(
            gameNetId,
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Auth()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.transactionsService.findOne(id);
    }
}
