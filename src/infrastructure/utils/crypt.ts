import crypto from 'crypto'
import { type cryptoType } from './cryptoType'

const hash = (text: string): string => crypto.createHmac('sha256', process.env.SECRET as string).update(text).digest('base64')

const crypt: cryptoType = {
  hash
}

export default crypt
