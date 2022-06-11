import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderService } from 'src/order/order.service';
import { ProductsService } from 'src/products/products.service';
import { Quantity } from './quantity.entity';
import { QuantityRepository } from './quantity.repository';

@Injectable()
export class QuantityService {
  constructor(
    @InjectRepository(QuantityRepository)
    private quantityRepository: QuantityRepository,
    private productsService: ProductsService,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
  ) {}
  async addProductQuantity(
    quantity: number,
    orderId: number,
    productId: number,
  ): Promise<Quantity> {
    const product = await this.productsService.getProductById(productId);
    const order = await this.orderService.getOrderById(orderId);
    return this.quantityRepository.addProductQuantity(quantity, order, product);
  }

  async getProductsQuantity(orderId: number): Promise<Quantity[]> {
    const order = await this.orderService.getOrderById(orderId);
    return await this.quantityRepository.find({
      where: {
        order,
      },
      relations: ['product'],
    });
  }
}
