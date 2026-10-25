import { ApiProperty } from '@nestjs/swagger'

export class PlanResponseDto {
   @ApiProperty({ example: '26ncCDFGEFddef', description: 'Идентификатор плана' })
   id!: string
   @ApiProperty({ example: 'Basic Plan', description: 'Название плана' })
   title!: string
   @ApiProperty({ example: 9.99, description: 'Месячная цена' })
   mountlyPrice!: number
   @ApiProperty({ example: 99.99, description: 'Годовая цена' })
   yearlyPrice!: number
   @ApiProperty({ example: ['Feature 1', 'Feature 2'], description: 'Особенности плана' })
   features!: string[]
   @ApiProperty({ example: 'Описание плана', description: 'Описание плана' })
   description!: string
   @ApiProperty({ example: true, description: 'Является ли план популярным' })
   isFeatured!: boolean
}
