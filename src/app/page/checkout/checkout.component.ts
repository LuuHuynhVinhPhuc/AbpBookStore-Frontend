import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  cartItems: CartItem[] = [
    {
      id: 1,
      title: 'The Great Gatsby',
      price: 15.99,
      quantity: 1,
      image: 'assets/images/book1.jpg',
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      price: 12.99,
      quantity: 2,
      image: 'assets/images/book2.jpg',
    },
  ];

  shippingInfo = {
    name: '',
    address: '',
    phone: '',
    email: '',
  };

  paymentMethod = 'cod';
  orderConfirmed = false;

  get subtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
