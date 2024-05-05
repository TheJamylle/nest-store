import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { ListUsersDTO } from './dto/ListUsers.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async create(@Body() user: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.id = uuid();

    this.userRepository.save(userEntity);
    return { id: userEntity.id, message: 'OK' };
  }

  @Get()
  async list() {
    const usersRaw = await this.userRepository.getAll();

    return usersRaw.map((user) => new ListUsersDTO(user.id, user.name));
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() userUpdated: UpdateUserDTO) {
    const newData = await this.userRepository.update(id, userUpdated);

    return {
      user: newData,
      message: 'OK',
    };
  }
}
