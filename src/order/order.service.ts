import {
  forwardRef,
  Inject,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressService } from 'src/address/address.service';
import { AuthService } from 'src/auth/auth.service';
import { Product } from 'src/products/product.entity';
import { ProductsService } from 'src/products/products.service';
import { QuantityService } from 'src/quantity/quantity.service';
import {
  CancelOrderDto,
  CompleteOrderDto,
  OrderDto,
  OrderItemDto,
} from './dto/order.dto';
import { Order, Status } from './order.entity';
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

    const createdOrder = await this.getCreatedOrder('CREATED', user);

    if (createdOrder) {
      await this.orderRepository.delete(createdOrder.id);
    }

    const itemsIds = orderItems.map((order) => order.id);

    const products = await this.productsService.findProductsByIds(itemsIds);

    this.checkOrderItemsPrice(orderItems, products);

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

  checkOrderItemsPrice(orderItems: OrderItemDto[], products: Product[]) {
    const productsValidation: Product[] = products;

    orderItems.forEach((item) => {
      products.forEach((product, index) => {
        if (item.price === product.price) {
          productsValidation.splice(index, 1);
        }
      });
    });

    if (productsValidation.length === 0) {
      throw new BadRequestException(
        'Real products price does not match with localstorage items',
      );
    }
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

  validateQuantityItems(items: OrderItemDto[]) {
    items.forEach((p) => {
      if (p.quantity === 0) {
        throw new BadRequestException(
          'Quantity of an item cannot be equal to zero',
        );
      }
    });
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
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

    return orderSummary;
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
    const { orderId, status, userToken } = cancelOrderDto;

    const user = await this.authService.getUserByToken(userToken);

    const order = await this.orderRepository.findOne({
      where: { user, id: orderId },
    });

    const canceledOrder = await this.orderRepository.cancelOrder(order, status);

    return canceledOrder;
  }
}
