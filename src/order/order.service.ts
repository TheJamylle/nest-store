import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { OrderEntity } from './order.entity';
import { OrderStatus } from './enum/orderstatus.enum';
import { CreateOrderDTO } from './dto/CreateOrder.dto';
import { OrderItemEntity } from './order-item.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(orderData: CreateOrderDTO) {
    const user = await this.userRepository.findOneBy({ id: orderData.userId });

    const orderEntity = new OrderEntity();
    orderEntity.status = OrderStatus.PROCESSING;
    orderEntity.user = user;

    const itemsEntities = orderData.items.map((item) => {
      const itemEntity = new OrderItemEntity();

      itemEntity.price = 10;
      itemEntity.quantity = item.quantity;
      return itemEntity;
    });

    const total = itemsEntities.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    orderEntity.items = itemsEntities;

    orderEntity.total = total;

    const order = await this.orderRepository.save(orderEntity);

    return order;
  }

  async getByUserId(userId: string) {
    const orders = await this.orderRepository.findBy({ user: { id: userId } });

    return orders;
  }
}
