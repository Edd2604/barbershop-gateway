import { IsEmail, IsString, Length } from 'class-validator'

export class SignInDto {
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  email: string

  @IsString()
  @Length(8, 20, {
    message: 'La contraseña debe tener entre 8 y 20 caracteres.',
  })
  password: string
}
