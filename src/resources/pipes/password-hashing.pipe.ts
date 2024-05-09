import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHashingPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}

  async transform(password: string) {
    const sal = this.configService.get<string>('SAL_PASSWORD');

    const hashed = await bcrypt.hash(password, sal!);

    return hashed;
  }
}
