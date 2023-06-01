import taskServices from './taskServices'
import { type TaskReturn } from '@core/types/task/taskTypes'
import { type TaskRepository } from '@core/types/task/taskRepository'
import { type TaskModel } from '@core/types/task/taskModels'

describe('Criar task', () => {
  const date = new Date()
  const task: TaskReturn = {
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
    },
    update: async () => taskModel
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
    },
    update: async () => taskModel
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

describe('Atualizando status da task', () => {
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
    },
    update: async () => taskModel

  }

  it('Deve retornar uma exceção caso não seja passado userId', async () => {
    const payload = {
      taskId: ''
    }
    await expect(taskServices.updateTaskStatus(payload, taskRepository)).rejects.toThrow('taskId é obrigatário')
  })

  it('Deve retornar uma exceção caso não encontre a task', async () => {
    const payload = {
      taskId: 'anyTaskId'
    }
    const fakeTaskRepository = {
      ...taskRepository,
      findOne: async () => null
    }
    await expect(taskServices.updateTaskStatus(payload, fakeTaskRepository)).rejects.toThrow('Task não encontrada')
  })

  it('Deve retornar uma exceção caso não encontre a task no update', async () => {
    const payload = {
      taskId: 'anyTaskId'
    }
    const fakeTaskRepository = {
      ...taskRepository,
      update: async () => null
    }
    await expect(taskServices.updateTaskStatus(payload, fakeTaskRepository)).rejects.toThrow('Task não encontrada')
  })

  it('Deve retornar task atualizada', async () => {
    const payload = {
      taskId: 'anyTaskId'
    }
    await expect(taskServices.updateTaskStatus(payload, taskRepository)).resolves.toEqual(taskModel)
  })
})

describe('Atualizando usuario da task', () => {
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
    },
    update: async () => taskModel

  }

  it('Deve retornar uma exceção caso não seja passado userId', async () => {
    const payload = {
      taskId: '',
      userId: 'anyUserId'
    }
    await expect(taskServices.updateUserTask(payload, taskRepository)).rejects.toThrow('taskId é obrigatário')
  })

  it('Deve retornar uma exceção caso não seja passado userId', async () => {
    const payload = {
      taskId: 'anyTaskId',
      userId: ''
    }
    await expect(taskServices.updateUserTask(payload, taskRepository)).rejects.toThrow('userId é obrigatário')
  })

  it('Deve retornar uma exceção caso não encontre a task', async () => {
    const payload = {
      taskId: 'anyTaskId',
      userId: 'anyUserId'
    }
    const fakeTaskRepository = {
      ...taskRepository,
      findOne: async () => null
    }
    await expect(taskServices.updateUserTask(payload, fakeTaskRepository)).rejects.toThrow('Task não encontrada')
  })

  it('Deve retornar uma exceção caso não encontre a task no update', async () => {
    const payload = {
      taskId: 'anyTaskId',
      userId: 'anyUserId'
    }
    const fakeTaskRepository = {
      ...taskRepository,
      update: async () => null
    }
    await expect(taskServices.updateUserTask(payload, fakeTaskRepository)).rejects.toThrow('Task não encontrada')
  })

  it('Deve retornar task atualizada', async () => {
    const payload = {
      taskId: 'anyTaskId',
      userId: 'anyUserId'
    }
    await expect(taskServices.updateUserTask(payload, taskRepository)).resolves.toEqual(taskModel)
  })
})

describe('Search', () => {
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
    },
    update: async () => taskModel

  }
  it('Deve retornar task de acordo com a busca', async () => {
    const payload = {
      taskId: 'anyTaskId',
      userId: 'anyUserId'
    }
    await expect(taskServices.updateUserTask(payload, taskRepository)).resolves.toEqual(taskModel)
  })
})
