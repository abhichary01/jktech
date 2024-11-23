import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs'; // To convert Observable to Promise

@Injectable()
export class IngestionService {
  constructor(private readonly httpService: HttpService) {}

  // Trigger Ingestion Process in Python Backend
  async triggerIngestion(payload: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.post('http://localhost:3001/ingestions', payload), //http://python-backend-api/ingest
      );
      return response.data; // Return the ingestion trigger response
    } catch (error) {
      throw new Error('Failed to trigger ingestion process: ' + error.message);
    }
  }
}
