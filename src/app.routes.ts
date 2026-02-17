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
import { MesProduits } from '@/pages/boutique/gestionBoutique/mesProduits/mesProduits';
import { GestionMaBoutique } from '@/pages/boutique/gestionBoutique/gestionMaBoutique/gestionMaBoutique';
import { MesPrix } from '@/pages/boutique/gestionBoutique/mesPrix/mesPrix';
import { MonStock } from '@/pages/boutique/gestionBoutique/monStock/monStock';
import { AppLayoutAdmin } from '@/layout/administrateur/component/app.layout';
import { ValidationBoutique } from '@/pages/administrateur/gestionBoutique/validationBoutique';
import { LoginAdmin } from '@/pages/auth/loginAdmin';
import { AdminDashboard } from '@/pages/administrateur/dashboard/adminDashboard';
import { CreationBoutique } from '@/pages/administrateur/gestionBoutique/creationBoutique';
import { ListeBoutique } from '@/pages/administrateur/gestionBoutique/listeBoutique';
import { infoplusBoutique } from '@/pages/administrateur/gestionBoutique/infoPlusBoutique';
import { demandeBoutique } from '@/pages/client/demandeBoutique';
import { viewDetailDemandeBoutique } from '@/pages/administrateur/gestionBoutique/viewDetailDemandeBoutique';
import { VoirAllBoutique } from '@/pages/landing/voirAllBoutique';
import { resetPassword } from '@/pages/auth/resetPassword';
import { VisiteVoutique } from '@/pages/landing/VisiteBoutique';


export const appRoutes: Routes = [
    {path:'',component:Landing},
    //{ path: 'landing', component: Landing },
    {path:'membre/client',component:LandingClient},
    {path:'logIn',component:Login},
    {path:'allboutique',component:VoirAllBoutique},
    {path:'administrator/logIn',component:LoginAdmin},
    {path:'signUp',component:SignUp},
    {path:'visiteBoutique',component:VisiteVoutique},
    {path:'forgotPassword',component:forgotPassword},
    {path:'reset-password',component:resetPassword},
    {path:'demandeBoutiqueClient',component:demandeBoutique},
    {path: 'boutique/home',
        component: AppLayout,
        children: [
            { path: '', component: BoutiqueDashboard },
            { path:'mesProduits', component: MesProduits },
            { path:'mesPrix', component: MesPrix },
            { path:'monStock', component: MonStock },
            { path:'gestionMaBoutique', component: GestionMaBoutique }
    ]},
    
    {
        path:'admin/home',
        component:AppLayoutAdmin,
        children:[
            {path:'',component: AdminDashboard},
            {path:'creationBoutique' , component: CreationBoutique},
            {path:'listeBoutique', component:ListeBoutique},
            {path:'infoPlusBoutique/:id', component:infoplusBoutique},
            {path:'validationBoutique',component:ValidationBoutique},
            {path:'viewDetailDemandeBoutique/:id',component:viewDetailDemandeBoutique}
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' },

    
];
