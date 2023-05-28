import { type UserModel } from './userModel'
import { type PayloadCreateUserType } from './userTypes'

export interface UserRepository {
  register: (payload: PayloadCreateUserType) => Promise<UserModel>
}
