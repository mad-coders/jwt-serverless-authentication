import * as express from 'express';
import * as serverless from 'aws-serverless-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Context, Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { Server } from 'http';
import { eventContext } from 'aws-serverless-express/middleware';
import { ExpressAdapter } from '@nestjs/platform-express';

import { LoggerService } from './core/logger/logger.service';
import { LoggerModule } from './core/logger/logger.module';
import { DispatchError } from './shared/filters/dispatch-error.filter';
import { AppModule } from './app.module';

let cachedServer: Server;

function bootstrapServer(): Promise<Server> {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);

  return NestFactory.create(AppModule, adapter)
    .then(app => app.use(eventContext()))
    .then(app => {
      const logger: LoggerService = app.select(LoggerModule).get(LoggerService);
      app.useGlobalFilters(new DispatchError(logger));
      app.useLogger(app.get(LoggerService));

      return app;
    })
    .then(app => app.enableCors())
    .then(app => app.init())
    .then(() => serverless.createServer(expressApp));
}

export const handler: Handler = (event: any, context: Context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    if (!cachedServer) {
      bootstrapServer()
        .then(server => {
          cachedServer = server;
          return serverless.proxy(server, event, context);
        });
    } else {
      return serverless.proxy(cachedServer, event, context);
    }
  } catch (err) {
    throw new Error(err);
  }
};
