import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { OrderDto } from './dto/order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  //   constructor(
  //     @InjectRepository()
  //     private shippingAddressRepository: OrderRepository,
  //   ) {}
  createOrder(orderDto: OrderDto) {
    //   this.authService.
    return orderDto;
  }
}
