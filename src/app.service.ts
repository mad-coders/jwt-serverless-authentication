import { Injectable, Inject } from '@nestjs/common';
import { DataMapper } from '@aws/dynamodb-data-mapper';

import { DB_PROVIDER_TOKEN } from './core/db/db.provider';

import { UserModel } from './core/db/models/user.model';

@Injectable()
export class AppService {
  constructor(@Inject(DB_PROVIDER_TOKEN) private dbProvider: DataMapper) {}
}
