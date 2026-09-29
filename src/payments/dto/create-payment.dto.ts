import { IsEnum, IsInt, IsNumber, IsString } from 'class-validator'
import { Type } from 'class-transformer'

import { PaymentType } from '../interfaces/payments-types'
import { PaymentStatus } from '../interfaces/payments-status'

export class CreatePaymentDto {
  @Type(() => Number)
  @IsInt()
  customerId: number

  @IsString()
  customerName: string

  @Type(() => Number)
  @IsNumber()
  amount: number

  @IsEnum(PaymentType)
  type: PaymentType

  @IsEnum(PaymentStatus)
  status: PaymentStatus

  @Type(() => Number)
  @IsInt()
  appointmentId: number
}
