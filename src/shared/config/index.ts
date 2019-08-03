import * as winston from 'winston';

const env: string = process.env.NODE_ENV || 'dev';
console.log(`Starting at env: ${env}`);

const config: any = {
  dev: {
    passwordSalt: 0.5,
    secretOrKey: process.env.JWT_SECRET,
    tokenExpire: 3600,
    dynamodbSettings: {
      region: 'localhost',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY || 'foo',
        secretAccessKey: process.env.AWS_ACCESS_SECRET || 'bar',
      },
      endpoint: 'http://localhost:8000',
    },
    cloudwatchSettings: {
      logGroupName: 'angular-auth-api',
      logStreamName: 'dev',
      awsRegion: 'us-west-2',
      awsAccessKeyId: process.env.AWS_ACCESS_KEY,
      awsSecretKey: process.env.AWS_ACCESS_SECRET,
      jsonMessage: true,
    },
    loggerOptions: {
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json(),
          ),
        }),
      ],
    },
  },
  production: {
    passwordSalt: 0.5,
    secretOrKey: process.env.JWT_SECRET,
    tokenExpire: 3600,
    dynamodbSettings: {
      region: 'us-west-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_ACCESS_SECRET,
      },
    },
    cloudwatchSettings: {
      logGroupName: 'angular-auth-api',
      logStreamName: 'prod',
      awsRegion: 'us-west-2',
      awsAccessKeyId: process.env.AWS_ACCESS_KEY,
      awsSecretKey: process.env.AWS_ACCESS_SECRET,
      jsonMessage: true,
    },
    loggerOptions: {
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json(),
          ),
        }),
      ],
    },
  },
};

export default config[env];
