import { Body, Controller, HttpCode, Ip, Post } from '@nestjs/common'
import { WebhookService } from './webhook.service'
import { YookassaWebhookDto } from './dto/yookassa-webhook'

@Controller('webhook')
export class WebhookController {
   public constructor(private readonly webhookService: WebhookService) {}

   @Post('yookassa')
   @HttpCode(200)
   public async handleYookassa(@Body() dto: YookassaWebhookDto, @Ip() ip: string) {
      await this.webhookService.handleYookassa(dto, ip)

      console.log('YOOKASSA WEBHOOK', dto)
   }

   @Post('stripe')
   @HttpCode(200)
   public async handleStrapi(@Body() dto: any) {
      console.log('STRAPI WEBHOOK', dto)
      return dto
   }
}
