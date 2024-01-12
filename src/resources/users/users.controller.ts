import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/user.create.dto'

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('signup')
  async create(
    @Body() data: CreateUserDto
  ) {
    return this.usersService.create(data)
  }

  @Get('profile/:id')
  async getProfile(@Param('id') id: string) {
    return this.usersService.getProfile(id)
  }
}
