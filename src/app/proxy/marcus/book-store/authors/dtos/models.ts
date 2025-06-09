import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface AuthorDTO extends EntityDto<string> {
  name?: string;
  birthdate?: string;
  shortBio?: string;
}

export interface AuthorPagedAndSortedResultRequestDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface CreateAndUpdateAuthors {
  name: string;
  birthDate: string;
  shortBio?: string;
}
