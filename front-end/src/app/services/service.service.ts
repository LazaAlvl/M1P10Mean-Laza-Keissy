import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrlservice } from '../api.url';

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

}
