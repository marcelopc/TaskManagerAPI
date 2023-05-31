import { type NextFunction, type Request, type Response } from 'express'
import { type CreateTaskDto } from '@app/dtos/task'
import { type MiddlewareResponse } from '@app/dtos/middleware'
import taskServices from '@core/services/task/taskServices'
import { userRepository } from '@infrastructure/database/repository/userRepository'
import { taskRepository } from '@infrastructure/database/repository/taskRepository'

const get = async (middlewareResponse: MiddlewareResponse, req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const userId = middlewareResponse.user?.id as string

    const tasks = await taskServices.getAllTasks({ userId }, taskRepository)
    return res.status(200).json({ tasks })
  } catch (error) {
    next(error)
  }
}

const create = async (middlewareResponse: MiddlewareResponse, req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const userId = middlewareResponse.user?.id as string
    const { title, description }: CreateTaskDto = req.body

    const payload = {
      title,
      description,
      userId
    }

    const task = await taskServices.createTask(payload, taskRepository)
    return res.status(201).json({ task })
  } catch (error) {
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
