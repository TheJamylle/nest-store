import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/CreateOrder.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() orderRequest: CreateOrderDTO) {
    return this.orderService.create(orderRequest);
  }

  @Get()
  listByUserId(@Query('userId') userId: string) {
    return this.orderService.getByUserId(userId);
  }
}
