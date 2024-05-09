import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, UserRequest } from '../auth/auth/auth.guard';
import { CreateOrderDTO } from './dto/CreateOrder.dto';
import { UpdateOrderDTO } from './dto/UpdateOrder.dto';
import { OrderService } from './order.service';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Req() req: UserRequest, @Body() orderRequest: CreateOrderDTO) {
    const userId = req.user.sub;

    return this.orderService.create(userId, orderRequest);
  }

  @Patch(':id')
  updateStatus(
    @Param('id') orderId: string,
    @Req() req: UserRequest,
    @Body() updateRequest: UpdateOrderDTO,
  ) {
    const userId = req.user.sub;

    return this.orderService.updateStatus(orderId, userId, updateRequest);
  }

  @Get()
  listByUserId(@Req() req: UserRequest) {
    const userId = req.user.sub;

    return this.orderService.getByUserId(userId);
  }
}
