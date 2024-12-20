import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
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

  constructor(private menuService: MenuService) {}

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
}
