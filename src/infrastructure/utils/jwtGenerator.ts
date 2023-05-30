import { type JwtGenerator, type PayloadJwt } from '@core/types/jwtGenerator'
import jwt from 'jsonwebtoken'

export const jwtGenerator: JwtGenerator = {
  create: (payload: PayloadJwt): string => {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' })
    return token
  }
}
