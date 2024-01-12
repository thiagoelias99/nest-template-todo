import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma-service.ts'
import { CreateUserDto } from 'src/resources/users/dto/create-user.dto'
import { User } from 'src/resources/users/entities/user.entity'
import { UsersRepository } from 'src/resources/users/users.repository'
import { findByEmailQuery } from './find-by-email'
import { createUserQuery } from './create-user'
import { getProfileQuery } from './get-profile'
import { UpdateUserDto } from 'src/resources/users/dto/update-user.dto'
import { updateProfileQuery } from './update-profile'

@Injectable()
export class PrismaUserRepository extends UsersRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }
  async findByEmail(email: string): Promise<User> {
    return findByEmailQuery(email, this.prisma)
  }
  async create(data: CreateUserDto): Promise<string> {
    return createUserQuery(data, this.prisma)
  }

  async getProfile(userId: string): Promise<User> {
    return getProfileQuery(userId, this.prisma)
  }

  async updateProfile(userId: string, data: UpdateUserDto): Promise<void> {
    return updateProfileQuery(userId, data, this.prisma)
  }
}
