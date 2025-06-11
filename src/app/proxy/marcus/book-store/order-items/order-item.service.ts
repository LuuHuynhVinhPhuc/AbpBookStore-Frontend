import type { CreateAndUpdateOrderItemDTO, OrderItemDTO, OrderItemPageAndSortResultRequestDTO } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderItemService {
  apiName = 'Default';
  

  create = (input: CreateAndUpdateOrderItemDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderItemDTO>({
      method: 'POST',
      url: '/api/app/order-item',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/order-item/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderItemDTO>({
      method: 'GET',
      url: `/api/app/order-item/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: OrderItemPageAndSortResultRequestDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<OrderItemDTO>>({
      method: 'GET',
      url: '/api/app/order-item',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateAndUpdateOrderItemDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderItemDTO>({
      method: 'PUT',
      url: `/api/app/order-item/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
