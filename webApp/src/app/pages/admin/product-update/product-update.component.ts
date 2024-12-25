import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductUpdateService } from '../../../services/product-update.service';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { CommonModule } from '@angular/common'; // Required for *ngIf

@Component({
  selector: 'app-update-user',
  imports: [
    FormsModule, // Import FormsModule here
    CommonModule // Import CommonModule for *ngIf
  ],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.scss'
})
export class ProductUpdateComponent {

   userId: string = '';
    userData = {
      name: '',
      categoryId: '',
      description: '',
      price: '',
    };
    errorMessage: string = '';
  
    constructor(
      private route: ActivatedRoute,
      private ProductUpdateService: ProductUpdateService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      // Get product ID from route
      this.userId = this.route.snapshot.paramMap.get('id') || '';
    
      if (this.userId) {
        // Fetch product data
        this.ProductUpdateService.getUserById(this.userId).subscribe({
          next: (data) => {
            console.log("Fetched product data:", data); // Debug log
            this.userData = data; // Bind fetched data to form
          },
          error: (err) => {
            console.error("Error fetching product data:", err);
            this.errorMessage = 'Failed to load product data.';
          },
        });
      } else {
        this.errorMessage = 'Product ID is missing in the route.';
      }
    }
    
  
    updateUser() {
      console.log('Sending Data:', this.userData);
    
      this.ProductUpdateService.updateUser(this.userId, this.userData).subscribe({
        next: () => {
          alert('Product updated successfully!');
          this.router.navigate(['/ProductDetailsComponent']); // Redirect after update
        },
        error: (err) => {
          console.error('Update Failed:', err);
          this.errorMessage = `Failed to update product data: ${err.error?.message || err.message}`;
        },
      });
    }
    
}
