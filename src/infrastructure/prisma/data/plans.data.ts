import { Plan } from '@prisma/client'

export const plans: Omit<Plan, 'createdAt' | 'updatedAt' | 'id'>[] = [
   {
      title: 'Базовый план',
      description: 'Описание базового плана',
      mountlyPrice: 9.99,
      yearlyPrice: 99.99,
      features: ['Feature 1', 'Feature 2'],
      isFeatured: false
   },
   {
      title: 'Профессиональный план',
      description: 'Описание профессионального плана',
      mountlyPrice: 19.99,
      yearlyPrice: 199.99,
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      isFeatured: true
   },
   {
      title: 'Премиум план',
      description: 'Описание премиум плана',
      mountlyPrice: 29.99,
      yearlyPrice: 299.99,
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
      isFeatured: true
   }
]
