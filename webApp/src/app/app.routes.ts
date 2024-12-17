
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserManageComponent } from './pages/admin/user-manage/user-manage.component';
import { UpdateUserDetailsComponent } from './pages/update-user-details/update-user-details.component';
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
  // { path: 'signup', component: UserService }
];