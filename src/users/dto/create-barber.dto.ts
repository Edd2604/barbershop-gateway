import { Transform } from 'class-transformer'
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator'

import { CreateUserDto } from './create-user.dto'

export class CreateBarberDto extends CreateUserDto {
  @IsOptional()
  @IsString()
  img: string

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value)
        if (Array.isArray(parsed)) return parsed
      } catch {
        return [value]
      }
    }
    if (
      Array.isArray(value) &&
      typeof value[0] === 'string' &&
      value[0].startsWith('["')
    ) {
      try {
        const parsed = JSON.parse(value[0])
        if (Array.isArray(parsed)) return parsed
      } catch {
        //
      }
    }
    return value
  })
  @IsArray({ message: 'Las skills deben ser un array de strings' })
  @IsString({ each: true, message: 'Cada skill debe ser un string' })
  skills: string[]

  @IsString()
  description: string

  @Transform(({ value }) => value === 'true')
  @IsBoolean({ message: 'El campo isActiveBarber debe ser un valor booleano.' })
  @IsOptional()
  isActiveBarber: boolean
}
