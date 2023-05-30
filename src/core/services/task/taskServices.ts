import { type CreatedTask, type PayloadCreateTask, type PayloadTaskRepository } from '@core/types/task/taskTypes'
import { type TaskRepository } from '@core/types/task/taskRepository'
import { type UserRepository } from '@core/types/user/userRepository'
import { newError } from '@src/core/util/error'

export const createTask = async (payload: PayloadCreateTask, userRepository: UserRepository, taskRepository: TaskRepository): Promise<CreatedTask> => {
  if (payload.title === '') {
    throw newError(500, 'title é obrigatário')
  }
  if (payload.description === '') {
    throw newError(500, 'description é obrigatário')
  }

  let usuario = null

  if (payload.email !== undefined && payload.email !== '') {
    usuario = await userRepository.findOne('email', payload.email)

    if (usuario === null) {
      throw newError(400, 'usuário não existe')
    }
  }
  const payloadTask: PayloadTaskRepository = {
    title: payload.title,
    description: payload.description
  }

  if (usuario !== null) {
    payloadTask.idUser = usuario.id
  }

  const task = await taskRepository.register(payloadTask)

  return task
}

export default {
  createTask
}
