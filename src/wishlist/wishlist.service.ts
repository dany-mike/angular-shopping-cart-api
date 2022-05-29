import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddToWishlistDto } from './dto/addToWishlist';
import { Wishlist } from './wishlist.entity';
import { WishlistRepository } from './wishlist.repository';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(WishlistRepository)
    private wishlistRepository: WishlistRepository,
  ) {}
  async addToWishlist(
    addToWishlistDto: AddToWishlistDto,
    userId: string,
  ): Promise<Wishlist> {
    return this.wishlistRepository.addToWishlist(addToWishlistDto, userId);
  }
}
