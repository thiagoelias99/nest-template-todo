import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, Matches } from 'class-validator'
import { UniqueEmail } from '../validators/unique-email.validator'
import { UserPreferenceLanguage, UserPreferenceTheme } from '../entities/user.preference.entity'

export class CreateUserDto {
  @IsEmail() @UniqueEmail() email: string
  @IsString() firstName: string
  @IsString() lastName: string
  @IsString() @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/,
    {
      message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be between 8 and 30 characters long.'
    }) password: string
  @IsDateString() birthday: Date

  @IsString() country: string
  @IsString() city: string
  @IsString() state: string

  @IsEnum(UserPreferenceLanguage) language: string
  @IsEnum(UserPreferenceTheme) @IsOptional() theme?: string
}