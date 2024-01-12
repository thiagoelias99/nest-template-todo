import { InternalServerErrorException } from '@nestjs/common'
import { UserAddress } from 'src/resources/users/entities/user-address.entity'
import { User } from 'src/resources/users/entities/user.entity'
import { UserPreference } from 'src/resources/users/entities/user.preference.entity'

export function userToEntityDto(userFromDb: any): User {
  try {
    const { Address, Preferences, ...rest } = userFromDb

    const user: User = new User(
      {
        ...rest,
        address: new UserAddress({ ...Address }),
        preferences: new UserPreference({ ...Preferences })
      }
    )

    return user
  } catch (error) {
    throw new InternalServerErrorException(error)
  }
}