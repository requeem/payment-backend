import { ConfigService } from '@nestjs/config'
import { YookassaModuleOptions } from 'nestjs-yookassa'

export function getYookassaConfig(configService: ConfigService): YookassaModuleOptions {
   return {
      shopId: configService.getOrThrow('YOOKASSA_SHOP_ID'),
      apiKey: configService.getOrThrow('YOOKASSA_SECRET_KEY')
   }
}
