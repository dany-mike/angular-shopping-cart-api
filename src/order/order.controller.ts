import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/auth/enums/role.enum';
import RolesGuard from 'src/auth/guards/roles.guard';
import {
  CancelOrderDto,
  CompleteOrderDto,
  OrderDto,
  PayOrderDto,
} from './dto/order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderItem } from './orderItem.entity';

// TODO: protect routes
@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
  ) {}

  @Post()
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  createOrder(@Body() orderDto: OrderDto): Promise<Order> {
    return this.orderService.createOrder(orderDto);
  }

  @Post('complete')
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  completeOrder(@Body() completeOrderDto: CompleteOrderDto): Promise<Order> {
    return this.orderService.completeOrder(completeOrderDto);
  }

  @Get('c/all/:token')
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  getUserOrders(@Param('token') token: string): Promise<Order[]> {
    return this.orderService.getUserOrders(token);
  }

  @Get('/summary/i/:id')
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  getOrderSummary(@Param('id') id: number) {
    return this.orderService.getOrderSummary(id);
  }

  @Post('cancel')
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  cancelOrder(@Body() cancelOrderDto: CancelOrderDto): Promise<Order> {
    return this.orderService.cancelOrder(cancelOrderDto);
  }

  @Get(':id/:userToken')
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  async getOrderById(
    @Param('id') id: number,
    @Param('userToken') userToken: string,
  ): Promise<Order> {
    const user = await this.authService.getUserByToken(userToken);
    return this.orderService.getOrderById(id, user);
  }

  @Post('pay')
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  payOrder(@Body() payOrderDto: PayOrderDto): Promise<Order> {
    return this.orderService.payOrder(payOrderDto);
  }

  @Get('order-item/i/:orderId')
  @UseGuards(RolesGuard(Role.User))
  @UseGuards(AuthGuard())
  getOrderItemsByOrderId(@Param('orderId') orderId): Promise<OrderItem[]> {
    return this.orderService.getOrderItemsByOrderId(orderId);
  }
}
