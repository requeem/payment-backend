import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { BillingPeriod, Plan, Transaction, User } from '@prisma/client'
import Stripe from 'stripe'

@Injectable()
export class StripeService {
   private readonly stripe: Stripe

   public constructor(private readonly configService: ConfigService) {
      this.stripe = new Stripe(this.configService.getOrThrow<string>('STRIPE_SECRET_KEY'), {})
   }

   public async create(
      plan: Plan,
      transaction: Transaction,
      user: User,
      billingPeriod: BillingPeriod
   ) {
      const priceId =
         billingPeriod === BillingPeriod.MONTHLY
            ? plan.stripeMountlyPriceId
            : plan.stripeYearlyPriceId

      if (!priceId) {
         throw new BadRequestException('Stripe priceId not found')
      }

      const session = this.stripe.checkout.sessions.create({
         allowed_payment_method_types: ['card'],
         customer_email: user.email,
         line_items: [
            {
               price: priceId,
               quantity: 1
            }
         ],
         mode: 'subscription',
         success_url: 'https://google.com',
         cancel_url: 'http://localhost:3000'
      })

      return session
   }
}
