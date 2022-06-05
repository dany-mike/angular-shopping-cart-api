import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressService } from 'src/address/address.service';
import { BillingAddress } from 'src/address/billingAddress.entity';
import { ShippingAddress } from 'src/address/shippingAddress.entity';
import { AuthService } from 'src/auth/auth.service';
import { ProductsService } from 'src/products/products.service';
import { QuantityService } from 'src/quantity/quantity.service';
import { CompleteOrderDto, OrderDto } from './dto/order.dto';
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
  async createOrder(orderDto: OrderDto): Promise<Order> {
    const { userToken, orderItems } = orderDto;

    const user = await this.authService.getUserByToken(userToken);

    const createdOrder = await this.getCreatedOrder('CREATED');

    if (createdOrder) {
      await this.orderRepository.delete(createdOrder.id);
    }

    const totalPrice = await this.calcTotalPrice(orderItems);

    const itemsIds = orderItems.map((order) => order.id);

    const products = await this.productsService.findProductsByIds(itemsIds);

    const order = await this.orderRepository.createOrder(
      orderDto,
      user,
      totalPrice,
      products,
    );

    const orderId: number = order.id;

    const formattedItems = orderItems.map((item) => {
      const formattedItem = {
        quantity: item.quantity,
        orderId,
        productId: item.id,
      };

      return formattedItem;
    });

    for await (const item of formattedItems) {
      this.quantityService.addProductQuantity(
        item.quantity,
        item.orderId,
        item.productId,
      );
    }

    return order;
  }

  async completeOrder(completOrderDto: CompleteOrderDto): Promise<Order> {
    const { billingAddressId, orderId, shippingAddressId, userToken, status } =
      completOrderDto;

    const order = await this.getOrderById(orderId);

    const user = await this.authService.getUserByToken(userToken);

    const shippingAddress = await this.addressService.getShippingAddressById(
      user.id,
      shippingAddressId,
    );

    const billingAddress = await this.addressService.getBillingAddressById(
      user.id,
      billingAddressId,
    );

    return await this.orderRepository.completeOrder(
      order,
      billingAddress,
      shippingAddress,
      status,
    );
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }

  private async calcTotalPrice(orderItems): Promise<number> {
    let price = 0;
    orderItems.forEach((item) => {
      price += item.price * item.quantity;
    });

    return price;
  }

  async getCreatedOrder(created): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { status: created },
    });
  }
}
