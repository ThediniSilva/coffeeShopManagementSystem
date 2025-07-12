import { inject,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  

  constructor() {}
  http =inject(HttpClient)

  register(name:string,contactNumber:string,email:string,password:string){

    return this.http.post('http://localhost:8081/user/signup',{
      name,
      contactNumber,
      email,
      password,

    });

  }

  login(email:string,password:string){

    return this.http.post('http://localhost:8081/user/login',{
      
      email,
      password,

    });
}

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

}
