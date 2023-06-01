import {
  type TaskReturn, type PayloadCreateTask,
  type PayloadGetAllTasks, type PayloadUpdateStatusTask, type PayloadUpdateUserTask,
  type SearchTask,
  type PayloadQuerySearchTask
} from '@core/types/task/taskTypes'
import { type TaskRepository } from '@core/types/task/taskRepository'
import { newError } from '@src/core/util/error'

export const createTask = async (payload: PayloadCreateTask, taskRepository: TaskRepository): Promise<TaskReturn> => {
  for (const key of Object.keys(payload)) {
    if (payload[key as keyof PayloadCreateTask] === '' || payload[key as keyof PayloadCreateTask] === undefined) {
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

export const getAllTasks = async (payload: PayloadGetAllTasks, taskRepository: TaskRepository): Promise<TaskReturn[]> => {
  if (payload.userId === '' || payload.userId === undefined) {
    throw newError(500, 'userId é obrigatário')
  }
  const tasks = await taskRepository.findAll({ userId: payload.userId })

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

export const updateTaskStatus = async (payload: PayloadUpdateStatusTask, taskRepository: TaskRepository): Promise<TaskReturn> => {
  if (payload.taskId === '' || payload.taskId === undefined) {
    throw newError(500, 'taskId é obrigatário')
  }

  const task = await taskRepository.findOne('id', payload.taskId)

  if (task === null) {
    throw newError(400, 'Task não encontrada')
  }

  const payloadUpdate = {
    completed: !task.completed
  }
  const updatedTask = await taskRepository.update('id', task.id, payloadUpdate)

  if (updatedTask === null) {
    throw newError(400, 'Task não encontrada')
  }

  return {
    id: updatedTask.id,
    title: updatedTask.title,
    description: updatedTask.description,
    completed: updatedTask.completed,
    createdAt: updatedTask.createdAt,
    updatedAt: updatedTask.updatedAt,
    userId: updatedTask.userId
  }
}

export const updateUserTask = async (payload: PayloadUpdateUserTask, taskRepository: TaskRepository): Promise<TaskReturn> => {
  for (const key of Object.keys(payload)) {
    if (payload[key as keyof PayloadUpdateUserTask] === '' || payload[key as keyof PayloadUpdateUserTask] === undefined) {
      throw newError(500, `${key} é obrigatário`)
    }
  }

  const task = await taskRepository.findOne('id', payload.taskId)

  if (task === null) {
    throw newError(400, 'Task não encontrada')
  }

  const payloadUpdate = {
    userId: payload.userId
  }
  const updatedTask = await taskRepository.update('id', task.id, payloadUpdate)

  if (updatedTask === null) {
    throw newError(400, 'Task não encontrada')
  }

  return {
    id: updatedTask.id,
    title: updatedTask.title,
    description: updatedTask.description,
    completed: updatedTask.completed,
    createdAt: updatedTask.createdAt,
    updatedAt: updatedTask.updatedAt,
    userId: updatedTask.userId
  }
}

export const search = async (payload: SearchTask, taskRepository: TaskRepository): Promise<TaskReturn[]> => {
  const query: PayloadQuerySearchTask = {
  }

  if (payload.title !== undefined) {
    query.title = payload.title
  }

  if (payload.completed !== undefined) {
    query.completed = payload.completed
  }

  if (payload.userId !== undefined) {
    query.userId = payload.userId
  }

  if (payload.createdAfter !== undefined) {
    query.createdAt = { $gte: payload.createdAfter }
  }
  if (payload.createdBefore !== undefined) {
    query.createdAt = { $lte: payload.createdBefore }
  }
  console.log(query)
  const tasks = await taskRepository.findAll(query)

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
  getAllTasks,
  updateTaskStatus,
  updateUserTask,
  search
}
