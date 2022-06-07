import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CancelOrderDto, CompleteOrderDto, OrderDto } from './dto/order.dto';
import { Order, Status } from './order.entity';
import { OrderService } from './order.service';

// TODO: protect routes
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

  @Get(':completed/:token')
  getUserCompletedOrders(
    @Param('completed') status: Status,
    @Param('token') token: string,
  ): Promise<Order[]> {
    return this.orderService.getUserCompletedOrders(status, token);
  }

  @Get('/summary/i/:id')
  getOrderSummary(@Param('id') id: number) {
    return this.orderService.getOrderSummary(id);
  }

  @Post('cancel')
  cancelOrder(@Body() cancelOrderDto: CancelOrderDto): Promise<Order> {
    return this.orderService.cancelOrder(cancelOrderDto);
  }
}
