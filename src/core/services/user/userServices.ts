import { type payloadCreateUserType, type createUserType } from '@core/types/userTypes'

const createUser = async (payload: payloadCreateUserType, userModel: any, crypter: any): Promise<createUserType> => {
  if (payload.nome === '' || payload.email === '' || payload.password === '') {
    throw new Error('nome, email e senha são obrigatários')
  }
  if (payload.password.length < 8) {
    throw new Error('Senha deve ter pelo menos 8 caracteres')
  }
  if (payload.password.length > 20) {
    throw new Error('Senha deve ter no máximo 20 caracteres')
  }

  // if (await outsideRegister.findOne({ where: { email: payload.email } })) {
  //   throw new Error('Email já cadastrado')
  // }

  const senha = await crypter.hash(payload.password)
  const databasePayload = {
    nome: payload.nome,
    email: payload.email,
    password: senha
  }
  const user = await userModel.register(databasePayload)

  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
}

export default {
  createUser
}
