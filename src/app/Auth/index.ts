import { type Request, type Response, type NextFunction } from 'express'
import { jwtGenerator } from '@infrastructure/utils/jwtGenerator'
import { newError } from '@src/core/util/error'

export const Authenticator = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.token
    if (token === undefined || token === null) {
      throw newError(401, 'Unauthorized')
    }
    jwtGenerator.verify(token as string)
    next()
  } catch (error) {
    console.log(error)
    next(newError(401, 'Unauthorized'))
  }
}
