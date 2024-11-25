import { IngestionService } from './ingestion.service';
export declare class IngestionController {
    private readonly ingestionService;
    constructor(ingestionService: IngestionService);
    triggerIngestion(payload: any): Promise<any>;
}
