import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { OrderEntity } from './order.entity';
import { OrderStatus } from './enum/orderstatus.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });

    const orderEntity = new OrderEntity();

    orderEntity.total = 0;
    orderEntity.status = OrderStatus.PROCESSING;
    orderEntity.user = user;

    const order = await this.orderRepository.save(orderEntity);

    return order;
  }

  async getByUserId(userId: string) {
    const orders = await this.orderRepository.findBy({ user: { id: userId } });

    return orders;
  }
}
