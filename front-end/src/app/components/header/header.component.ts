
import { Component, Inject, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDoorOpen,faBell, fas } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  isLoggedIn: boolean =false;


  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    // this.userName = localStorage.getItem('firstname');
  }

  faUser = faUser;
  faDoorOpen = faDoorOpen;
  faBell= faBell;


  logout()
  {
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    this.authService.isLoggedIn$.next(false);
  }

  ngOnInit(): void {
   this.authService.isLoggedIn$.subscribe(res=>{
   this.isLoggedIn= this.authService.isLoggedin();
   });
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

}
