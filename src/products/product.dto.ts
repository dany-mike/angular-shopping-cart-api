import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  price: number;

  description: string;

  @IsNotEmpty()
  category: Category;

  image: string;
}

enum Category {
  ELECTRONICS = 'electronics',
  JEWELRY = 'jewelry',
  MENS_CLOTHING = "men's clothing",
  WOMENS_CLOTHING = "women's clothing",
}
