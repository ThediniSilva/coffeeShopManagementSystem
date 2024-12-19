import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCategoryService } from '../../../services/add-category.service';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-add-category',
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent {
  formbuilder = inject(FormBuilder);
  addCategoryService = inject(AddCategoryService);
  router = inject(Router); // Inject Router for navigation

  addCategoryForm = this.formbuilder.group({
    name: ['', [Validators.required]], // Ensure the name field is required
  });

  addCategory() {
    // Retrieve the value from the form
    const categoryName = this.addCategoryForm.value.name;

    if (!categoryName) {
      alert('Please enter a category name.'); // Handle empty input
      return;
    }

    this.addCategoryService.addCategory(categoryName).subscribe({
      next: (response) => {
        console.log('Category added successfully:', response);
        const confirmed = confirm('Category added successfully! Click OK to view category details.');
        if (confirmed) {
          // Navigate to the category details page
          this.router.navigate(['/CategoryDetailsComponent']);
        } else {
          // Optionally reset the form if not navigating
          this.addCategoryForm.reset();
        }
      },
      error: (err) => {
        console.error('Error adding category:', err);
        alert(err.error.message || 'Error adding category.');
      },
    });
  }
}
