import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

interface PayloadUser {
  sub: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.emailAlreadyRegistered(email);

    const userValidation = await bcrypt.compare(password, user?.password || '');

    if (!user || !userValidation) {
      throw new UnauthorizedException('Email or password invalid');
    }

    const payload: PayloadUser = {
      sub: user.id,
      name: user.name,
    };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
