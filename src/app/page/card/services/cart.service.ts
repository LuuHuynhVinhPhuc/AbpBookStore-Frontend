import { Injectable } from '@angular/core';
import { BookDTO } from '@proxy/marcus/book-store/books/dtos';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  book: BookDTO;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    // Load cart from localStorage on service initialization
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  addToCart(book: BookDTO) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.book.id === book.id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { book, quantity: 1 }]);
    }

    this.saveCart();
  }

  removeFromCart(bookId: string) {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.book.id !== bookId);
    this.cartItems.next(updatedItems);
    this.saveCart();
  }

  updateQuantity(bookId: string, quantity: number) {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.book.id === bookId);
    if (item) {
      item.quantity = quantity;
      this.cartItems.next([...currentItems]);
      this.saveCart();
    }
  }

  clearCart() {
    this.cartItems.next([]);
    this.saveCart();
  }

  getTotalItems(): number {
    return this.cartItems.value.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.value.reduce((total, item) => total + item.book.price * item.quantity, 0);
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
  }
}
