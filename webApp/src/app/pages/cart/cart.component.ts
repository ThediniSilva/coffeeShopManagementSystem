import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

 ngOnInit(): void {
  this.loadCartItems();
  this.loadLatestOrder();
}

  loadCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (response: any) => {
        this.cartItems = response.cart;
        console.log('Cart items loaded:', this.cartItems); // Debug log
      },
      error: (err) => {
        console.error('Error loading cart items:', err);
      }
    });
  }

  deleteItem(productId: number) {
    this.cartService.deleteCartItem(productId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.product_id !== productId);
        console.log('Item deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting item:', err);
      }
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.cartItems = [];
        console.log('Cart cleared successfully');
      },
      error: (err) => {
        console.error('Error clearing cart:', err);
      }
    });
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  updateQuantity(productId: number, newQuantity: number) {
    if (newQuantity < 1) return;

    this.cartService.updateCartItemQuantity(productId, newQuantity).subscribe({
      next: () => {
        const item = this.cartItems.find(item => item.product_id === productId);
        if (item) {
          item.quantity = newQuantity;
        }
        console.log(`Quantity updated for product ${productId}`);
      },
      error: (err) => {
        console.error('Error updating quantity:', err);
      }
    });
  }

  confirmOrder() {
  const total = this.calculateTotal(); // Get total amount from cart

  Swal.fire({
    title: 'Confirm Your Order',
    text: `Your total is Rs. ${total}. Do you want to place the order?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, place it!',
    cancelButtonText: 'No, cancel',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.cartService.placeOrder().subscribe({
        next: () => {
          Swal.fire('Order Placed!', 'Your coffee tray has been confirmed.', 'success');
          this.cartItems = [];
        },
        error: (err) => {
          console.error('Error placing order:', err);
          Swal.fire('Error', 'Something went wrong while placing your order.', 'error');
        }
      });
    }
  });
}


  placeOrder() {
  this.cartService.placeOrder().subscribe({
    next: (res: any) => {
      alert('✅ Order placed successfully!');
      this.cartItems = [];
    },
    error: (err) => {
      console.error('❌ Error placing order:', err);
      alert('❌ Failed to place order. Please try again.');
    }
  });
}

latestOrder: any = null;
allOrders: any[] = [];
orderItemsMap: { [orderId: number]: any[] } = {};

loadLatestOrder() {
  this.cartService.getMyOrders().subscribe({
    next: (res: any) => {
      if (res.orders.length > 0) {
        this.allOrders = res.orders;
        this.latestOrder = res.orders[0];

        // Load order items for all orders
        res.orders.forEach((order: any) => {
          this.cartService.getOrderDetails(order.id).subscribe({
            next: (res: any) => {
              this.orderItemsMap[order.id] = res.items;
            },
            error: (err) => {
              console.error(`Failed to load items for order ${order.id}`, err);
            }
          });
        });
      }
    },
    error: (err) => {
      console.error('Failed to fetch orders', err);
    }
  });
}

stepStatus(step: string): boolean {
  const statuses = ['Paid', 'Processing', 'Complete', 'Delivered', 'Finished'];
  const currentIndex = statuses.indexOf(this.latestOrder?.payment_status);
  const stepIndex = statuses.indexOf(step);
  return stepIndex <= currentIndex;
}


}
