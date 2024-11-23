import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.validation';
import { DynamoDB } from 'aws-sdk';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config service globally available
      envFilePath: '.env', // Path to your .env file
      validationSchema: configValidationSchema, // Apply Joi validation
    }),
    AuthModule,
    UserModule,
    DocumentModule,
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [
    AppService,
    JwtService,
    UserService,
    AuthService,
    {
      provide: 'DYNAMODB_CLIENT',
      useFactory: (configService: ConfigService) => {
        return new DynamoDB.DocumentClient({
          region: configService.get<string>('AWS_REGION'),
          accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
          secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
