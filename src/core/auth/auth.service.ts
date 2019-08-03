import { Injectable, Inject } from '@nestjs/common';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { UserService } from '../db/services/user.service';

@Injectable()
export class AuthService {
  constructor(@Inject(UserService) private userService: UserService) {}

  async validateUser(username: string): Promise<boolean> {
    return await this.userService.getByusername(username);
  }
}
