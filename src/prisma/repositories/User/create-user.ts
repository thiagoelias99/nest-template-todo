import { PrismaService } from 'src/prisma/prisma-service.ts'
import { CreateUserDto } from 'src/resources/users/dto/user.create.dto'

export async function createUserQuery(data: CreateUserDto, prisma: PrismaService): Promise<string> {
  const userFromDb = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      birthDate: data.birthday,
      Address: {
        create: {
          country: data.country,
          city: data.city,
          state: data.state
        }
      },
      Preferences: {
        create: {
          language: data.language,
          theme: data.theme
        }
      }

    }
  })


  return userFromDb.id
}