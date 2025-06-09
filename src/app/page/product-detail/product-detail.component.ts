import { ToasterService } from '@abp/ng.theme.shared';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '@proxy/marcus/book-store/books';
import { BookDTO } from '@proxy/marcus/book-store/books/dtos';
import { CartService } from '../card/services/cart.service';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  description: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  product: Book | undefined;

  private readonly router = inject(Router);
  private readonly activeRouter = inject(ActivatedRoute);
  private productService = inject(BookService);
  private cartService = inject(CartService);
  private toaster = inject(ToasterService);

  public data: BookDTO;
  public bookID: string;

  ngOnInit(): void {
    this.bookID = this.activeRouter.snapshot.paramMap.get('id');
    this.getBook();
  }

  // get book by id
  getBook() {
    this.productService.get(this.bookID).subscribe(res => {
      this.data = res;
    });
  }

  addToCart() {
    if (this.data) {
      this.cartService.addToCart(this.data);
      this.toaster.success('Product is added successfully!', 'Congras');
    }
  }

  buyNow() {
    if (this.data) {
      this.cartService.addToCart(this.data);
      this.router.navigate(['/checkout']);
    }
  }
}
