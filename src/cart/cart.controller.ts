import { Body, Controller, Post } from '@nestjs/common';
// import { CartItem } from './cart-item.entity';
import { CartService } from './cart.service';
import { AddProductDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  //   TODO: add type
  @Post()
  addProduct(@Body() addProductDto: AddProductDto) {
    return this.cartService.addProduct(addProductDto);
  }
}
