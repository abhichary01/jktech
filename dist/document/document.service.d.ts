import { ConfigService } from '@nestjs/config';
export declare class DocumentService {
    private readonly configService;
    constructor(configService: ConfigService);
    uploadDocument(file: Express.Multer.File): Promise<string>;
    getDocumentUrl(fileName: string): Promise<string>;
    deleteDocument(fileName: string): Promise<void>;
    updateDocument(oldFileName: string, newFile: Express.Multer.File): Promise<string>;
}
