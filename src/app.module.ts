import { Module } from '@nestjs/common'

import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { AppointmentsModule } from './appointments/appointments.module'
import { ServiceModule } from './services/services.module'
import { AnalyticsModule } from './analytics/analytics.module'
import { PaymentsModule } from './payments/payments.module'
import { CloudinaryModule } from './providers/cloudinary/cloudinary.module'

@Module({
  imports: [
    UsersModule,
    CloudinaryModule,
    AuthModule,
    AppointmentsModule,
    ServiceModule,
    AnalyticsModule,
    PaymentsModule,
  ],
})
export class AppModule {}
