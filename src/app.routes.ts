import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/boutique/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { Login } from '@/pages/auth/login';
import { SignUp } from '@/pages/auth/signup';
import { LandingClient } from '@/landingClientMembre/landing';
import { forgotPassword } from '@/pages/auth/forgotPassword';
import { Component } from '@angular/core';
import { BoutiqueDashboard } from '@/pages/boutique/dashboard/boutiquedashboard';

export const appRoutes: Routes = [
    {path:'',component:Landing},
    //{ path: 'landing', component: Landing },
    {path:'membre/client',component:LandingClient},
    { path:'logIn',component:Login},
    {path:'signUp',component:SignUp},
    {path:'forgotPassword',component:forgotPassword},
    {path: 'boutique/home',
        component: AppLayout,
        children: [
            { path: '', component: BoutiqueDashboard }
            
    ]},
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' },

    
];
