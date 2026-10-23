import { Module } from '@nestjs/common'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'
import { YoomomeyModule } from './providers/yoomomey/yoomomey.module'

@Module({
   controllers: [PaymentController],
   providers: [PaymentService],
   imports: [YoomomeyModule]
})
export class PaymentModule {}
