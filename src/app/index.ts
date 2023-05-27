import express from 'express'
import { type IDatabase } from '@infrastructure/database/databaseType'
const app = express()

export const start = async (port: number, uridatabase: string, database: IDatabase): Promise<void> => {
  try {
    app.listen(port)
    await database.connect(uridatabase)
    console.log(`Server started on port ${port}!\n`)
  } catch (error) {
    process.exit(1)
  }
}

export default { start }
