import { Controller, Get, Param } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { PlanResponseDto } from './dto/plan.dto'
import { PlanService } from './plan.service'

@Controller('plan')
export class PlanController {
   public constructor(private readonly planService: PlanService) {}

   @ApiOperation({ summary: 'Получить все планы' })
   @ApiOkResponse({
      type: [PlanResponseDto],
      description: 'Список всех планов'
   })
   @Get('all')
   public async getAllPlans() {
      return await this.planService.getAllPlans()
   }

   @ApiOperation({ summary: 'Получить план по идентификатору' })
   @ApiOkResponse({
      type: PlanResponseDto,
      description: 'План по идентификатору'
   })
   @Get(':planId')
   public async getPlanById(@Param('planId') planId: string) {
      return await this.planService.getPlanById(planId)
   }
}
