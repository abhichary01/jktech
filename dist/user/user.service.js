"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const AWS = require("aws-sdk");
let UserService = class UserService {
    constructor() {
        this.tableName = process.env.DYNAMODB_TABLE;
        this.dynamoDBClient = new AWS.DynamoDB.DocumentClient();
    }
    async createUser(createUserDto) {
        const params = {
            TableName: this.tableName,
            Item: {
                id: (0, uuid_1.v4)(),
                ...createUserDto,
            },
            ConditionExpression: 'attribute_not_exists(id)',
        };
        await this.dynamoDBClient.put(params).promise();
        return createUserDto;
    }
    async findUserByEmail(email) {
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
    async updateUserRole(id, newRole) {
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
        return result.Attributes;
    }
    async deleteUser(id) {
        const deleteParams = {
            TableName: this.tableName,
            Key: { id },
            ConditionExpression: 'attribute_exists(id)',
        };
        try {
            await this.dynamoDBClient.delete(deleteParams).promise();
        }
        catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('User not found or failed to delete');
        }
    }
    async getAllUsers() {
        const params = {
            TableName: this.tableName,
        };
        const result = await this.dynamoDBClient.scan(params).promise();
        return result.Items;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map