import { Body, Controller, Post } from '@nestjs/common';
import { AddProductQuantity } from './dto/addProductQuantity.dto';
import { QuantityService } from './quantity.service';

@Controller('quantity')
export class QuantityController {
  //   constructor(private quantityService: QuantityService) {}
  //   @Post('')
  //   addProductQuantity(@Body() addProductQuantity: AddProductQuantity) {
  //     return this.quantityService.addProductQuantity(addProductQuantity);
  //   }
}
