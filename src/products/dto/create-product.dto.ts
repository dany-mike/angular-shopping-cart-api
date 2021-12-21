import { IsNotEmpty } from 'class-validator';
import { Category } from '../product.model';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  price: number;

  description: string;

  @IsNotEmpty()
  category: Category;

  image: string;
}
