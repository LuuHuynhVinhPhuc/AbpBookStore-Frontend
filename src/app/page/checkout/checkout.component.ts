import { ConfirmationService } from '@abp/ng.theme.shared';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookDTO } from '@proxy/marcus/book-store/books/dtos';
import { CartService } from '../card/services/cart.service';

interface CartItemWithBook {
  book: BookDTO;
  quantity: number;
  selected: boolean;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: CartItemWithBook[] = [];
  orderConfirmed = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private confirmationService: ConfirmationService
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]],
      email: ['', [Validators.required, Validators.email]],
      paymentMethod: ['Cash', Validators.required],
    });
  }

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  toggleItemSelection(bookId: string) {
    this.cartService.toggleItemSelection(bookId);
  }

  get selectedItems(): CartItemWithBook[] {
    return this.cartItems.filter((item) => item.selected);
  }

  get subtotal(): number {
    return this.cartService.getSelectedTotalPrice();
  }

  get shipping(): number {
    return this.subtotal > 500000 ? 0 : 30000; // Free shipping for orders over 500,000 VND
  }

  get total(): number {
    return this.subtotal + this.shipping;
  }

  get formControls() {
    return this.checkoutForm.controls;
  }

  calculateTotal(): number {
    return this.selectedItems.reduce((total, item) => {
      return total + item.book.price * item.quantity;
    }, 0);
  }

  confirmOrder() {
    if (this.isSubmitting) return;

    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    if (this.selectedItems.length === 0) {
      alert('please choose one product to checkout');
      return;
    }

    this.isSubmitting = true;

    this.confirmationService
      .warn('Do you want to confirm this payment', 'Confirm payment', {
        messageLocalizationParams: [this.calculateTotal().toString()],
      })
      .subscribe((status) => {
        if (status === 'confirm') {
          const orderData = {
            ...this.checkoutForm.value,
          };

          this.cartService.createCheckout(orderData).subscribe({
            next: (response) => {
              this.orderConfirmed = true;
              this.cartService.removeSelectedItems();
            },
            error: (error) => {
              console.error('Error creating order:', error);
              this.isSubmitting = false;
            },
          });
        } else {
          this.isSubmitting = false;
        }
      });
  }
}
