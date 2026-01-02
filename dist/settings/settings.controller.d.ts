import { SettingsService } from './settings.service';
import { CreateSettingsDto, UpdateSettingsDto } from './dto/settings.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    create(createSettingsDto: CreateSettingsDto): Promise<import("./entities/settings.entity").Settings>;
    findByGameNet(gameNetId: string): Promise<import("./entities/settings.entity").Settings | null>;
    upsert(gameNetId: string, updateSettingsDto: UpdateSettingsDto): Promise<import("./entities/settings.entity").Settings | null>;
}
