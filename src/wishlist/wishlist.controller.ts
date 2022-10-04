import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../auth/enums/role.enum';
import RolesGuard from '../auth/guards/roles.guard';
import { Product } from '../products/product.entity';
import { AddToWishlistDto } from './dto/addToWishlist';
import { Wishlist } from './wishlist.entity';
import { WishlistService } from './wishlist.service';

// TODO: Add acl
@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  // @Post(':userId')
  // @UseGuards(RolesGuard(Role.User))
  // @UseGuards(AuthGuard())
  // addToWishlist(
  //   @Body() wishlistDto: AddToWishlistDto,
  //   @Param('userId') userId: string,
  // ): Promise<Wishlist> {
  //   return this.wishlistService.addToWishlist(wishlistDto, userId);
  // }

  // @Get(':userId')
  // @UseGuards(RolesGuard(Role.User))
  // @UseGuards(AuthGuard())
  // getWishlistProducts(@Param('userId') userId: string): Promise<Product[]> {
  //   return this.wishlistService.getWishlistProducts(userId);
  // }

  // @Delete(':userId/:productId')
  // @UseGuards(RolesGuard(Role.User))
  // @UseGuards(AuthGuard())
  // deleteWishlistItem(
  //   @Param('userId') userId,
  //   @Param('productId') productId,
  // ): Promise<Wishlist> {
  //   return this.wishlistService.deleteWishlistItem(userId, productId);
  // }
}
