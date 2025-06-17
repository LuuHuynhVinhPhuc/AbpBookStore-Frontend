import { ABP, ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { inject, Injectable } from '@angular/core';
import { AuthorService } from '@proxy/marcus/book-store/authors';
import {
  AuthorDTO,
  AuthorPagedAndSortedResultRequestDto,
  CreateAndUpdateAuthors,
} from '@proxy/marcus/book-store/authors/dtos';
import { filter, switchMap } from 'rxjs';

@Injectable()
export class AuthorManagementService {
  private readonly authorService = inject(AuthorService);
  protected readonly confirmationService = inject(ConfirmationService);
  public list = inject(ListService);

  data: PagedResultDto<AuthorDTO> = {
    items: [],
    totalCount: 0,
  };

  filter = {
    pageNumber: 1,
    maxResultCount: 5,
    sorting: 'name desc',
  } as AuthorPagedAndSortedResultRequestDto;

  hookToQuery() {
    const getData = (query: ABP.PageQueryParams) => {
      return this.authorService.getList({
        skipCount: query.skipCount ?? 0,
        maxResultCount: query.maxResultCount ?? 5,
        sorting: this.filter.sorting ?? 'CreationTime desc',
        filter: this.filter.filter,
      });
    };

    const setData = (list: PagedResultDto<AuthorDTO>) => {
      this.data = list;
    };

    this.list.hookToQuery(getData).subscribe(setData);
  }

  delete(author: AuthorDTO) {
    return this.confirmationService
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter((status) => status === Confirmation.Status.confirm),
        switchMap(() => this.authorService.delete(author.id!))
      );
  }

  create(input: CreateAndUpdateAuthors) {
    return this.authorService.create(input);
  }

  update(id: string, input: CreateAndUpdateAuthors) {
    return this.authorService.update(id, input);
  }

  get(id: string) {
    return this.authorService.get(id);
  }

  public changePage(page: number) {
    this.list.page = page;
  }

  public changePageSize(pageSize: number) {
    this.list.maxResultCount = pageSize;
  }
}
