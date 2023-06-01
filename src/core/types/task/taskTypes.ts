interface PayloadCreateTask {
  title: string
  description: string
  userId: string
}

interface TaskReturn {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
  userId: string | null
}
interface PayloadGetAllTasks {
  userId: string
}
interface PayloadUpdateStatusTask {
  taskId: string
}
interface PayloadUpdateUserTask {
  userId: string
  taskId: string
}
interface PaylaodUpdateTask {
  title?: string
  description?: string
  completed?: boolean
  userId?: string
}
interface SearchTask {
  title?: string
  completed?: string
  createdAfter?: string
  createdBefore?: string
  userId?: string
}

interface PayloadQuerySearchTask {
  title?: string
  completed?: string
  createdAt?: object
  userId?: string
}

export type {
  PayloadCreateTask,
  TaskReturn,
  PayloadGetAllTasks,
  PayloadUpdateStatusTask,
  PaylaodUpdateTask,
  PayloadUpdateUserTask,
  SearchTask,
  PayloadQuerySearchTask
}
