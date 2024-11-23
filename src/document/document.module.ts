import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { ConfigModule } from '@nestjs/config'; // If using environment variables

@Module({
  imports: [ConfigModule], // Add your DB models here
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
