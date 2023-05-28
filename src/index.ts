import dotenv from 'dotenv'
import Server from '@src/app'
import mongoDB from '@infrastructure/database/mongoDB'

import dotenvExpand from 'dotenv-expand'

dotenvExpand.expand(dotenv.config())

const PORT = parseInt(process.env.PORT as string)
const URIDATABASE = process.env.MONGO_URI as string

Server.start(PORT, URIDATABASE, mongoDB).finally(() => {})
