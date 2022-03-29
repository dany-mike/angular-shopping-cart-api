import { Module, HttpModule } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Product, ProductsRepository]),
    AuthModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
