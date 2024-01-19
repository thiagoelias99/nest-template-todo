import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { useContainer } from 'class-validator'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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
  })

  describe('Auth Tests', () => {
    it('should reply if email or password is missing', async () => {
      const response = await request(app.getHttpServer())
        .post('/login')
        .expect(400)

      expect(response.body.message).toContain('email must be an email')
      expect(response.body.message).toContain('password must be a string')
    })

    it('should reply if email is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/login')
        .send({
          email: 'invalid_email',
          password: '123456Ab@',
        })
        .expect(400)

      expect(response.body.message).toContain('email must be an email')
    })

    it('should reply if password is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/login')
        .send({
          email: 'test@test.com',
          password: '123456',
        })
        .expect(400)

      expect(response.body.message).toContain('Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be between 8 and 30 characters long.')
    })

    it('should reply if credential are valid', async () => {
      await request(app.getHttpServer())
        .post('/login')
        .send({
          email: 'thiago@email.com',
          password: '123456aB!'
        })
        .expect(201)
    })
  })
})
