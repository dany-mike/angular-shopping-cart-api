import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressService } from 'src/address/address.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/user.entity';
import { Product } from 'src/products/product.entity';
import { ProductsService } from 'src/products/products.service';
import {
  CancelOrderDto,
  CompleteOrderDto,
  OrderDto,
  OrderItemDto,
  PayOrderDto,
} from './dto/order.dto';
import { Order, Status } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderItem } from './orderItem.entity';
import { OrderItemRepository } from './orderItem.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    private authService: AuthService,
    private addressService: AddressService,
    private productsService: ProductsService,
    @InjectRepository(OrderItemRepository)
    private orderItemRepository: OrderItemRepository,
  ) {}

  async createOrder(orderDto: OrderDto): Promise<Order> {
    const { userToken, orderItems } = orderDto;

    this.validateQuantityItems(orderItems);

    const user = await this.authService.getUserByToken(userToken);

    const createdOrder = await this.getCreatedOrder('CREATED', user);

    if (createdOrder) {
      await this.orderRepository.delete(createdOrder.id);
    }

    const itemsIds = orderItems.map((order) => order.id);

    const checkProducts = await this.productsService.findProductsByIds(
      itemsIds,
    );

    this.checkOrderItemsPrice(orderItems, checkProducts);

    const products = await this.productsService.findProductsByIds(itemsIds);

    const totalPrice = this.calcTotalPrice(orderItems);

    const subtotal = this.calcSubtotal(orderItems);

    const tax = this.calcTotalPrice(orderItems) - this.calcSubtotal(orderItems);

    const order = await this.orderRepository.createOrder(
      orderDto,
      user,
      totalPrice,
      subtotal,
      tax,
      products,
    );

    await this.createOrderItems(orderItems, order.id);

    return order;
  }

  checkOrderItemsPrice(orderItems: OrderItemDto[], products: Product[]) {
    const productsValidation: Product[] = products;

    orderItems.forEach((item) => {
      products.forEach((product, index) => {
        if (item.price === product.price) {
          productsValidation.splice(index, 1);
        }
      });
    });

    if (productsValidation.length !== 0) {
      throw new BadRequestException(
        'Real products price does not match with localstorage items',
      );
    }
  }

  async completeOrder(completOrderDto: CompleteOrderDto): Promise<Order> {
    const { billingAddressId, orderId, shippingAddressId, userToken, status } =
      completOrderDto;

    const user = await this.authService.getUserByToken(userToken);

    const order = await this.getOrderById(orderId, user);

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

  validateQuantityItems(items: OrderItemDto[]) {
    items.forEach((p) => {
      if (p.quantity === 0) {
        throw new BadRequestException(
          'Quantity of an item cannot be equal to zero',
        );
      }
    });
  }

  async getOrderById(id: number, user: User): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id, user },
    });

    if (!order) {
      throw new BadRequestException(`Order with id ${id} not found`);
    }

    return order;
  }

  async getOrderSummary(id: number) {
    const orderSummary = await this.orderRepository.findOne({
      relations: ['products'],
      where: { id },
    });

    if (!orderSummary) {
      throw new BadRequestException(`Order with id ${id} not found`);
    }

    return orderSummary;
  }

  async getOrderBillingAddress(id: number, user: User) {
    const orderBillingAddress = await this.orderRepository.findOne({
      relations: ['billingAddress', 'products', 'user'],
      where: { id, user },
    });

    if (!orderBillingAddress) {
      throw new BadRequestException(`Order ${id} cannot be found`);
    }

    return orderBillingAddress;
  }

  private calcTotalPrice(orderItems): number {
    let price = 0;
    orderItems.forEach((item) => {
      price += item.price * item.quantity;
    });

    return price;
  }

  private calcSubtotal(orderItems): number {
    let subtotalPrice = 0;
    orderItems.forEach((item) => {
      subtotalPrice += item.price * item.quantity * 0.8;
    });

    return subtotalPrice;
  }

  async getCreatedOrder(created, user): Promise<Order> {
    return await this.orderRepository.findOne({
      where: {
        status: created,
        user,
      },
    });
  }

  async getUserOrders(token: string): Promise<Order[]> {
    const user = await this.authService.getUserByToken(token);
    return await this.orderRepository.find({ user });
  }

  async getUserCompletedOrders(
    status: Status,
    token: string,
  ): Promise<Order[]> {
    const user = await this.authService.getUserByToken(token);
    const formattedStatus = status.toUpperCase();
    return await this.orderRepository.find({
      where: { status: formattedStatus, user },
    });
  }

  async cancelOrder(cancelOrderDto: CancelOrderDto): Promise<Order> {
    const { orderId, userToken } = cancelOrderDto;

    const user = await this.authService.getUserByToken(userToken);

    const order = await this.orderRepository.findOne({
      where: { user, id: orderId },
    });

    const canceledOrder = await this.orderRepository.cancelOrder(
      order,
      Status.CANCELED,
    );

    return canceledOrder;
  }

  async payOrder(payOrderDto: PayOrderDto): Promise<Order> {
    const { orderId, userToken } = payOrderDto;

    const user = await this.authService.getUserByToken(userToken);

    const order = await this.orderRepository.findOne({
      where: { user, id: orderId },
    });

    if (order.status === Status.COMPLETE) {
      const paidOrder = await this.orderRepository.payOrder(order, Status.PAID);
      return paidOrder;
    }

    throw new BadRequestException('Order has not been completed');
  }

  private async createOrderItems(
    orderItems: OrderItemDto[],
    orderId: number,
  ): Promise<OrderItem[]> {
    return this.orderItemRepository.createOrderItems(orderItems, orderId);
  }

  async getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]> {
    return this.orderItemRepository.findOrderItemsByOrderId(orderId);
  }
}
