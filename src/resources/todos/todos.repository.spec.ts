import { Test } from '@nestjs/testing'
import { TodosRepository } from './todos.repository'
import { PrismaService } from '../../prisma/prisma-service.ts'
import { PrismaTodosRepository } from '../../prisma/repositories/Todo/prisma-todos.repository'
import { UsersRepository } from '../users/users.repository'
import { PrismaUserRepository } from '../../prisma/repositories/User/prisma-users.repository'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { CreateTodoDto } from './dto/create-todo.dto'

describe('Todos Repository', () => {
  let todosRepository: TodosRepository
  let userRepository: UsersRepository
  let userId: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          provide: TodosRepository,
          useClass: PrismaTodosRepository
        },
        {
          provide: UsersRepository,
          useClass: PrismaUserRepository
        }
      ],
    }).compile()

    todosRepository = moduleRef.get<TodosRepository>(TodosRepository)
    userRepository = moduleRef.get<UsersRepository>(UsersRepository)

    //Create a user to associate with the todo
    userId = await userRepository.create({ ...CreateUserDto.mock(), email: 'createTodo@test.com' })
  })

  afterAll(async () => {
    //Delete the user associated with the todo
    console.log('Deleting user with id: ', userId)
    await userRepository.deleteById(userId)
  })

  it('should be defined', () => {
    expect(todosRepository).toBeDefined()
    expect(userRepository).toBeDefined()
  })

  describe('create', () => {
    it('should create a todo in database and return a uuid', async () => {
      //Act
      const todoId = await todosRepository.create(userId, CreateTodoDto.getMock())
      //Assert
      expect(todoId).toBeTruthy()
      expect(todoId).toHaveLength(36)
    })
  })

  describe('deleteById', () => {
    it('should delete a todo in database', async () => {
      //Arrange
      const todoId = await todosRepository.create(userId, CreateTodoDto.getMock())
      //Act
      await expect(todosRepository.deleteById(todoId)).resolves.not.toThrow(Error)
      //Assert
      await expect(todosRepository.deleteById(todoId)).rejects.toThrow(Error)
    })

    it('should throw an error if todo does not exist', async () => {
      //Arrange
      const todoId = 'noExistingUuid'
      //Act Assert
      await expect(todosRepository.deleteById(todoId)).rejects.toThrow(Error)
    })
  })

  describe('findById', () => {
    it('should return a todo if id exists', async () => {
      //Arrange
      const mockTodo = CreateTodoDto.getMock()
      const todoId = await todosRepository.create(userId, mockTodo)
      //Act
      const todoFound = await todosRepository.findById(todoId)
      //Assert
      console.log('todoFound: ', todoFound)
      expect(todoFound).toBeTruthy()
      expect(todoFound.id).toBe(todoId)
      expect(todoFound.title).toBe(mockTodo.title)
      expect(todoFound.description).toBe(mockTodo.description)
      expect(todoFound.completed).toBe(false)
      expect(todoFound.date).toEqual(mockTodo.date)
      //Restore
      await expect(todosRepository.deleteById(todoId)).resolves.not.toThrow(Error)
    })

    it('should return null if id does not exist', async () => {
      //Arrange
      const todoId = 'noExistingUuid'
      //Act
      const todoFound = await todosRepository.findById(todoId)
      //Assert
      expect(todoFound).toBeNull()
    })
  })
})