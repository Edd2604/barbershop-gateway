import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional, IsInt, Min } from 'class-validator'

export class PaginatedQueryDto {
  @ApiPropertyOptional({
    description: 'Cantidad de resultados por página',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'El límite debe ser al menos 1' })
  @Transform(({ value }) => (value ? parseInt(value, 10) : 10))
  limit: number = 10

  @ApiPropertyOptional({
    description: 'Número de página',
    example: 1,
    default: 1,
  })
  @IsInt()
  @IsOptional()
  @Min(1, { message: 'La página debe ser al menos 1' })
  @Transform(({ value }) => (value ? parseInt(value, 10) : 1))
  page: number = 1
}
