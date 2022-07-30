import { Injectable } from '@nestjs/common';
// import { CartItem } from './cart-item.entity';
import { AddProductDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  addProduct(addProductDto: AddProductDto) {
    const { productId, userId, quantity } = addProductDto;
    console.log('add product');

    // FindProductById

    // FindCartItemByUserAndProduct
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
