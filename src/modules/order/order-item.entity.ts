import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../product/product.entity';

@Entity({ name: 'order_items' })
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'total', nullable: false })
  quantity: number;

  @Column({ name: 'price', nullable: false })
  price: number;

  @ManyToOne(() => OrderEntity, (order) => order.items, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderItems, {
    cascade: ['update'],
  })
  product: ProductEntity;
}
