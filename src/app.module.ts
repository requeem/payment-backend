import { ApiModule } from '@/modules/api.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { CoreModule } from './core/core.module'
import { LibsModule } from './libs/libs.module'

@Module({
   imports: [ConfigModule.forRoot({ isGlobal: true }), CoreModule, ApiModule, LibsModule],
   controllers: [],
   providers: []
})
export class AppModule {}
