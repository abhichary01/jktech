import { Module } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { IngestionController } from './ingestion.controller';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule from @nestjs/axios

@Module({
  imports: [HttpModule], // Add HttpModule to imports array
  controllers: [IngestionController],
  providers: [IngestionService],
})
export class AppModule {}
