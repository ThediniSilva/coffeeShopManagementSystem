import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddProductService } from '../../../services/add-product.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule // Add CommonModule to use ngIf
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  // Inject FormBuilder
  formbuilder = inject(FormBuilder);
  // Define the form group
  registerForm: FormGroup = this.formbuilder.group({
    name: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]] // Adding validation for numeric values
  });

  // Inject the AddProductService
  AddProductService = inject(AddProductService);

  // Function to handle form submission
  register() {
    let value = this.registerForm.value;
  
    // Log form data before sending it to the backend
    console.log('Form values:', value);
  
    // Call the AddProductService to send the product data
    this.AddProductService.addProduct({
      name: value.name,
      categoryId: value.categoryId,
      description: value.description,
      price: value.price
    }).subscribe(result=>{
      alert("Product Added successfully.!");
    })
  }
  
  
}
