import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

// Mocking the DynamoDB DocumentClient
jest.mock('aws-sdk');
jest.mock('uuid', () => ({ v4: jest.fn(() => 'mocked-uuid') }));

describe('UserService', () => {
  let userService: UserService;
  let dynamoDBMock: jest.Mocked<AWS.DynamoDB.DocumentClient>;

  beforeEach(() => {
    dynamoDBMock =
      new AWS.DynamoDB.DocumentClient() as jest.Mocked<AWS.DynamoDB.DocumentClient>;
    userService = new UserService();
    userService['dynamoDBClient'] = dynamoDBMock; // Inject mocked client
    userService['tableName'] = 'test_table'; // Test table name
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: any = {
        email: 'test@example.com',
        role: 'user',
        password: 'password',
      };

      // Mock DynamoDB response for put (user creation)
      dynamoDBMock.put.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValue({}),
      } as any);

      // Call the createUser method
      const result = await userService.createUser(createUserDto);

      // Check if the correct parameters are passed to the put method
      expect(dynamoDBMock.put).toHaveBeenCalledWith(
        expect.objectContaining({
          TableName: 'test_table',
          Item: expect.objectContaining({
            email: 'test@example.com',
            id: 'mocked-uuid', // The mocked UUID
            password: 'password',
            role: 'user',
          }),
          ConditionExpression: 'attribute_not_exists(id)',
        }),
      );

      // Ensure the returned result matches the created user object (without the id)
      expect(result).toEqual(expect.objectContaining(createUserDto));
    });
  });

  describe('findUserByEmail', () => {
    it('should return a user by email if exists', async () => {
      const email = 'test@example.com';
      const mockUser = {
        id: 'mocked-uuid',
        email,
        role: 'user',
        password: 'password',
      };

      // Mock the DynamoDB query to return the user
      dynamoDBMock.query.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValue({ Items: [mockUser] }),
      } as any);

      const result = await userService.findUserByEmail(email);

      expect(result).toEqual(mockUser);
      expect(dynamoDBMock.query).toHaveBeenCalledWith(
        expect.objectContaining({
          TableName: 'test_table',
          IndexName: 'EmailIndex',
          KeyConditionExpression: 'email = :email',
          ExpressionAttributeValues: {
            ':email': email,
          },
        }),
      );
    });

    it('should return null if user not found by email', async () => {
      const email = 'nonexistent@example.com';

      // Mock the DynamoDB query to return no items
      dynamoDBMock.query.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValue({ Items: [] }),
      } as any);

      const result = await userService.findUserByEmail(email);

      expect(result).toBeNull();
      expect(dynamoDBMock.query).toHaveBeenCalled();
    });
  });

  describe('updateUserRole', () => {
    it("should update a user's role", async () => {
      const userId = 'mocked-uuid';
      const newRole = 'admin';

      // Mock the DynamoDB update to return the updated attributes
      dynamoDBMock.update.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValue({
          Attributes: { id: userId, role: newRole },
        }),
      } as any);

      const result = await userService.updateUserRole(userId, newRole);

      expect(result).toEqual({ id: userId, role: newRole });
      expect(dynamoDBMock.update).toHaveBeenCalledWith(
        expect.objectContaining({
          TableName: 'test_table',
          Key: { id: userId },
          UpdateExpression: 'set role = :r',
          ExpressionAttributeValues: { ':r': newRole },
          ReturnValues: 'UPDATED_NEW',
        }),
      );
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [
        {
          id: 'mocked-uuid-1',
          email: 'user1@example.com',
          role: 'user',
          password: 'password1',
        },
        {
          id: 'mocked-uuid-2',
          email: 'user2@example.com',
          role: 'admin',
          password: 'password2',
        },
      ];

      // Mock the DynamoDB scan to return the list of users
      dynamoDBMock.scan.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValue({ Items: mockUsers }),
      } as any);

      const result = await userService.getAllUsers();

      expect(result).toEqual(mockUsers);
      expect(dynamoDBMock.scan).toHaveBeenCalledWith(
        expect.objectContaining({
          TableName: 'test_table',
        }),
      );
    });
  });
});
