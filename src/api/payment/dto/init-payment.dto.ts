import { ApiProperty } from '@nestjs/swagger'
import { BillingPeriod, TransactionProvider } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class InitPaymentDto {
   @ApiProperty({
      example: '8H1gPwD5kzWzAwqjloqtp'
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
