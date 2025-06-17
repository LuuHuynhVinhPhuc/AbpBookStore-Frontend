import { ABP, ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { inject, Injectable } from '@angular/core';
import { AuthorService } from '@proxy/marcus/book-store/authors';
import { AuthorDTO } from '@proxy/marcus/book-store/authors/dtos';
import { BookService } from '@proxy/marcus/book-store/books';
import { BookDTO, BookPagedAndSortedResultRequestDto } from '@proxy/marcus/book-store/books/dtos';
import { filter, switchMap } from 'rxjs';

@Injectable()
export class BookManagementService {
  private readonly bookService = inject(BookService);
  private readonly authorService = inject(AuthorService);
  protected readonly confirmationService = inject(ConfirmationService);
  public list = inject(ListService);
  authordata: PagedResultDto<AuthorDTO> = {
    items: [],
    totalCount: 0,
  };
  data: PagedResultDto<BookDTO> = {
    items: [],
    totalCount: 0,
  };
  filter = {
    maxResultCount: 5,
    sorting: 'CreationTime desc',
    skipCount: 1,
  } as BookPagedAndSortedResultRequestDto;

  constructor() {}

  hookToQuery() {
    const getData = (query: ABP.PageQueryParams) => {
      return this.bookService.getList({
        skipCount: this.filter.skipCount ?? 1,
        maxResultCount: query.maxResultCount ?? 5,
        sorting: this.filter.sorting ?? 'CreationTime desc',
        filter: this.filter.filter,
      });
    };

    const setData = (list: PagedResultDto<BookDTO>) => {
      this.data = list;
    };

    this.list.hookToQuery(getData).subscribe(setData);
  }

  AuthorHookToQuery() {
    const getData = (query: ABP.PageQueryParams) => {
      return this.authorService.getList({
        skipCount: query.skipCount ?? 1,
        maxResultCount: query.maxResultCount ?? 5,
        sorting: this.filter.sorting ?? 'CreationTime desc',
        filter: this.filter.filter,
      });
    };

    const setData = (list: PagedResultDto<AuthorDTO>) => {
      this.authordata = list;
    };

    this.list.hookToQuery(getData).subscribe(setData);
  }

  delete(a: BookDTO) {
    this.confirmationService
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter((status) => status === Confirmation.Status.confirm),
        switchMap(() => this.bookService.delete(a.id))
      )
      .subscribe((res) => {
        this.hookToQuery();
      });
  }

  public changePage(page: number) {
    this.list.page = page;
  }

  public changePageSize(pageSize: number) {
    this.list.maxResultCount = pageSize;
  }
}
