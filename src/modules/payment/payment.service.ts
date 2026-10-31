import { PrismaService } from '@/core/database/prisma/prisma.service'
import { Injectable, NotFoundException } from '@nestjs/common'
import { BillingPeriod, TransactionProvider, User } from '@prisma/client'
import { plainToInstance } from 'class-transformer'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { StripeService } from './providers/stripe/stripe.service'
import { YoomoneyService } from './providers/yoomomey/yoomoney.service'

@Injectable()
export class PaymentService {
   public constructor(
      private readonly prismaService: PrismaService,
      private readonly yoomoneyService: YoomoneyService,
      private readonly stripeService: StripeService
   ) {}

   public async getHistory(user: User) {
      const history = await this.prismaService.transaction.findMany({
         where: {
            userId: user.id
         },
         orderBy: {
            createdAt: 'desc'
         },
         include: {
            subscription: {
               include: {
                  plan: true
               }
            }
         }
      })
      return history
   }

   public async createPayment(dto: CreatePaymentDto, user: User) {
      const { planId, provider, billingPeriod } = dto

      const plan = await this.prismaService.plan.findUnique({
         where: {
            id: planId
         }
      })

      if (!plan) {
         throw new NotFoundException('План не найден')
      }

      const amount = billingPeriod === BillingPeriod.YEARLY ? plan.yearlyPrice : plan.mountlyPrice

      const transaction = await this.prismaService.transaction.create({
         data: {
            amount,
            provider,
            billingPeriod,
            user: {
               connect: {
                  id: user.id
               }
            },
            subscription: {
               connectOrCreate: {
                  where: {
                     userId: user.id
                  },
                  create: {
                     user: {
                        connect: {
                           id: user.id
                        }
                     },
                     plan: {
                        connect: {
                           id: plan.id
                        }
                     }
                  }
               }
            }
         }
      })
      let payment
      switch (provider) {
         case TransactionProvider.YOOKASSA:
            payment = await this.yoomoneyService.create(plan, transaction, billingPeriod)
            break
         case TransactionProvider.STRIPE:
            payment = await this.stripeService.create(plan, transaction, user, billingPeriod)
            break
      }

      await this.prismaService.transaction.update({
         where: {
            id: transaction.id
         },
         data: {
            providerMeta: payment
         }
      })

      return payment
   }
}
