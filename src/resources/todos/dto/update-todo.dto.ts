import { PartialType } from '@nestjs/swagger'
import { CreateTodoDto } from './create-todo.dto'
import { IsUUID } from 'class-validator'
import { TodoExists } from '../validators/todo-exists.validator'

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsUUID() @TodoExists() id: string
}