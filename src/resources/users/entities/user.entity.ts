import { Exclude } from 'class-transformer'
import { UserAddress } from './user-address.entity'
import { UserPreference } from './user.preference.entity'

export class User {
  id: string
  firstName: string
  lastName: string
  email: string
  @Exclude() password: string //Needs to use ClassSerializerInterceptor in app.module.ts
  birthday: Date
  createdAt: Date
  updatedAt: Date

  address: UserAddress
  preferences: UserPreference

  constructor(data: User) {
    Object.assign(this, data)
  }
}