import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/modules/auth/guards'

export const Protected = () => UseGuards(JwtAuthGuard)
