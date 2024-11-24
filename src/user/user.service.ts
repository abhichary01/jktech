import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk'; // DynamoDB setup

@Injectable()
export class UserService {
  private tableName = process.env.DYNAMODB_TABLE;
  private dynamoDBClient = new AWS.DynamoDB.DocumentClient();

  async createUser(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const params = {
      TableName: this.tableName,
      Item: {
        id: uuidv4(),
        ...createUserDto,
      },
      ConditionExpression: 'attribute_not_exists(id)',
    };

    await this.dynamoDBClient.put(params).promise();
    return createUserDto;
  }

  async findUserByEmail(email: string): Promise<Partial<User> | null> {
    const params = {
      TableName: this.tableName,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };

    const result = await this.dynamoDBClient.query(params).promise();
    return result.Items?.[0] || null;
  }

  async updateUserRole(id: string, newRole: string): Promise<User> {
    const params = {
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: 'set role = :r',
      ExpressionAttributeValues: {
        ':r': newRole,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    const result = await this.dynamoDBClient.update(params).promise();
    return result.Attributes as User;
  }

  async deleteUser(id: string): Promise<void> {
    const deleteParams: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: this.tableName,
      Key: { id }, // Key to identify the user
      ConditionExpression: 'attribute_exists(id)', // Ensure the user exists before deletion
    };

    try {
      await this.dynamoDBClient.delete(deleteParams).promise();
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('User not found or failed to delete');
    }
  }

  async getAllUsers(): Promise<User[]> {
    const params = {
      TableName: this.tableName,
    };

    const result = await this.dynamoDBClient.scan(params).promise();
    return result.Items as User[]; // Return list of users
  }
}
