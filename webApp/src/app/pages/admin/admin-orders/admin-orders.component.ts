import { Component, OnInit } from '@angular/core';
import { AdminOrderService } from '../../../services/admin-orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule], // Import CommonModule if ngClass used
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private adminOrderService: AdminOrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.adminOrderService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res.orders;
      },
      error: (err) => {
        console.error('Error loading orders:', err);
      }
    });
  }

  updateStatus(orderId: number, status: string) {
    this.adminOrderService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        this.loadOrders(); // Refresh orders after update
      },
      error: (err) => {
        console.error('Error updating status:', err);
      }
    });
  }
}
