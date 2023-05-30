import crypto from 'crypto'
import { type Crypto } from '@core/types/crypto'

const hash = (text: string): string => crypto.createHmac('sha256', process.env.ENCRYPT_SECRET as string).update(text).digest('base64')
const uuid = (): string => crypto.randomUUID()

const crypt: Crypto = {
  hash,
  uuid
}

export default crypt
