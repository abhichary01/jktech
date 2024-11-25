"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const config_1 = require("@nestjs/config");
const common_2 = require("@nestjs/common");
AWS.config.update({
    region: 'ap-south-1',
});
const s3 = new AWS.S3();
let DocumentService = class DocumentService {
    constructor(configService) {
        this.configService = configService;
    }
    async uploadDocument(file) {
        if (file.size > 5 * 1024 * 1024) {
            throw new common_2.BadRequestException('File size must be less than 5MB');
        }
        const bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
        const params = {
            Bucket: bucketName,
            Key: `documents/${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        try {
            const uploadResult = await s3.upload(params).promise();
            return uploadResult.Location;
        }
        catch (error) {
            console.error('Error uploading file to S3:', error);
            throw new Error('Failed to upload file to S3');
        }
    }
    async getDocumentUrl(fileName) {
        const bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
        const params = {
            Bucket: bucketName,
            Key: `documents/${fileName}`,
        };
        try {
            const file = await s3.getObject(params).promise();
            return file.Body.toString('utf-8');
        }
        catch (error) {
            console.error('Error fetching file:', error);
            throw new Error('Failed to retrieve file');
        }
    }
    async deleteDocument(fileName) {
        const bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
        const params = {
            Bucket: bucketName,
            Key: `documents/${fileName}`,
        };
        try {
            await s3.deleteObject(params).promise();
        }
        catch (error) {
            console.error('Error deleting file from S3:', error);
            throw new Error('Failed to delete file from S3');
        }
    }
    async updateDocument(oldFileName, newFile) {
        await this.deleteDocument(oldFileName);
        return this.uploadDocument(newFile);
    }
};
exports.DocumentService = DocumentService;
exports.DocumentService = DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DocumentService);
//# sourceMappingURL=document.service.js.map