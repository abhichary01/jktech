import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto, UserRole } from './user.dto';

// Create the type for a mocked UserService.
jest.mock('./user.service');

describe('UserController', () => {
  let userController: UserController;
  let userService: jest.Mocked<UserService>; // Type userService as jest.Mocked

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(), // Mock the methods as jest functions
            updateUserRole: jest.fn(),
            deleteUser: jest.fn(),
            getAllUsers: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<jest.Mocked<UserService>>(UserService); // Correctly cast the userService
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        role: UserRole.ADMIN,
        id: '',
        name: '',
      };

      // Mock the userService.createUser method using mockResolvedValueOnce
      (userService.createUser as jest.Mock).mockResolvedValueOnce(
        createUserDto,
      );

      const result = await userController.createUser(createUserDto);

      expect(result).toEqual(createUserDto);
      expect(userService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });
});
