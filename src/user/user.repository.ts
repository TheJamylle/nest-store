import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async getAll() {
    return this.users;
  }

  async getById(userId: string) {
    return this.users.find((user) => user?.id === userId);
  }

  async emailAlreadyRegistered(email: string) {
    return this.users.some((user) => user?.email == email);
  }
}
