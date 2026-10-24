import { Module } from '@nestjs/common'
import { PaymentHandler } from '../payment.handler'
import { YoomomeyModule } from '../providers/yoomomey/yoomomey.module'
import { WebhookController } from './webhook.controller'
import { WebhookService } from './webhook.service'

@Module({
   imports: [YoomomeyModule],
   controllers: [WebhookController],
   providers: [WebhookService, PaymentHandler]
})
export class WebhookModule {}
