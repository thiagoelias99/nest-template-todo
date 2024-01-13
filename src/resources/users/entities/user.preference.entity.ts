import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'

export enum UserPreferenceLanguage {
  EN = 'en',
  ES = 'es',
  PT_BR = 'pt-br'
}

export enum UserPreferenceTheme {
  DEFAULT = 'default',
  DARK = 'dark'
}

export class UserPreference {
  @ApiProperty({ example: 'pt-br', enum: UserPreferenceLanguage}) language: UserPreferenceLanguage
  @ApiProperty({ example: 'default' }) theme: UserPreferenceTheme
  @Exclude() createdAt: Date
  @Exclude() updatedAt: Date
  @Exclude() id: string

  constructor(data: UserPreference) {
    Object.assign(this, data)
  }
}