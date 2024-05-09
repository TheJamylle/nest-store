import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { EmailIsUniqueValidator } from './validation/email-is-unique.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, EmailIsUniqueValidator],
  exports: [UserService],
})
export class UserModule {}
