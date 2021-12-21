import { IsEnum } from 'class-validator';
import { Category } from '../product.model';

export class ProductCategoryDto {
  @IsEnum(Category)
  category: Category;
}
