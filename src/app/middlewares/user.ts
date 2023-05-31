import { type Request, type Response, type NextFunction } from 'express'
import userServices from '@core/services/user/userServices'
import { userRepository } from '@infrastructure/database/repository/userRepository'
import { jwtGenerator } from '@infrastructure/utils/jwtGenerator'

const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.token
    const tokenDecoded = jwtGenerator.decode(token as string)

    if (tokenDecoded !== null) {
      const user = await userServices.getUser(tokenDecoded.id, userRepository)
      next({ user })
    }
  } catch (error) {
    next(error)
  }
}

export default { get }
