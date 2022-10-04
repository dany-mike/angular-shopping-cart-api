import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Product } from '../products/product.entity';
import { ProductsModule } from '../products/products.module';
import { ProductsRepository } from '../products/products.repository';
import { CartItem } from './cart-item.entity';
import { CartItemRepository } from './cart-item.repository';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartItem,
      CartItemRepository,
      Product,
      ProductsRepository,
    ]),
    AuthModule,
    ProductsModule,
  ],
  controllers: [CartController],
  exports: [CartService],
  providers: [CartService],
})
export class CartModule {}
