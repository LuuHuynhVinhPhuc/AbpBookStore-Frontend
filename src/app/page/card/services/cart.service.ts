import { Injectable } from '@angular/core';
import { BookDTO } from '@proxy/marcus/book-store/books/dtos';
import { OrderCreateAndUpdateDTO } from '@proxy/marcus/book-store/orders/dtos';
import { OrderService } from '@proxy/marcus/book-store/orders/order.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

export interface CartItem {
  book: BookDTO;
  quantity: number;
  selected: boolean;
}

export interface ShippingInfo {
  fullName: string;
  address: string;
  phone: string;
  email: string;
  paymentMethod: string;
}

export interface CreateOrderDTO {
  fullName: string;
  address: string;
  phone: string;
  email: string;
  paymentMethod: string;
  totalPrice: number;
  orderItems: {
    bookId: string;
    quantity: number;
    unitPrice: number;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor(private orderService: OrderService) {
    // Load cart from localStorage on service initialization
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Ensure parsedCart is an array
        if (Array.isArray(parsedCart)) {
          this.cartItems.next(parsedCart);
        } else {
          console.error('Invalid cart data structure, initializing empty cart');
          this.cartItems.next([]);
        }
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        this.cartItems.next([]);
      }
    } else {
      this.cartItems.next([]);
    }
  }

  addToCart(book: BookDTO) {
    if (!book || !book.id) {
      console.error('Invalid book data:', book);
      return;
    }

    const currentItems = [...this.cartItems.value];
    const existingItem = currentItems.find((item) => item.book.id === book.id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems.next(currentItems);
    } else {
      this.cartItems.next([...currentItems, { book, quantity: 1, selected: false }]);
    }

    this.saveCart();
  }

  removeFromCart(bookId: string) {
    if (!bookId) {
      console.error('Invalid bookId:', bookId);
      return;
    }

    const currentItems = [...this.cartItems.value];
    const updatedItems = currentItems.filter((item) => item.book.id !== bookId);
    this.cartItems.next(updatedItems);
    this.saveCart();
  }

  updateQuantity(bookId: string, quantity: number) {
    if (!bookId || quantity <= 0) {
      console.error('Invalid parameters:', { bookId, quantity });
      return;
    }

    const currentItems = [...this.cartItems.value];
    const item = currentItems.find((item) => item.book.id === bookId);
    if (item) {
      item.quantity = quantity;
      this.cartItems.next(currentItems);
      this.saveCart();
    }
  }

  clearCart() {
    this.cartItems.next([]);
    this.saveCart();
  }

  getTotalItems(): number {
    const items = this.cartItems.value;
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    const items = this.cartItems.value;
    return items.reduce((total, item) => total + item.book.price * item.quantity, 0);
  }

  toggleItemSelection(bookId: string) {
    if (!bookId) {
      console.error('Invalid bookId:', bookId);
      return;
    }

    const currentItems = [...this.cartItems.value];
    const item = currentItems.find((item) => item.book.id === bookId);
    if (item) {
      item.selected = !item.selected;
      this.cartItems.next(currentItems);
      this.saveCart();
    }
  }

  getSelectedItems(): CartItem[] {
    return this.cartItems.value.filter((item) => item.selected);
  }

  getSelectedTotalPrice(): number {
    return this.cartItems.value
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.book.price * item.quantity, 0);
  }

  removeSelectedItems() {
    const currentItems = [...this.cartItems.value];
    const updatedItems = currentItems.filter((item) => !item.selected);
    this.cartItems.next(updatedItems);
    this.saveCart();
  }

  private saveCart() {
    try {
      const cartData = this.cartItems.value;
      localStorage.setItem('cart', JSON.stringify(cartData));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  public createCheckout(shippingInfo: ShippingInfo): Observable<any> {
    const selectedItems = this.getSelectedItems();

    if (!selectedItems || selectedItems.length === 0) {
      console.error('Cannot create checkout: No items selected');
      return throwError(() => new Error('No items selected'));
    }

    // Transform selected cart items to match API format
    const orderItems = selectedItems.map((item) => ({
      bookId: item.book.id,
      quantity: item.quantity,
      unitPrice: item.book.price,
    }));

    const orderData: OrderCreateAndUpdateDTO = {
      fullName: shippingInfo.fullName,
      userID: '4795315E-3ECD-FF24-71CA-3A1A8927FF97',
      address: shippingInfo.address,
      phone: shippingInfo.phone,
      email: shippingInfo.email,
      paymentMethod: shippingInfo.paymentMethod,
      orderItems: orderItems,
    };

    return this.orderService.create(orderData);
  }
}
