import { Exclude } from 'class-transformer'

export class UserPreference {
  language: UserPreferenceLanguage
  theme: UserPreferenceTheme
  @Exclude() createdAt: Date
  @Exclude() updatedAt: Date

  constructor(data: UserPreference) {
    Object.assign(this, data)
  }
}

export enum UserPreferenceLanguage {
  EN = 'en',
  ES = 'es',
  PT_BR = 'pt-br'
}

export enum UserPreferenceTheme {
  DEFAULT = 'default',
  DARK = 'dark'
}