import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserTokens = createParamDecorator(
  async (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user;
  },
);
