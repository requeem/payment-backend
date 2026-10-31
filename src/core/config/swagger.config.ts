import { DocumentBuilder } from '@nestjs/swagger'

export function getSwaggerConfig() {
   return new DocumentBuilder()
      .setTitle('Payment API')
      .setDescription('API для приложения')
      .setVersion('1.0')
      .build()
}
