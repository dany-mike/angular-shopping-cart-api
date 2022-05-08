import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  price: number;

  @IsOptional()
  description: string;

  @IsOptional()
  image: string;

  @IsOptional()
  categoryId: number;
}
