import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { OrderDto } from './dto/order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    private authService: AuthService,
  ) {}
  async createOrder(orderDto: OrderDto) {
    const { userToken } = orderDto;
    const user = await this.authService.getUserByToken(userToken);
    console.log(user);
    return orderDto;
  }
}
