import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/user.create.dto'
import { HashPasswordPipe } from './pipes/hash-password.pipe'
import { AuthGuard, UserRequest } from 'src/guards/auth.guard'

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('signup')
  async create(
    @Body() { password, ...data }: CreateUserDto,
    @Body('password', HashPasswordPipe) hashedPassword: string
  ) {
    return this.usersService.create({ ...data, password: hashedPassword })
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() req: UserRequest) {
    return this.usersService.getProfile(req.user.id)
  }
}
