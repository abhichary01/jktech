import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
// import * as multer from 'multer';
// import * as multerS3 from 'multer-s3';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';

// S3 configuration
AWS.config.update({
  region: 'us-east-1', // Change region as needed
});

const s3 = new AWS.S3();

@Injectable()
export class DocumentService {
  constructor(private readonly configService: ConfigService) {}

  // Upload Document
  async uploadDocument(file: Express.Multer.File): Promise<string> {
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('File size must be less than 5MB');
    }

    const bucketName = this.configService.get('AWS_S3_BUCKET_NAME'); // Use environment variables

    const params = {
      Bucket: bucketName,
      Key: `documents/${Date.now()}-${file.originalname}`, // Generate unique file name
      Body: file.buffer, // Buffer of the file
      ContentType: file.mimetype, // Set the MIME type
    };

    try {
      const uploadResult = await s3.upload(params).promise();
      return uploadResult.Location; // Return the URL of the uploaded file
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new Error('Failed to upload file to S3');
    }
  }

  // Get Document URL (Download link)
  async getDocumentUrl(fileName: string): Promise<string> {
    const bucketName = this.configService.get('AWS_S3_BUCKET_NAME');

    const params = {
      Bucket: bucketName,
      Key: `documents/${fileName}`,
    };

    try {
      const file = await s3.getObject(params).promise();
      return file.Body.toString('utf-8'); // Assuming the file is text-based
    } catch (error) {
      console.error('Error fetching file:', error);
      throw new Error('Failed to retrieve file');
    }
  }

  // Delete Document
  async deleteDocument(fileName: string): Promise<void> {
    const bucketName = this.configService.get('AWS_S3_BUCKET_NAME');

    const params = {
      Bucket: bucketName,
      Key: `documents/${fileName}`,
    };

    try {
      await s3.deleteObject(params).promise();
    } catch (error) {
      console.error('Error deleting file from S3:', error);
      throw new Error('Failed to delete file from S3');
    }
  }

  // Update Document (Replace)
  async updateDocument(
    oldFileName: string,
    newFile: Express.Multer.File,
  ): Promise<string> {
    // Delete the old file
    await this.deleteDocument(oldFileName);

    // Upload the new file
    return this.uploadDocument(newFile);
  }
}
