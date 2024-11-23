import { Controller, Post, Body } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  // Trigger Ingestion Process
  @Post('trigger')
  async triggerIngestion(@Body() payload: any) {
    return this.ingestionService.triggerIngestion(payload);
  }
}
