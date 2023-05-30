export interface TaskModel {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
  userId: string | null
}
