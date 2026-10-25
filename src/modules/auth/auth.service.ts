import { isDev, ms } from '@/shared'
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { hash, verify } from 'argon2'
import { Request, Response } from 'express'

import { PrismaService } from '@/infrastructure/database/prisma/prisma.service'
import { LoginUserDto } from './dto/loginUser.dto'
import { RegisterUserDto } from './dto/registerUser.dto'
import { JwtPayload } from './interfaces/jwt.interface'

@Injectable()
export class AuthService {
   private readonly COOKIES_DOMAIN: string
   public constructor(
      private readonly prismaService: PrismaService,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService
   ) {
      this.COOKIES_DOMAIN = this.configService.getOrThrow('COOKIE_DOMAIN')
   }

   private async generateTokens(user: User) {
      const payload: JwtPayload = { id: user.id }

      const accessTokenExpires = new Date(Date.now() + ms('15m'))
      const refreshTokenExpires = new Date(Date.now() + ms('7d'))

      const accessToken = await this.jwtService.signAsync(payload, {
         expiresIn: '15m'
      })
      const refreshToken = await this.jwtService.signAsync(payload, {
         expiresIn: '7d'
      })
      return { accessToken, refreshToken, refreshTokenExpires, accessTokenExpires }
   }
   private setCookie(res: Response, key: string, value: string, expires: Date) {
      res.cookie(key, value, {
         httpOnly: true,
         secure: isDev(this.configService) ? false : true,
         sameSite: 'lax',
         domain: this.COOKIES_DOMAIN,
         expires
      })
   }

   private async setTokens(res: Response, user: User) {
      const { accessToken, refreshToken, refreshTokenExpires, accessTokenExpires } =
         await this.generateTokens(user)
      this.setCookie(res, 'refreshToken', refreshToken, refreshTokenExpires)
      this.setCookie(res, 'accessToken', accessToken, accessTokenExpires)
   }

   public async registerUser(dto: RegisterUserDto, res: Response) {
      const { name, email, password } = dto

      const existingUser = await this.prismaService.user.findUnique({
         where: { email }
      })

      if (existingUser) {
         throw new ConflictException('Пользователь с таким email уже существует')
      }

      const hashedPassword = await hash(password)

      const newUser = await this.prismaService.user.create({
         data: {
            name,
            email,
            password: hashedPassword
         }
      })

      await this.setTokens(res, newUser)
      return { success: true }
   }

   public async loginUser(dto: LoginUserDto, res: Response) {
      const { email, password } = dto

      const user = await this.prismaService.user.findUnique({
         where: { email }
      })

      if (!user) {
         throw new ConflictException('Пользователь с таким email не существует')
      }

      const isPasswordValid = await verify(user.password, password)

      if (!isPasswordValid) {
         throw new ConflictException('Неверный пароль')
      }

      await this.setTokens(res, user)
      return { success: true }
   }

   public async refreshTokens(req: Request, res: Response) {
      const refreshToken = req.cookies['refreshToken']

      if (refreshToken) {
         const payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken)
         if (payload) {
            const user = await this.prismaService.user.findUnique({
               where: { id: payload.id }
            })
            if (user) {
               await this.setTokens(res, user)
               return { success: true }
            }
         }
      }
      return { success: true }
   }

   public async logoutUser(res: Response) {
      try {
         this.setCookie(res, 'accessToken', '', new Date(0))
         this.setCookie(res, 'refreshToken', '', new Date(0))
         return true
      } catch (error) {
         throw new InternalServerErrorException('Ошибка при выходе из системы')
      }
   }
}
