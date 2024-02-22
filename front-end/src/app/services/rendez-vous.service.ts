import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrlRendezVous } from '../api.url';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  http = inject(HttpClient);

  InsertRendezVous(rendezVousObj:any) {
    const url = `${apiUrlRendezVous.RendezVousApi}create`;
    return this.http.post<any>(url,rendezVousObj);
  }
 
}
