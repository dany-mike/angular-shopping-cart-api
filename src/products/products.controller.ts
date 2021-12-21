import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductCategoryDto } from './dto/product-category.dto';

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
  create(
    @Body() productDto: CreateProductDto,
    @Body() productCategoryDto: ProductCategoryDto,
  ) {
    console.log(productDto);
    console.log(productCategoryDto);
    return this.productsService.createProduct(productDto, productCategoryDto);
  }
}
