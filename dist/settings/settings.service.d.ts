import { Repository } from 'typeorm';
import { Settings } from './entities/settings.entity';
import { CreateSettingsDto, UpdateSettingsDto } from './dto/settings.dto';
export declare class SettingsService {
    private settingsRepository;
    constructor(settingsRepository: Repository<Settings>);
    create(createSettingsDto: CreateSettingsDto): Promise<Settings>;
    findByGameNet(gameNetId: string): Promise<Settings | null>;
    update(gameNetId: string, updateSettingsDto: UpdateSettingsDto): Promise<Settings | null>;
    upsert(gameNetId: string, settingsData: UpdateSettingsDto): Promise<Settings | null>;
}
