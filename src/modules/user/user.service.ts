import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListUsersDTO } from './dto/ListUsers.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { CreateUserDTO } from './dto/CreateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.address = user.address;

    return this.userRepository.save(user);
  }

  async listUsers() {
    const users = await this.userRepository.find();
    const usersList = users.map((user) => new ListUsersDTO(user.id, user.name));

    return usersList;
  }

  async getById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async emailAlreadyRegistered(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async update(id: string, user: UpdateUserDTO) {
    this.userRepository.update(id, user);
  }

  async delete(id: string) {
    this.userRepository.delete(id);
  }
}
