import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { ProductsService } from 'src/products/products.service';
import { AddToWishlistDto } from './dto/addToWishlist';
import { Wishlist } from './wishlist.entity';
import { WishlistRepository } from './wishlist.repository';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(WishlistRepository)
    private wishlistRepository: WishlistRepository,
    private productsService: ProductsService,
  ) {}
  async addToWishlist(
    addToWishlistDto: AddToWishlistDto,
    userId: string,
  ): Promise<Wishlist> {
    const { productId } = addToWishlistDto;
    const wishlistItems = await this.wishlistRepository.find({
      where: { userId },
    });

    wishlistItems.forEach((item) => {
      if (item.productId === productId) {
        throw new ConflictException(
          `Product with id: ${productId} is already in the wishlist`,
        );
      }
    });
    return this.wishlistRepository.addToWishlist(addToWishlistDto, userId);
  }

  async getWishlistProducts(userId: string): Promise<Product[]> {
    const wishlistProducts =
      await this.wishlistRepository.getWishlistItemsByUserId(userId);

    const productsIds = [];
    wishlistProducts.forEach((product) => {
      productsIds.push(product.productId);
    });

    const products = await this.productsService.findProductsByIds(productsIds);

    return products;
  }

  async deleteWishlistItem(
    userId: number,
    productId: number,
  ): Promise<Wishlist> {
    const wishlistItem = await this.wishlistRepository.findOne({
      where: { userId, productId },
    });

    if (!wishlistItem) {
      throw new NotFoundException(
        `Wishlist item with userId: ${userId} and productId: ${productId} not found`,
      );
    }

    await this.wishlistRepository.delete(wishlistItem.id);
    return wishlistItem;
  }
}
