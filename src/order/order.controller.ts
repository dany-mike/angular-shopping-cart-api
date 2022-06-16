import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import {
  CancelOrderDto,
  CompleteOrderDto,
  OrderDto,
  PayOrderDto,
} from './dto/order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';

// TODO: protect routes
@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
  ) {}

  @Post()
  createOrder(@Body() orderDto: OrderDto): Promise<Order> {
    return this.orderService.createOrder(orderDto);
  }

  @Post('complete')
  completeOrder(@Body() completeOrderDto: CompleteOrderDto): Promise<Order> {
    return this.orderService.completeOrder(completeOrderDto);
  }

  @Get('c/all/:token')
  getUserOrders(@Param('token') token: string): Promise<Order[]> {
    return this.orderService.getUserOrders(token);
  }

  @Get('/summary/i/:id')
  getOrderSummary(@Param('id') id: number) {
    return this.orderService.getOrderSummary(id);
  }

  @Post('cancel')
  cancelOrder(@Body() cancelOrderDto: CancelOrderDto): Promise<Order> {
    return this.orderService.cancelOrder(cancelOrderDto);
  }

  @Get(':id/:userToken')
  async getOrderById(
    @Param('id') id: number,
    @Param('userToken') userToken: string,
  ): Promise<Order> {
    const user = await this.authService.getUserByToken(userToken);
    return this.orderService.getOrderById(id, user);
  }

  @Post('pay')
  payOrder(@Body() payOrderDto: PayOrderDto): Promise<Order> {
    return this.orderService.payOrder(payOrderDto);
  }
}
