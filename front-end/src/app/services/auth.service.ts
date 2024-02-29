import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrl } from '../api.url';
import { BehaviorSubject, Observable } from 'rxjs';

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

  getPaginatedUsers(page: number, pageSize: number): Observable<any> {
    const url = `${apiUrl.authServiceApi}paginatedusers?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }

  getUserDetails(id: String): Observable<any> {
    const url = `${apiUrl.authServiceApi}getUserDetails/${id}`;
    return this.http.get<any>(url);
  }

  updateUser(id: string,userObj:any): Observable<any> {
    const url = `${apiUrl.authServiceApi}update_employees/${id}`;
    return this.http.put<any>(url,userObj);
  }
  deleteUser(id: string): Observable<any> {
    const url = `${apiUrl.authServiceApi}delete_employees/${id}`;
    return this.http.delete<any>(url);
  }
  sendEmail(emailobj:any):Observable<any>{
    const url = `${apiUrl.authServiceApi}sendMail`;
    return this.http.post<any>(url,emailobj);
  }  

   
  isLoggedin(){
    return !!localStorage.getItem("user_id");
  }

}
// 