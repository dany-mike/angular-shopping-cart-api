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
  orderItemsDto: OrderItemDto[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userToken: string;
}

export class CompleteOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  billingAddressId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  shippingAddressId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userToken: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}

export class CancelOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userToken: string;
}

export class PayOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userToken: string;
}

export class OrderItemDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
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
