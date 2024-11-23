import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get the ConfigService to access environment variables and DB config
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for my project')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT', // Optional, but helps clarify it's JWT
      description: 'Enter your JWT token in the format: "Bearer <JWT>"', // Optional description
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Set up global logging level (optional)
  const logger = new Logger('Bootstrap');
  logger.log('Application is starting...');

  app.enableCors();

  // Start the NestJS application on the port configured in .env or default
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port, () => {
    logger.log(`Application is running on: http://localhost:${port}`);
  });
}

bootstrap();
