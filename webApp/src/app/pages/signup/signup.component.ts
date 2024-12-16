import { Component,inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signup',
  standalone:true,
  imports:[MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl:'./signup.component.scss'
})
export class SignupComponent {
  formbuilder = inject(FormBuilder);
  registerForm = this.formbuilder.group({
    name:['',[Validators.required]],
    contactNumber:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.minLength(5)]],
  });

  userService = inject(UserService);

  register(){
    // console.log(this.registerForm.value)
    let value = this.registerForm.value;
    this.userService.register(value.name!,value.contactNumber!,value.email!,value.password!).subscribe(result=>{
      alert("User register!");
    })
  }
}
