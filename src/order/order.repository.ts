import { BillingAddress } from 'src/address/billingAddress.entity';
import { ShippingAddress } from 'src/address/shippingAddress.entity';
import { User } from 'src/auth/user.entity';
import { Product } from 'src/products/product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';
import { Order, Status } from './order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  createOrder = async (
    orderDto: OrderDto,
    user: User,
    totalPrice: number,
    subtotal: number,
    tax: number,
    products: Product[],
  ): Promise<Order> => {
    const { status } = orderDto;

    const order = this.create({
      user,
      totalPrice,
      products,
      status,
      subtotal,
      tax,
    });

    await this.save(order);

    return order;
  };

  completeOrder = async (
    order: Order,
    billingAddress: BillingAddress,
    shippingAddress: ShippingAddress,
    status: Status,
  ): Promise<Order> => {
    return this.save({
      ...order,
      billingAddress,
      shippingAddress,
      status,
      id: order.id,
    });
  };

  cancelOrder = async (order: Order, status: Status): Promise<Order> => {
    return this.save({
      ...order,
      status,
      id: order.id,
    });
  };

  payOrder = async (order: Order, status: Status): Promise<Order> => {
    return this.save({
      ...order,
      status,
      id: order.id,
    });
  };
}
