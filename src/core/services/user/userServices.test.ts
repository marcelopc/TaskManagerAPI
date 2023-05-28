import userServices from './userServices'
import { type payloadCreateUserType, type createUserType } from '@core/types/userTypes'
import crypto from '@infrastructure/utils/crypt'

import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
dotenvExpand.expand(dotenv.config())

const date = new Date()
interface createUserDataBase {
  id: string
  nome: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}
const userDatabase: createUserType = {
  id: 'anyid',
  nome: 'anyname',
  email: 'anyemail',
  createdAt: date,
  updatedAt: date
}

const userModel = {
  register: async (payload: payloadCreateUserType): Promise<createUserDataBase> => {
    const user: createUserDataBase = {
      id: 'anyid',
      nome: payload.nome,
      email: payload.email,
      password: payload.password,
      createdAt: date,
      updatedAt: date
    }

    return user
  }
}

it('Retornando erro se não informar nome', async () => {
  const payload = {
    nome: '',
    email: 'anyemail',
    password: 'anypassword'
  }

  try {
    await userServices.createUser(payload, userModel, crypto)
  } catch (error) {
    expect(error).toEqual(new Error('nome, email e senha são obrigatários'))
  }
})

it('Retornando erro se não informar email', async () => {
  const payload = {
    nome: 'anyname',
    email: '',
    password: 'anypassword'
  }

  try {
    await userServices.createUser(payload, userModel, crypto)
  } catch (error) {
    expect(error).toEqual(new Error('nome, email e senha são obrigatários'))
  }
})

it('Retornando erro se não informar password', async () => {
  const payload = {
    nome: 'anyname',
    email: 'anyemail',
    password: ''
  }

  try {
    await userServices.createUser(payload, userModel, crypto)
  } catch (error) {
    expect(error).toEqual(new Error('nome, email e senha são obrigatários'))
  }
})

it('Retornando erro se informar password menor que 8 caracteres', async () => {
  const payload = {
    nome: 'anyname',
    email: 'anyemail',
    password: 'any'
  }

  try {
    await userServices.createUser(payload, userModel, crypto)
  } catch (error) {
    expect(error).toEqual(new Error('Senha deve ter pelo menos 8 caracteres'))
  }
})

it('Retornando erro se informar password maior que 20 caracteres', async () => {
  const payload = {
    nome: 'anyname',
    email: 'anyemail',
    password: 'anypasswordanypasswordanypasswordanypassword'
  }

  try {
    await userServices.createUser(payload, userModel, crypto)
  } catch (error) {
    expect(error).toEqual(new Error('Senha deve ter no máximo 20 caracteres'))
  }
})

it('Criando usuario com sucesso', async () => {
  const payload: payloadCreateUserType = {
    nome: 'anyname',
    email: 'anyemail',
    password: 'anypassword'
  }
  const user = await userServices.createUser(payload, userModel, crypto)
  expect(user).toEqual(userDatabase)
})
