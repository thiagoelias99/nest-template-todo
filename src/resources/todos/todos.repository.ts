import { CreateTodoDto } from './dto/create-todo.dto'
import { ToDo } from './todos.entity'

export abstract class TodosRepository {
  abstract create(userId: string, data: CreateTodoDto): Promise<string>
  abstract deleteById(id: string): Promise<void>
  abstract findById(id: string): Promise<ToDo | null>
}