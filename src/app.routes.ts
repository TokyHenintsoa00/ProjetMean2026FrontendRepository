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
import { AjoutProduit } from '@/pages/boutique/gestionBoutique/ajoutProduit/ajoutProduit';
import { AppLayoutAdmin } from '@/layout/administrateur/component/app.layout';
import { ValidationBoutique } from '@/pages/administrateur/gestionBoutique/validationBoutique';
import { LoginAdmin } from '@/pages/auth/loginAdmin';
import { AdminDashboard } from '@/pages/administrateur/dashboard/adminDashboard';
import { CreationBoutique } from '@/pages/administrateur/gestionBoutique/creationBoutique';

export const appRoutes: Routes = [
    {path:'',component:Landing},
    //{ path: 'landing', component: Landing },
    {path:'membre/client',component:LandingClient},
    { path:'logIn',component:Login},
    {path:'administrator/logIn',component:LoginAdmin},
    {path:'signUp',component:SignUp},
    {path:'forgotPassword',component:forgotPassword},
    {path: 'boutique/home',
        component: AppLayout,
        children: [
            { path: '', component: BoutiqueDashboard },
            { path:'ajoutProduit', component: AjoutProduit }    
    ]},
    
    {
        path:'admin/home',
        component:AppLayoutAdmin,
        children:[
            {path:'',component: AdminDashboard},
            {path:'creationBoutique' , component: CreationBoutique}
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' },

    
];
