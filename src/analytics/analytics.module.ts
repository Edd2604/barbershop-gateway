import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { Services } from 'src/config/services'
import { envs } from 'src/config/envs'

import { AnalyticsController } from './analytics.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: Services.ANALYTICS_MS,
        transport: Transport.TCP,
        options: {
          host: envs.analyticsMsHost,
          port: envs.analyticsMsPort,
        },
      },
    ]),
  ],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
