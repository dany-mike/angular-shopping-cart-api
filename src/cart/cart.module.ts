import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsModule } from 'src/products/products.module';
import { CartItem } from './cart-item.entity';
import { CartItemRepository } from './cart-item.repository';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItem, CartItemRepository]),
    AuthModule,
    ProductsModule,
  ],
  controllers: [CartController],
  exports: [CartService],
  providers: [CartService],
})
export class CartModule {}
