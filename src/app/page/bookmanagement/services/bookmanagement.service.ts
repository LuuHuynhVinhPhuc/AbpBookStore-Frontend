import { ABP, ListService, PagedResultDto } from '@abp/ng.core';
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
  filter = { sorting: 'CreationTime desc' } as BookPagedAndSortedResultRequestDto;

  hooktoQuery() {
    const getData = (query: ABP.PageQueryParams) =>
      this.bookService.getList({
        ...query,
        ...this.filter,
      });
    const setData = (list: PagedResultDto<BookDTO>) => {
      this.data = list;
    };
    this.list.hookToQuery(getData).subscribe(setData);
  }

  delete(a: BookDTO) {
    this.confirmationService
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.bookService.delete(a.id))
      )
      .subscribe(res => {
        this.hooktoQuery();
      });
  }
}
