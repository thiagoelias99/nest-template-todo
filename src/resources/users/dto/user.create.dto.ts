import { IsDate, IsDateString, IsEmail, IsOptional, IsString } from 'class-validator'
import { UniqueEmail } from '../validators/unique-email.validator'

export class CreateUserDto {
  @IsEmail() @UniqueEmail() email: string
  @IsString() firstName: string
  @IsString() lastName: string
  @IsString() password: string
  @IsDateString() birthday: Date

  @IsString() country: string
  @IsString() @IsOptional() city?: string
  @IsString() @IsOptional() state?: string

  @IsString() @IsOptional() language?: string
  @IsString() @IsOptional() theme?: string
}