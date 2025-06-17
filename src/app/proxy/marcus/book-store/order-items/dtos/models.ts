import type { EntityDto } from '@abp/ng.core';

export interface CreateAndUpdateOrderItemDTO {
  bookId?: string;
  bookName?: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderItemDTO extends EntityDto<string> {
  bookId?: string;
  bookName?: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderItemPageAndSortResultRequestDTO {
  filter?: string;
  pageNumber: number;
  maxResultCount: number;
  sorting?: string;
}
