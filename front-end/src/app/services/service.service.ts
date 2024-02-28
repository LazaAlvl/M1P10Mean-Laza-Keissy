import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrlservice,apiUrlRendezVous } from '../api.url';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  http = inject(HttpClient);

  getPaginatedServices(page: number, pageSize: number): Observable<any> {
    const url = `${apiUrlservice.ServiceApi}paginatedservices?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }
  getServiceDetails(id: string): Observable<any> {
    const url = `${apiUrlservice.ServiceApi}infos-service/${id}`;
    return this.http.get<any>(url);
  }
  getServiceDetailsrdv(id: string): Observable<any> {
    const url = `${apiUrlRendezVous.RendezVousApi}rdv/${id}`;
    return this.http.get<any>(url);
  }
  updateService(id: string,serviceObj:any): Observable<any> {
    const url = `${apiUrlservice.ServiceApi}update/${id}`;
    return this.http.put<any>(url,serviceObj);
  }
  createService(serviceObj:any): Observable<any> {
    const url = `${apiUrlservice.ServiceApi}create`;
    return this.http.post<any>(url,serviceObj);
  }
  deleteService(id: string): Observable<any> {
    const url = `${apiUrlservice.ServiceApi}delete/${id}`;
    return this.http.delete<any>(url);
  }
  get3Service(): Observable<any> {
    const url = `${apiUrlservice.ServiceApi}3services`;
    return this.http.get<any>(url);
  }
  

}
