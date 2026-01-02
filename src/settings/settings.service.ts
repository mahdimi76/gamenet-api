import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from './entities/settings.entity';
import { CreateSettingsDto, UpdateSettingsDto } from './dto/settings.dto';

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(Settings)
        private settingsRepository: Repository<Settings>,
    ) { }

    async create(createSettingsDto: CreateSettingsDto): Promise<Settings> {
        const settings = this.settingsRepository.create(createSettingsDto);
        return this.settingsRepository.save(settings);
    }

    async findByGameNet(gameNetId: string): Promise<Settings | null> {
        return this.settingsRepository.findOne({ where: { gameNetId } });
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
