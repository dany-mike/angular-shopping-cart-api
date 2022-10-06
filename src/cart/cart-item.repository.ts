import { User } from '../auth/user.entity';
import { Product } from '../products/product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';

@EntityRepository(CartItem)
export class CartItemRepository extends Repository<CartItem> {
  createCartItem = async (
    addedQuantity,
    product: Product,
    user: User,
  ): Promise<CartItem> => {
    const cartItem = this.create({
      user,
      product: {
        ...product,
        quantity: product.quantity - addedQuantity,
      },
      quantity: addedQuantity,
    });

    await this.save(cartItem);
    return cartItem;
  };

  updateCartItemQuantity = async (
    addedQuantity,
    item: CartItem,
  ): Promise<CartItem> => {
    const updatedCartItem = this.create({
      id: item.id,
      user: item.user,
      product: item.product,
      quantity: item.quantity + addedQuantity,
    });
    await this.save(updatedCartItem);
    return updatedCartItem;
  };

  deleteUserCartItems = async (user: User): Promise<CartItem[]> => {
    this.delete({ user });
    return await this.find({
      where: { user },
    });
  };

  deleteUserCartItem = async (
    user: User,
    product: Product,
  ): Promise<CartItem> => {
    this.delete({ user, product });
    return await this.findOne({
      where: { product, user },
    });
  };
}
