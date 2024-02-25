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
  
  HistoriqueRendezVous(user_id: String) {
    const url = `${apiUrlRendezVous.RendezVousApi}historic/${user_id}`;
    return this.http.get<any>(url);
  }

  RappelRendezVous(user_id: String) {
    const url = `${apiUrlRendezVous.RendezVousApi}rappels/${user_id}`;
    return this.http.get<any>(url);
  }
 
}
