import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsInt, IsOptional, IsString } from 'class-validator'

import { AppointmentStatus } from '../interfaces/appointments-status'
import { PaymentType } from '../interfaces/payment-status.enum'

export class CreateAppointmentDto {
  @Type(() => Date)
  @IsDate()
  scheduledAt: Date

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  customerId: number

  @Type(() => Number)
  @IsInt()
  barberId: number

  @Type(() => Number)
  @IsInt()
  serviceId: number

  @IsEnum(AppointmentStatus)
  status: AppointmentStatus

  @IsEnum(PaymentType)
  paymentType: PaymentType

  @IsOptional()
  @IsString()
  notes: string
}
