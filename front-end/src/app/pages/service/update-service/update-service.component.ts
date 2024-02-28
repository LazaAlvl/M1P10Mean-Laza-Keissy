import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ServiceService } from '../../../services/service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-service',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './update-service.component.html',
  styleUrl: './update-service.component.css'
})
export class UpdateServiceComponent implements OnInit {
  updateServiceForm!: FormGroup;
  serviceId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private serviceService: ServiceService
  ) { }

  ngOnInit(): void {
    this.updateServiceForm = this.fb.group({
      name: [''],
      description: [''],
      deadline: [''],
      price: [''],
      commission: ['']
    });

    this.route.params.subscribe(params => {
      this.serviceId = params['id'];
      this.serviceService.getServiceDetails(this.serviceId).subscribe(
        (data) => {
          this.updateServiceForm.patchValue({
            name: data.name,
            description: data.description,
            deadline: data.deadline,
            price: data.price,
            commission: data.commission
          });
        },
        (error) => {
          console.error('Error fetching service details:', error);
        }
      );
    });
  }
  onSubmit(): void {
    // Vérifiez si le formulaire est valide avant de procéder
    if (this.updateServiceForm.valid) {
        // Appeler le service pour mettre à jour le service
        this.serviceService.updateService(this.serviceId, this.updateServiceForm.value).subscribe(
            (res) => {
                // Gérer la réponse de la mise à jour (par exemple, afficher un message de succès)
                console.log('Service updated successfully:', res);
                alert('Service updated successfully');
                // Naviguer vers une autre page si nécessaire
                this.router.navigate(['/service']);
            },
            (error) => {
                // Gérer les erreurs (par exemple, afficher un message d'erreur)
                console.error('Error updating service:', error);
                alert('Error updating service');
            }
        );
    } else {
        // Si le formulaire n'est pas valide, affichez un message d'erreur ou effectuez une action appropriée
        alert('Form is invalid. Please check your inputs.');
    }
}

}
