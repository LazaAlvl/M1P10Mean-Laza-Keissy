import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit {

  paginatedServices: any[] = [];
  totalServices = 0;
  totalPages = 0;
  currentPage = 1;
  pageSize = 9;
  serviceService = inject(ServiceService);
  ServicesForm!:FormGroup;


  constructor(private paginationService: ServiceService,private router:Router,private fb: FormBuilder) {
    this.ServicesForm = this.fb.group({
      _id: [''],
      name: [''],
      description: [''],
      deadline: [''],
      price: [''],
      commission: ['']
    });


   }

  ngOnInit(): void {
    this.getPaginatedServices();
  }

  getPaginatedServices(): void {
    this.paginationService.getPaginatedServices(this.currentPage, this.pageSize)
      .subscribe((data: { services: any[]; totalServices: number; totalPages: number; currentPage: number; }) => {
        this.paginatedServices = data.services;
        this.totalServices = data.totalServices;
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
      });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getPaginatedServices();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPaginatedServices();
    }
  }
  getPagesArrays(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
  getPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.getPaginatedServices();
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

  update(serviceId: string): void {
    this.serviceService.getServiceDetails(serviceId).subscribe(
      (data) => {
        // Réinitialisez votre formulaire avec les détails récupérés
        this.ServicesForm.patchValue({
          _id: data._id,
          name: data.name,
          description: data.description,
          deadline: data.deadline,
          price: data.price,
          commission: data.commission
        });
        // Puisque vous êtes dans le composant de profil, vous pouvez probablement naviguer vers une page de mise à jour dédiée.
        // Vous pouvez utiliser le Router pour naviguer vers la page de mise à jour.
        // Assurez-vous d'injecter le Router dans votre composant.
        this.router.navigate(['/update-service', serviceId]);
      },
      (error) => {
        console.error('Error fetching service details:', error);
      }
    );
      
      
  }
  delete(serviceId: string): void {
    this.serviceService.deleteService(serviceId).subscribe(
      (data) => {
        alert("Service Deleted Successfully");
        this.router.navigate(['/service']);
      },
      (error) => {
        console.error('Error fetching service details:', error);
      }
    );
      
      
  }
}
