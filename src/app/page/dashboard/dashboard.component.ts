import { ABP, ListService, PagedResultDto } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookService } from '@proxy/marcus/book-store/books';
import { BookDTO, BookPagedAndSortedResultRequestDto } from '@proxy/marcus/book-store/books/dtos';

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
  imports: [FormsModule, CommonModule, RouterModule],
  providers: [ListService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  protected readonly dashboardService = inject(BookService);
  public list = inject(ListService);
  stats = {
    books: 1200,
    customers: 350,
    orders: 980,
  };

  searchTerm = 'Tach';

  data: PagedResultDto<BookDTO> = {
    items: [],
    totalCount: 0,
  };

  filter = { sorting: 'CreationTime desc' } as BookPagedAndSortedResultRequestDto;

  ngOnInit(): void {
    this.hooktoQuery();
  }

  searchBooks() {
    // Tùy ý: Thực hiện tìm kiếm sách
    alert('Tìm kiếm: ' + this.searchTerm);
  }

  // get all list
  hooktoQuery() {
    const getData = (query: ABP.PageQueryParams) =>
      this.dashboardService.getList({
        ...query,
        ...this.filter,
      });
    const setData = (list: PagedResultDto<BookDTO>) => {
      this.data = list;
    };
    this.list.hookToQuery(getData).subscribe(setData);
  }
}
