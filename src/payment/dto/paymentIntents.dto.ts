import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentIntentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  orderId: number;
}
