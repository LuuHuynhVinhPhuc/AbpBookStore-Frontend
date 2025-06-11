import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateAndUpdateOrderItemDTO {
  bookId?: string;
  orderId?: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderItemDTO extends EntityDto<string> {
  bookId?: string;
  orderId?: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderItemPageAndSortResultRequestDTO extends PagedAndSortedResultRequestDto {
  filter?: string;
}
