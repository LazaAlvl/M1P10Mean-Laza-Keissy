
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrlPreference } from '../api.url';

@Injectable({
  providedIn: 'root'
})
export class StarRatingService {

  http = inject(HttpClient);

  InsertPreference(preferenceObj:any) {
    const url = `${apiUrlPreference.preferenceApi}create`;
    return this.http.post<any>(url,preferenceObj);
  }
  GetPreferencealreadyhere(serviceId: string, userId: string): Observable<any> {
    const url = `${apiUrlPreference.preferenceApi}${serviceId}/${userId}`;
    return this.http.get<any>(url);
  }
  
}
