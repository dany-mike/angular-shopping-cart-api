import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { OrderItemDto } from 'src/order/dto/order.dto';
export class SendInvoiceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userToken: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItemsDto: OrderItemDto[];
}
