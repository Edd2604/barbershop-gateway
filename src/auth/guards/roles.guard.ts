import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { ROLES_KEY } from '../decorators/roles.decorator'
import { PUBLIC_KEY } from '../decorators/public.decorator'
import { UserRole } from '../interfaces/user-roles.interface'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) return true

    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    )

    if (requiredRoles.includes(UserRole.ADMINISTRADOR)) return true

    const { user } = context.switchToHttp().getRequest()

    const isValidRole = requiredRoles.includes(user.role)

    if (!isValidRole)
      throw new UnauthorizedException(
        'No tienes permisos para acceder a este recurso',
      )

    return isValidRole
  }
}
