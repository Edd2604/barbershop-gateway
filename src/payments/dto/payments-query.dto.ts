import { IsIn, IsOptional } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { PaginatedQueryDto } from 'src/common/dto/paginated-query.dto'

import { PaymentStatus } from '../interfaces/payments-status'
import { PaymentType } from '../interfaces/payments-types'

export class PaymentsQueryDto extends PaginatedQueryDto {
  @IsOptional()
  @IsIn([...Object.values(PaymentStatus), 'all'])
  @ApiPropertyOptional({
    enum: [...Object.values(PaymentStatus), 'all'],
    description: 'Estado del pago',
  })
  status: PaymentStatus | 'all'

  @IsOptional()
  @IsIn([...Object.values(PaymentType), 'all'])
  @ApiPropertyOptional({
    enum: [...Object.values(PaymentType), 'all'],
    description: 'Tipo de pago',
  })
  type: PaymentType | 'all'
}
