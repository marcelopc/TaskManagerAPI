import { type TaskModel } from './taskModels'
import { type PayloadTaskRepository } from './taskTypes'

export type Register = (payload: PayloadTaskRepository) => Promise<TaskModel>
export type FindOne = (field: keyof TaskModel, value: string | Date) => Promise<TaskModel | null>

export interface TaskRepository {
  register: Register
  findOne: FindOne
}