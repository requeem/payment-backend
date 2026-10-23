import { Controller, Get } from '@nestjs/common'
import { Authorized, Protected } from 'src/common/decorators'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) {}

   @Protected()
   @Get('me')
   public async getCurrentUser(@Authorized('id') id: string) {
      return id
   }
}
