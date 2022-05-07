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
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('')
  getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Get('/:id')
  getProductById(@Param('id') id: number): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() productDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(productDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  updateProduct(
    @Param('id') id: number,
    @Body() productDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, productDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteProduct(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
