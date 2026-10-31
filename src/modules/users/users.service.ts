import { PrismaService } from '@/core/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
   constructor(private readonly prismaService: PrismaService) {}

   public async getUserById(id: string) {
      const user = await this.prismaService.user.findUnique({
         where: { id },
         include: {
            // transactions: true,
            subscriptions: {
               select: {
                  plan: {
                     select: {
                        id: true
                     }
                  }
               }
            }
         }
      })

      return user
   }
}
