import { Injectable, Inject } from '@nestjs/common';
import { DataMapper } from '@aws/dynamodb-data-mapper';

import { DB_PROVIDER_TOKEN } from './db.provider';
import { UserModel } from './models/user.model';

const models: any[] = [
  UserModel,
];

@Injectable()
export class DbService {
  constructor(@Inject(DB_PROVIDER_TOKEN) private dbProvider: DataMapper) {}

  /**
   * Init dynamodb tables
   */
  public async initTables(): Promise<void> {
    try {
      for (const model of models) {
        await this.dbProvider.ensureTableExists(model, {  readCapacityUnits: 1, writeCapacityUnits: 1 });
      }
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Remove dynamodb tables
   */
  public async removeTables(): Promise<void> {
    try {
      for (const model of models) {
        await this.dbProvider.deleteTable(model);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
