import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDTO } from './dto/CreateOrder.dto';
import { UpdateOrderDTO } from './dto/UpdateOrder.dto';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth/auth/auth.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard)
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
