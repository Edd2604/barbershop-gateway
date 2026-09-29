import { IsOptional, IsString, Length } from 'class-validator'

import { CreateUserDto } from './create-user.dto'

export class CreateCustomerDto extends CreateUserDto {
  @IsOptional()
  @IsString()
  img: string

  @IsString()
  @Length(9, 9, { message: 'El número debe tener 9 caracteres.' })
  number: string
}
