import { ApiProperty } from '@nestjs/swagger'
import { TransactionProvider, TransactionStatus } from '@prisma/client'

export class PaymentHistoryResponse {
   @ApiProperty({ description: 'ID транзакции' })
   id!: string
   @ApiProperty({ description: 'Дата создания транзакции' })
   createdAt!: Date
   @ApiProperty({ description: 'Название плана' })
   plan!: string
   @ApiProperty({ description: 'Сумма транзакции' })
   amount!: number
   @ApiProperty({ description: 'Провайдер транзакции' })
   provider!: TransactionProvider
   @ApiProperty({ description: 'Статус транзакции' })
   status!: TransactionStatus
}
