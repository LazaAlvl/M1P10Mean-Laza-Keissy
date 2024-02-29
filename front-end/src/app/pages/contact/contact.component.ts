import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  router = inject(Router);

  Services: any[] = [];
  authService = inject(AuthService);
  emailForm!:FormGroup;
  
  fb = inject(FormBuilder);
  ngOnInit(): void {
    this.emailForm = this.fb.group({

      name: [''],
      subject: [''],
      email: [''],
      message: ['']
      
     },
     );

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
