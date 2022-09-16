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
import { Role } from 'src/auth/enums/role.enum';
import RolesGuard from 'src/auth/guards/roles.guard';
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('')
  getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Get('/:id')
  getCategoryById(@Param('id') id: number): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Get('/n/:name')
  getCategoryByName(@Param('name') name: string): any {
    return this.categoryService.getCategoryByName(name);
  }

  // @Post()
  // @UseGuards(RolesGuard(Role.Admin))
  // @UseGuards(AuthGuard())
  // create(@Body() categoryDto: CreateCategoryDto): Promise<Category> {
  //   return this.categoryService.createCategory(categoryDto);
  // }

  // @Put(':id')
  // @UseGuards(RolesGuard(Role.Admin))
  // @UseGuards(AuthGuard())
  // updateCategory(
  //   @Param('id') id: number,
  //   @Body() categoryDto: CreateCategoryDto,
  // ): Promise<Category> {
  //   return this.categoryService.updateCategory(id, categoryDto);
  // }

  // @Delete(':id')
  // @UseGuards(RolesGuard(Role.Admin))
  // @UseGuards(AuthGuard())
  // deleteCategory(@Param('id') id: number) {
  //   return this.categoryService.deleteCategory(id);
  // }
}
