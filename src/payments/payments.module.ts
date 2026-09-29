import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { Services } from 'src/config/services'
import { envs } from 'src/config/envs'

import { PaymentsController } from './payments.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: Services.PAYMENTS_MS,
        transport: Transport.TCP,
        options: {
          host: envs.paymentsMsHost,
          port: envs.paymentsMsPort,
        },
      },
    ]),
  ],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
