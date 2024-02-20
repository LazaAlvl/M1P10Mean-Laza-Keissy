
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-service',
  standalone: true,
  imports: [RouterModule,CommonModule,FontAwesomeModule,],
  templateUrl: './info-service.component.html',
  styleUrl: './info-service.component.css'
})
export class InfoServiceComponent implements OnInit{

  Service_service = inject(ServiceService);

  serviceDetails: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const serviceId = params.get('id');
      if (serviceId) {
        console.log(serviceId)
        this.getServiceDetails(serviceId);
        
      }
    });
  }

  getServiceDetails(id: string): void {
    this.Service_service.getServiceDetails(id)
      .subscribe((data) => {
        this.serviceDetails = data;
        
      });
  }
}

