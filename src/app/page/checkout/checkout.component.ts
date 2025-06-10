import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface CartItem {
  book: {
    id: string;
    name: string;
    price: number;
    image: string;
    authors: { name: string }[];
  };
  quantity: number;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];

  shippingInfo = {
    name: '',
    address: '',
    phone: '',
    email: '',
  };

  paymentMethod = 'cod';
  orderConfirmed = false;

  ngOnInit() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems = JSON.parse(cart);
    }
  }

  get subtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.book.price * item.quantity, 0);
  }
  get shipping(): number {
    return this.subtotal > 50 ? 0 : 5.99;
  }
  get total(): number {
    return this.subtotal + this.shipping;
  }

  confirmOrder() {
    this.orderConfirmed = true;
  }
}
