import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import * as _ from 'lodash';
import * as bcrypt from 'bcryptjs';

import { DB_PROVIDER_TOKEN } from '../db.provider';

import { CreateUserDto } from '../../../shared/dtos/user';

import { NotNullValidator } from '../../../shared/helpers/not-null.validator';

import { UserModel } from '../models/user.model';

import config from '../../../shared/config';

@Injectable()
export class UserService {
  constructor(@Inject(DB_PROVIDER_TOKEN) private dbProvider: DataMapper) {}

  /**
   * Get user by username
   * @param username
   */
  async getByusername(username: string): Promise<any> {
    try {
      const user = _.assign(new UserModel(), { username });

      return await this.dbProvider.get(user, { projection: ['username', 'password', 'firstName', 'lastName', 'organization'] });
    } catch (err) {
      throw new BadRequestException('User not found');
    }
  }

  /**
   * Check is user already exist
   * @param username
   */
  async isUserExist(username: string): Promise<boolean> {
    try {
      const isUserExist = await this.getByusername(username);

      if (isUserExist) {
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }

  /**
   * Create user
   * @param user
   */
  async create(user: CreateUserDto): Promise<UserModel> {
    const salt = await bcrypt.genSalt(config.passwordSalt);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    NotNullValidator({
      firstName: user.firstName,
      lastName: user.lastName,
      organization: user.organization,
      password: hashedPassword,
      username: user.username,
    });

    const userModel = _.assign(new UserModel(), {
      ...user,
      password: hashedPassword,
    });

    return await this.dbProvider.put(userModel);
  }

  /**
   * Delete user
   * @param id
   */
  async delete(id: string): Promise<UserModel> {
    NotNullValidator({ id });

    const user = _.assign(new UserModel(), { id });

    return await this.dbProvider.delete(user);
  }
}
