import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { TodosService } from './todos.service'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { ToDo } from './todos.entity'
import { CreateTodoDto } from './dto/create-todo.dto'
import { AuthGuard, UserRequest } from '../../guards/auth.guard'

@Controller('todos')
@ApiTags('Todo')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: ToDo,
  })
  async create(@Req() req: UserRequest, @Body() data: CreateTodoDto) {
    const { id: userId } = req.user
    return this.todosService.create(userId, data)
  }
}
