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
  const payload: PayloadCreateUserType = {
    nome: 'anyname',
    email: 'anyemail',
    password: 'anypassword'
  }
  const user = await userServices.createUser(payload, userModel, crypto)
  expect(user).toEqual(userDatabase)
})
