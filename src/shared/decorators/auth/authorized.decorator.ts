import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/client'

export const Authorized = createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
   const request = ctx.switchToHttp().getRequest<{ user?: User }>()
   return data ? request.user?.[data] : request.user
})
