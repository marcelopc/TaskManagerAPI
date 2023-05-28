import { type Request, type Response } from 'express'
import { type CreateUserDto } from '../dtos/user'
import userService from '@core/services/userServices'

const createUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const { email, password, name }: CreateUserDto = req.body
    const user = await userService.createUser(email, password, name)
    return res.status(201).json({ user })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export default {
  createUser
}
