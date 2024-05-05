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

  async update(id: string, newData: Partial<UserEntity>) {
    const user = this.users.find((i) => i.id === id);

    if (!user) {
      throw new Error('User does not exists');
    }

    Object.entries(newData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      user[key] = value;
    });

    return user;
  }
}
