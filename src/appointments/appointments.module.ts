import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { envs } from 'src/config/envs'
import { Services } from 'src/config/services'

import { AppointmentsController } from './appointments.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: Services.APPOINTMENTS_MS,
        transport: Transport.TCP,
        options: {
          host: envs.appointmentsMsHost,
          port: envs.appointmentsMsPort,
        },
      },
    ]),
  ],
  controllers: [AppointmentsController],
})
export class AppointmentsModule {}
