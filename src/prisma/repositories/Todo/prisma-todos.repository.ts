import { PrismaService } from '../../prisma-service.ts'
import { CreateTodoDto } from '../../../resources/todos/dto/create-todo.dto'
import { TodosRepository } from '../../../resources/todos/todos.repository'
import { createTodoQuery } from './create-todo'
import { Injectable } from '@nestjs/common'
import { deleteTodoQuery } from './delete-todo'
import { getTodoByIdQuery } from './get-by-id'
import { ToDo } from '../../../resources/todos/todos.entity'

@Injectable()
export class PrismaTodosRepository extends TodosRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async create(userId: string, data: CreateTodoDto): Promise<string> {
    return createTodoQuery(userId, data, this.prisma)
  }

  async findById(id: string): Promise<ToDo | null> {
    return getTodoByIdQuery(id, this.prisma)
  }

  async deleteById(id: string): Promise<void> {
    await deleteTodoQuery(id, this.prisma)
    return
  }
}