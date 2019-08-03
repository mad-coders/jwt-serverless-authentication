import { Module, forwardRef } from '@nestjs/common';

import { LoginService } from './login.service';

import { LoginController } from './login.component';

import { DbModule } from '../../core/db/db.module';
import { AuthModule } from '../../core/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => DbModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [
    LoginController,
  ],
  providers: [
    LoginService,
  ],
})
export class LoginModule {}
