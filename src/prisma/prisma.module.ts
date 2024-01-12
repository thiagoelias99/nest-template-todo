import { Module } from '@nestjs/common'
import { PrismaService } from './prisma-service.ts'

import { PrismaUserRepository } from './repositories/User/prisma-users.repository.js'
import { UsersRepository } from '../resources/users/users.repository.js'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUserRepository
    },
  ],
  exports: [
    PrismaService,
    UsersRepository
  ]
})
export class PrismaModule { }