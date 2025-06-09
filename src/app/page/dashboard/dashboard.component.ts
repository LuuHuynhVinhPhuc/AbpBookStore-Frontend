import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  featuredBooks: Book[] = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 15.99,
      image: 'assets/images/book1.jpg',
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 12.99,
      image: 'assets/images/book2.jpg',
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      price: 14.99,
      image: 'assets/images/book3.jpg',
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      price: 11.99,
      image: 'assets/images/book4.jpg',
    },
  ];

  stats = {
    books: 1200,
    customers: 350,
    orders: 980,
  };

  searchTerm = 'Tach';

  searchBooks() {
    // Tùy ý: Thực hiện tìm kiếm sách
    alert('Tìm kiếm: ' + this.searchTerm);
  }
}
