import { Module } from '@nestjs/common'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'
import { YoomomeyModule } from './providers/yoomomey/yoomomey.module'
import { StripeModule } from './providers/stripe/stripe.module'
import { WebhookModule } from './webhook/webhook.module'

@Module({
   controllers: [PaymentController],
   providers: [PaymentService],
   imports: [YoomomeyModule, StripeModule, WebhookModule]
})
export class PaymentModule {}
