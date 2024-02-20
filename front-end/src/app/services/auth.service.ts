import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrl } from '../api.url';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

<<<<<<< HEAD
  isLoggedIn$ = new BehaviorSubject<boolean>(false)
=======
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
>>>>>>> 915c5068d72ce8bcfed118897d1045b1bc13662c

  registerService(registerObj:any){
    const url = apiUrl.authServiceApi + 'registerclient';
    return this.http.post<any>(url, registerObj);
  }
  loginService(loginObj:any){
    const url = apiUrl.authServiceApi + 'loginclient';
    return this.http.post<any>(url, loginObj);
  }
<<<<<<< HEAD


 isLoggedIn(){
  return !!localStorage.getItem("user_id");
 }

=======
  isLoggedin(){
    return !!localStorage.getItem("user_id");
  }
>>>>>>> 915c5068d72ce8bcfed118897d1045b1bc13662c
}
// 