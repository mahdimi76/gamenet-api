import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { Settings } from './entities/settings.entity';
import { GameNet } from '../game-net/entities/game-net.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Settings, GameNet])],
    controllers: [SettingsController],
    providers: [SettingsService],
    exports: [SettingsService],
})
export class SettingsModule { }
