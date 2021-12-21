import { Controller, Get, Param, Post, Body, Logger } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { ProductDto } from './product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(): Observable<AxiosResponse<Product[]>> {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(
    @Param('id') id: number,
  ): Observable<AxiosResponse<Product[]>> {
    return this.productsService.getProductById(id);
  }

  @Post()
  create(@Body() productDto: ProductDto): Promise<Product> {
    Logger.log('TEST');
    return this.productsService.createProduct(productDto);
  }
}
