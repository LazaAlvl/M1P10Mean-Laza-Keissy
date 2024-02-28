import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrlStat } from '../api.url';


@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  http = inject(HttpClient);
  

  GetReservationStatDay(reservationstatObj:any): Observable<any> {
    const url = `${apiUrlStat.StatApi}nombre_reservations_jour`;
    return this.http.post<any>(url,reservationstatObj);
  }
  GetReservationStatMonth(reservationstatObj:any): Observable<any> {
    const url = `${apiUrlStat.StatApi}nombre_reservations_mois`;
    return this.http.post<any>(url,reservationstatObj);
  }
  GetTurnoverStatDay(reservationstatObj:any): Observable<any> {
    const url = `${apiUrlStat.StatApi}chiffre_affaire_jour`;
    return this.http.post<any>(url,reservationstatObj);
  }
  
  GetTurnoverStatMonth(reservationstatObj:any): Observable<any> {
    const url = `${apiUrlStat.StatApi}chiffre_affaire_mois`;
    return this.http.post<any>(url,reservationstatObj);
  }
  GetBeneficeStatMonth(reservationstatObj:any): Observable<any> {
    const url = `${apiUrlStat.StatApi}benefice_mois`;
    return this.http.post<any>(url,reservationstatObj);
  }
  Getaverage_working_time(reservationstatObj:any): Observable<any> {
    const url = `${apiUrlStat.StatApi}temps_moyenne_travail`;
    return this.http.post<any>(url,reservationstatObj);
  }
  

  
}
