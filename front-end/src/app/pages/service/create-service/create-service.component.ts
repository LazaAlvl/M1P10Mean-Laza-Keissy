import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-create-service',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.css'
})
export class CreateServiceComponent implements OnInit {
  createServiceForm!: FormGroup;

  fb = inject(FormBuilder);

  router = inject(Router);

  Serviceservice= inject(ServiceService);

  ngOnInit(): void {
    this.createServiceForm = this.fb.group({
      name: [''],
      description: [''],
      deadline: [''],
      price: [''],
      commission: ['']
  })
  }
  create(){
    // console.log(this.registerForm.value);
    console.log(this.createServiceForm.value);
    this.Serviceservice.createService(this.createServiceForm.value).subscribe({
      next:()=>{
        alert("Service Created!") 
        this.createServiceForm.reset();
        this.router.navigate(['service']);
      },
      error:(err: any)=>
      console.log(err)
    })
  }


}
