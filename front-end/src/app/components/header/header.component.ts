import { Component, Inject, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDoorOpen, fas } from '@fortawesome/free-solid-svg-icons';
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
export class HeaderComponent implements OnInit{
  // userName: string=" ";

authService = inject(AuthService);

isloggedIn: boolean = false;



  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    // this.userName = localStorage.getItem('firstname');
  }
 
  faDoor = faDoorOpen;
  faUser = faUser;

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
