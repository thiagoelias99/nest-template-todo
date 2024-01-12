import { Exclude } from 'class-transformer'

export class UserAddress {
  country: string
  city?: string
  state?: string
  @Exclude() createdAt: Date
  @Exclude() updatedAt: Date

  constructor(data: UserAddress) {
    Object.assign(this, data)
  }
}