import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { Login } from '@/pages/auth/login';
import { SignUp } from '@/pages/auth/signup';
import { LandingClient } from '@/landingClientMembre/landing';

export const appRoutes: Routes = [
    {path:'',component:Landing},
    //{ path: 'landing', component: Landing },
    {path:'membre/client',component:LandingClient},
    { path:'logIn',component:Login},
    {path:'signUp',component:SignUp},
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' },
    
];
