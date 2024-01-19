import { Test, TestingModule } from '@nestjs/testing'
import { Controller, INestApplication, Post, UseGuards, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { useContainer } from 'class-validator'

import { AppModule } from '../app.module'
import { AuthGuard } from './auth.guard'
import { faker } from '@faker-js/faker'
import { JwtPayload } from 'src/resources/auth/auth.service'
import { JwtService } from '@nestjs/jwt'

@Controller('tests/guards')
class TestsController {

  @Post()
  @UseGuards(AuthGuard)
  async testRoute() {
    return { message: 'Test route Ok' }
  }
}

const tokenErrorMessage = 'Invalid JWT token'
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

describe('Guards Integration Tests', () => {
  let app: INestApplication
  let jwtService: JwtService

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TestsController],
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    useContainer(app.select(AppModule), { fallbackOnErrors: true })

    await app.init()

    jwtService = moduleFixture.get<JwtService>(JwtService)
  })

  describe('Auth Guard', () => {
    it('should return message if valid token is provided', async () => {
      // Arrange
      const payload: JwtPayload = {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.person.fullName()
      }

      const accessToken = await jwtService.sign(payload)
      // Act & Assert
      const response = await request(app.getHttpServer())
        .post('/tests/guards')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(201)

      expect(response.body).toEqual({ message: 'Test route Ok' })
    })

    it('should return error if no token is provided', async () => {
      // Act & Assert
      const response = await request(app.getHttpServer())
        .post('/tests/guards')
        .expect(401)

      expect(response.body.message).toEqual(tokenErrorMessage)
    })

    it('should return error if invalid token is provided', async () => {
      // Act & Assert
      const response = await request(app.getHttpServer())
        .post('/tests/guards')
        .set('Authorization', `Bearer ${invalidToken}`)
        .expect(401)

      expect(response.body.message).toEqual(tokenErrorMessage)
    })

    it('should return error if no Bearer token is provided', async () => {
      // Act & Assert
      const response = await request(app.getHttpServer())
        .post('/tests/guards')
        .set('Authorization', `${invalidToken}`)
        .expect(401)

      expect(response.body.message).toEqual(tokenErrorMessage)
    })
  })
})