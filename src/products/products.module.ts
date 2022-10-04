import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductsRepository]),
    AuthModule,
    CategoryModule,
    PassportModule,
  ],
  controllers: [ProductsController],
  exports: [ProductsService],
  providers: [ProductsService],
})
export class ProductsModule {}
