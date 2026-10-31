import { getJwtConfig } from '@/core/config'
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
   controllers: [AuthController],
   providers: [AuthService, JwtStrategy],
   imports: [
      PassportModule,
      JwtModule.registerAsync({
         imports: [ConfigModule],
         useFactory: (configService: ConfigService) => getJwtConfig(configService),
         inject: [ConfigService]
      })
   ]
})
export class AuthModule {}
