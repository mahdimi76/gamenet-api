import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Auth, CurrentUser } from '../../common';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Auth()
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Auth()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Auth()
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }

    // Staff Endpoints
    @Auth()
    @Get('staff/list')
    getStaff(@Query('gameNetId') gameNetId: string) {
        return this.usersService.findStaffByGameNet(gameNetId);
    }

    @Auth()
    @Post('staff')
    createStaff(
        @Body() createUserDto: CreateUserDto,
        @Query('gameNetId') gameNetId: string,
    ) {
        return this.usersService.createStaff(createUserDto, gameNetId);
    }


    @Auth()
    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.usersService.update(id, body);
    }
}
