import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('')
  getProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get('/:id')
  getProductById(@Param('id') id: number): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() productDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(productDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  updateProduct(
    @Param('id') id: number,
    @Body() productDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, productDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteProduct(@Param('id') id: number) {
    return this.productsService.deleteProduct(id);
  }
}
