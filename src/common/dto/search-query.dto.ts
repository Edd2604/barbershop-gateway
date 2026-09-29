import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

import { PaginatedQueryDto } from './paginated-query.dto'

export class SearchQueryDto extends PaginatedQueryDto {
  @ApiProperty({ description: 'Texto de búsqueda', example: '' })
  @IsOptional()
  @IsString()
  query?: string = ''
}
