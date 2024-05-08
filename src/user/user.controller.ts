import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    const result = await this.userService.create(data);
    return { user: result, message: 'OK' };
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
