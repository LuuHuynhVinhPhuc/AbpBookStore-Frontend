import { PageComponent } from '@abp/ng.components/page';
import { ListService } from '@abp/ng.core';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BookService } from '@proxy/marcus/book-store/books';
import { BookType } from '@proxy/marcus/book-store/books/book-type.enum';
import { ColumnComponent } from 'src/app/shared/data-table/column/column.component';
import { DataTableComponent } from 'src/app/shared/data-table/data-table.component';
import { HeaderTableComponent } from 'src/app/shared/data-table/header/header.component';
import { BookManagementService } from './services/bookmanagement.service';

@Component({
  selector: 'app-bookmanagement',
  standalone: true,
  imports: [DataTableComponent, HeaderTableComponent, ColumnComponent, FormsModule],
  providers: [BookManagementService, ListService, PageComponent, NgSelectModule],
  templateUrl: './bookmanagement.component.html',
  styleUrl: './bookmanagement.component.scss',
})
export class BookmanagementComponent implements OnInit {
  public bookService = inject(BookManagementService);
  private modalService = inject(NgbModal);
  private bookServiceProxy = inject(BookService);

  bookTypes = Object.values(BookType)
    .filter(value => typeof value === 'number')
    .map(type => ({
      value: type as number,
      label: this.getBookTypeText(type as number),
    }));

  getBookTypeText(type: number): string {
    switch (type) {
      case BookType.Undefined:
        return 'Undefined';
      case BookType.Adventure:
        return 'Adventure';
      case BookType.Biography:
        return 'Biography';
      case BookType.Dystopia:
        return 'Dystopia';
      case BookType.Fantastic:
        return 'Fantastic';
      case BookType.Horror:
        return 'Horror';
      case BookType.Science:
        return 'Science';
      case BookType.ScienceFiction:
        return 'Science Fiction';
      case BookType.Poetry:
        return 'Poetry';
      default:
        return 'Unknown Type';
    }
  }

  formatDate(value: any): string {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  @ViewChild('addBookModal') addBookModal: any;

  ngOnInit(): void {
    this.bookService.hookToQuery();
  }

  openAddBookModal() {
    this.modalService.open(this.addBookModal, { size: 'lg' });
  }

  saveBook(modal: any) {
    // this.bookServiceProxy.create().subscribe(() => {
    //   modal.close();
    //   this.resetForm();
    //   this.bookService.hookToQuery();
    // });
  }

  private resetForm() {}
}
