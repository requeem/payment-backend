import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'
import { getCorsConfig } from '@/config'
import { getSwaggerConfig } from '@/config/swagger.config'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'

async function bootstrap() {
   const app = await NestFactory.create<NestExpressApplication>(AppModule)

   const config = app.get(ConfigService)
   const logger = new Logger(AppModule.name)

   // app.setGlobalPrefix('/api')

   app.set('trust proxy', true)

   app.enableCors(getCorsConfig(config))
   const configSwagger = getSwaggerConfig()
   const document = SwaggerModule.createDocument(app, configSwagger)
   app.useGlobalPipes(new ValidationPipe())
   app.use(cookieParser(config.getOrThrow<string>('COOKIE_SECRET')))
   app.use(
      '/api/scalar',
      apiReference({
         content: document
      })
   )

   SwaggerModule.setup('api/docs', app, document, { jsonDocumentUrl: 'api/docs-json' })

   const port = config.getOrThrow<string>('HTTP_PORT')
   const host = config.getOrThrow<string>('HTTP_HOST')

   try {
      await app.listen(port)
      logger.log('Сервер запущен', host)
   } catch (error) {
      logger.error('Произошла ошибка при запуске сервера', error)
      process.exit(1)
   }
}
bootstrap()
