import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { CoreModule } from './core/core.module';
import { LoginModule } from './modules/login/login.module';
import { LoggerModule } from './core/logger/logger.module';

@Module({
  imports: [
    CoreModule,
    LoginModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
