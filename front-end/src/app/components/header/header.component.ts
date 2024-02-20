<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
=======
import { Component, Inject, OnInit, inject } from '@angular/core';
>>>>>>> 915c5068d72ce8bcfed118897d1045b1bc13662c
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDoorOpen, fas } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
<<<<<<< HEAD
=======
import { CommonModule } from '@angular/common';
>>>>>>> 915c5068d72ce8bcfed118897d1045b1bc13662c

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
<<<<<<< HEAD
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  isLoggedIn: boolean =false;
=======
export class HeaderComponent implements OnInit{
  // userName: string=" ";

authService = inject(AuthService);

isloggedIn: boolean = false;


>>>>>>> 915c5068d72ce8bcfed118897d1045b1bc13662c

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    // this.userName = localStorage.getItem('firstname');
  }
<<<<<<< HEAD
  ngOnInit(): void {
    
    this.authService.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.authService.isLoggedIn();
    })
  }

=======
 
  faDoor = faDoorOpen;
>>>>>>> 915c5068d72ce8bcfed118897d1045b1bc13662c
  faUser = faUser;
  faDoorOpen = faDoorOpen;

  logout()
  {
    localStorage.removeItem("user_id");
    this.authService.isLoggedIn$.next(false)
  }


  logout()
  {
    localStorage.removeItem("user_id");
    localStorage.removeItem("firstname");
    this.authService.isLoggedIn$.next(false);
  }

  ngOnInit(): void {
   this.authService.isLoggedIn$.subscribe(res=>{
   this.isloggedIn = this.authService.isLoggedin();
   });
  }

}
