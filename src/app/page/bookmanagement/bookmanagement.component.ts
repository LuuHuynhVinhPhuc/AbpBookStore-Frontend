import { PageComponent } from '@abp/ng.components/page';
import { ListService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthorService } from '@proxy/marcus/book-store/authors';
import {
  AuthorDTO,
  AuthorPagedAndSortedResultRequestDto,
} from '@proxy/marcus/book-store/authors/dtos';
import { BookService } from '@proxy/marcus/book-store/books';
import { BookType } from '@proxy/marcus/book-store/books/book-type.enum';
import { BookDTO, UpdateBookDTO } from '@proxy/marcus/book-store/books/dtos';
import { ColumnComponent } from 'src/app/shared/data-table/column/column.component';
import { DataTableComponent } from 'src/app/shared/data-table/data-table.component';
import { HeaderTableComponent } from 'src/app/shared/data-table/header/header.component';
import { BookManagementService } from './services/bookmanagement.service';

@Component({
  selector: 'app-bookmanagement',
  standalone: true,
  imports: [
    DataTableComponent,
    HeaderTableComponent,
    ColumnComponent,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [BookManagementService, ListService, PageComponent],
  templateUrl: './bookmanagement.component.html',
  styleUrl: './bookmanagement.component.scss',
})
export class BookmanagementComponent implements OnInit {
  public bookService = inject(BookManagementService);
  private modalService = inject(NgbModal);
  private bookServiceProxy = inject(BookService);
  private fb = inject(FormBuilder);
  private toaster = inject(ToasterService);
  private authorService = inject(AuthorService);

  bookForm: FormGroup;
  editingBookId: string | null = null;
  authors: AuthorDTO[] = [];

  bookTypes = Object.entries(BookType)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({
      value: value as number,
      label: key,
    }));

  @ViewChild('addBookModal') addBookModal: any;

  ngOnInit(): void {
    this.bookService.hooktoQuery();
    console.log(this.bookService.data);

    this.initBookForm();
    this.getAuthors();
  }

  getAuthors() {
    const authorRequest: AuthorPagedAndSortedResultRequestDto = {
      maxResultCount: 1000, // Or a dynamic page size
      skipCount: 0,
      sorting: 'name asc',
      filter: '',
    };
    this.authorService.getList(authorRequest).subscribe({
      next: res => {
        this.authors = res.items;
      },
      error: error => {
        console.error('Error fetching authors:', error);
        this.toaster.error('Failed to load authors.', 'Error');
      },
    });
  }

  initBookForm() {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      type: [BookType.Undefined, Validators.required],
      publishDate: [null, this.notTodayValidator()],
      price: [0, [Validators.required, Validators.min(0)]],
      authorIds: [[] as string[]],
    });
    this.editingBookId = null;
  }

  notTodayValidator(): Validators | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Don't validate if no date is entered
      }
      const selectedDate = new Date(control.value);
      const today = new Date();

      const isToday =
        selectedDate.getFullYear() === today.getFullYear() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getDate() === today.getDate();

      return isToday ? { notToday: true } : null;
    };
  }

  openAddBookModal() {
    this.initBookForm(); // Reset form when opening modal for new book
    this.modalService.open(this.addBookModal, { size: 'lg' });
  }

  editBook(book: BookDTO) {
    this.editingBookId = book.id;
    this.bookServiceProxy.get(book.id!).subscribe({
      next: retrievedBook => {
        this.bookForm.patchValue({
          name: retrievedBook.name,
          type: retrievedBook.type,
          publishDate: retrievedBook.publishDate ? retrievedBook.publishDate.split('T')[0] : null, // Format date for input type="date"
          price: retrievedBook.price,
          authorIds: retrievedBook.authors ? retrievedBook.authors.map(a => a.id) : [],
        });
        this.modalService.open(this.addBookModal, { size: 'lg' });
      },
      error: error => {
        console.error('Error fetching book for edit:', error);
        this.toaster.error('Failed to load book details for editing.', 'Error');
      },
    });
  }

  saveBook(modal: any) {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      this.toaster.error(
        'Please fill in all required fields and correct errors.',
        'Validation Error'
      );
      return;
    }

    const formValue = this.bookForm.value;

    const bookDto: UpdateBookDTO = {
      name: formValue.name,
      type: formValue.type,
      publishDate: formValue.publishDate,
      price: formValue.price,
      authorIds: formValue.authorIds ?? [],
    };

    if (this.editingBookId) {
      // ✅ Update existing book
      this.bookServiceProxy.update(this.editingBookId, bookDto).subscribe({
        next: () => {
          modal.close();
          this.bookService.hooktoQuery(); // reload danh sách
          this.toaster.success('Book updated successfully!', 'Success');
          this.editingBookId = null;
        },
        error: error => {
          console.error('Error updating book:', error);
          this.toaster.error(
            error?.error?.message || 'An unexpected error occurred during update.',
            'Error'
          );
        },
      });
    } else {
      // ✅ Create new book
      this.bookServiceProxy.create(bookDto).subscribe({
        next: () => {
          modal.close();
          this.bookService.hooktoQuery();
          this.toaster.success('Book added successfully!', 'Success');
        },
        error: error => {
          console.error('Error adding book:', error);
          this.toaster.error(
            error?.error?.message || 'An unexpected error occurred during creation.',
            'Error'
          );
        },
      });
    }
  }

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

  getAuthorNames(authors: AuthorDTO[]): string {
    return authors && authors.length > 0 ? authors.map(a => a.name).join(', ') : 'Unknown';
  }
}
