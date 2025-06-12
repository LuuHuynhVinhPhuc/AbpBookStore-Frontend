import type {
  BookDTO,
  BookPagedAndSortedResultRequestDto,
  CreateBookDTO,
  UpdateBookDTO,
} from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  apiName = 'Default';

  create = (input: CreateBookDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BookDTO>(
      {
        method: 'POST',
        url: '/api/app/book',
        body: input,
      },
      { apiName: this.apiName, ...config }
    );

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: `/api/app/book/${id}`,
      },
      { apiName: this.apiName, ...config }
    );

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BookDTO>(
      {
        method: 'GET',
        url: `/api/app/book/${id}`,
      },
      { apiName: this.apiName, ...config }
    );

  getList = (input: BookPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<BookDTO>>(
      {
        method: 'GET',
        url: '/api/app/book',
        params: {
          filter: input.filter,
          pageNumber: input.pageNumber,
          maxResultCount: input.maxResultCount,
          sorting: input.sorting,
        },
      },
      { apiName: this.apiName, ...config }
    );

  update = (id: string, input: UpdateBookDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BookDTO>(
      {
        method: 'PUT',
        url: `/api/app/book/${id}`,
        body: input,
      },
      { apiName: this.apiName, ...config }
    );

  constructor(private restService: RestService) {}
}
