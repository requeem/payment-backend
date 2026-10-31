import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class RegisterUserDto {
   @ApiProperty({ example: 'John Doe', description: 'Имя пользователя' })
   @IsString()
   name!: string

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

export class RegisterResponse {
   success!: boolean
}
