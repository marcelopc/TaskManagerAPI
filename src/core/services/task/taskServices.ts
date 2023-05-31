import { type CreatedTask, type PayloadCreateTask, type PayloadGetAllTasks } from '@core/types/task/taskTypes'
import { type TaskRepository } from '@core/types/task/taskRepository'
import { newError } from '@src/core/util/error'

export const createTask = async (payload: PayloadCreateTask, taskRepository: TaskRepository): Promise<CreatedTask> => {
  for (const key of Object.keys(payload)) {
    if (payload[key as keyof PayloadCreateTask] === '') {
      throw newError(500, `${key} é obrigatário`)
    }
  }

  const task = await taskRepository.register(payload)

  return {
    id: task.id,
    title: task.title,
    description: task.description,
    completed: task.completed,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    userId: task.userId
  }
}

export const getAllTasks = async (payload: PayloadGetAllTasks, taskRepository: TaskRepository): Promise<CreatedTask[]> => {
  if (payload.userId === '') {
    throw newError(500, 'userId é obrigatário')
  }
  const tasks = await taskRepository.findAll('userId', payload.userId)

  return tasks.map(task => ({
    id: task.id,
    title: task.title,
    description: task.description,
    completed: task.completed,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    userId: task.userId
  }))
}

export default {
  createTask,
  getAllTasks
}
