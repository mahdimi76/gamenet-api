import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from './entities/settings.entity';
import { GameNet } from '../game-net/entities/game-net.entity';
import { CreateSettingsDto, UpdateSettingsDto } from './dto/settings.dto';

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(Settings)
        private settingsRepository: Repository<Settings>,
        @InjectRepository(GameNet)
        private gameNetRepository: Repository<GameNet>,
    ) { }

    async create(createSettingsDto: CreateSettingsDto): Promise<Settings> {
        const settings = this.settingsRepository.create(createSettingsDto);
        return this.settingsRepository.save(settings);
    }

    async findByGameNet(gameNetId: string): Promise<Settings> {
        let settings = await this.settingsRepository.findOne({ where: { gameNetId } });

        if (!settings) {
            // اگر تنظیمات وجود نداشت، نام گیم‌نت را پیدا کن و تنظیمات اولیه را بساز
            const gameNet = await this.gameNetRepository.findOne({ where: { id: gameNetId } });
            if (gameNet) {
                settings = await this.create({
                    gameNetId,
                    storeName: gameNet.name, // استفاده از نام ثبت شده هنگام ثبت نام
                });
            }
        }

        return settings!;
    }



    async update(gameNetId: string, updateSettingsDto: UpdateSettingsDto): Promise<Settings | null> {
        await this.settingsRepository.update({ gameNetId }, updateSettingsDto);
        return this.findByGameNet(gameNetId);
    }

    async upsert(gameNetId: string, settingsData: UpdateSettingsDto): Promise<Settings | null> {
        const settings = await this.findByGameNet(gameNetId);
        if (settings) {
            return this.update(gameNetId, settingsData);
        } else {
            return this.create({ ...settingsData, gameNetId });
        }
    }
}
