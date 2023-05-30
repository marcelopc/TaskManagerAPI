interface CreateUserDto {
  nome: string
  email: string
  password: string
}

interface LoginUserDto {
  email: string
  password: string
}

export type { CreateUserDto, LoginUserDto }
