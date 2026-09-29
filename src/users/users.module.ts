import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { envs } from 'src/config/envs'
import { Services } from 'src/config/services'

import { UsersController } from './users.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: Services.USERS_MS,
        transport: Transport.TCP,
        options: { host: envs.usersMsHost, port: envs.usersMsPort },
      },
    ]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
