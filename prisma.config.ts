import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'
export default defineConfig({
   schema: 'src/core/database/prisma/models',
   migrations: {
      path: 'src/core/database/prisma/migrations'
   },
   datasource: {
      url: env('POSTGRES_URI')
   }
})
