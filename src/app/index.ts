import express from 'express'
import cors from 'cors'
import { type IDatabase } from '@infrastructure/database/types/databaseType'
import routes from '@app/routes'
const app = express()

export const start = async (port: number, uridatabase: string, database: IDatabase): Promise<void> => {
  try {
    app.listen(port)
    await database.connect(uridatabase)

    app.use(express.json())
    app.use(cors())
    app.use('/api', routes)

    console.log(`Server started on port ${port}!\n`)
  } catch (error) {
    process.exit(1)
  }
}

export default { start }
