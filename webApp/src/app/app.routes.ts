
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserManageComponent } from './pages/admin/user-manage/user-manage.component';
import { UpdateUserDetailsComponent } from './pages/update-user-details/update-user-details.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { CategoryDetailsComponent } from './pages/admin/category-details/category-details.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { ProductDetailsComponent } from './pages/admin/product-details/product-details.component';
import { ProductUpdateComponent } from './pages/admin/product-update/product-update.component';
import { CartComponent } from './pages/cart/cart.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatError } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms'; // Required for formControl

// import { UserService } from './services/user.service';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adminDashboard', component: AdminDashboardComponent },
  { path: 'userDetails', component: UserDetailsComponent },
  { path: 'userManageDetails', component: UserManageComponent },
  { path: 'UpdateUserDetailsComponent/:id', component: UpdateUserDetailsComponent },
  { path: 'AddCategoryComponent', component: AddCategoryComponent },
  { path: 'CategoryDetailsComponent', component: CategoryDetailsComponent },
  { path: 'MenuComponent', component: MenuComponent },
  { path: 'AddProductComponent', component: AddProductComponent },
  { path: 'ProductDetailsComponent', component: ProductDetailsComponent },
  { path: 'ProductUpdateComponent/:id', component: ProductUpdateComponent },
  { path: 'CartComponent', component: CartComponent },
  // { path: 'signup', component: UserService }
];
