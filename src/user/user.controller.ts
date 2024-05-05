import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async create(@Body() user: CreateUserDTO) {
    this.userRepository.save(user);
    return user;
  }

  @Get()
  async list() {
    return this.userRepository.getAll();
  }
}
