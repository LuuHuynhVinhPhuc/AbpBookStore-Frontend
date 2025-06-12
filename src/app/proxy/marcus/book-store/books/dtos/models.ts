import type { EntityDto } from '@abp/ng.core';
import type { BookType } from '../book-type.enum';
import type { AuthorDTO } from '../../authors/dtos/models';

export interface BookDTO extends EntityDto {
  id?: string;
  name?: string;
  type?: BookType;
  publishDate?: string;
  price: number;
  authors: AuthorDTO[];
}

export interface BookPagedAndSortedResultRequestDto {
  filter?: string;
  pageNumber: number;
  maxResultCount: number;
  sorting?: string;
}

export interface CreateBookDTO {
  id?: string;
  name: string;
  type: BookType;
  publishDate?: string;
  price: number;
  authorIds: string[];
}

export interface UpdateBookDTO extends CreateBookDTO {
  id?: string;
  name: string;
  type: BookType;
  publishDate?: string;
  price: number;
}
