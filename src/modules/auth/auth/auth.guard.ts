import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PayloadUser } from '../auth.service';

export interface UserRequest extends Request {
  user: PayloadUser;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<UserRequest>();
    const token = this.extractHeaderToken(request);
    if (!token) {
      throw new UnauthorizedException('Missing token');
    }
    try {
      const payload: PayloadUser = await this.jwtService.verifyAsync(token);

      request.user = payload;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }

  private extractHeaderToken(request: Request): string | undefined {
    const [tipo, token] = request.headers.authorization?.split(' ') ?? [];

    return tipo === 'Bearer' ? token : undefined;
  }
}
