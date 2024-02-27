import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  paginatedUsers: any[] = [];
  totalUsers = 0;
  totalPages = 0;
  currentPage = 1;
  pageSize = 9;
  authService = inject(AuthService);
  UserForm!:FormGroup;

  constructor(private router:Router,private fb: FormBuilder){
    this.UserForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      password: [''],
      number: ['']
    });
  }

  ngOnInit(): void {
    this.getPaginatedUsers();
  }

  getPaginatedUsers(): void {
    this.authService.getPaginatedUsers(this.currentPage, this.pageSize)
      .subscribe((data: { users: any[]; totalusers: number; totalPages: number; currentPage: number; }) => {
        this.paginatedUsers = data.users;
        this.totalUsers = data.totalusers;
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
      });
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPaginatedUsers();
    }
  }
  getPagesArrays(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
  getPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.getPaginatedUsers();
    }
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getPaginatedUsers();
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

    update(userId: string): void {
      this.authService.getUserDetails(userId).subscribe(
        (data) => {
          // Réinitialisez votre formulaire avec les détails récupérés
          this.UserForm.patchValue({
            _id: data._id,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            number: data.number,
          });
          // Puisque vous êtes dans le composant de profil, vous pouvez probablement naviguer vers une page de mise à jour dédiée.
          // Vous pouvez utiliser le Router pour naviguer vers la page de mise à jour.
          // Assurez-vous d'injecter le Router dans votre composant.
          this.router.navigate(['/update-user', userId]);
        },
        (error) => {
          console.error('Error fetching service details:', error);
        }
      );
        
    }  
    delete(userId: string): void {
      this.authService.deleteUser(userId).subscribe(
        (data) => {
          alert("User Deleted Successfully");
          this.router.navigate(['/user']);
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
        
        
    }
   
  

}
