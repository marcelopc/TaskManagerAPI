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

export type {
  PayloadCreateUserType,
  CreateUserType
}
