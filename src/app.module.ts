import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './resources/users/users.module'
import { AuthModule } from './resources/auth/auth.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports:
    [
      UsersModule,
      AuthModule,
      ConfigModule.forRoot({
        isGlobal: true
      }),
      JwtModule.registerAsync({
        useFactory: (configService: ConfigService) => {
          return {
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '72h' },
          }
        },
        inject: [ConfigService],
        global: true,
      })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
