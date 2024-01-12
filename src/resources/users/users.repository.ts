import { CreateUserDto } from './dto/user.create.dto'
import { User } from './entities/user.entity'

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | undefined>
  abstract create(data: CreateUserDto): Promise<string>
  abstract getProfile(userId: string): Promise<User>
}