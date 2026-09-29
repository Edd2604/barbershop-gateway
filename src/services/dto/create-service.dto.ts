import { Transform, Type } from 'class-transformer'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'
export class CreateServiceDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @Type(() => Number)
  @IsNumber()
  price: number

  @IsString()
  @IsOptional()
  img: string

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  isActive: boolean
}
