import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { Services } from 'src/config/services'
import { envs } from 'src/config/envs'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: Services.USERS_MS,
        transport: Transport.TCP,
        options: { host: envs.usersMsHost, port: envs.usersMsPort },
      },
    ]),
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
