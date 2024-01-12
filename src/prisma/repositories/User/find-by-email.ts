import { PrismaService } from 'src/prisma/prisma-service.ts'
import { User } from 'src/resources/users/entities/user.entity'

export async function findByEmailQuery(email: string, prisma: PrismaService): Promise<User | null> {
  const userFromDb = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!userFromDb) {
    return null
  }

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

  return user
}