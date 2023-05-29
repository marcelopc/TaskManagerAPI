import { type PayloadCreateUserType, type CreateUserType } from '@core/types/user/userTypes'
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

export default {
  createUser
}
