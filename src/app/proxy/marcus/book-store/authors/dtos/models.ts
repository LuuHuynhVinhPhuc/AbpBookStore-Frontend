import type { EntityDto } from '@abp/ng.core';

export interface AuthorDTO extends EntityDto<string> {
  name?: string;
  birthdate?: string;
  shortBio?: string;
}

export interface AuthorPagedAndSortedResultRequestDto {
  filter?: string;
  pageNumber: number;
  maxResultCount: number;
  sorting?: string;
}

export interface CreateAndUpdateAuthors {
  name: string;
  birthDate: string;
  shortBio?: string;
}
