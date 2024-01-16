import { Test } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { UserPreferenceLanguage, UserPreferenceTheme } from './entities/user.preference.entity'
import { UserRequest } from 'src/guards/auth.guard'

const hashedPassword = 'asdh783dgasyd67atsd67atsd8as9dtas8'

const signupData: CreateUserDto = {
  email: 'thiago@email.com',
  firstName: 'Thiago',
  lastName: 'Elias',
  password: hashedPassword,
  birthday: new Date('1989-05-09T17:57:34.000Z'),
  country: 'Brazil',
  city: 'São José dos Campos',
  state: 'São Paulo',
  language: 'pt-br',
  theme: 'dark'
}

const responseData: User = {
  id: '1',
  email: 'thiago@email.com',
  firstName: 'Thiago',
  lastName: 'Elias',
  birthday: new Date('1989-05-09T17:57:34.000Z'),
  password: hashedPassword,
  createdAt: new Date('2021-05-09T17:57:34.000Z'),
  updatedAt: new Date('2021-05-09T17:57:34.000Z'),
  address: {
    id: '1',
    country: 'Brazil',
    city: 'São José dos Campos',
    state: 'São Paulo',
    createdAt: new Date('2021-05-09T17:57:34.000Z'),
    updatedAt: new Date('2021-05-09T17:57:34.000Z')
  },
  preferences: {
    id: '1',
    language: UserPreferenceLanguage.PT_BR,
    theme: UserPreferenceTheme.DARK,
    createdAt: new Date('2021-05-09T17:57:34.000Z'),
    updatedAt: new Date('2021-05-09T17:57:34.000Z')
  }
}

const userRequestData = {
  user: {
    id: '1',
    name: 'Thiago Elias',
    email: 'thiagoelias99@gmail.com'
  }
}

describe('UsersController', () => {
  let usersController: UsersController
  let usersService: UsersService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(responseData),
            findByEmail: jest.fn().mockResolvedValue(responseData),
            getProfile: jest.fn().mockResolvedValue(responseData),
            updateProfile: jest.fn().mockResolvedValue(responseData)
          },
        },
      ],
      imports: [
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
      ]
    }).compile()

    usersController = moduleRef.get<UsersController>(UsersController)
    usersService = moduleRef.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(usersController).toBeDefined()
    expect(usersService).toBeDefined()
  })

  describe('signup', () => {
    it('should return an object containing user data when successful', async () => {
      // Arrange
      jest.spyOn(usersService, 'create')

      // Act
      const result = await usersController.create(signupData, hashedPassword)

      // Assert
      expect(result).toEqual(responseData)
      expect(usersService.create).toHaveBeenCalledTimes(1)
      expect(usersService.create).toHaveReturnedTimes(1)
    })

    it('should throw an error when service fails', () => {
      jest.spyOn(usersService, 'create').mockRejectedValueOnce(new Error())

      // Act & Assert
      expect(
        usersController.create(signupData, hashedPassword))
        .rejects
        .toThrow(Error)

      expect(usersService.create).toHaveBeenCalledWith(signupData)
      expect(usersService.create).toHaveBeenCalledTimes(1)
      expect(usersService.create).toHaveReturnedTimes(1)
    })
  })

  describe('get profile', () => {
    it('should return an object containing user data when successful', async () => {
      // Arrange

      // Act
      const result = await usersController.getProfile(userRequestData as UserRequest)

      // Assert
      expect(result).toEqual(responseData)
      expect(usersService.getProfile).toHaveBeenCalledTimes(1)
      expect(usersService.getProfile).toHaveReturnedTimes(1)
    })

    it('should throw an error when service fails', () => {
      jest.spyOn(usersService, 'getProfile').mockRejectedValueOnce(new Error())

      // Act & Assert
      expect(
        usersController.getProfile(userRequestData as UserRequest))
        .rejects
        .toThrow(Error)

      expect(usersService.getProfile).toHaveBeenCalledTimes(1)
      expect(usersService.getProfile).toHaveReturnedTimes(1)
    })
  })

  describe('patch profile', () => {
    it('should return an object containing user data when successful', async () => {
      // Arrange

      // Act
      const result = await usersController.updateProfile(userRequestData as UserRequest, signupData)

      // Assert
      expect(result).toEqual(responseData)
      expect(usersService.updateProfile).toHaveBeenCalledTimes(1)
      expect(usersService.updateProfile).toHaveReturnedTimes(1)
    })

    it('should throw an error when service fails', () => {
      jest.spyOn(usersService, 'updateProfile').mockRejectedValueOnce(new Error())

      // Act & Assert
      expect(
        usersController.updateProfile(userRequestData as UserRequest, signupData))
        .rejects
        .toThrow(Error)

      expect(usersService.updateProfile).toHaveBeenCalledTimes(1)
      expect(usersService.updateProfile).toHaveReturnedTimes(1)
    })
  })
})