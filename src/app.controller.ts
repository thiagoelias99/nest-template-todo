import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Welcome')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({ summary: 'Read me' })
  getHello(): string {
    return `
    Welcome to the API of the project "Planner"!
    You can find the documentation at
    https://github.com/thiagoelias99/planner-nest
    `
  }
}
