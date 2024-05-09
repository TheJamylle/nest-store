import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class OrderItemDTO {
  @IsInt()
  quantity: number;
}

export class CreateOrderDTO {
  @IsUUID()
  userId: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];
}
