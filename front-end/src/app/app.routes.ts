import { Routes } from '@angular/router';
import { ResetComponent } from './pages/reset/reset.component';
import { HomeComponent } from './pages/home/home.component';
import { ServiceComponent } from './pages/service/service.component';
import { InfoServiceComponent } from './pages/info-service/info-service.component';
import { RendezVousComponent } from './pages/rendez-vous/rendez-vous.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PayementComponent } from './pages/payement/payement.component';
import { UpdateServiceComponent } from './pages/service/update-service/update-service.component';
import { CreateServiceComponent } from './pages/service/create-service/create-service.component';
import { UserComponent } from './pages/user/user.component';
import { UpdateUserComponent } from './pages/user/update-user/update-user.component';
import { CreateUserComponent } from './pages/user/create-user/create-user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path:'login', loadComponent: ()=> import('./pages/login/login.component')},
    {path:'register', loadComponent: ()=> import('./pages/register/register.component')},
    {path:'reset',component:ResetComponent},
    {path:'home',component:HomeComponent},
    {path:'service',component:ServiceComponent},
    {path: 'info-service/:id', component: InfoServiceComponent},
    {path: 'rendez_vous/:id', component: RendezVousComponent},
    {path: 'etoile', component: InfoServiceComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'payement', component: PayementComponent },
    {path: 'update-service/:id', component: UpdateServiceComponent},
    {path: 'service/create', component: CreateServiceComponent},
    {path: 'user', component: UserComponent},
    {path: 'update-user/:id', component: UpdateUserComponent},
    {path: 'user/create', component: CreateUserComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'about', component: AboutComponent}




];
