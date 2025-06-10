import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartItem, CartService } from './services/cart.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  private cartService = inject(CartService);
  cartItems: CartItem[] = [];

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  updateQuantity(item: CartItem, change: number) {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      this.cartService.updateQuantity(item.book.id, newQuantity);
    }
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.book.id);
  }

  get subtotal(): number {
    return this.cartService.getTotalPrice();
  }

  get shipping(): number {
    return this.subtotal > 50 ? 0 : 5.99;
  }

  get total(): number {
    return this.subtotal + this.shipping;
  }
}
