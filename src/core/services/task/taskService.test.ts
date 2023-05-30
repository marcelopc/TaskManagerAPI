import taskServices from './taskServices'
import { type PayloadCreateUserType } from '@core/types/user/userTypes'
import { type UserModel } from '@core/types/user/userModel'
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
  const taskWithoutUser: TaskModel = {
    id: 'anyid',
    title: 'anyTitle',
    description: 'anyDescription',
    completed: false,
    createdAt: date,
    updatedAt: date,
    userId: null
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
  const userRepository = {
    register: async (payload: PayloadCreateUserType): Promise<UserModel> => {
      const user: UserModel = {
        id: 'anyid',
        nome: payload.nome,
        email: payload.email,
        password: 'payload.password',
        createdAt: date,
        updatedAt: date
      }

      return user
    },
    findOne: async (field: keyof UserModel, value: string | Date): Promise<UserModel | null> => {
      const user: UserModel = {
        id: 'anyid',
        nome: 'anynome',
        email: 'anyemail',
        password: 'ui2peJzOrq73BJr7uzNt2TTggrMDOBmmNa3Vbah7kKk=',
        createdAt: date,
        updatedAt: date
      }

      return user
    }
  }

  const taskRepository: TaskRepository = {
    register: async () => {
      return taskModel
    },
    findOne: async () => {
      return taskModel
    }
  }

  it('Deve retornar uma exceção caso não seja passado titulo', async () => {
    const payload = {
      title: '',
      description: 'anyDescription',
      email: 'anyUserId'
    }
    await expect(taskServices.createTask(payload, userRepository, taskRepository)).rejects.toThrow('title é obrigatário')
  })

  it('Deve retornar uma exceção caso não seja passado description', async () => {
    const payload = {
      title: 'anyTitle',
      description: '',
      email: 'anyUserId'
    }
    await expect(taskServices.createTask(payload, userRepository, taskRepository)).rejects.toThrow('description é obrigatário')
  })

  it('Deve retornar uma exceção caso userId não exista no  banco de dados', async () => {
    const payload = {
      title: 'anyTitle',
      description: 'anyDescription',
      email: 'wrognemail'
    }
    const fakeUserRepository = {
      ...userRepository,
      findOne: async (field: keyof UserModel, value: string | Date): Promise<UserModel | null> => null
    }
    await expect(taskServices.createTask(payload, fakeUserRepository, taskRepository)).rejects.toThrow('usuário não existe')
  })

  it('Deve criar uma nova task com sucesso com usuario', async () => {
    const payload = {
      title: 'anyTitle',
      description: 'anyDescription',
      email: 'anyemail'
    }
    await expect(taskServices.createTask(payload, userRepository, taskRepository)).resolves.toEqual(task)
  })

  it('Deve criar uma nova task com sucesso sem usuario', async () => {
    const payload = {
      title: 'anyTitle',
      description: 'anyDescription',
      email: 'anyemail'
    }

    const fakeTaskRepository: TaskRepository = {
      ...taskRepository,
      register: async () => taskWithoutUser
    }

    await expect(taskServices.createTask(payload, userRepository, fakeTaskRepository)).resolves.toEqual(taskWithoutUser)
  })
})
