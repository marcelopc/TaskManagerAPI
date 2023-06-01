import { type TaskModel } from './taskModels'
import { type PayloadCreateTask, type PaylaodUpdateTask } from './taskTypes'
import { type FilterQuery } from 'mongoose'

export type Register = (payload: PayloadCreateTask) => Promise<TaskModel>
export type FindOne = (field: keyof TaskModel, value: string | Date) => Promise<TaskModel | null>
export type FindAll = (filter: FilterQuery<TaskModel>) => Promise<TaskModel[]>
export type Update = (field: keyof TaskModel, value: string | Date, options: PaylaodUpdateTask) => Promise<TaskModel | null>

export interface TaskRepository {
  register: Register
  findOne: FindOne
  findAll: FindAll
  update: Update
}
