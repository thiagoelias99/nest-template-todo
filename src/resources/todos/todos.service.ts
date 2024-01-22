import { Injectable } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { TodosRepository } from './todos.repository'

@Injectable()
export class TodosService {
  constructor(private readonly repository: TodosRepository) { }

  create(userId: string, data: CreateTodoDto) {
    return this.repository.create(userId, data)
  }
}
