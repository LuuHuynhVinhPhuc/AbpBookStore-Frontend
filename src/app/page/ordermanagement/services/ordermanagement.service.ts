import { ABP, ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { inject, Injectable } from '@angular/core';
import { OrderService } from '@proxy/marcus/book-store/orders';
import { OrderDTO, OrderPageAndSortResultRequestDTO } from '@proxy/marcus/book-store/orders/dtos';
import { filter, switchMap } from 'rxjs';

@Injectable()
export class OrderManagementService {
  private readonly OrderService = inject(OrderService);
  private readonly confirmationService = inject(ConfirmationService);
  public list = inject(ListService);

  data: PagedResultDto<OrderDTO> = {
    items: [],
    totalCount: 0,
  };

  filter = {
    pageNumber: 1,
    maxResultCount: 5,
    sorting: 'CreationTime desc',
  } as OrderPageAndSortResultRequestDTO;

  hookToQuery() {
    const getData = (query: ABP.PageQueryParams) => {
      return this.OrderService.getList({
        skipCount: query.skipCount ?? 0,
        maxResultCount: query.maxResultCount ?? 5,
        sorting: this.filter.sorting ?? 'CreationTime desc',
        filter: this.filter.filter,
      });
    };

    const setData = (list: PagedResultDto<OrderDTO>) => {
      this.data = list;
    };

    this.list.hookToQuery(getData).subscribe(setData);
  }

  delete(a: OrderDTO) {
    this.confirmationService
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter((status) => status === Confirmation.Status.confirm),
        switchMap(() => this.OrderService.delete(a.id))
      )
      .subscribe((res) => {
        this.hookToQuery();
      });
  }
}
