import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateOrderDTO } from './dto/CreateOrder.dto';
import { UpdateOrderDTO } from './dto/UpdateOrder.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() orderRequest: CreateOrderDTO) {
    return this.orderService.create(orderRequest);
  }

  @Patch(':id')
  updateStatus(
    @Param('id') orderId: string,
    @Body() updateRequest: UpdateOrderDTO,
  ) {
    return this.orderService.updateStatus(orderId, updateRequest);
  }

  @Get()
  listByUserId(@Query('userId') userId: string) {
    return this.orderService.getByUserId(userId);
  }
}
