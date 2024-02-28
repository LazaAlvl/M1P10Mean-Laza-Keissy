import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, FooterComponent,CommonModule]
})
export class AppComponent {

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
