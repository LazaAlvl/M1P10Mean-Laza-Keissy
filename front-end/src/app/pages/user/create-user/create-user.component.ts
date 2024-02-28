import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { confirmPasswordValidator } from '../../../validators/confirmPasswordValidator';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
  createuserForm!: FormGroup;

  fb = inject(FormBuilder);

  router = inject(Router);

  authService= inject(AuthService);

  ngOnInit(): void {
    this.createuserForm = this.fb.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['',Validators.compose([Validators.required, Validators.email])],
      role: ['',Validators.required],
      password: ['',Validators.required],
      confirmpassword: ['',Validators.required],
      number: ['',Validators.required],
 
     },
     {
       validator:confirmPasswordValidator('password','confirmpassword')
 
     });
  }  

  create(){
    console.log(this.createuserForm.value);
    this.authService.registerService(this.createuserForm.value).subscribe({
      next:(res)=>{
        alert("User Created!") 
        this.createuserForm.reset();
        this.router.navigate(['login'])
      },
      error:(err)=>
      console.log(err)
    })
  }

}
