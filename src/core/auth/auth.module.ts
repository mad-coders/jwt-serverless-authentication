import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { DbModule } from '../db/db.module';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

import config from '../../shared/config';

@Module({
  imports: [
    forwardRef(() => DbModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.secretOrKey,
      signOptions: {
        expiresIn: config.tokenExpire,
      },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [PassportModule, AuthService, JwtModule],
})
export class AuthModule {}
