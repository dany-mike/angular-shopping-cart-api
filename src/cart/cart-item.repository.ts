import { EntityRepository, Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';

@EntityRepository(CartItem)
export class CartItemRepository extends Repository<CartItem> {
  createCartItem = async (quantity, product, user): Promise<CartItem> => {
    const cartItem = this.create({
      quantity,
      product,
      user,
    });

    await this.save(product);
    return cartItem;
  };

  updateCartItemQuantity = async (
    quantity,
    item: CartItem,
  ): Promise<CartItem> => {
    const updatedCartItem = this.create({
      quantity,
      user: item.user,
      product: item.product,
    });
    await this.save(updatedCartItem);
    return updatedCartItem;
  };
}
