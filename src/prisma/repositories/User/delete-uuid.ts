import { PrismaService } from 'src/prisma/prisma-service.ts'
import { User } from 'src/resources/users/entities/user.entity'
import { userToEntityDto } from './dto/get-user'

export async function deleteUUidQuery(userId: string, prisma: PrismaService): Promise<unknown> {

  return await prisma.user.delete({
    where: {
      id: userId
    }
  })
}