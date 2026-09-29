import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { Services } from 'src/config/services'
import { envs } from 'src/config/envs'

import { ServicesController } from './services.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: Services.SERVICES_MS,
        transport: Transport.TCP,
        options: {
          host: envs.servicesMsHost,
          port: envs.servicesMsPort,
        },
      },
    ]),
  ],
  controllers: [ServicesController],
})
export class ServiceModule {}
