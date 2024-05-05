import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './products/product.module';
import { UserRepository } from './user/user.repository';
import { UserExistsValidator } from './validation/user-exists.validator';

@Module({
  imports: [UserModule, ProductModule],
  providers: [UserRepository, UserExistsValidator],
})
export class AppModule {}
