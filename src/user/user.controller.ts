import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Post()
  async create(@Body() user: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.id = uuid();

    this.userService.create(userEntity);
    return { id: userEntity.id, message: 'OK' };
  }

  @Get()
  async list() {
    return this.userService.listUsers();
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() userUpdated: UpdateUserDTO) {
    const newData = await this.userService.update(id, userUpdated);

    return {
      user: newData,
      message: 'OK',
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);

    return {
      message: 'DELETED',
    };
  }
}
