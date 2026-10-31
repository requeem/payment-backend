import { ApiProperty } from '@nestjs/swagger'

export class Plan {
   @ApiProperty({
      type: String
   })
   id!: string
}
export class UserSubscriptionReponse {
   @ApiProperty({
      type: [Plan]
   })
   plan!: {
      id: string
   }
}

export class UserResponse {
   @ApiProperty({
      example: '123'
   })
   id!: number
   @ApiProperty({
      example: 'danya@mail.ru'
   })
   email!: string
   @ApiProperty({
      example: 'Danya'
   })
   name!: string
   @ApiProperty({
      example: '2026-10-25T14:17:32.721Z'
   })
   createdAt!: Date
   @ApiProperty({
      example: '2026-10-25T14:17:32.721Z'
   })
   updatedAt!: Date

   @ApiProperty({
      type: UserSubscriptionReponse
   })
   subscriptions!: {
      plan: {
         id: string
      }
   }[]
}
