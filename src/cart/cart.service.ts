import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { ProductsService } from 'src/products/products.service';
import { CartItem } from './cart-item.entity';
import { CartItemRepository } from './cart-item.repository';
// import { CartItem } from './cart-item.entity';
import { AddProductDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItemRepository)
    private cartItemRepository: CartItemRepository,
    private productsService: ProductsService,
    private authService: AuthService,
  ) {}

  async findCartItemByUserAndProduct(user, product): Promise<CartItem> {
    return this.cartItemRepository.findOne({
      where: {
        product,
        user,
      },
    });
  }

  updateCartItemQuantity(addedQuantity, cartItem: CartItem): Promise<CartItem> {
    const totalQty = cartItem.quantity + addedQuantity;
    const updatedCartItem = this.cartItemRepository.updateCartItemQuantity(
      totalQty,
      cartItem,
    );
    return updatedCartItem;
  }

  createCartItem(addedQuantity, product, user): Promise<CartItem> {
    return this.cartItemRepository.createCartItem(addedQuantity, product, user);
  }

  async addProduct(addProductDto: AddProductDto): Promise<CartItem> {
    const { productId, userId, addedQuantity } = addProductDto;
    const product = await this.productsService.getProductById(productId);
    const user = await this.authService.getUserById(userId);
    const cartItem = await this.findCartItemByUserAndProduct(product, user);

    const result = cartItem
      ? this.updateCartItemQuantity(addedQuantity, cartItem)
      : this.createCartItem(addedQuantity, product, user);

    return result;
  }
  // @Autowired
  // private CartItemRepository cartItemRepository;
  // @Autowired
  // private BookRepository bookRepository;
  // public List<CartItem> getCartItemsUser(User user) {
  //     return cartItemRepository.findByUser(user);
  // };
  // public Integer addBook(Long bookId, Integer quantity, User user) {
  //     Integer addedQuantity = quantity;
  //     Book book = bookRepository.findById(bookId).get();
  //     CartItem cartItem = cartItemRepository.findByUserAndBook(user, book);
  //     if (cartItem != null) {
  //         addedQuantity = quantity;
  //         cartItem.setQuantity(addedQuantity);
  //     } else {
  //         cartItem = new CartItem();
  //         cartItem.setQuantity(quantity);
  //         cartItem.setUser(user);
  //         cartItem.setBook(book);
  //     }
  //     cartItemRepository.save(cartItem);
  //     return addedQuantity;
  // }
  // public float updateQuantity(Long bookId, Integer quantity, User user) {
  //     cartItemRepository.updateQuantity(quantity, bookId, user.getId());
  //     Book book = bookRepository.findById(bookId).get();
  //     float subtotal = book.getPrice() * quantity;
  //     return subtotal;
  // }
  // public void removeBook(Long bookId, User user) {
  //     cartItemRepository.deleteByUserAndBook(user.getId(), bookId);
  // }
  // public void confirmOrder(User user) {
  //     List<CartItem> cartItems = getCartItemsUser(user);
  //     for (CartItem item : cartItems) {
  //         updateInventory(item);
  //     }
  //     deleteUserCartItem(user.getId());
  // }
  // private void updateInventory(CartItem item) {
  //     Book book = bookRepository.findById(item.getBook().getId()).get();
  //     Integer updatedQuantity = book.getQty() - item.getQuantity();
  //     bookRepository.updateQuantity(updatedQuantity, book.getId());
  // }
  // private void deleteUserCartItem(Long userId) {
  //     cartItemRepository.deleteUserCartItem(userId);
  // }
}
