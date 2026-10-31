import { Body, Controller, Delete, Get, Post, Req, Res } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { LoginUserDto, LoginUserResponse } from './dto/loginUser.dto'
import { LogoutResponse } from './dto/logout.dto'
import { RegisterResponse, RegisterUserDto } from './dto/registerUser.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @ApiOkResponse({
      type: RegisterResponse
   })
   @Post('register')
   public async registerUser(
      @Body() dto: RegisterUserDto,
      @Res({ passthrough: true }) res: Response
   ) {
      return this.authService.registerUser(dto, res)
   }

   @ApiOkResponse({
      type: LoginUserResponse
   })
   @Post('login')
   public async loginUser(@Body() dto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
      return this.authService.loginUser(dto, res)
   }

   @ApiOkResponse({
      type: LogoutResponse
   })
   @Delete('logout')
   public async logoutUser(@Res({ passthrough: true }) res: Response) {
      return this.authService.logoutUser(res)
   }

   @Get('refresh')
   public async refreshTokens(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
      return this.authService.refreshTokens(req, res)
   }
}
