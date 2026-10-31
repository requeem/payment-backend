import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class LoginUserDto {
   @ApiProperty({ example: 'john.doe@example.com', description: 'Email пользователя' })
   @IsEmail()
   @IsNotEmpty()
   email!: string

   @ApiProperty({ example: 'password123', description: 'Пароль пользователя' })
   @IsString()
   @IsNotEmpty()
   @MinLength(6)
   password!: string
}

export class LoginUserResponse {
   success!: boolean
}
