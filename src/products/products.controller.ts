import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
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

  @Get('/db')
  getProductsFromDB(): Promise<Product[]> {
    return this.productsService.getProductsFromDb();
  }

  @Get('/db/:id')
  getProductByIdFromDB(@Param('id') id: number): Promise<Product> {
    return this.productsService.getProductByIdFromDb(id);
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
  ): Promise<Product> {
    return this.productsService.createProduct(productDto, productCategoryDto);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: number,
    @Body() productDto: CreateProductDto,
    @Body() productCategoryDto: ProductCategoryDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(
      id,
      productDto,
      productCategoryDto,
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productsService.deleteProduct(id);
  }
}
