import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/user.entity';
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

  async findCartItemsByUser(user): Promise<CartItem[]> {
    return await this.cartItemRepository.find({
      where: {
        user,
      },
    });
  }

  async updateCartItemQuantity(
    addedQuantity,
    cartItem: CartItem,
  ): Promise<CartItem> {
    const updatedCartItem =
      await this.cartItemRepository.updateCartItemQuantity(
        addedQuantity,
        cartItem,
      );
    return updatedCartItem;
  }

  async createCartItem(
    addedQuantity,
    product: Product,
    user: User,
  ): Promise<CartItem> {
    return await this.cartItemRepository.createCartItem(
      addedQuantity,
      product,
      user,
    );
  }

  async deleteUserCartItem(
    userId: string,
    productId: number,
  ): Promise<CartItem> {
    const user = await this.authService.getUserByid(userId);
    const product = await this.productsService.getProductById(productId);

    const cartItem = await this.getCartItem(userId, productId);

    if (cartItem) {
      const result = await this.cartItemRepository.deleteUserCartItem(
        user,
        product,
      );

      this.addDeletedCartItemInProductStock(
        product.quantity + result.quantity,
        product,
      );

      return result;
    }
  }

  async getProductsCartItems(user: User) {
    const productsCartItems = await this.cartItemRepository.find({
      relations: ['product'],
      where: { user },
    });

    if (!productsCartItems) {
      throw new BadRequestException(`Products cannot be found`);
    }

    return productsCartItems;
  }
  async deleteUserCartItems(userId: string): Promise<void> {
    const user = await this.authService.getUserByid(userId);
    await this.cartItemRepository.deleteUserCartItems(user);
    const cartItems: CartItem[] = await this.getProductsCartItems(user);

    const products: Product[] = cartItems.map((item) => {
      item.product.quantity = item.product.quantity + item.quantity;
      return item.product;
    });

    await this.addDeletedCartItemsInProductStock(products);
  }

  async addProduct(addProductDto: AddProductDto): Promise<CartItem> {
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

  async getCartItem(userId, productId): Promise<CartItem> {
    const product = await this.productsService.getProductById(productId);
    const user = await this.authService.getUserById(userId);

    const cartItem = await this.cartItemRepository.findOne({
      where: { user, product },
    });

    if (!cartItem) {
      throw new BadRequestException(`Cart item not found`);
    }

    return cartItem;
  }

  async getCartItems(userId): Promise<CartItem[]> {
    const user = await this.authService.getUserById(userId);
    return this.cartItemRepository.find({
      where: { user },
    });
  }

  async addDeletedCartItemInProductStock(
    updatedQuantity,
    product,
  ): Promise<void> {
    await this.productsRepository.updateProductQuantity(
      updatedQuantity,
      product,
    );
  }

  async addDeletedCartItemsInProductStock(updatedProducts): Promise<void> {
    await this.productsRepository.updateProductQuantities(updatedProducts);
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
