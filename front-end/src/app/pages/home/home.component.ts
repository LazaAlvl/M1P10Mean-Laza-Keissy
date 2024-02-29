import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  ngOnInit(): void {
    this.Get3service();
    this.emailForm = this.fb.group({

      name: [''],
      subject: [''],
      email: [''],
      message: ['']
      
     },
     );

  }
  router = inject(Router);

  Services: any[] = [];
  serviceService = inject(ServiceService);
  authService = inject(AuthService);
  emailForm!:FormGroup;
  
  fb = inject(FormBuilder);


  Get3service(){
    this.serviceService.get3Service()
    .subscribe((data) => {
      console.log(data);
      this.Services = data;
      
    });
  }
  onSubmit() {
    this.authService.sendEmail(this.emailForm.value).subscribe(
      () => {
        alert("Email envoyé avec succès");
      },
      (error) => {
        alert(error);
      }
    );
  }
}
