import { ABP, ListService, PagedResultDto } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';
import { BookService } from '@proxy/marcus/book-store/books';
import { BookDTO, BookPagedAndSortedResultRequestDto } from '@proxy/marcus/book-store/books/dtos';

@Injectable()
export class DashboardViewService {
  protected readonly dashboardService = inject(BookService);
  public list = inject(ListService);
  data: PagedResultDto<BookDTO> = {
    items: [],
    totalCount: 0,
  };
  filter = { sorting: 'CreationTime desc' } as BookPagedAndSortedResultRequestDto;

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
