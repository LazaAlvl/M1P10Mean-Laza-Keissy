import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayementRdvService {
  private rendezVousData = new BehaviorSubject<any>(null);
  currentRendezVousData = this.rendezVousData.asObservable();

  constructor() {}

  setRendezVousData(data: any) {
    this.rendezVousData.next(data);
  }
  
}
