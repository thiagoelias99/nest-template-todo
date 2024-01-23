import { PartialType } from '@nestjs/swagger'
import { CreateTodoDto } from './create-todo.dto'
import { IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { TodoExists } from '../validators/todo-exists.validator'

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsUUID() @TodoExists() id: string
  @IsBoolean() @IsOptional() completed?: boolean
}