import { type UserModel } from './userModel'
import { type PayloadCreateUserType } from './userTypes'

export type Register = (payload: PayloadCreateUserType) => Promise<UserModel>
export type FindOne = (field: keyof UserModel, value: string | Date) => Promise<UserModel | null>
export interface UserRepository {
  register: Register
  findOne: FindOne
}
