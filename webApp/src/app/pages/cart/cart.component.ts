import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';

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
}
