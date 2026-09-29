import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'
import { SearchStatusQueryDto } from 'src/common/dto/search-status-query.dto'

enum StatusEnum {
  en = 'en',
  dis = 'dis',
  all = 'all',
}

export class BarbersQueryDto extends SearchStatusQueryDto {
  @ApiProperty({
    description: 'Estado de Barbero',
    enum: StatusEnum,
    example: 'all',
    default: 'all',
  })
  @IsOptional()
  @IsBoolean({
    message:
      'el barberStatus debe ser uno de los siguientes valores = en, dis, all',
  })
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return null
    }

    if (value === 'en') return true
    if (value === 'dis') return false
    if (value === 'all') return null

    return value
  })
  barberStatus?: boolean | null = null
}
