import { mapEnumToOptions } from '@abp/ng.core';

export enum OrderStatus {
  Active = 0,
  Approved = 1,
  Delivering = 2,
  Delivered = 3,
}

export const orderStatusOptions = mapEnumToOptions(OrderStatus);
