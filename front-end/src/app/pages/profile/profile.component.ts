import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RendezVousService } from '../../services/rendez-vous.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  RendezVousService = inject(RendezVousService);
  RendezVousHistoric: any[] = [];
  RendezVousReminder: any[] = []; 
  
  router = inject(Router);

  ngOnInit(): void {
    const user_id = localStorage.getItem("user_id");
    console.log('user connected  '+  user_id);
    if(user_id)
    {
      this.GetAppointmentHistory(user_id);
      this.GetAppointmentReminder(user_id);
    }
    else
    {
      alert("You are not connected, Log in first");
      this.router.navigate(['login']);
    }
    
  }

  GetAppointmentHistory(user_id: String): void {
    this.RendezVousService.HistoriqueRendezVous(user_id).subscribe((data) => {
      this.RendezVousHistoric = data;
      console.log(data);

    });
  }
  GetAppointmentReminder(user_id: String): void {
      this.RendezVousService.RappelRendezVous(user_id).subscribe((data) => {
        this. RendezVousReminder = data;
        console.log(data);
  
      });  
    
  }
}  
  


