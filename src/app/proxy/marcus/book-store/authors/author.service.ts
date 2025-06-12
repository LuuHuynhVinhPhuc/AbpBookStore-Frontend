import type {
  AuthorDTO,
  AuthorPagedAndSortedResultRequestDto,
  CreateAndUpdateAuthors,
} from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  apiName = 'Default';

  create = (input: CreateAndUpdateAuthors, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AuthorDTO>(
      {
        method: 'POST',
        url: '/api/app/author',
        body: input,
      },
      { apiName: this.apiName, ...config }
    );

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: `/api/app/author/${id}`,
      },
      { apiName: this.apiName, ...config }
    );

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AuthorDTO>(
      {
        method: 'GET',
        url: `/api/app/author/${id}`,
      },
      { apiName: this.apiName, ...config }
    );

  getList = (input: AuthorPagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<AuthorDTO>>(
      {
        method: 'GET',
        url: '/api/app/author',
        params: {
          filter: input.filter,
          pageNumber: input.pageNumber,
          maxResultCount: input.maxResultCount,
          sorting: input.sorting,
        },
      },
      { apiName: this.apiName, ...config }
    );

  update = (id: string, input: CreateAndUpdateAuthors, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AuthorDTO>(
      {
        method: 'PUT',
        url: `/api/app/author/${id}`,
        body: input,
      },
      { apiName: this.apiName, ...config }
    );

  constructor(private restService: RestService) {}
}
