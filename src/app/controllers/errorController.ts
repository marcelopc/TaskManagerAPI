import { type Request, type Response, type NextFunction } from 'express'
import { type ErrorException } from '@core/types/error'
import { newError } from '@core/util/error'

export const handlerErrorAPI = async (err: ErrorException, req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> => {
  if (err.code === null) {
    return res.status(500).json({ message: err.message === null ? err.message : 'Internal Server Error' })
  } else {
    return res.status(err.code).json({ message: err.message })
  }
}

export const handlerErrorNotFound = (req: Request, res: Response, next: NextFunction): void => {
  next(newError(404, 'Not Found'))
}
export default {
  handlerErrorAPI,
  handlerErrorNotFound
}
