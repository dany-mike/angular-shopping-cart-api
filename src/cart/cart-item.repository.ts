import { EntityRepository, Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';

@EntityRepository(CartItem)
export class CartItemRepository extends Repository<CartItem> {
  createCartItem = async (
    addedQuantity,
    product,
    user,
    productQuantity,
  ): Promise<CartItem> => {
    const cartItem = this.create({
      product: {
        quantity: productQuantity - addedQuantity,
        ...product,
      },
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
      user: item.user,
      product: {
        ...item.product,
        quantity,
      },
    });
    await this.save(updatedCartItem);
    return updatedCartItem;
  };
}
