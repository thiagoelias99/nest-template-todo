import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | undefined>
  abstract create(data: CreateUserDto): Promise<string>
  abstract getProfile(userId: string): Promise<User>
  abstract updateProfile(userId: string, data: UpdateUserDto): Promise<void>
}