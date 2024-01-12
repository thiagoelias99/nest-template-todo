import { InternalServerErrorException } from '@nestjs/common'
import { UserAddress } from 'src/resources/users/entities/user-address.entity'
import { User } from 'src/resources/users/entities/user.entity'
import { UserPreference } from 'src/resources/users/entities/user.preference.entity'

export function userToEntityDto(userFromDb: any): User {
  try {
    const user: User = new User(
      userFromDb.id,
      userFromDb.firstName,
      userFromDb.lastName,
      userFromDb.email,
      userFromDb.password,
      userFromDb.birthDate,
      userFromDb.createdAt,
      userFromDb.updatedAt
    )

    user.address = new UserAddress(
      userFromDb.Address.country,
      userFromDb.Address.createdAt,
      userFromDb.Address.updatedAt,
    )

    user.address.city = userFromDb.Address.city
    user.address.state = userFromDb.Address.state

    user.preferences = new UserPreference(
      userFromDb.Preferences.language,
      userFromDb.Preferences.createdAt,
      userFromDb.Preferences.updatedAt
    )

    user.preferences.theme = userFromDb.Preferences.theme

    return user
  } catch (error) {
    throw new InternalServerErrorException(error)
  }

}