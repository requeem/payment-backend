import { Injectable } from '@nestjs/common'
import { PaymentHandler } from '../payment.handler'
import { YoomoneyService } from '../providers/yoomomey/yoomoney.service'
import { YookassaWebhookDto } from './dto/yookassa-webhook'

@Injectable()
export class WebhookService {
   public constructor(
      private readonly yoomoneyService: YoomoneyService,
      private readonly paymentHandler: PaymentHandler
   ) {}

   public async handleYookassa(dto: YookassaWebhookDto, ip: string) {
      // this.yoomoneyService.verifyWebhook(ip)

      console.log(dto)

      const result = await this.yoomoneyService.handleWebhook(dto)

      return await this.paymentHandler.processResult(result)
   }
}
