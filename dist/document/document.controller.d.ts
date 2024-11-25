import { DocumentService } from './document.service';
export declare class DocumentController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    uploadFile(file: Express.Multer.File): Promise<string>;
    getDocument(fileName: string): Promise<string>;
    deleteFile(fileName: string): Promise<{
        message: string;
    }>;
}
