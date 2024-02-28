import { Component, OnInit,inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RendezVousService } from '../../services/rendez-vous.service';
import { PayementRdvService } from '../../services/payement-rdv.service';

@Component({
  selector: 'app-payement',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './payement.component.html',
  styleUrl: './payement.component.css'
})
export class PayementComponent implements OnInit{

  RendezVousService = inject(RendezVousService);
  PayementRdvService = inject(PayementRdvService);
  router = inject(Router);

  ngOnInit(): void {
    
  }
  rendez_vous()
  {
    this.PayementRdvService.currentRendezVousData.subscribe(data => {
      if (data) {
        console.log(data);
        data.etat = true;        
        this.RendezVousService.InsertRendezVous(data).subscribe({
          next: (res) => {
            alert("RDV Created!") 
            this.router.navigate(['home']);
          },
          error: (err) => console.log(err)
        });
      }
    });

  }
}
