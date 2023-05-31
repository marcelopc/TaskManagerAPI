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

export type {
  PayloadCreateTask,
  TaskReturn,
  PayloadGetAllTasks,
  PayloadUpdateStatusTask
}
