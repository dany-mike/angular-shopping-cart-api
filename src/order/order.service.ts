import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressService } from 'src/address/address.service';
import { BillingAddress } from 'src/address/billingAddress.entity';
import { ShippingAddress } from 'src/address/shippingAddress.entity';
import { AuthService } from 'src/auth/auth.service';
import { ProductsService } from 'src/products/products.service';
import { QuantityService } from 'src/quantity/quantity.service';
import { Not } from 'typeorm';
import { OrderDto } from './dto/order.dto';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    private authService: AuthService,
    private addressService: AddressService,
    private productsService: ProductsService,
    @Inject(forwardRef(() => QuantityService))
    private quantityService: QuantityService,
  ) {}
  async createOrder(orderDto: OrderDto): Promise<void> {
    const { userToken, orderItems } = orderDto;

    const user = await this.authService.getUserByToken(userToken);

    // check if an order has status created or completed if yes update order items of the order
    const unpaidOrder = await this.getUnpaidOrder('PAID');

    console.log(unpaidOrder);
    if (unpaidOrder) {
      //DELETE quantity order and order_product
      this.orderRepository.delete(unpaidOrder.id);
    }

    // const totalPrice = await this.calcTotalPrice(orderItems);

    // const itemsIds = orderItems.map((order) => order.id);

    // const products = await this.productsService.findProductsByIds(itemsIds);

    // const order = await this.orderRepository.createOrder(
    //   orderDto,
    //   user,
    //   totalPrice,
    //   products,
    // );

    // const orderId: number = order.id;

    // const formattedItems = orderItems.map((item) => {
    //   const formattedItem = {
    //     quantity: item.quantity,
    //     orderId,
    //     productId: item.id,
    //   };

    //   return formattedItem;
    // });

    // for await (const item of formattedItems) {
    //   this.quantityService.addProductQuantity(
    //     item.quantity,
    //     item.orderId,
    //     item.productId,
    //   );
    // }

    // return order;
  }

  async getOrderById(id: number): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { id },
    });
  }

  private async calcTotalPrice(orderItems): Promise<number> {
    let price = 0;
    orderItems.forEach((item) => {
      price += item.price;
    });

    return price;
  }

  async getUnpaidOrder(paid): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { status: Not(paid) },
    });
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
