import type { OrderStatus } from '../order-status.enum';
import type { OrderItemDTO } from '../../order-items/dtos/models';
import type { AuditedEntityDto } from '@abp/ng.core';

export interface OrderCreateAndUpdateDTO {
  userID?: string;
  fullName?: string;
  address?: string;
  phone?: string;
  email?: string;
  paymentMethod?: string;
  orderStatus?: OrderStatus;
  orderItems: OrderItemDTO[];
}

export interface OrderDTO extends AuditedEntityDto<string> {
  customerID?: string;
  fullName?: string;
  address?: string;
  phone?: string;
  email?: string;
  paymentMethod?: string;
  orderDate?: string;
  orderStatus?: OrderStatus;
  totalPrice: number;
  orderItems: OrderItemDTO[];
}

export interface OrderPageAndSortSesultRequestDTO {
  filter?: string;
  pageNumber: number;
  maxResultCount: number;
  sorting?: string;
}
