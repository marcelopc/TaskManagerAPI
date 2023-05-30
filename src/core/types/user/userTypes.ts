interface PayloadCreateUserType {
  nome: string
  email: string
  password: string
}

interface CreateUserType {
  id: string
  nome: string
  email: string
  createdAt: Date
  updatedAt: Date
}

interface PayloadLogin {
  email: string
  password: string
}

export type {
  PayloadCreateUserType,
  CreateUserType,
  PayloadLogin
}
