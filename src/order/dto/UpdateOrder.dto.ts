import { IsEnum } from 'class-validator';
import { OrderStatus } from '../enum/orderstatus.enum';

export class UpdateOrderDTO {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
