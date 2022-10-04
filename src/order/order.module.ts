import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from '../address/address.module';
import { AuthModule } from '../auth/auth.module';
import { ProductsModule } from '../products/products.module';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { OrderItemRepository } from './orderItem.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderRepository, OrderItemRepository]),
    AuthModule,
    AddressModule,
    ProductsModule,
    PassportModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
