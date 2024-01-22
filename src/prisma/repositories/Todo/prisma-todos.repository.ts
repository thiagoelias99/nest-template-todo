import { PrismaService } from '../../prisma-service.ts'
import { CreateTodoDto } from '../../../resources/todos/dto/create-todo.dto'
import { TodosRepository } from '../../../resources/todos/todos.repository'
import { createTodoQuery } from './create-todo'
import { Injectable } from '@nestjs/common'
import { deleteTodoQuery } from './delete-todo'
import { getTodoByIdQuery } from './get-by-id'
import { ToDo, ToDoList } from '../../../resources/todos/todos.entity.js'
import { UpdateTodoDto } from 'src/resources/todos/dto/update-todo.dto.js'
import { DeleteTodoDto } from 'src/resources/todos/dto/delete-todo.dto.js'

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

  async deleteById(data: DeleteTodoDto): Promise<void> {
    await deleteTodoQuery(data.id, this.prisma)
    return
  }

  async findAll(userId: string): Promise<ToDoList> {
    throw new Error('Method not implemented.')
  }
  async update(data: UpdateTodoDto): Promise<ToDo> {
    throw new Error('Method not implemented.')
  }
}