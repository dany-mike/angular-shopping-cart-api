import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Product } from 'src/products/product.entity';
import { AddToWishlistDto } from './dto/addToWishlist';
import { Wishlist } from './wishlist.entity';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  // TODO: check if role user here
  @Post(':userId')
  addToWishlist(
    @Body() wishlistDto: AddToWishlistDto,
    @Param('userId') userId: string,
  ): Promise<Wishlist> {
    return this.wishlistService.addToWishlist(wishlistDto, userId);
  }

  // TODO: add authorization here check if my tokenUser === userId
  @Get(':userId')
  getWishlistProducts(@Param('userId') userId: string): Promise<Product[]> {
    return this.wishlistService.getWishlistProducts(userId);
  }

  // TODO: add authorization here check if my tokenUser === userId
  @Delete(':userId/:productId')
  deleteWishlistItem(
    @Param('userId') userId,
    @Param('productId') productId,
  ): Promise<Wishlist> {
    return this.wishlistService.deleteWishlistItem(userId, productId);
  }
}
