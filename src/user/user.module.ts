import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from '../auth/jwt.stratergy';
import { AuthModule } from 'src/auth/auth.module';
import { DynamoDB } from 'aws-sdk';

@Module({
  imports: [AuthModule],
  providers: [
    UserService,
    JwtStrategy,
    {
      provide: 'DYNAMODB_CLIENT',
      useFactory: () => {
        const dynamoDB = new DynamoDB.DocumentClient();
        return dynamoDB;
      },
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
