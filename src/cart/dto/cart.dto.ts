import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  addedQuantity: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId: number;
}
