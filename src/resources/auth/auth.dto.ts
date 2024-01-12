import { PickType } from '@nestjs/mapped-types'
import { IsEmail } from 'class-validator'
import { CreateUserDto } from 'src/resources/users/dto/user.create.dto'

export class AuthDto extends PickType(CreateUserDto, ['password']) { 
    @IsEmail() email: string
}