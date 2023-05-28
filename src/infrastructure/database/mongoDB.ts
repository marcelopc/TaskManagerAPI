import mongoose from 'mongoose'
import { type IDatabase } from './modelTypes/databaseType'

const connect = async (MONGO_URI: string): Promise<void> => {
  try {
    console.log('Tentando conectar com o mongoDB')

    await mongoose.connect(MONGO_URI)
    console.log('MongoDB Connected')
  } catch (error) {
    console.error('ERRO AO TERNTAR CONECTAR COM O MONGO', error)
    process.exit(1)
  }
}

const mongoDB: IDatabase = {
  connect
}

export default mongoDB
