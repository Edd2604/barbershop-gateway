import { Transform } from 'class-transformer'
import {
  IsString,
  IsEmail,
  IsBoolean,
  Length,
  IsOptional,
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @Length(8, 8, { message: 'El DNI debe tener exactamente 8 caracteres.' })
  dni: string

  @IsString()
  @Length(2, 100, { message: 'El nombre debe tener entre 2 y 100 caracteres.' })
  name: string

  @IsString()
  @Length(2, 100, {
    message: 'El apellido debe tener entre 2 y 100 caracteres.',
  })
  lastName: string

  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  email: string

  @IsString()
  @Length(8, 20, {
    message: 'La contraseña debe tener entre 8 y 20 caracteres.',
  })
  password: string

  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value
    if (typeof value === 'string') return value.toLowerCase() === 'true'
    return false
  })
  @IsBoolean({ message: 'El campo isActive debe ser un valor booleano.' })
  @IsOptional()
  isActive: boolean
}
