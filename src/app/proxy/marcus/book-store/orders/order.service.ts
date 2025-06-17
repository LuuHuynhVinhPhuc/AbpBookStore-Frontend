import type {
  OrderCreateAndUpdateDTO,
  OrderDTO,
  OrderPageAndSortResultRequestDTO,
} from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiName = 'Default';

  approveOrderByIdAndInput = (
    id: string,
    input: OrderCreateAndUpdateDTO,
    config?: Partial<Rest.Config>
  ) =>
    this.restService.request<any, OrderDTO>(
      {
        method: 'POST',
        url: `/api/app/order/${id}/approve-order`,
        body: input,
      },
      { apiName: this.apiName, ...config }
    );

  create = (input: OrderCreateAndUpdateDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderDTO>(
      {
        method: 'POST',
        url: '/api/app/order',
        body: input,
      },
      { apiName: this.apiName, ...config }
    );

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: `/api/app/order/${id}`,
      },
      { apiName: this.apiName, ...config }
    );

  getList = (input: OrderPageAndSortResultRequestDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<OrderDTO>>(
      {
        method: 'GET',
        url: '/api/app/order',
        params: {
          filter: input.filter,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      { apiName: this.apiName, ...config }
    );

  update = (id: string, input: OrderCreateAndUpdateDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderDTO>(
      {
        method: 'PUT',
        url: `/api/app/order/${id}`,
        body: input,
      },
      { apiName: this.apiName, ...config }
    );

  constructor(private restService: RestService) {}
}
