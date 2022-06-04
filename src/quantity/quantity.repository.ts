import { Order } from 'src/order/order.entity';
import { Product } from 'src/products/product.entity';
import { Quantity } from 'src/quantity/quantity.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Quantity)
export class QuantityRepository extends Repository<Quantity> {
  addProductQuantity = async (
    quantity: number,
    order: Order,
    product: Product,
  ): Promise<Quantity> => {
    const rawQuantity = this.create({
      order,
      product,
      quantity,
    });

    await this.save(rawQuantity);

    return rawQuantity;
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
