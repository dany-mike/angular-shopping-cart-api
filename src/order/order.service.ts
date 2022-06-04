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
    const { userToken, orderItems } = orderDto;
    const user = await this.authService.getUserByToken(userToken);
    const totalPrice = await this.calcTotalPrice(orderItems);
    // Calculate total price
    // return this.orderRepository.createOrder(orderDto, user, totalPrice, );
  }

  private async calcTotalPrice(orderItems): Promise<number> {
    let price = 0;
    orderItems.forEach((item) => {
      price += item.price;
    });

    return price;
  }
}
