"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const config_validation_1 = require("./config.validation");
const aws_sdk_1 = require("aws-sdk");
const user_controller_1 = require("./user/user.controller");
const user_service_1 = require("./user/user.service");
const auth_module_1 = require("./auth/auth.module");
const auth_service_1 = require("./auth/auth.service");
const auth_controller_1 = require("./auth/auth.controller");
const jwt_1 = require("@nestjs/jwt");
const document_module_1 = require("./document/document.module");
const ingestion_service_1 = require("./ingestion/ingestion.service");
const ingestion_controller_1 = require("./ingestion/ingestion.controller");
const axios_1 = require("@nestjs/axios");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
                validationSchema: config_validation_1.configValidationSchema,
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            document_module_1.DocumentModule,
        ],
        controllers: [
            app_controller_1.AppController,
            user_controller_1.UserController,
            auth_controller_1.AuthController,
            ingestion_controller_1.IngestionController,
        ],
        providers: [
            app_service_1.AppService,
            jwt_1.JwtService,
            user_service_1.UserService,
            auth_service_1.AuthService,
            {
                provide: 'DYNAMODB_CLIENT',
                useFactory: (configService) => {
                    return new aws_sdk_1.DynamoDB.DocumentClient({
                        region: configService.get('AWS_REGION'),
                        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
                        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
                    });
                },
                inject: [config_1.ConfigService],
            },
            ingestion_service_1.IngestionService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map