import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { OrderEntity } from './order.entity';
import { OrderStatus } from './enum/orderstatus.enum';
import { CreateOrderDTO } from './dto/CreateOrder.dto';
import { OrderItemEntity } from './order-item.entity';
import { ProductEntity } from '../product/product.entity';
import { UpdateOrderDTO } from './dto/UpdateOrder.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  private async getUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private async treatOrderData(
    orderData: CreateOrderDTO,
    products: ProductEntity[],
  ) {
    orderData.items.forEach((item) => {
      const currentProduct = products.find(
        (product) => product.id === item.productId,
      );

      if (!currentProduct) {
        throw new NotFoundException(`Product id ${item.productId} not found`);
      }

      if (item.quantity > currentProduct.quantityAvailable) {
        throw new BadRequestException(
          `Quantity requested ${item.quantity} is greater than available (${currentProduct.quantityAvailable}) for ${currentProduct.name} product`,
        );
      }
    });
  }

  async create(userId: string, orderData: CreateOrderDTO) {
    const user = await this.getUser(userId);

    const productIds = orderData.items.map((item) => item.productId);

    const products = await this.productRepository.findBy({
      id: In(productIds),
    });

    const orderEntity = new OrderEntity();
    orderEntity.status = OrderStatus.PROCESSING;
    orderEntity.user = user;

    this.treatOrderData(orderData, products);

    const itemsEntities = orderData.items.map((item) => {
      const currentProduct = products.find(
        (product) => product.id === item.productId,
      );

      const itemEntity = new OrderItemEntity();
      itemEntity.price = currentProduct!.price;
      itemEntity.quantity = item.quantity;
      itemEntity.product = currentProduct!;
      itemEntity.product.quantityAvailable -= item.quantity;

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

  async updateStatus(id: string, userId: string, updateData: UpdateOrderDTO) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!order || order.user.id != userId) {
      throw new NotFoundException('Order not found');
    }

    Object.assign(order, updateData);

    return this.orderRepository.update(id, order);
  }
}
