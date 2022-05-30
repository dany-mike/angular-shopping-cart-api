import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductsRepository]),
    AuthModule,
    CategoryModule,
  ],
  controllers: [ProductsController],
  exports: [ProductsService],
  providers: [ProductsService],
})
export class ProductsModule {}
