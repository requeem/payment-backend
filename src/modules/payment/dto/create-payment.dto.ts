import { ApiProperty } from '@nestjs/swagger'
import { BillingPeriod, TransactionProvider } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class CreatePaymentDto {
   @ApiProperty({
      example: 'sLuBbGapad-UODmqDB2uZ'
   })
   @IsString()
   @IsNotEmpty()
   planId!: string

   @ApiProperty({
      example: BillingPeriod.MONTHLY
   })
   @IsEnum(BillingPeriod)
   billingPeriod!: BillingPeriod
   @ApiProperty({
      example: TransactionProvider.YOOKASSA
   })
   @IsEnum(TransactionProvider)
   provider!: TransactionProvider
}
