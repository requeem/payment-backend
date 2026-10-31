import { PrismaService } from '@/core/database/prisma/prisma.service'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class PlanService {
   public constructor(private readonly prismaService: PrismaService) {}

   public async getAllPlans() {
      const plans = await this.prismaService.plan.findMany({
         orderBy: {
            mountlyPrice: 'asc'
         },
         select: {
            id: true,
            title: true,
            mountlyPrice: true,
            yearlyPrice: true,
            features: true,
            description: true,
            isFeatured: true
         }
      })
      return plans
   }

   public async getPlanById(planId: string) {
      const plan = await this.prismaService.plan.findUnique({
         where: {
            id: planId
         },
         select: {
            id: true,
            title: true,
            mountlyPrice: true,
            yearlyPrice: true,
            features: true,
            description: true,
            isFeatured: true
         }
      })

      if (!plan) {
         throw new NotFoundException('Такого плана не существует')
      }
      return plan
   }
}
