import { Test } from '@nestjs/testing'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { UserPreferenceLanguage, UserPreferenceTheme } from './entities/user.preference.entity'
import { UsersRepository } from './users.repository'

const hashedPassword = 'asdh783dgasyd67atsd67atsd8as9dtas8'

const signupData: CreateUserDto = {
  email: 'thiago@email.com',
  firstName: 'Thiago',
  lastName: 'Elias',
  password: hashedPassword,
  birthDate: new Date('1989-05-09T17:57:34.000Z'),
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
  birthDate: new Date('1989-05-09T17:57:34.000Z'),
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

describe('UsersService', () => {
  let usersService: UsersService
  let userRepository: UsersRepository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            create: jest.fn().mockResolvedValue('1'),
            findByEmail: jest.fn().mockResolvedValue(responseData),
            getProfile: jest.fn().mockResolvedValue(responseData),
            updateProfile: jest.fn().mockResolvedValue(responseData)
          },
        },
      ],
    }).compile()

    usersService = moduleRef.get<UsersService>(UsersService)
    userRepository = moduleRef.get<UsersRepository>(UsersRepository)
  })

  it('should be defined', () => {
    expect(usersService).toBeDefined()
    expect(userRepository).toBeDefined()
  })

  describe('create', () => {
    it('should create a user', async () => {
      //Act
      const result = await usersService.create(signupData)
      //Assert
      expect(result).toEqual(responseData)
      expect(userRepository.create).toHaveBeenCalledWith(signupData)
      expect(userRepository.create).toHaveBeenCalledTimes(1)
      expect(userRepository.create).toHaveReturnedTimes(1)
      expect(userRepository.getProfile).toHaveBeenCalledWith('1')
      expect(userRepository.getProfile).toHaveReturnedTimes(1)
      expect(userRepository.getProfile).toHaveReturnedTimes(1)
    })

    it('should throw an error when repository fails', () => {
      //Arrange
      jest.spyOn(userRepository, 'create').mockRejectedValueOnce(new Error())
      // Act & Assert
      expect(
        usersService.create(signupData))
        .rejects
        .toThrow(Error)

      expect(userRepository.create).toHaveBeenCalledWith(signupData)
      expect(userRepository.create).toHaveBeenCalledTimes(1)
      expect(userRepository.create).toHaveReturnedTimes(1)
      expect(userRepository.getProfile).toHaveReturnedTimes(0)
    })
  })

  describe('findByEmail', () => {
    it('should return a user', async () => {
      //Act
      const result = await usersService.findByEmail(signupData.email)
      //Assert
      expect(result).toEqual(responseData)
      expect(userRepository.findByEmail).toHaveBeenCalledWith(signupData.email)
      expect(userRepository.findByEmail).toHaveBeenCalledTimes(1)
      expect(userRepository.findByEmail).toHaveReturnedTimes(1)
    })

    it('should throw an error when repository fails', () => {
      //Arrange
      jest.spyOn(userRepository, 'findByEmail').mockRejectedValueOnce(new Error())
      // Act & Assert
      expect(
        usersService.findByEmail(signupData.email))
        .rejects
        .toThrow(Error)

      expect(userRepository.findByEmail).toHaveBeenCalledWith(signupData.email)
      expect(userRepository.findByEmail).toHaveBeenCalledTimes(1)
      expect(userRepository.findByEmail).toHaveReturnedTimes(1)
    })
  })

  describe('getProfile', () => {
    it('should return a user', async () => {
      //Act
      const result = await usersService.getProfile('1')
      //Assert
      expect(result).toEqual(responseData)
      expect(userRepository.getProfile).toHaveBeenCalledWith('1')
      expect(userRepository.getProfile).toHaveBeenCalledTimes(1)
      expect(userRepository.getProfile).toHaveReturnedTimes(1)
    })

    it('should throw an error when repository fails', () => {
      //Arrange
      jest.spyOn(userRepository, 'getProfile').mockRejectedValueOnce(new Error())
      // Act & Assert
      expect(
        usersService.getProfile('1'))
        .rejects
        .toThrow(Error)

      expect(userRepository.getProfile).toHaveBeenCalledWith('1')
      expect(userRepository.getProfile).toHaveBeenCalledTimes(1)
      expect(userRepository.getProfile).toHaveReturnedTimes(1)
    })
  })

  describe('updateProfile', () => {
    it('should return a user', async () => {
      //Act
      const result = await usersService.updateProfile('1', signupData)
      //Assert
      expect(result).toEqual(responseData)
      expect(userRepository.updateProfile).toHaveBeenCalledWith('1', signupData)
      expect(userRepository.updateProfile).toHaveBeenCalledTimes(1)
      expect(userRepository.updateProfile).toHaveReturnedTimes(1)
      expect(userRepository.getProfile).toHaveBeenCalledWith('1')
      expect(userRepository.getProfile).toHaveBeenCalledTimes(1)
      expect(userRepository.getProfile).toHaveReturnedTimes(1)
    })

    it('should throw an error when repository fails', () => {
      //Arrange
      jest.spyOn(userRepository, 'updateProfile').mockRejectedValueOnce(new Error())
      // Act & Assert
      expect(
        usersService.updateProfile('1', signupData))
        .rejects
        .toThrow(Error)

      expect(userRepository.updateProfile).toHaveBeenCalledWith('1', signupData)
      expect(userRepository.updateProfile).toHaveBeenCalledTimes(1)
      expect(userRepository.updateProfile).toHaveReturnedTimes(1)
    })
  })
})