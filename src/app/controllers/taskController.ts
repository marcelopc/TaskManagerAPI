import { type NextFunction, type Request, type Response } from 'express'
import { type CreateTaskDto } from '@app/dtos/task'
import taskServices from '@core/services/task/taskServices'
import { userRepository } from '@infrastructure/database/repository/userRepository'
import { taskRepository } from '@infrastructure/database/repository/taskRepository'

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (error) {

  }
}

const create = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const { title, description, email }: CreateTaskDto = req.body
    const payload = {
      title,
      description,
      email
    }

    const task = await taskServices.createTask(payload, userRepository, taskRepository)
    return res.status(201).json({ task })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (error) {

  }
}
const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (error) {

  }
}
const search = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (error) {

  }
}

export default {
  get,
  create,
  update,
  updateStatus,
  search
}
