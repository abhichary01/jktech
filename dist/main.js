"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const logger = new common_1.Logger('Bootstrap');
    logger.log('Application is starting...');
    app.enableCors();
    const port = configService.get('PORT') || 3000;
    await app.listen(port, () => {
        logger.log(`Application is running on: http://localhost:${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map