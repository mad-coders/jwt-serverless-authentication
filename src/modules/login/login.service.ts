import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from '../../core/db/services/user.service';

import { CreateUserDto } from '../../shared/dtos/user';
import { LoginDto } from './dtos/login.dto';

import { UserModel } from '../../core/db/models/user.model';

@Injectable()
export class LoginService {
  constructor(@Inject(UserService) private userService: UserService,
              @Inject(JwtService) private readonly jwtService: JwtService) {}

  /**
   * Login user
   * @param loginDto
   */
  async login(loginDto: LoginDto): Promise<{ token: string; }> {
    try {
      const user: UserModel = await this.userService.getByusername(loginDto.username);

      if (!await bcrypt.compare(loginDto.password, user.password)) {
        throw new Error('Incorrect password');
      }

      return { token: this.jwtService.sign({ username: user.username }) };

    } catch (err) {
      throw new BadRequestException(err.message || 'Login failed');
    }
  }

  /**
   * Register user
   * @param user
   */
  async register(user: CreateUserDto): Promise<UserModel> {
    const isUserExist = await this.userService.isUserExist(user.username);

    if (isUserExist) {
      throw new BadRequestException('User already exist');
    }

    return await this.userService.create(user);
  }
}
