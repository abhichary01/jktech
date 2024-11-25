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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentController = void 0;
const common_1 = require("@nestjs/common");
const document_service_1 = require("./document.service");
const platform_express_1 = require("@nestjs/platform-express");
const common_2 = require("@nestjs/common");
const roles_decorator_1 = require("../auth/roles.decorator");
const jwt_authguard_1 = require("../auth/jwt.authguard");
const roles_guard_1 = require("../auth/roles.guard");
const user_dto_1 = require("../user/user.dto");
let DocumentController = class DocumentController {
    constructor(documentService) {
        this.documentService = documentService;
    }
    async uploadFile(file) {
        if (!file) {
            throw new common_2.BadRequestException('File is required');
        }
        return this.documentService.uploadDocument(file);
    }
    async getDocument(fileName) {
        return this.documentService.getDocumentUrl(fileName);
    }
    async deleteFile(fileName) {
        await this.documentService.deleteDocument(fileName);
        return { message: 'File deleted successfully' };
    }
};
exports.DocumentController = DocumentController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(jwt_authguard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_dto_1.UserRole.ADMIN, user_dto_1.UserRole.EDITOR),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(':fileName'),
    __param(0, (0, common_1.Param)('fileName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "getDocument", null);
__decorate([
    (0, common_1.UseGuards)(jwt_authguard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_dto_1.UserRole.ADMIN, user_dto_1.UserRole.EDITOR),
    (0, common_1.Delete)(':fileName'),
    __param(0, (0, common_1.Param)('fileName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "deleteFile", null);
exports.DocumentController = DocumentController = __decorate([
    (0, common_1.Controller)('documents'),
    __metadata("design:paramtypes", [document_service_1.DocumentService])
], DocumentController);
//# sourceMappingURL=document.controller.js.map