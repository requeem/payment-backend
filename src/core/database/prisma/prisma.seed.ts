import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { plans } from './data/plans.data'

const connectionString = process.env.POSTGRES_URI

if (!connectionString) {
   throw new Error('POSTGRES_URI is not set')
}

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
   console.log('Seeding database...')
   await prisma.plan.createMany({ data: plans })
   console.log('Database seeded successfully')
}

main()
   .catch((error) => {
      console.error('Error seeding database', error)
      process.exitCode = 1
   })
   .finally(async () => {
      await prisma.$disconnect()
   })
