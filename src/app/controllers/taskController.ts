import { type NextFunction, type Request, type Response } from 'express'
import { type CreateTaskDto, type QueryParamsSearchTask } from '@app/dtos/task'
import { type MiddlewareResponse } from '@app/dtos/middleware'
import taskServices from '@core/services/task/taskServices'
import userServices from '@core/services/user/userServices'
import { taskRepository } from '@infrastructure/database/repository/taskRepository'
import { userRepository } from '@infrastructure/database/repository/userRepository'
import { newError } from '@src/core/util/error'

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

const update = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const { taskId, userId } = req.params

    const user = await userServices.getUser(userId, userRepository)

    if (user === null) {
      throw newError(404, 'usuário não encontrado')
    }

    const task = await taskServices.updateUserTask({ taskId, userId }, taskRepository)

    return res.status(201).json({ task })
  } catch (error) {
    next(error)
  }
}
const updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const taskId = req.params.taskId

    const task = await taskServices.updateTaskStatus({ taskId }, taskRepository)
    return res.status(201).json({ task })
  } catch (error) {
    next(error)
  }
}
const search = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const { completed, createdAfter, createdBefore, title, userId } = req.query as QueryParamsSearchTask

    const payload = {
      completed,
      createdAfter,
      createdBefore,
      title,
      userId
    }
    const task = await taskServices.search(payload, taskRepository)

    return res.status(201).json({ task })
  } catch (error) {
    next(error)
  }
}

export default {
  get,
  create,
  update,
  updateStatus,
  search
}
