import { type NextFunction, type Request, type Response } from 'express'
import { type CreateUserDto, type LoginUserDto } from '../dtos/user'
import userService from '@core/services/user/userServices'
import crypto from '@infrastructure/utils/crypt'
import { userRepository } from '@infrastructure/database/repository/userRepository'
import { jwtGenerator } from '@infrastructure/utils/jwtGenerator'

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const { email, password, nome }: CreateUserDto = req.body
    const payload = {
      email,
      password,
      nome
    }

    const user = await userService.createUser(payload, userRepository, crypto)
    return res.status(201).json({ user })
  } catch (error) {
    next(error)
    return undefined
  }
}

const login = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const { email, password }: LoginUserDto = req.body
    const payload = {
      email,
      password
    }

    const token = await userService.login(payload, userRepository, crypto, jwtGenerator)
    return res.status(201).json({ token })
  } catch (error) {
    next(error)
    return undefined
  }
}

export default {
  createUser,
  login
}
