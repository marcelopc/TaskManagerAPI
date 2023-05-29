import { type ErrorException } from '../types/error'

export const newError = (code: number, message: string): ErrorException => {
  const error: any = new Error(message)

  error.code = code
  return error
}
