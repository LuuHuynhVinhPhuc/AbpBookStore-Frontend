import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface CartItem {
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  cartItems: CartItem[] = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 15.99,
      quantity: 1,
      image: 'assets/images/book1.jpg',
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 12.99,
      quantity: 2,
      image: 'assets/images/book2.jpg',
    },
  ];

  updateQuantity(item: CartItem, change: number) {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      item.quantity = newQuantity;
    }
  }

  removeItem(item: CartItem) {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
  }

  get subtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  get shipping(): number {
    return this.subtotal > 50 ? 0 : 5.99;
  }

  get total(): number {
    return this.subtotal + this.shipping;
  }
}
