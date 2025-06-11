import type { OrderCreateandUpdateDTO, OrderDTO, OrderItemPageAndSortSesultRequestDTO } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiName = 'Default';
  

  create = (input: OrderCreateandUpdateDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderDTO>({
      method: 'POST',
      url: '/api/app/order',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/order/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderDTO>({
      method: 'GET',
      url: `/api/app/order/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: OrderItemPageAndSortSesultRequestDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<OrderDTO>>({
      method: 'GET',
      url: '/api/app/order',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: OrderCreateandUpdateDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderDTO>({
      method: 'PUT',
      url: `/api/app/order/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
