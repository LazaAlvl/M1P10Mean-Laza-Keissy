import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  fb = inject(FormBuilder);

  router = inject(Router);

  authservice= inject(AuthService);

  loginForm !:FormGroup;


  ngOnInit(): void {
    this.loginForm = this.fb.group({

     email: ['',Validators.compose([Validators.required, Validators.email])],
     password: ['',Validators.required],
    },
    );
   
  }

  login()
  {
    this.authservice.loginService(this.loginForm.value).subscribe({
      next:(res)=>{
        alert("Login successfully!") 
        localStorage.setItem("user_id",res.client._id);
        localStorage.setItem("role",res.client.role);
        this.authservice.isLoggedIn$.next(true);
        this.loginForm.reset();
        this.router.navigate(['home']) 
      },
      error:(err)=>
      console.log(err)
    })
  }
  
}

