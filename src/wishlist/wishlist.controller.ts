import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Product } from 'src/products/product.entity';
import { AddToWishlistDto } from './dto/addToWishlist';
import { Wishlist } from './wishlist.entity';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Post(':userId')
  addToWishlist(
    @Body() wishlistDto: AddToWishlistDto,
    @Param('userId') userId: string,
  ): Promise<Wishlist> {
    return this.wishlistService.addToWishlist(wishlistDto, userId);
  }

  @Get(':userId')
  getWishlistProducts(@Param('userId') userId: string): Promise<Product[]> {
    return this.wishlistService.getWishlistProducts(userId);
  }

  @Delete(':userId/:productId')
  deleteWishlistItem(
    @Param('userId') userId,
    @Param('productId') productId,
  ): void {
    this.wishlistService.deleteWishlistItem(userId, productId);
  }
}
