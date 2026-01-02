import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

/**
 * دکوریتور Auth - طبق توصیه استاد طاهرخانی
 * UseGuard داخل دکوریتور تعریف شده برای استفاده تمیزتر
 */
export function Auth(...roles: string[]) {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(JwtAuthGuard),
    );
}
