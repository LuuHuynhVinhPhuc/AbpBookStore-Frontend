import { ListService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderStatus } from '@proxy/marcus/book-store/orders';
import { NgxDatatableModule, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { OrderDetailModalComponent } from './order-detail-modal/order-detail-modal.component';
import { OrderManagementService } from './services/ordermanagement.service';

interface OrderDTO {
  id: string;
  fullName: string;
  totalPrice: number;
  orderDate: string;
  status: 'Pending' | 'Approved';
  orderItems: {
    bookName: string;
    quantity: number;
    unitPrice: number;
  }[];
}

@Component({
  selector: 'app-ordermanagement',
  standalone: true,
  imports: [CommonModule, NgbTooltipModule, NgxDatatableModule],
  providers: [OrderManagementService, ListService],
  templateUrl: './ordermanagement.component.html',
  styleUrl: './ordermanagement.component.scss',
})
export class OrdermanagementComponent implements OnInit {
  orders: OrderDTO[] = [];
  loading = false;
  columns: any[] = [];
  SelectionType = SelectionType;
  SortType = SortType;

  public readonly orderService = inject(OrderManagementService);
  public list = inject(ListService);

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.orderService.hookToQuery();
    this.setupColumns();
  }

  setupColumns() {
    this.columns = [
      { name: 'Order ID', prop: 'id', sortable: true },
      { name: 'Customer', prop: 'customerName', sortable: true },
      { name: 'Status', prop: 'status', sortable: true },
      { name: 'Total Amount', prop: 'totalAmount', sortable: true },
      { name: 'Order Date', prop: 'orderDate', sortable: true },
      { name: 'Payment Method', prop: 'paymentMethod', sortable: true },
      { name: 'Actions', prop: 'actions', sortable: false },
    ];
  }

  onPageChange(event: any) {
    this.list.page = event.offset;
    this.orderService.hookToQuery();
  }

  getStatusBadgeClass(status: OrderStatus | number): string {
    switch (status) {
      case OrderStatus.Active:
        return 'bg-warning';
      case OrderStatus.Approved:
        return 'bg-success';
      case OrderStatus.Delivering:
        return 'bg-primary';
      case OrderStatus.Delivered:
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  }

  getStatusText(status: OrderStatus | number): string {
    switch (status) {
      case OrderStatus.Active:
        return 'Active';
      case OrderStatus.Approved:
        return 'Approved';
      case OrderStatus.Delivering:
        return 'Delivering';
      case OrderStatus.Delivered:
        return 'Delivered';
      default:
        return 'Unknown';
    }
  }

  viewOrderDetails(order: any) {
    const modalRef = this.modalService.open(OrderDetailModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.order = order;
  }

  updateOrderStatus(order: any) {
    const modalRef = this.modalService.open(OrderDetailModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.order = order;

    modalRef.result
      .then((result) => {
        if (result === 'statusUpdated') {
          this.orderService.hookToQuery();
        }
      })
      .catch((res) => {});
  }

  deleteOrder(order: any) {
    this.orderService.delete(order);
  }
}
