import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  createOrder(orderDto: OrderDto) {
    return orderDto;
  }
}
