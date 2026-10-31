import { Authorized, Protected } from '@/shared/decorators/auth'
import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { UserResponse } from './dto/user-response'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) {}

   @ApiOkResponse({
      type: UserResponse
   })
   @Protected()
   @Get('me')
   public async getCurrentUser(@Authorized() user: User) {
      return await this.usersService.getUserById(user.id)
   }
}
