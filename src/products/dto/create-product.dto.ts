import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  description: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  image: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  categoryId: number;
}
