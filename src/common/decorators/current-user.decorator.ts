import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * دکوریتور CurrentUser - برای دسترسی به کاربر لاگین شده
 */
export const CurrentUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        return data ? user?.[data] : user;
    },
);
