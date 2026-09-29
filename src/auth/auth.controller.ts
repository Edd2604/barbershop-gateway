import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { SignInDto } from './dto/signIn.dto'
import { UserSession } from './decorators/user-session.decorator'
import { IUserSession } from './interfaces/user-session.interface'
import { Auth } from './decorators/auth.decorator'
import { RefreshTokenGuard } from './guards/refresh.guard'
import { UserRole } from './interfaces/user-roles.interface'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  @ApiOperation({
    summary:
      'Inicia sesión y devuelve un token de acceso e información del usuario',
  })
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto)
  }

  @ApiBearerAuth()
  @Auth([UserRole.ADMINISTRADOR])
  @Get('/profile')
  @ApiOperation({
    summary: 'Obtiene información del usuario mediante el token de acceso',
  })
  getProfile(@UserSession() user: IUserSession) {
    if (!user) throw new BadRequestException('No se ha encontrado el usuario')
    return user
  }
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh-token')
  @ApiOperation({
    summary: 'Actualiza el token de acceso',
  })
  refreshToken(@Request() req) {
    return this.authService.refresh(req.user)
  }
}
