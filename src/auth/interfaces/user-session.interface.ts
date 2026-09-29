import { UserRole } from './user-roles.interface'

export interface IUserSession {
  id: number
  username: string
  email: string
  role: UserRole
  userId: number
  image: string
  iat?: number
  exp?: number
}
