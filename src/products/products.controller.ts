import {
  // Body,
  Controller,
  // Delete,
  Get,
  Param,
  // Post,
  // Put,
  // UseGuards,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
// import { Role } from '../auth/enums/role.enum';
// import RolesGuard from '../auth/guards/roles.guard';
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

  @Get('/c/:category')
  getProductsByCategory(
    @Param('category') categoryId: number,
  ): Promise<Product[]> {
    return this.productsService.getProductsByCategory(categoryId);
  }

  // @Post()
  // @UseGuards(RolesGuard(Role.Admin))
  // @UseGuards(AuthGuard())
  // create(@Body() productDto: CreateProductDto): Promise<Product> {
  //   return this.productsService.createProduct(productDto);
  // }

  // @Put(':id')
  // @UseGuards(RolesGuard(Role.Admin))
  // @UseGuards(AuthGuard())
  // updateProduct(
  //   @Param('id') id: number,
  //   @Body() productDto: CreateProductDto,
  // ): Promise<Product> {
  //   return this.productsService.updateProduct(id, productDto);
  // }

  // @Delete(':id')
  // @UseGuards(RolesGuard(Role.Admin))
  // @UseGuards(AuthGuard())
  // deleteProduct(@Param('id') id: number) {
  //   return this.productsService.deleteProduct(id);
  // }
}
