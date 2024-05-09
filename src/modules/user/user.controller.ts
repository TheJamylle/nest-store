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
import { UserService } from './user.service';
import { PasswordHashingPipe } from 'src/resources/pipes/password-hashing.pipe';
import { ConfigService } from '@nestjs/config';

@Controller('/users')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Post()
  async create(@Body() { password, ...data }: CreateUserDTO) {
    const hashedPassword = await new PasswordHashingPipe(
      this.configService,
    ).transform(password);

    const result = await this.userService.create({
      ...data,
      password: hashedPassword,
    });
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
