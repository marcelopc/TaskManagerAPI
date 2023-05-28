interface payloadCreateUserType {
  nome: string
  email: string
  password: string
}

interface createUserType {
  id: string
  nome: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export type {
  payloadCreateUserType,
  createUserType
}
