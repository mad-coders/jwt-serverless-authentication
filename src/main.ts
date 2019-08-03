import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { DispatchError } from './shared/filters/dispatch-error.filter';
import { LoggerService } from './core/logger/logger.service';

import { LoggerModule } from './core/logger/logger.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  const logger: LoggerService = app.select(LoggerModule).get(LoggerService);
  app.useGlobalFilters(new DispatchError(logger));
  app.useLogger(app.get(LoggerService));
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
