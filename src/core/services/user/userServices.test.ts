import userServices from './userServices'
import { type PayloadCreateUserType, type CreateUserType } from '@core/types/user/userTypes'
import { type UserModel } from '@core/types/user/userModel'
import crypto from '@infrastructure/utils/crypt'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
dotenvExpand.expand(dotenv.config())

const date = new Date()

const userDatabase: CreateUserType = {
  id: 'anyid',
  nome: 'anyname',
  email: 'anyemail',
  createdAt: date,
  updatedAt: date
}

const userModel = {
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

const fakeUserModel = {
  register: async (payload: PayloadCreateUserType): Promise<UserModel> => {
    const user: UserModel = {
      id: 'anyid',
      nome: payload.nome,
      email: payload.email,
      password: payload.password,
      createdAt: date,
      updatedAt: date
    }

    return user
  },
  findOne: async (field: keyof UserModel, value: string | Date): Promise<UserModel | null> => null
}

describe('createUser', () => {
  it('Retornando erro se não informar nome', async () => {
    const payload = {
      nome: '',
      email: 'anyemail',
      password: 'anypassword'
    }
    await expect(userServices.createUser(payload, userModel, crypto)).rejects.toThrow('nome, email e senha são obrigatários')
  })

  it('Retornando erro se não informar email', async () => {
    const payload = {
      nome: 'anyname',
      email: '',
      password: 'anypassword'
    }
    await expect(userServices.createUser(payload, userModel, crypto)).rejects.toThrow('nome, email e senha são obrigatários')
  })

  it('Retornando erro se não informar password', async () => {
    const payload = {
      nome: 'anyname',
      email: 'anyemail',
      password: ''
    }
    await expect(userServices.createUser(payload, userModel, crypto)).rejects.toThrow('nome, email e senha são obrigatários')
  })

  it('Retornando erro se informar password menor que 8 caracteres', async () => {
    const payload = {
      nome: 'anyname',
      email: 'anyemail',
      password: 'any'
    }
    await expect(userServices.createUser(payload, userModel, crypto)).rejects.toThrow('Senha deve ter pelo menos 8 caracteres')
  })

  it('Retornando erro se informar password maior que 20 caracteres', async () => {
    const payload = {
      nome: 'anyname',
      email: 'anyemail',
      password: 'anypasswordanypasswordanypasswordanypassword'
    }
    await expect(userServices.createUser(payload, userModel, crypto)).rejects.toThrow('Senha deve ter no máximo 20 caracteres')
  })

  it('Criando usuario com sucesso', async () => {
    const payload: PayloadCreateUserType = {
      nome: 'anyname',
      email: 'anyemail',
      password: 'anypassword'
    }
    const user = await userServices.createUser(payload, fakeUserModel, crypto)
    expect(user).toEqual(userDatabase)
  })
})

describe('loginUser', () => {
  it('Retornando token com sucesso', async () => {
    const payload = {
      email: 'anyemail',
      password: 'anypassword'
    }
    const token = await userServices.login(payload, userModel, crypto)
    expect(token).toEqual('anytoken')
  })
  it('Retornando erro se não informar email', async () => {
    const payload = {
      email: '',
      password: 'anypassword'
    }
    await expect(userServices.login(payload, userModel, crypto)).rejects.toThrow('email e senha são obrigatários')
  })
  it('Retornando erro se não informar senha', async () => {
    const payload = {
      email: 'anyemail',
      password: ''
    }
    await expect(userServices.login(payload, userModel, crypto)).rejects.toThrow('email e senha são obrigatários')
  })

  it('Retornando erro se não encontrar usuario', async () => {
    const payload = {
      email: 'anyemail',
      password: 'anypassword'
    }
    await expect(userServices.login(payload, fakeUserModel, crypto)).rejects.toThrow('email ou senha incorretos')
  })

  it('Retornando erro se password for incorreto', async () => {
    const payload = {
      email: 'anyemail',
      password: 'wrongpassword'
    }
    await expect(userServices.login(payload, userModel, crypto)).rejects.toThrow('email ou senha incorretos')
  })
})
