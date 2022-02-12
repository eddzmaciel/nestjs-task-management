import { createParamDecorator, ExecutionContext } from '@nestjs/common';
//Entity
import { User } from '../entities/user.entity';

//getting the user data
export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
