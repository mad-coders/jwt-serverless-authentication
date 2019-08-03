import { Logger } from '@nestjs/common';
import * as winston from 'winston';
// import * as WinstonCloudWatch from 'winston-cloudwatch';
const WinstonCloudWatch = require('winston-cloudwatch');

import config from '../../shared/config';

export class LoggerService extends Logger {
  private logger: winston.Logger = winston.createLogger(config.loggerOptions);

  constructor() {
    super();
    this.logger.add(new WinstonCloudWatch(config.cloudwatchSettings));
  }

  error(message: string) {
    this.logger.error(message);
  }
}
