import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
   public constructor(
      private readonly configService: ConfigService,
      private readonly prismaService: PrismaService
   ) {
      super({
         jwtFromRequest: (req) => {
            if (!req || !req.cookies) return null
            return req.cookies['accessToken']
         },
         ignoreExpiration: false,
         secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
         algorithms: ['HS256']
      })
   }
   public async validate(payload: { id: string }) {
      const user = await this.prismaService.user.findUnique({
         where: { id: payload.id }
      })
      if (!user) return null
      return user
   }
}
