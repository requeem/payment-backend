import { JwtAuthGuard } from '@/shared/guards'
import { UseGuards } from '@nestjs/common'

export const Protected = () => UseGuards(JwtAuthGuard)
