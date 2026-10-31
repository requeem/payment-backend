import { Authorized, Protected } from '@/shared/decorators/auth'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { PaymentHistoryResponse } from './dto/payment-history.dto'
import { PaymentService } from './payment.service'

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
   constructor(private readonly paymentService: PaymentService) {}

   @ApiOperation({ summary: 'Получить историю платежей пользователя' })
   @ApiOkResponse({
      type: [PaymentHistoryResponse]
   })
   @Protected()
   @Get('history')
   public async getPaymentHistory(@Authorized() user: User) {
      return await this.paymentService.getHistory(user)
   }

   @Protected()
   @Post()
   public async createPayment(@Body() dto: CreatePaymentDto, @Authorized() user: User) {
      return await this.paymentService.createPayment(dto, user)
   }
}
