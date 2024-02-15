import { Routes } from '@angular/router';
import { ResetComponent } from './pages/reset/reset.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path:'login', loadComponent: ()=> import('./pages/login/login.component')},
    {path:'register', loadComponent: ()=> import('./pages/register/register.component')},
    {path:'reset',component:ResetComponent}, 
    {path:'home',component:HomeComponent}, 
    
];
