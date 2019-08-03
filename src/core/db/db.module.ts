import { Module, Inject } from '@nestjs/common';

import { dbProviders } from './db.provider';

import { DbService } from './db.service';
import { UserService } from './services/user.service';

const services: any[] = [
  DbService,
  UserService,
];

@Module({
  imports: [],
  controllers: [],
  providers: [
    ...dbProviders,
    ...services,
  ],
  exports: [
    ...dbProviders,
    ...services,
  ],
})
export class DbModule {
  constructor(@Inject(DbService) private dbService: DbService) {
    this.dbService.initTables();
  }
}
