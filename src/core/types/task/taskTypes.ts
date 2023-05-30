interface PayloadCreateTask {
  title: string
  description: string
  email?: string
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

interface PayloadTaskRepository {
  title: string
  description: string
  idUser?: string
}

export type {
  PayloadCreateTask,
  CreatedTask,
  PayloadTaskRepository
}
