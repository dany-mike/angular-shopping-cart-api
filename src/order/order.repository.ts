import { BillingAddress } from 'src/address/billingAddress.entity';
import { ShippingAddress } from 'src/address/shippingAddress.entity';
import { User } from 'src/auth/user.entity';
import { Product } from 'src/products/product.entity';
import { Quantity } from 'src/quantity/quantity.entity';
import { EntityRepository, Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';
import { Order } from './order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  createOrder = async (
    orderDto: OrderDto,
    user: User,
    totalPrice: number,
    products: Product[],
    quantity: Quantity,
  ): Promise<Order> => {
    const { status } = orderDto;

    const order = this.create({
      user,
      totalPrice,
      products,
      status,
      quantity,
    });

    await this.save(order);
    return order;
  };

  //   updateShippingAddress = async (
  //     id: number,
  //     order: order,
  //   ): Promise<ShippingAddress> => {
  //     const result = await this.findOne(id);

  //     if (!result) {
  //       throw new NotFoundException(`shipping address with id: ${id} not found`);
  //     }
  //     return this.save({
  //       ...addressDto,
  //       id: result.id,
  //     });
  //   };
}
