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
  RendezVousoftheDay: any[] = []; 
  Task_Commission: any[] = []; 
  
  router = inject(Router);




  ngOnInit(): void {
    const user_id = localStorage.getItem("user_id");
    console.log('user connected  '+  user_id);
    if(user_id)
    {

      this.GetAppointmentHistory(user_id);
      this.GetAppointmentReminder(user_id);

      this.GetTasksCompletedCommission(user_id);
      this.GetAppointmentoftheDay(user_id);
      
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

    });
  }
  GetAppointmentReminder(user_id: String): void {
      this.RendezVousService.RappelRendezVous(user_id).subscribe((data) => {
        this.RendezVousReminder = data;
  
      });  
    
  }
  GetAppointmentoftheDay(user_id: String): void {
    this.RendezVousService.RendezVousDuJour(user_id).subscribe((data) => {
      this.RendezVousoftheDay = data;
      // console.log(data);
    });  
  }

  UpdateRendezVous(rdv_id: String): void {
    this.RendezVousService.Update_effectue(rdv_id).subscribe((data) => {
      console.log(data);

    });
  }
  GetTasksCompletedCommission(employe_id: String): void {
    this.RendezVousService.TaskcompletedCommission(employe_id).subscribe((data) => {
      this.Task_Commission = data.rendezVousJourEmploye;
      console.log(data);

    });
  
  }
  


  isClient(): boolean {
    const user_role = localStorage.getItem("role");
    if( user_role === "Client")
    { 
      return true;
    }else{
      return false;
    }
  }
  

isEmployee(): boolean {
  const user_role = localStorage.getItem("role");
    if( user_role === "Employee")
    { 
      return true;
    }else{
      return false;
    }
}

isManager(): boolean {
  const user_role = localStorage.getItem("role");
    if( user_role === "Manager")
    { 
      return true;
    }else{
      return false;
    }
  }

}  
  


