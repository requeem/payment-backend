import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ApiModule } from '@/modules/api.module'
import { InfrastructureModule } from './infrastructure/infrastructure.module'

@Module({
   imports: [ConfigModule.forRoot({ isGlobal: true }), ApiModule, InfrastructureModule],
   controllers: [],
   providers: []
})
export class AppModule {}
