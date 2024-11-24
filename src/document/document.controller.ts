import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { BadRequestException } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt.authguard';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../user/user.dto';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  // Upload a file
  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.documentService.uploadDocument(file);
  }

  // Get a document by name
  @Get(':fileName')
  async getDocument(@Param('fileName') fileName: string) {
    return this.documentService.getDocumentUrl(fileName);
  }

  // Delete a document by name
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  @Delete(':fileName')
  async deleteFile(@Param('fileName') fileName: string) {
    await this.documentService.deleteDocument(fileName);
    return { message: 'File deleted successfully' };
  }
}
