interface PayloadCreateTask {
  title: string
  description: string
  userId: string
}

interface CreatedTask {
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

export type {
  PayloadCreateTask,
  CreatedTask,
  PayloadGetAllTasks
}
