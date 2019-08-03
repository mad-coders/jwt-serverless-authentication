import { Module } from '@nestjs/common';

import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';

import config from '../shared/config';

const modules: any[] = [
  DbModule,
  AuthModule,
];

@Module({
  imports: [
    ...modules,
  ],
  exports: [
    ...modules,
  ],
})
export class CoreModule {}
