import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/loginUser.dto'
import { RegisterUserDto } from './dto/registerUser.dto'

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('register')
   public async registerUser(
      @Body() dto: RegisterUserDto,
      @Res({ passthrough: true }) res: Response
   ) {
      return this.authService.registerUser(dto, res)
   }

   @Post('login')
   public async loginUser(@Body() dto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
      return this.authService.loginUser(dto, res)
   }

   @Post('logout')
   public async logoutUser(@Res({ passthrough: true }) res: Response) {
      return this.authService.logoutUser(res)
   }

   @Post('refresh')
   public async refreshTokens(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
      return this.authService.refreshTokens(req, res)
   }
}
