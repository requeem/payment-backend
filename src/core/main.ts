import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { getCorsConfig } from 'src/config'
import { AppModule } from './app.module'

async function bootstrap() {
   const app = await NestFactory.create(AppModule)

   const config = app.get(ConfigService)
   const logger = new Logger(AppModule.name)

   const port = config.getOrThrow('HTTP_PORT')
   const host = config.getOrThrow('HTTP_HOST')

   app.enableCors(getCorsConfig(config))

   try {
      await app.listen(port)
      logger.log('Сервер запущен', host)
   } catch (error) {
      logger.error('Произошла ошибка при запуске сервера', error)
      process.exit(1)
   }
}
bootstrap()
