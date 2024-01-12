import { Exclude } from 'class-transformer'

export class UserPreference {
  language: string
  theme: string
  @Exclude() createdAt: Date
  @Exclude() updatedAt: Date

  constructor(data: UserPreference) {
    Object.assign(this, data)
  }
}