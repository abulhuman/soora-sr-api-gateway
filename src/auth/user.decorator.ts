import { ExecutionContext, SetMetadata, UnauthorizedException, createParamDecorator } from '@nestjs/common';
import { RequestWithUser } from './auth.guard';

export const UserId = createParamDecorator(
    async (data: unknown, context: ExecutionContext) => {
        const request: RequestWithUser = await context.switchToHttp().getRequest();
        const userId = request.user;
        if (!userId) throw new UnauthorizedException();
        return userId;
    },
);
