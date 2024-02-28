import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  ngOnInit(): void {
    this.Get3service();
  }
  router = inject(Router);

  Services: any[] = [];
  serviceService = inject(ServiceService);


  Get3service(){
    this.serviceService.get3Service()
    .subscribe((data) => {
      console.log(data);
      this.Services = data;
      
    });
  }
}
