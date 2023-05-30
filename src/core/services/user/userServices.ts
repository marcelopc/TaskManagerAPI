import { type PayloadCreateUserType, type CreateUserType, type PayloadLogin } from '@core/types/user/userTypes'
import { type JwtGenerator } from '@core/types/jwtGenerator'
import { type UserRepository } from '@core/types/user/userRepository'

import { type Crypto } from '@core/types/crypto'
import { newError } from '@core/util/error'

const createUser = async (payload: PayloadCreateUserType, userModel: UserRepository, crypter: Crypto): Promise<CreateUserType> => {
  if (payload.nome === '' || payload.email === '' || payload.password === '') {
    throw newError(400, 'nome, email e senha são obrigatários')
  }
  if (payload.password.length < 8) {
    throw newError(400, 'Senha deve ter pelo menos 8 caracteres')
  }
  if (payload.password.length > 20) {
    throw newError(400, 'Senha deve ter no máximo 20 caracteres')
  }

  const user = await userModel.findOne('email', payload.email)

  if (user !== null) {
    throw newError(400, 'Email já cadastrado')
  }

  const senha = crypter.hash(payload.password)
  const databasePayload = {
    nome: payload.nome,
    email: payload.email,
    password: senha
  }
  const userCreated = await userModel.register(databasePayload)

  return {
    id: userCreated.id,
    nome: userCreated.nome,
    email: userCreated.email,
    createdAt: userCreated.createdAt,
    updatedAt: userCreated.updatedAt
  }
}

const login = async (payload: PayloadLogin, userModel: UserRepository, crypter: Crypto, jwtGenerator: JwtGenerator): Promise<string> => {
  if (payload.email === '' || payload.password === '') {
    throw newError(400, 'email e senha são obrigatários')
  }

  const usuario = await userModel.findOne('email', payload.email)

  if (usuario === null) {
    throw newError(400, 'email ou senha incorretos')
  }

  const passwordhashed = crypter.hash(payload.password)

  if (passwordhashed !== usuario.password) {
    throw newError(400, 'email ou senha incorretos')
  }

  const payloadToken = {
    id: usuario.id
  }
  const token = jwtGenerator.create(payloadToken)
  return token
}

export default {
  createUser,
  login
}
