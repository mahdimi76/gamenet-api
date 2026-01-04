import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../modules/users/users.service';
import { Role } from '../common/enums/role.enum';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const usersService = app.get(UsersService);

    const email = 'mahdimafarvandi@gmail.com';
    const phoneNumber = '09130979930';

    try {
        const existingUser = await usersService.findByEmail(email);
        if (existingUser) {
            console.log('User already exists!');
        } else {
            await usersService.create({
                name: 'مهدی مفروندی',
                email: email,
                phoneNumber: phoneNumber,
                password: 'mahdi.mi.76',
                role: Role.SUPER_ADMIN,
                // gameNetId is optional for Super Admin initially or can be added later if needed
            });
            console.log('Super Admin user created successfully!');
        }
    } catch (error) {
        console.error('Error seeding user:', error);
    } finally {
        await app.close();
    }
}

bootstrap();
