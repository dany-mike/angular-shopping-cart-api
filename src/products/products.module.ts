import { Module, HttpModule } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Product, ProductsRepository]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
