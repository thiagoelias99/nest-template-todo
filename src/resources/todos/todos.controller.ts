import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { TodosService } from './todos.service'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { ToDo, ToDoList } from './todos.entity'
import { CreateTodoDto } from './dto/create-todo.dto'
import { AuthGuard, UserRequest } from '../../guards/auth.guard'
import { DeleteTodoDto } from './dto/delete-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'

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

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all todos from user' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ToDoList,
  })
  async findAll(@Req() req: UserRequest) {
    const { id: userId } = req.user
    return this.todosService.findAll(userId)
  }

  @Patch()
  @UseGuards(AuthGuard)
  // @UseGuards(TodoOwnerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a todo' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ToDo,
  })
  async update(@Body() data: UpdateTodoDto) {
    return this.todosService.update(data)
  }

  @Delete()
  @UseGuards(AuthGuard)
  // @UseGuards(TodoOwnerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  async delete(@Body() data: DeleteTodoDto) {
    return this.todosService.deleteById(data)
  }
}