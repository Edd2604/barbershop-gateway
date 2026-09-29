import { SetMetadata } from '@nestjs/common'

import { UserRole } from '../interfaces/user-roles.interface'
export const ROLES_KEY = 'ROLES'
export const Roles = (role: UserRole[]) => SetMetadata(ROLES_KEY, role)
