import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../order.entity';

import { Type } from 'class-transformer';

export class OrderDto {
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userToken: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  billingAddressId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  shippingAddressId: number;
}
export class OrderItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
