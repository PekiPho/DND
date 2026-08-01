import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

export const routes: Routes = [
    {path: '',redirectTo: 'login', pathMatch:'full'},

    {path: 'login',component: Login},

    {path: 'register', component:Register},

    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then(m=> m.Dashboard)
    },

    {
        path: 'room/:id',
        loadComponent: () => import('./room/room.component').then(m => m.RoomComponent)
    },
];
