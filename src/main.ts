import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  //Pipes configuration
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  //Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Planner API')
    .setDescription('The planner API description')
    .setVersion('1.0')
    .setContact('Thiago Elias', 'https://github.com/thiagoelias99', 'thiagoelias99@gamil.com')
    .setLicense('MIT', 'https://www.mit.edu/~amini/LICENSE.md')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
