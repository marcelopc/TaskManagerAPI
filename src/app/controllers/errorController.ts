import { type Request, type Response, type NextFunction } from 'express'
import { type ErrorException } from '@core/types/error'

export const handlerErrorAPI = async (err: ErrorException, req: Request, res: Response, next: NextFunction): Promise<any> => {
  return res.status(err.code).json({ message: err.message })
}

export default {
  handlerErrorAPI
}
