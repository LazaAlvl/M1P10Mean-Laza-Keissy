import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrl } from '../api.url';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  isLoggedIn$ = new BehaviorSubject<boolean>(false)

  registerService(registerObj:any){
    const url = apiUrl.authServiceApi + 'registerclient';
    return this.http.post<any>(url, registerObj);
  }
  loginService(loginObj:any){
    const url = apiUrl.authServiceApi + 'loginclient';
    return this.http.post<any>(url, loginObj);
  }

  isLoggedin(){
    return !!localStorage.getItem("user_id");
  }

}
// 