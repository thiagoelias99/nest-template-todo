import { UserAddress } from './user-address.entity'
import { UserPreference } from './user.preference.entity'

export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public birthday: Date,
    public createdAt: Date,
    public updatedAt: Date
  ) { }

  address: UserAddress
  preferences: UserPreference
}