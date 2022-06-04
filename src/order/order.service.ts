import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressService } from 'src/address/address.service';
import { BillingAddress } from 'src/address/billingAddress.entity';
import { ShippingAddress } from 'src/address/shippingAddress.entity';
import { AuthService } from 'src/auth/auth.service';
import { OrderDto } from './dto/order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    private authService: AuthService,
    private addressService: AddressService,
  ) {}
  async createOrder(orderDto: OrderDto) {
    const { userToken, orderItems, billingAddressId, shippingAddressId } =
      orderDto;

    const user = await this.authService.getUserByToken(userToken);

    const totalPrice = await this.calcTotalPrice(orderItems);
    const shippingAddress = await this.getShippingAddress(
      user,
      shippingAddressId,
    );
    console.log(shippingAddress);
    // Calculate total price
    // return this.orderRepository.createOrder(orderDto, user, totalPrice);
  }

  private async calcTotalPrice(orderItems): Promise<number> {
    let price = 0;
    orderItems.forEach((item) => {
      price += item.price;
    });

    return price;
  }

  async getShippingAddress(user, shippingAddressId): Promise<ShippingAddress> {
    return await this.addressService.getShippingAddressById(
      user.id,
      shippingAddressId,
    );
  }

  async getBillingAddress(user, billingAddressId): Promise<BillingAddress> {
    return await this.addressService.getShippingAddressById(
      user.id,
      billingAddressId,
    );
  }
}
