import { ListService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardViewService } from './services/dashboad.service';

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
  providers: [ListService, DashboardViewService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  public dashboardService = inject(DashboardViewService);
  stats = {
    books: 1200,
    customers: 350,
    orders: 980,
  };

  searchTerm = 'Tach';

  ngOnInit(): void {
    this.dashboardService.hooktoQuery();
  }

  searchBooks() {
    // Tùy ý: Thực hiện tìm kiếm sách
    alert('Tìm kiếm: ' + this.searchTerm);
  }
}
