import { DataMapper } from '@aws/dynamodb-data-mapper';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';

import config from '../../shared/config';

export const DB_PROVIDER_TOKEN = 'DB_PROVIDER';

const client = new DynamoDB(config.dynamodbSettings);
const mapper = new DataMapper({ client });

export const dbProviders = [{
    provide: DB_PROVIDER_TOKEN,
    useValue: mapper,
}];
