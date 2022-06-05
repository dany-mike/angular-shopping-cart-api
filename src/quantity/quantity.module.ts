import { forwardRef, Module } from '@nestjs/common';
import { QuantityService } from './quantity.service';
import { QuantityController } from './quantity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quantity } from './quantity.entity';
import { QuantityRepository } from './quantity.repository';
import { ProductsModule } from 'src/products/products.module';
import { OrderModule } from 'src/order/order.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Quantity, QuantityRepository]),
    forwardRef(() => OrderModule),
    ProductsModule,
  ],
  providers: [QuantityService],
  controllers: [QuantityController],
  exports: [QuantityService],
})
export class QuantityModule {}
