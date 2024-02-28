import { Component, inject } from '@angular/core';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RendezVousService } from '../../services/rendez-vous.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PayementRdvService } from '../../services/payement-rdv.service';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-rendez-vous',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './rendez-vous.component.html',
  styleUrl: './rendez-vous.component.css'
})
export class RendezVousComponent {
    service: any;
    employee: any[] = [];
    selectedEmployeeId: string | null = null;
    selectedEmployeeIds: string[] = [];
    disabledEmployees: string[] = [];


    rendezvousForm!:FormGroup;
    fb = inject(FormBuilder);

    

    RendezVousService = inject(RendezVousService);
    Service_service = inject(ServiceService);
    router = inject(Router);

    currentDate: any= new Date();
    
    selectedDate!:Date;
    hours: string[] = [];
 
    constructor(private route: ActivatedRoute,private dataService: PayementRdvService) { }

  
   
    isSelectedEmployee(employeeId: string): boolean {
      return this.selectedEmployeeIds.length > 0 && !this.selectedEmployeeIds.includes(employeeId);
    }
    
    onEmployeeSelected(employeeId: string): void {
      if (this.selectedEmployeeIds.includes(employeeId)) {
        // Si l'employé est déjà sélectionné, le désélectionner
        const index = this.selectedEmployeeIds.indexOf(employeeId);
        if (index !== -1) {
          this.selectedEmployeeIds.splice(index, 1);
        }
      } else {
        // Sinon, désélectionner tous les autres employés et sélectionner celui-ci
        this.selectedEmployeeIds = [employeeId];
      }
    
      // Mettre à jour la liste des employés désactivés
      this.disabledEmployees = this.employee.map(emp => emp._id).filter(id => !this.selectedEmployeeIds.includes(id));

      this.selectedEmployeeId = employeeId;
    }

    generateHours(): void {
      for (let i = 8; i <= 16; i++) {
        const hour = i < 10 ? `0${i}` : `${i}`;
        this.hours.push(hour);
      }
    }

    getServiceDetails(id: string): void {
      this.Service_service.getServiceDetailsrdv(id)
      .subscribe(
        (data) => {
          this.service = data.service;
          // this.employee.push(data.employee);
          this.employee = data.employee;
        },
        (error) => {
          console.error('Error fetching service details:', error);
        }
      );
    }    
    rendez_vous()
    {
      const date = this.rendezvousForm.value.date;
      const hour = this.rendezvousForm.value.hour;

      const dateString = `${date}T${hour}:00:00Z`;
      console.log(dateString);

      this.rendezvousForm.value.date = dateString;

      this.rendezvousForm.value.id_employe = this.selectedEmployeeId;

      this.dataService.setRendezVousData(this.rendezvousForm.value);
      

      this.router.navigate(['payement']);

      // this.RendezVousService.InsertRendezVous(this.rendezvousForm.value).subscribe({
      //   next:(res)=>{
      //     alert("RDV Created!") 
      //     this.rendezvousForm.reset();
      //     this.router.navigate(['home'])
      //   },
      //   error:(err)=>
      //   console.log(err)
      // })

      // console.log(this.rendezvousForm.value);
    }

    ngOnInit(): void {
      this.generateHours();

      this.route.paramMap.subscribe(params => {
        const serviceId = params.get('id');
        if (serviceId) {
          console.log(serviceId)
          this.getServiceDetails(serviceId);
          
        }
       this.rendezvousForm = this.fb.group({ // Initialiser rendezvousForm avec FormBuilder
      // Ajouter les champs de votre formulaire ici
      id_service: [serviceId],
      id_client:[localStorage.getItem("user_id")], // Exemple avec un champ service initialisé à une chaîne vide
      id_employe: [''], // Exemple avec un champ employee initialisé à une chaîne vide
      date: [''], // Exemple avec un champ date initialisé à une chaîne vide
      hour: [''],
      etat: [''] 
      }); 
      });
    }


}
