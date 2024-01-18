import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, Matches } from 'class-validator'
import { UniqueEmail } from '../validators/unique-email.validator'
import { UserPreferenceLanguage, UserPreferenceTheme } from '../entities/user.preference.entity'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @IsEmail() @UniqueEmail() @ApiProperty({ example: 'thiago@email.com' }) email: string
  @IsString() @ApiProperty({ example: 'Thiago' }) firstName: string
  @IsString() @ApiProperty({ example: 'Elias' }) lastName: string
  @IsString() @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/,
    {
      message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be between 8 and 30 characters long.'
    }) @ApiProperty({ example: '123456aB#' }) password: string
  @IsDateString() @ApiProperty({ example: '1989-05-09T17:57:34.000Z' }) birthDate: Date

  @IsString() @ApiProperty({ example: 'Brazil' }) country: string
  @IsString() @ApiProperty({ example: 'São José dos Campos' }) city: string
  @IsString() @ApiProperty({ example: 'São Paulo' }) state: string

  @IsEnum(UserPreferenceLanguage) @ApiProperty({ example: 'pt-br', enum: UserPreferenceLanguage }) language: string
  @IsEnum(UserPreferenceTheme) @IsOptional() @ApiProperty({ example: 'dark', enum: UserPreferenceTheme, default: 'default' }) theme?: string

  private static hashedPassword = 'asdh783dgasyd67atsd67atsd8as9dtas8'

  public static mock(): CreateUserDto {
    const data = {
      email: 'thiago@email.com',
      firstName: 'Thiago',
      lastName: 'Elias',
      password: CreateUserDto.hashedPassword,
      birthDate: new Date('1989-05-09T17:57:34.000Z'),
      country: 'Brazil',
      city: 'São José dos Campos',
      state: 'São Paulo',
      language: 'pt-br',
      theme: 'dark'
    }
    return Object.assign(new CreateUserDto(), data)
  }
}