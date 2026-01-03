import { Controller, Get, Query, Res } from '@nestjs/common';
import { BackupService } from './backup.service';
import { Auth } from '../../common';

@Controller('backup')
export class BackupController {
    constructor(private readonly backupService: BackupService) { }

    @Auth()
    @Get('export')
    async exportBackup(@Query('gameNetId') gameNetId: string) {
        return this.backupService.exportData(gameNetId);
    }
}
