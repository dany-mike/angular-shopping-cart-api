import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressService } from 'src/address/address.service';
import { BillingAddress } from 'src/address/billingAddress.entity';
import { ShippingAddress } from 'src/address/shippingAddress.entity';
import { AuthService } from 'src/auth/auth.service';
import { ProductsService } from 'src/products/products.service';
import { OrderDto } from './dto/order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    private authService: AuthService,
    private addressService: AddressService,
    private productsService: ProductsService,
  ) {}
  async createOrder(orderDto: OrderDto) {
    const { userToken, orderItems } = orderDto;

    const user = await this.authService.getUserByToken(userToken);

    const totalPrice = await this.calcTotalPrice(orderItems);

    const itemsIds = orderItems.map((order) => order.id);

    const products = await this.productsService.findProductsByIds(itemsIds);

    // return this.orderRepository.createOrder(orderDto, user, totalPrice, products);
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
