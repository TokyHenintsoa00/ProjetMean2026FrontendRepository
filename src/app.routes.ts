import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/boutique/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';

import { Notfound } from './app/pages/notfound/notfound';
import { Login } from '@/pages/auth/login';
import { SignUp } from '@/pages/auth/signup';
import { LandingClient } from '@/pages/client/landingClientMembre/landing';
import { forgotPassword } from '@/pages/auth/forgotPassword';

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
import { demandeBoutique } from '@/pages/landing/demandeBoutique';
import { viewDetailDemandeBoutique } from '@/pages/administrateur/gestionBoutique/viewDetailDemandeBoutique';
import { VoirAllBoutique } from '@/pages/landing/voirAllBoutique';
import { resetPassword } from '@/pages/auth/resetPassword';
import { VisiteBoutique } from '@/pages/landing/VisiteBoutique';
import { authGuard, clientGuard, boutiqueGuard, adminGuard, publicGuard } from '@/guards/auth.guard';
import { AppLayoutClient } from '@/layout/client/component/app.layout';
import { Catalogue } from '@/pages/client/catalogue/catalogue';
import { Panier } from '@/pages/client/panier/panier';
import { MesCommandes } from '@/pages/client/mesCommandes/mesCommandes';
import { CommandesBoutique } from '@/pages/boutique/commandes/commandesBoutique';
import { ListeCommandesAdmin } from '@/pages/administrateur/commandes/listeCommandes';
import { CommandeDetail } from '@/pages/commandes/commandeDetail/commandeDetail';
import { MesPromotions } from '@/pages/boutique/gestionBoutique/mesPromotions/mesPromotions';
import { PromotionsClient } from '@/pages/client/promotions/promotions';
import { AccueilClient } from '@/pages/client/accueil/accueil';
import { ListeContrats } from '@/pages/administrateur/contrats/listeContrats';
import { AjouterContrat } from '@/pages/administrateur/contrats/ajouterContrat';
import { DetailContrat } from '@/pages/administrateur/contrats/detailContrat';
import { MonContrat } from '@/pages/boutique/contrat/monContrat';
import { GestionBox } from '@/pages/administrateur/gestionBox/gestionBox';

export const appRoutes: Routes = [
    {path:'',component:Landing, canActivate:[publicGuard]},
    {path:'membre/client',component:LandingClient},
    {path:'logIn',component:Login, canActivate:[publicGuard]},
    {path:'allboutique',component:VoirAllBoutique},
    {path:'administrator/logIn',component:LoginAdmin},
    {path:'visiteBoutique/:id',component:VisiteBoutique},
    {path:'signUp',component:SignUp},
    {path:'forgotPassword',component:forgotPassword},
    {path:'reset-password',component:resetPassword},
    {path:'demandeBoutiqueClient',component:demandeBoutique},
    // Espace client authentifié — catalogue, panier, commandes
    {path: 'client',
        component: AppLayoutClient,
        canActivate: [clientGuard],
        children: [
            { path: '', redirectTo: 'accueil', pathMatch: 'full' },
            { path: 'accueil', component: AccueilClient },
            { path: 'catalogue', component: Catalogue },
            { path: 'promotions', component: PromotionsClient },
            { path: 'panier', component: Panier },
            { path: 'mes-commandes', component: MesCommandes },
            { path: 'mes-commandes/:id', component: CommandeDetail, data: { mode: 'client' } }
        ]
    },
    {path: 'boutique/home',
        component: AppLayout,
        canActivate: [boutiqueGuard],
        children: [
            { path: '', component: BoutiqueDashboard },
            { path:'mesProduits', component: MesProduits },
            { path:'mesPrix', component: MesPrix },
            { path:'monStock', component: MonStock },
            { path:'gestionMaBoutique', component: GestionMaBoutique },
            { path:'mesCommandes', component: CommandesBoutique },
            { path:'mesCommandes/:id', component: CommandeDetail, data: { mode: 'boutique' } },
            { path:'mesPromotions', component: MesPromotions },
            { path:'monContrat', component: MonContrat }
    ]},
    
    {
        path:'admin/home',
        component:AppLayoutAdmin,
        canActivate: [adminGuard],
        children:[
            {path:'',component: AdminDashboard},
            {path:'creationBoutique' , component: CreationBoutique},
            {path:'listeBoutique', component:ListeBoutique},
            {path:'infoPlusBoutique/:id', component:infoplusBoutique},
            {path:'validationBoutique',component:ValidationBoutique},
            {path:'viewDetailDemandeBoutique/:id',component:viewDetailDemandeBoutique},
            {path:'commandes',component:ListeCommandesAdmin},
            {path:'commandes/:id', component:CommandeDetail, data:{ mode:'admin' }},
            {path:'contrats', component:ListeContrats},
            {path:'contrats/ajouter', component:AjouterContrat},
            {path:'contrats/detail/:id', component:DetailContrat},
            {path:'boxes', component:GestionBox}
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' },

    
];
