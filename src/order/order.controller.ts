import { Body, Controller, Post } from '@nestjs/common';
import { CompleteOrderDto, OrderDto } from './dto/order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  createOrder(@Body() orderDto: OrderDto): Promise<Order> {
    return this.orderService.createOrder(orderDto);
  }

  @Post('complete')
  completeOrder(@Body() completeOrderDto: CompleteOrderDto): Promise<Order> {
    return this.orderService.completeOrder(completeOrderDto);
  }
}
