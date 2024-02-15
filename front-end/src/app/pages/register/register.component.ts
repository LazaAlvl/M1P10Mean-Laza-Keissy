import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../validators/confirmPasswordValidator';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent implements OnInit {
  fb = inject(FormBuilder);

  router = inject(Router);

  authservice= inject(AuthService);

  registerForm !:FormGroup;


  ngOnInit(): void {
    this.registerForm = this.fb.group({
     firstname: ['',Validators.required],
     lastname: ['',Validators.required],
     email: ['',Validators.compose([Validators.required, Validators.email])],
     password: ['',Validators.required],
     confirmpassword: ['',Validators.required],
     number: ['',Validators.required],

    },
    {
      validator:confirmPasswordValidator('password','confirmpassword')

    }

    );
   
  }
  register(){
    // console.log(this.registerForm.value);
    this.authservice.registerService(this.registerForm.value).subscribe({
      next:(res)=>{
        alert("Profile Client Created!") 
        this.registerForm.reset();
        this.router.navigate(['login'])
      },
      error:(err)=>
      console.log(err)
    })
  }

}
