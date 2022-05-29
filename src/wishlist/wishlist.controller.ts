import { Body, Controller, Param, Post } from '@nestjs/common';
import { AddToWishlistDto } from './dto/addToWishlist';
import { Wishlist } from './wishlist.entity';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Post('/:userId')
  addToWishlist(
    @Body() wishlistDto: AddToWishlistDto,
    @Param('userId') userId: string,
  ): Promise<Wishlist> {
    return this.wishlistService.addToWishlist(wishlistDto, userId);
  }
}
