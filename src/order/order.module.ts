import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderEntity } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
