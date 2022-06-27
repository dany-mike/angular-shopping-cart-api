import { EntityRepository, Repository } from 'typeorm';
import { OrderItemDto } from './dto/order.dto';
import { OrderItem } from './orderItem.entity';

@EntityRepository(OrderItem)
export class OrderItemRepository extends Repository<OrderItem> {
  createOrderItems = async (
    orderItems: OrderItemDto[],
  ): Promise<OrderItem[]> => {
    const orderItemsRes: OrderItem[] = [];
    for (const item of orderItems) {
      const orderItem = await this.create({
        name: item.name,
        price: item.price,
        image: item.image ? item.image : '',
        quantity: item.quantity,
      });

      await this.save(orderItem);

      orderItemsRes.push(orderItem);
    }
    return orderItemsRes;
  };

  findOrderItemsByOrderId = async (orderId: number): Promise<OrderItem[]> => {
    return this.find({ where: { orderId } });
  };
}
