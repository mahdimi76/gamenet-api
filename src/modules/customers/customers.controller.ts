import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { UpdateBalanceDto } from './dto/balance.dto';
import { Auth, CurrentUser } from '../../common';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }

    @Auth()
    @Post()
    create(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customersService.create(createCustomerDto);
    }

    @Auth()
    @Get()
    findAll(@Query('gameNetId') gameNetId?: string) {
        if (gameNetId) {
            return this.customersService.findByGameNet(gameNetId);
        }
        return this.customersService.findAll();
    }

    @Auth()
    @Get('search/:phoneNumber')
    findByPhone(
        @Query('gameNetId') gameNetId: string,
        @Param('phoneNumber') phoneNumber: string,
    ) {
        return this.customersService.findByPhone(gameNetId, phoneNumber);
    }

    @Auth()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.customersService.findOne(id);
    }

    @Auth()
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
        return this.customersService.update(id, updateCustomerDto);
    }

    @Auth()
    @Patch(':id/balance')
    updateBalance(
        @Param('id') id: string,
        @Body() updateBalanceDto: UpdateBalanceDto,
        @CurrentUser('id') userId: string,
    ) {
        return this.customersService.updateBalance(id, {
            ...updateBalanceDto,
            registeredById: userId,
        });
    }

    @Auth()
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.customersService.remove(id);
    }
}
