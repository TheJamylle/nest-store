import { Controller, Get, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Query('userId') userId: string) {
    return this.orderService.create(userId);
  }

  @Get()
  listByUserId(@Query('userId') userId: string) {
    return this.orderService.getByUserId(userId);
  }
}
