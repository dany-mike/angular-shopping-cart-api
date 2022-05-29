import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Wishlist } from './wishlist.entity';
import { WishlistRepository } from './wishlist.repository';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist, WishlistRepository]),
    AuthModule,
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
