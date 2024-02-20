import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrl } from '../api.url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  registerService(registerObj:any){
    const url = apiUrl.authServiceApi + 'registerclient';
    return this.http.post<any>(url, registerObj);
  }
  loginService(loginObj:any){
    const url = apiUrl.authServiceApi + 'loginclient';
    return this.http.post<any>(url, loginObj);
  }


 isLoggedIn(){
  return !!localStorage.getItem("user_id");
 }

}
// 