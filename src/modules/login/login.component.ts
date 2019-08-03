import { Controller, Get, Inject, Body, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { LoginService } from './login.service';

import { CreateUserDto } from '../../shared/dtos/user';
import { LoginDto } from './dtos/login.dto';

import { UserModel } from '../../core/db/models/user.model';

import { NotNullValidator } from '../../shared/helpers/not-null.validator';
import { JwtAuthGuard } from '../../core/guards/jwt.guard';

@Controller()
export class LoginController {
  constructor(@Inject(LoginService) private loginService: LoginService) {}

  @Post('login')
  @ApiOkResponse({description: 'Return token'})
  async login(@Body() body: LoginDto): Promise<{ token: string; }> {
    const loginDto: LoginDto = {
      username: body.username,
      password: body.password,
    };

    NotNullValidator({
      username: loginDto.username,
      password: loginDto.password,
    });

    return await this.loginService.login(loginDto);
  }

  @Post('register')
  @ApiOkResponse({description: 'User has been registered'})
  async register(@Body() body: CreateUserDto): Promise<UserModel> {
    const user: CreateUserDto = {
      username: body.username,
      password: body.password,
      firstName: body.lastName,
      lastName: body.lastName,
      organization: body.organization,
    };

    return await this.loginService.register(user);
  }

  @Get('testAuth')
  @UseGuards(JwtAuthGuard)
  async test(): Promise<{ message: string; }> {
    return { message: 'Auth works well! This is protected API endpoint. '};
  }
}
