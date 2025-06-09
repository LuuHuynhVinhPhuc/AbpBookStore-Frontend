import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  product: Book | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {
    // Lấy id từ route và giả lập dữ liệu
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Dữ liệu mẫu, sau này thay bằng API
    const books: Book[] = [
      {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        price: 15.99,
        image: 'assets/images/book1.jpg',
        description:
          'A classic novel set in the Roaring Twenties, exploring themes of wealth, love, and the American Dream.',
      },
      {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        price: 12.99,
        image: 'assets/images/book2.jpg',
        description:
          'A powerful story about racial injustice and childhood innocence in the Deep South.',
      },
      {
        id: 3,
        title: '1984',
        author: 'George Orwell',
        price: 14.99,
        image: 'assets/images/book3.jpg',
        description: 'A dystopian novel about totalitarianism, surveillance, and freedom.',
      },
      {
        id: 4,
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        price: 11.99,
        image: 'assets/images/book4.jpg',
        description:
          'A romantic novel that also critiques the British landed gentry at the end of the 18th century.',
      },
    ];
    this.product = books.find(b => b.id === id);
  }

  addToCart() {
    // TODO: Thêm vào giỏ hàng (tùy ý)
    alert('Đã thêm vào giỏ hàng!');
  }

  buyNow() {
    // TODO: Thêm vào giỏ hàng (tùy ý)
    this.router.navigate(['/card']);
  }
}
