import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(configService: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: configService.getOrThrow<string>('POSTGRES_URI'),
    })
    super({ adapter })
  }
  private readonly logger = new Logger(PrismaService.name)

  async onModuleInit() {
   try {
      await this.$connect()
      this.logger.log("Database connection")
      
   } catch (error) {
      this.logger.error("Database error")
   }
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}