import { ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { inject, Injectable } from '@angular/core';
import { BookService } from '@proxy/marcus/book-store/books';
import { BookDTO, BookPagedAndSortedResultRequestDto } from '@proxy/marcus/book-store/books/dtos';
import { filter, switchMap } from 'rxjs';

@Injectable()
export class BookManagementService {
  private readonly bookService = inject(BookService);
  protected readonly confirmationService = inject(ConfirmationService);
  public list = inject(ListService);
  data: PagedResultDto<BookDTO> = {
    items: [],
    totalCount: 0,
  };
  filter = {
    pageNumber: 1,
    maxResultCount: 5,
    sorting: 'CreationTime desc',
  } as BookPagedAndSortedResultRequestDto;

  constructor() {}

  hookToQuery() {
    const getData = () => {
      const page = this.list.page ?? 1;
      const pageNumber = page < 1 ? 1 : page;

      return this.bookService.getList({
        pageNumber: pageNumber,
        maxResultCount: this.filter.maxResultCount ?? 5,
        sorting: this.filter.sorting ?? 'CreationTime desc',
        filter: this.filter.filter,
      });
    };

    const setData = (list: PagedResultDto<BookDTO>) => {
      this.data = list;
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
