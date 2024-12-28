import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  categories: any[] = [];
  products: any[] = [];

  constructor(private menuService: MenuService,private cartService: CartService) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu() {
    this.menuService.getAllProducts().subscribe((data: any) => {
      this.categories = [...new Set(data.map((item: any) => item.categoryName))];
      this.products = data;
    });
  }

  getProductsByCategory(categoryName: string) {
    return this.products.filter(product => product.categoryName === categoryName);
  }

  addToCart(productId: number) {
    const quantity = 1; // Default quantity for now
    console.log("Adding to cart - Product ID:", productId, "Quantity:", quantity); // Debug log
  
    this.cartService.addToCart(productId, quantity).subscribe({
      next: (response) => {
        alert('Item added to cart successfully!');
      },
      error: (err) => {
        console.error('Error adding item to cart:', err);
        alert('Failed to add item to cart.');
      }
    });
  }
  
}
