import { ListService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '@proxy/marcus/book-store/orders';
import { OrderCreateAndUpdateDTO } from '@proxy/marcus/book-store/orders/dtos';
import { OrderManagementService } from '../services/ordermanagement.service';

interface OrderItemDTO {
  bookId: string;
  bookName: string;
  quantity: number;
  unitPrice: number;
}

interface OrderDTO {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  orderDate: string;
  orderStatus: number;
  paymentMethod: string;
  totalPrice: number;
  orderItems: OrderItemDTO[];
}

@Component({
  selector: 'app-order-detail-modal',
  standalone: true,
  imports: [CommonModule],
  providers: [OrderManagementService, ListService],
  templateUrl: './order-detail-modal.component.html',
  styleUrl: './order-detail-modal.component.scss',
})
export class OrderDetailModalComponent implements OnInit {
  @Input() order!: OrderDTO;

  public readonly orderService = inject(OrderService);
  public readonly orderManagementService = inject(OrderManagementService);
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.orderManagementService.hookToQuery();
  }

  getStatusBadgeClass(status: number): string {
    switch (status) {
      case 1:
        return 'bg-success';
      case 0:
        return 'bg-warning';

      default:
        return 'bg-secondary';
    }
  }

  getStatusText(status: number): string {
    switch (status) {
      case 1:
        return 'bg-success';
      case 0:
        return 'bg-warning';

      default:
        return 'bg-secondary';
    }
  }

  approveOrder(): void {
    if (this.order.orderStatus === 0) {
      const updateData: OrderCreateAndUpdateDTO = {
        userID: this.order.userId,
        fullName: this.order.fullName,
        email: this.order.email,
        phone: this.order.phone,
        address: this.order.address,
        paymentMethod: this.order.paymentMethod,
        orderItems: this.order.orderItems.map((item) => ({
          bookId: item.bookId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      };

      this.orderService.approveOrderByIdAndInput(this.order.id, updateData).subscribe({
        next: () => {
          this.orderManagementService.hookToQuery();
          this.activeModal.close('statusUpdated');
        },
        error: (error) => {
          console.error('Error approving order:', error);
        },
      });
    }
  }
}
