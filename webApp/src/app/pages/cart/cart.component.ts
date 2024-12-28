import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common'; // Import CommonModule

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
}
