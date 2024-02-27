import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  updateuserForm!: FormGroup;
  UserId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.updateuserForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      role: [''],
      email: [''],
      password: [''],
      number: ['']
    });

    this.route.params.subscribe(params => {
      this.UserId= params['id'];
      this.authService.getUserDetails(this.UserId).subscribe(
        (data) => {
          this.updateuserForm.patchValue({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            role: data.role,
            password: data.password,
            number: data.number
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
      if (this.updateuserForm.valid) {
          // Appeler le service pour mettre à jour le service
          this.authService.updateUser(this.UserId, this.updateuserForm.value).subscribe(
              (res) => {
                  // Gérer la réponse de la mise à jour (par exemple, afficher un message de succès)
                  console.log('User updated successfully:', res);
                  alert('Service updated successfully');
                  // Naviguer vers une autre page si nécessaire
                  this.router.navigate(['/user']);
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

  

