import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(email: string, password: string) {
    const user = await this.userService.emailAlreadyRegistered(email);

    if (!user) {
      throw new UnauthorizedException('Email or password invalid');
    }

    return bcrypt.compare(password, user.password);
  }
}
