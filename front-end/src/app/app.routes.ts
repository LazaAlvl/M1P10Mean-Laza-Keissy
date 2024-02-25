import { Routes } from '@angular/router';
import { ResetComponent } from './pages/reset/reset.component';
import { HomeComponent } from './pages/home/home.component';
import { ServiceComponent } from './pages/service/service.component';
import { InfoServiceComponent } from './pages/info-service/info-service.component';
import { RendezVousComponent } from './pages/rendez-vous/rendez-vous.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {path:'login', loadComponent: ()=> import('./pages/login/login.component')},
    {path:'register', loadComponent: ()=> import('./pages/register/register.component')},
    {path:'reset',component:ResetComponent}, 
    {path:'home',component:HomeComponent},
    {path:'service',component:ServiceComponent},
    {path: 'info-service/:id', component: InfoServiceComponent},
    {path: 'rendez_vous/:id', component: RendezVousComponent},
    {path: 'etoile', component: InfoServiceComponent},
    {path: 'profile', component: ProfileComponent}
    
];
