import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { Services } from 'src/config/services'
import { catchError, firstValueFrom } from 'rxjs'
import { envs } from 'src/config/envs'

import { IUserSession } from './interfaces/user-session.interface'
import { SignInDto } from './dto/signIn.dto'

@Injectable()
export class AuthService {
  constructor(
    @Inject(Services.USERS_MS) private readonly userService: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async register() {}

  async signIn({ email, password }: SignInDto) {
    const user = await firstValueFrom(
      this.userService.send('get-user-by-email', { email }).pipe(
        catchError((e) => {
          throw new RpcException(e)
        }),
      ),
    )
    let roleId = 0
    if (user.role === 'ADMINISTRADOR' && user.Admin) {
      roleId = user.Admin.id
    } else if (user.role === 'CLIENTE' && user.Customer) {
      roleId = user.Customer.id
    } else if (user.role === 'BARBERO' && user.Barber) {
      roleId = user.Barber.id
    } else {
      throw new UnauthorizedException('El usuario no existe')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new UnauthorizedException('La contraseña es incorrecta')
    const payload: IUserSession = {
      id: roleId,
      username: user.name + ' ' + user.lastName,
      email: user.email,
      role: user.role,
      userId: user.id,
      image: user.Customer?.img ? user.Customer.img : 'PENDIENTE',
    }
    return {
      user: payload,
      tokens: {
        access: await this.jwtService.signAsync(payload, {
          secret: envs.jwtSecret,
          expiresIn: '1d',
        }),
        refresh: await this.jwtService.signAsync(payload, {
          secret: envs.jwtRefreshSecret,
          expiresIn: '7d',
        }),
      },
    }
  }

  async signOut() {}

  async refresh(user: IUserSession) {
    const payload: IUserSession = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      userId: user.userId,
      image: user.image,
    }
    return {
      access: await this.jwtService.signAsync(payload, {
        secret: envs.jwtSecret,
        expiresIn: '1d',
      }),
      refresh: await this.jwtService.signAsync(payload, {
        secret: envs.jwtRefreshSecret,
        expiresIn: '7d',
      }),
    }
  }
}
