import { type TaskModel } from './taskModels'
import { type PayloadCreateTask } from './taskTypes'

export type Register = (payload: PayloadCreateTask) => Promise<TaskModel>
export type FindOne = (field: keyof TaskModel, value: string | Date) => Promise<TaskModel | null>
export type FindAll = (field: keyof TaskModel, value: string | Date) => Promise<TaskModel[]>
export type UpdateStatus = (taskId: string, completed: boolean) => Promise<TaskModel | null>

export interface TaskRepository {
  register: Register
  findOne: FindOne
  findAll: FindAll
  updateStatus: UpdateStatus
}
