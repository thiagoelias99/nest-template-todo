import { Body, Controller, Post } from '@nestjs/common'
import { AuthService, AuthResponse } from './auth.service'
import { AuthDto } from './auth.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Login and receive JWT Token' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: AuthResponse,
  })
  async login(@Body() data: AuthDto) {
    return this.authService.login(data)
  }
}