import { Controller, Get } from '@nestjs/common'

import { UsersService } from './users.service'
import { Authorized, Protected } from '@/modules/auth/decorators'

@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) {}

   @Protected()
   @Get('me')
   public async getCurrentUser(@Authorized('id') id: string) {
      return id
   }
}
