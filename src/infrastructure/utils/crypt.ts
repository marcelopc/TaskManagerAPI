import crypto from 'crypto'

const hash = (text: string): string => crypto.createHmac('sha256', process.env.SECRET as string).update(text).digest('base64')

export default {
  hash
}
