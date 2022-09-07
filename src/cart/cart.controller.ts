import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartItem } from './cart-item.entity';
// import { CartItem } from './cart-item.entity';
import { CartService } from './cart.service';
import { AddProductDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('/items/:userId/:productId')
  getCartItem(
    @Param('userId') userId: string,
    @Param('productId') productId: number,
  ) {
    return this.cartService.getCartItem(userId, productId);
  }

  @Get('/items/:userId')
  getCartItems(@Param('userId') userId: string) {
    return this.cartService.getCartItems(userId);
  }

  @Post()
  addProduct(@Body() addProductDto: AddProductDto): Promise<CartItem> {
    return this.cartService.addProduct(addProductDto);
  }

  @Delete('/:userId/:productId')
  deleteUserCartItem(
    @Param('userId') userId: string,
    @Param('productId') productId: number,
  ) {
    return this.cartService.deleteUserCartItem(userId, productId);
  }

  @Delete(':userId')
  deleteUserCartItems(@Param('userId') userId: string) {
    return this.cartService.deleteUserCartItems(userId);
  }
}
