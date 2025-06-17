import { AuthService } from '@abp/ng.core';
import { ConfirmationService } from '@abp/ng.theme.shared';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartItem, CartService } from './services/cart.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  toggleItemSelection(bookId: string) {
    this.cartService.toggleItemSelection(bookId);
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

  get selectedItemsCount(): number {
    return this.cartItems.filter((item) => item.selected).length;
  }

  get selectedSubtotal(): number {
    return this.cartService.getSelectedTotalPrice();
  }

  get shipping(): number {
    return this.selectedSubtotal > 500000 ? 0 : 30000; // Free shipping for orders over 500,000 VND
  }

  get selectedTotal(): number {
    return this.selectedSubtotal + this.shipping;
  }

  checkLogin() {
    if (!this.authService.isAuthenticated) {
      this.confirmationService
        .warn('::You need to login to continue', '::Do you want to login now?')
        .subscribe((status) => {
          if (status === 'confirm') {
            const returnUrl = encodeURIComponent('/checkout');
            window.location.href = `https://localhost:44332/Account/Login?returnUrl=${returnUrl}`;
          }
        });
      return false;
    }
    this.router.navigate(['/checkout']);
    return true;
  }
}
