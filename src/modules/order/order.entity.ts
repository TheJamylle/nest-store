import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OrderStatus } from './enum/orderstatus.enum';
import { UserEntity } from '../user/user.entity';
import { OrderItemEntity } from './order-item.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'total', nullable: false })
  total: number;

  @Column({ name: 'status', enum: OrderStatus, nullable: false })
  status: OrderStatus;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
  items: OrderItemEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
