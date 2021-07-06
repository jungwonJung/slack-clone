import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // switchToHttp 한서버에서 3가지의 서버를 돌릴수있는데 하나의 실행컨텍스트로 관리
    return request.user;
  },
);
