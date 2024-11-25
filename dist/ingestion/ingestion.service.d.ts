import { HttpService } from '@nestjs/axios';
export declare class IngestionService {
    private readonly httpService;
    constructor(httpService: HttpService);
    triggerIngestion(payload: any): Promise<any>;
}
