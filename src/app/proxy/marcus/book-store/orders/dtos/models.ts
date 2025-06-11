import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { OrderStatus } from '../order-status.enum';
import type { OrderItemDTO } from '../../order-items/dtos/models';

export interface OrderCreateandUpdateDTO extends EntityDto<string> {
  userId?: string;
  orderDate?: string;
  totalPrice: number;
  orderStatus?: OrderStatus;
  orderItems: OrderItemDTO[];
}

export interface OrderDTO extends EntityDto<string> {
  userId?: string;
  orderDate?: string;
  totalPrice: number;
  orderStatus?: OrderStatus;
  orderItems: OrderItemDTO[];
}

export interface OrderItemPageAndSortSesultRequestDTO extends PagedAndSortedResultRequestDto {
  filter?: string;
}
