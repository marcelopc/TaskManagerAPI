import { type NextFunction, type Request, type Response } from 'express'
import { validator } from '@infrastructure/utils/validator'

export const bodyValidation = (req: Request, res: Response, next: NextFunction, schema: any): void => {
  try {
    validator(schema, req.body)
    next()
  } catch (error) {
    res.status(400).json({ error })
  }
}

export default { bodyValidation }
