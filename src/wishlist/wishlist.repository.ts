import { EntityRepository, Repository } from 'typeorm';
import { AddToWishlistDto } from './dto/addToWishlist';
import { Wishlist } from './wishlist.entity';

@EntityRepository(Wishlist)
export class WishlistRepository extends Repository<Wishlist> {
  addToWishlist = async (
    wishlistDto: AddToWishlistDto,
    userId,
  ): Promise<Wishlist> => {
    const { productId } = wishlistDto;

    const wishlist = this.create({
      userId,
      productId: productId,
    });

    await this.save(wishlist);
    return wishlist;
  };
  getWishlistItemsByUserId = async (userId): Promise<Wishlist[]> => {
    const wishlist = await this.find({
      where: {
        userId,
      },
    });
    return wishlist;
  };
}
