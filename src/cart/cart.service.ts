import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Product } from 'src/products/product.entity';
import { ProductsRepository } from 'src/products/products.repository';
import { ProductsService } from 'src/products/products.service';
import { CartItem } from './cart-item.entity';
import { CartItemRepository } from './cart-item.repository';
import { AddProductDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItemRepository)
    private cartItemRepository: CartItemRepository,
    private productsService: ProductsService,
    private authService: AuthService,
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
  ) {}

  async findCartItemByUserAndProduct(user, product): Promise<CartItem> {
    return await this.cartItemRepository.findOne({
      where: {
        product,
        user,
      },
    });
  }

  async updateCartItemQuantity(
    addedQuantity,
    cartItem: CartItem,
  ): Promise<CartItem> {
    const totalQty = cartItem.quantity + addedQuantity;
    const updatedCartItem =
      await this.cartItemRepository.updateCartItemQuantity(totalQty, cartItem);
    return updatedCartItem;
  }

  async createCartItem(
    addedQuantity,
    product: Product,
    user,
  ): Promise<CartItem> {
    return await this.cartItemRepository.createCartItem(
      addedQuantity,
      product,
      user,
      product.quantity,
    );
  }

  async addProduct(addProductDto: AddProductDto): Promise<any> {
    const { productId, userId, addedQuantity } = addProductDto;
    const product = await this.productsService.getProductById(productId);
    const user = await this.authService.getUserById(userId);
    const cartItem = await this.findCartItemByUserAndProduct(user, product);

    await this.updateProductQuantity(productId, addedQuantity);

    const result = cartItem
      ? await this.updateCartItemQuantity(addedQuantity, cartItem)
      : await this.createCartItem(addedQuantity, product, user);

    return result;
  }

  async updateProductQuantity(productId, addedQuantity): Promise<void> {
    const product = await this.productsService.getProductById(productId);
    const updatedQuantity = product.quantity - addedQuantity;
    await this.productsRepository.updateProductQuantity(
      updatedQuantity,
      product,
    );
  }
}
