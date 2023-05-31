import taskServices from './taskServices'
import { type CreatedTask } from '@core/types/task/taskTypes'
import { type TaskRepository } from '@core/types/task/taskRepository'
import { type TaskModel } from '@core/types/task/taskModels'

describe('Criar task', () => {
  const date = new Date()
  const task: CreatedTask = {
    id: 'anyid',
    title: 'anyTitle',
    description: 'anyDescription',
    completed: false,
    createdAt: date,
    updatedAt: date,
    userId: 'anyUserId'
  }
  const taskModel: TaskModel = {
    id: 'anyid',
    title: 'anyTitle',
    description: 'anyDescription',
    completed: false,
    createdAt: date,
    updatedAt: date,
    userId: 'anyUserId'
  }

  const taskRepository: TaskRepository = {
    register: async () => {
      return taskModel
    },
    findOne: async () => {
      return taskModel
    },
    findAll: async () => {
      return [taskModel]
    }
  }

  it('Deve retornar uma exceção caso não seja passado titulo', async () => {
    const payload = {
      title: '',
      description: 'anyDescription',
      userId: 'anyUserId'
    }
    await expect(taskServices.createTask(payload, taskRepository)).rejects.toThrow('title é obrigatário')
  })

  it('Deve retornar uma exceção caso não seja passado description', async () => {
    const payload = {
      title: 'anyTitle',
      description: '',
      userId: 'anyUserId'
    }
    await expect(taskServices.createTask(payload, taskRepository)).rejects.toThrow('description é obrigatário')
  })

  it('Deve retornar uma exceção caso não seja passado userId', async () => {
    const payload = {
      title: 'anyTitle',
      description: 'anyDescription',
      userId: ''
    }
    await expect(taskServices.createTask(payload, taskRepository)).rejects.toThrow('userId é obrigatário')
  })

  it('Deve criar uma nova task com sucesso com usuario', async () => {
    const payload = {
      title: 'anyTitle',
      description: 'anyDescription',
      userId: 'anyUserId'
    }
    await expect(taskServices.createTask(payload, taskRepository)).resolves.toEqual(task)
  })
})

describe('Buscando todas as tasks de um usuário', () => {
  const date = new Date()

  const taskModel: TaskModel = {
    id: 'anyid',
    title: 'anyTitle',
    description: 'anyDescription',
    completed: false,
    createdAt: date,
    updatedAt: date,
    userId: 'anyUserId'
  }

  const taskRepository: TaskRepository = {
    register: async () => {
      return taskModel
    },
    findOne: async () => {
      return taskModel
    },
    findAll: async () => {
      return [taskModel]
    }
  }

  it('Deve retornar uma exceção caso não seja passado userId', async () => {
    const payload = {
      userId: ''
    }
    await expect(taskServices.getAllTasks(payload, taskRepository)).rejects.toThrow('userId é obrigatário')
  })

  it('Deve retornar todas as tasks de um usuário', async () => {
    const payload = {
      userId: 'anyUserId'
    }
    await expect(taskServices.getAllTasks(payload, taskRepository)).resolves.toEqual([taskModel])
  })
})
