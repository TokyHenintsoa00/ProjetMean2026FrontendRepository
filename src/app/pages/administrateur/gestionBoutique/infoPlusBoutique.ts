// import { CommonModule } from "@angular/common";
// import { Component, OnInit } from "@angular/core";
// import { ActivatedRoute, Router } from "@angular/router";
// import { ConfirmationService, MessageService } from "primeng/api";
// import { ButtonModule } from "primeng/button";
// import { CardModule } from "primeng/card";
// import { AvatarModule } from "primeng/avatar";
// import { BadgeModule } from "primeng/badge";
// import { DividerModule } from "primeng/divider";
// import { TagModule } from "primeng/tag";
// import { RatingModule } from "primeng/rating";
// import { ToastModule } from "primeng/toast";
// import { ConfirmDialogModule } from "primeng/confirmdialog";
// import { TabsModule } from "primeng/tabs";
// import { BoutiqueService } from "@/pages/service/boutique.service";
// import { FormsModule } from "@angular/forms";
// import { UserService } from "@/pages/service/user.service";

// @Component({
//     selector: 'app-infoplusBoutique',
//     standalone: true,
//     imports: [
//         CommonModule,
//         FormsModule,
//         ButtonModule,
//         CardModule,
//         AvatarModule,
//         BadgeModule,
//         DividerModule,
//         TagModule,
//         RatingModule,
//         ToastModule,
//         ConfirmDialogModule,
//         TabsModule
//     ],
//     template:`<div class="profile-container">
//     <p-toast></p-toast>
//     <p-confirmDialog></p-confirmDialog>

//     <!-- En-tête avec bouton retour -->
//     <div class="profile-header">
//         <button 
//             pButton 
//             type="button"
//             icon="pi pi-arrow-left"
//             label="Retour"
//             class="p-button-text back-btn"
//             (click)="goBack()">
//         </button>
//         <h1 class="page-title">
//             <i class="pi pi-user"></i>
//             Profil Utilisateur
//         </h1>
//     </div>

//     <!-- Loader -->
//     @if (loading) {
//     <div class="loading-container">
//         <i class="pi pi-spin pi-spinner" style="font-size: 3rem; color: var(--primary-color);"></i>
//         <p>Chargement du profil...</p>
//     </div>
//     }

//     <!-- Contenu du profil -->
//     @if (!loading && userData) {
//     <div class="profile-content">
        
//         <!-- Card Informations Utilisateur -->
//         <div class="user-info-card">
//             <div class="card-header-custom">
//                 <h2>
//                     <i class="pi pi-id-card"></i>
//                     Informations du Manager
//                 </h2>
//                 <div class="status-badge" [class.active]="userData.isActive" [class.inactive]="!userData.isActive">
//                     <i class="pi" [class.pi-check-circle]="userData.isActive" [class.pi-ban]="!userData.isActive"></i>
//                     {{ userData.isActive ? 'Actif' : 'Désactivé' }}
//                 </div>
//             </div>

//             <div class="user-details">
//                 <!-- Avatar et Nom -->
//                 <div class="avatar-section">
//                     <div class="avatar-container">
//                         @if (userData.avatar) {
//                             <img [src]="userData.avatar" alt="Avatar" class="avatar-large">
//                         } @else {
//                             <div class="avatar-placeholder-large">
//                                 <i class="pi pi-user"></i>
//                             </div>
//                         }
//                     </div>
//                     <div class="user-name-section">
//                         <h3>{{ userData.prenom }} {{ userData.nom }}</h3>
//                         <p class="user-role">
//                             <i class="pi pi-briefcase"></i>
//                             Manager de Boutique
//                         </p>
//                     </div>
//                 </div>

//                 <p-divider></p-divider>

//                 <!-- Informations de contact -->
//                 <div class="contact-info">
//                     <div class="info-row">
//                         <div class="info-label">
//                             <i class="pi pi-envelope"></i>
//                             Email
//                         </div>
//                         <div class="info-value">{{ userData.email }}</div>
//                     </div>

//                     <div class="info-row">
//                         <div class="info-label">
//                             <i class="pi pi-phone"></i>
//                             Téléphone
//                         </div>
//                         <div class="info-value">{{ userData.telephone }}</div>
//                     </div>

//                     @if (userData.createdAt) {
//                     <div class="info-row">
//                         <div class="info-label">
//                             <i class="pi pi-calendar"></i>
//                             Membre depuis
//                         </div>
//                         <div class="info-value">{{ userData.createdAt | date: 'dd/MM/yyyy' }}</div>
//                     </div>
//                     }
//                 </div>

//                 <!-- Actions -->
//                 <div class="action-buttons">
//                     <button 
//                         pButton 
//                         type="button"
//                         [label]="userData.isActive ? 'Désactiver le compte' : 'Activer le compte'"
//                         [icon]="userData.isActive ? 'pi pi-ban' : 'pi pi-check'"
//                         [class]="userData.isActive ? 'p-button-danger' : 'p-button-success'"
//                         (click)="toggleAccountStatus()">
//                     </button>

                    
//                 </div>
//             </div>
//         </div>

//         <!-- Card Informations Boutique -->
//         @if (boutique) {
//         <div class="shop-info-card">
//             <div class="card-header-custom">
//                 <h2>
//                     <i class="pi pi-shopping-bag"></i>
//                     Informations de la Boutique
//                 </h2>
//             </div>

//             <div class="shop-details">
//                 <!-- Nom et Note -->
//                 <div class="shop-header-info">
//                     <div>
//                         <h3 class="shop-name">{{ boutique.name }}</h3>
//                         <p class="shop-category">
//                             <i class="pi pi-tag"></i>
//                             {{ boutique.categorie }}
//                         </p>
//                     </div>
//                     <div class="shop-rating">
//                         <p-rating 
//                             [(ngModel)]="boutique.rating"
//                             [readonly]="true">
//                         </p-rating>
//                         <span class="rating-value">{{ boutique.rating }}/5</span>
//                     </div>
//                 </div>

//                 <p-divider></p-divider>

//                 <!-- Détails de la boutique -->
//                 <div class="shop-info-grid">
                  

//                     <div class="info-card">
//                         <div class="info-card-icon category">
//                             <i class="pi pi-th-large"></i>
//                         </div>
//                         <div class="info-card-content">
//                             <span class="info-card-label">Catégorie</span>
//                             <span class="info-card-value">{{ boutique.categorie }}</span>
//                         </div>
//                     </div>

//                     @if (boutique.created) {
//                     <div class="info-card">
//                         <div class="info-card-icon date">
//                             <i class="pi pi-calendar-plus"></i>
//                         </div>
//                         <div class="info-card-content">
//                             <span class="info-card-label">Créée le</span>
//                             <span class="info-card-value">{{ boutique.created | date: 'dd/MM/yyyy' }}</span>
//                         </div>
//                     </div>
//                     }

//                     <div class="info-card">
//                         <div class="info-card-icon status">
//                             <i class="pi pi-circle-fill"></i>
//                         </div>
//                         <div class="info-card-content">
//                             <span class="info-card-label">Statut</span>
//                             <span class="info-card-value status-text" [class.active]="boutique.status === 'active'">
//                                 {{ boutique.status === 'active' ? 'Active' : 'Inactive' }}
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 <!-- Description -->
//                 @if (boutique.description) {
//                 <div class="shop-description">
//                     <h4>
//                         <i class="pi pi-info-circle"></i>
//                         Description
//                     </h4>
//                     <p>{{ boutique.description }}</p>
//                 </div>
//                 }
//             </div>

            
//         </div>

        

//         }
//     </div>
    
//     }
//     <!-- ===== LIGNE 2 : Horaires pleine largeur ===== -->
//         @if (boutique?.horaires && boutique.horaires.length > 0) {
//         <div class="horaires-card">
//             <div class="card-header-custom">
//                 <h2><i class="pi pi-clock"></i> Horaires d'ouverture</h2>
//             </div>
//             <div class="horaires-grid">
//                 @for (h of boutique.horaires; track h.jour) {
//                 <div class="horaire-item" [class.ferme]="h.est_ferme">
//                     <div class="horaire-jour">
//                         <span class="jour-dot" [class.open]="!h.est_ferme" [class.closed]="h.est_ferme"></span>
//                         <span class="jour-label">{{ h.jour }}</span>
//                     </div>
//                     <div class="horaire-time">
//                         @if (!h.est_ferme) {
//                             <span class="time-badge open-time">{{ h.ouverture }}</span>
//                             <span class="time-separator">—</span>
//                             <span class="time-badge close-time">{{ h.fermeture }}</span>
//                         } @else {
//                             <span class="ferme-badge">Fermé</span>
//                         }
//                     </div>
//                 </div>
//                 }
//             </div>
//         </div>
//         }


//     <!-- Message si aucune donnée -->
//     @if (!loading && !userData) {
//     <div class="no-data">
//         <i class="pi pi-exclamation-triangle"></i>
//         <h3>Aucune donnée trouvée</h3>
//         <p>Impossible de charger les informations du profil</p>
//         <button
//             pButton
//             type="button"
//             label="Retour"
//             icon="pi pi-arrow-left"
//             (click)="goBack()">
//         </button>
//     </div>
//     }
// </div>`,
//     styles:[`/* ============================================
//    VARIABLES DU THÈME
//    ============================================ */
// :host {
//     --primary-color: #f59e0b;
//     --primary-light: #fbbf24;
//     --primary-dark: #d97706;
//     --success-color: #10b981;
//     --warning-color: #f59e0b;
//     --danger-color: #ef4444;
//     --info-color: #0369a1;

//     --bg-primary: #ffffff;
//     --bg-secondary: #f9fafb;
//     --bg-hover: #fffbeb;
    
//     --text-primary: #1f2937;
//     --text-secondary: #6b7280;
//     --text-light: #9ca3af;
    
//     --border-color: #e5e7eb;
//     --border-color-light: #f3f4f6;
    
//     --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//     --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
//     --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//     --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
//     --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
// }

// /* ============================================
//    CONTAINER PRINCIPAL
//    ============================================ */
// .profile-container {
//     max-width: 1400px;
//     margin: 0 auto;
//     padding: 2rem;
//     animation: fadeIn 0.5s ease;
// }

// @keyframes fadeIn {
//     from {
//         opacity: 0;
//         transform: translateY(10px);
//     }
//     to {
//         opacity: 1;
//         transform: translateY(0);
//     }
// }

// /* ============================================
//    EN-TÊTE
//    ============================================ */
// .profile-header {
//     display: flex;
//     align-items: center;
//     gap: 1.5rem;
//     margin-bottom: 2rem;
//     padding-bottom: 1.5rem;
//     border-bottom: 2px solid var(--border-color-light);
// }

// .page-title {
//     font-size: 2rem;
//     font-weight: 800;
//     color: var(--text-primary);
//     display: flex;
//     align-items: center;
//     gap: 0.75rem;
//     margin: 0;
//     background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
// }

// .page-title i {
//     color: var(--primary-color);
//     -webkit-text-fill-color: var(--primary-color);
// }

// ::ng-deep .back-btn {
//     font-weight: 600;
//     transition: all 0.3s ease;
// }

// ::ng-deep .back-btn:hover {
//     background: var(--bg-hover) !important;
//     transform: translateX(-5px);
// }

// /* ============================================
//    LOADING
//    ============================================ */
// .loading-container {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 4rem;
//     gap: 1.5rem;
// }

// .loading-container p {
//     color: var(--text-secondary);
//     font-size: 1.125rem;
//     font-weight: 500;
// }

// /* ============================================
//    CONTENU DU PROFIL
//    ============================================ */
// .profile-content {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 2rem;
// }

// /* ============================================
//    CARDS
//    ============================================ */
// .user-info-card,
// .shop-info-card {
//     background: var(--bg-primary);
//     border-radius: 1.5rem;
//     box-shadow: var(--shadow-xl);
//     padding: 2rem;
//     border: 1px solid rgba(245, 158, 11, 0.08);
//     transition: all 0.3s ease;
// }

// .user-info-card:hover,
// .shop-info-card:hover {
//     box-shadow: 0 25px 35px -5px rgba(0, 0, 0, 0.15);
//     transform: translateY(-3px);
// }

// .card-header-custom {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 2rem;
//     padding-bottom: 1rem;
//     border-bottom: 2px solid var(--border-color-light);
// }

// .card-header-custom h2 {
//     font-size: 1.5rem;
//     font-weight: 700;
//     color: var(--text-primary);
//     display: flex;
//     align-items: center;
//     gap: 0.75rem;
//     margin: 0;
// }

// .card-header-custom h2 i {
//     color: var(--primary-color);
// }

// /* ============================================
//    STATUS BADGE
//    ============================================ */
// .status-badge {
//     padding: 0.5rem 1.25rem;
//     border-radius: 9999px;
//     font-weight: 700;
//     font-size: 0.875rem;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//     transition: all 0.3s ease;
// }

// .status-badge.active {
//     background: linear-gradient(135deg, #d1fae5, #a7f3d0);
//     color: #065f46;
//     box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
// }

// .status-badge.inactive {
//     background: linear-gradient(135deg, #fee2e2, #fecaca);
//     color: #991b1b;
//     box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
// }

// /* ============================================
//    SECTION AVATAR
//    ============================================ */
// .avatar-section {
//     display: flex;
//     align-items: center;
//     gap: 2rem;
//     margin-bottom: 2rem;
// }

// .avatar-container {
//     position: relative;
// }

// .avatar-large {
//     width: 120px;
//     height: 120px;
//     border-radius: 50%;
//     object-fit: cover;
//     border: 4px solid var(--primary-color);
//     box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
// }

// .avatar-placeholder-large {
//     width: 120px;
//     height: 120px;
//     border-radius: 50%;
//     background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: white;
//     font-size: 3rem;
//     box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
// }

// .user-name-section h3 {
//     font-size: 1.75rem;
//     font-weight: 800;
//     color: var(--text-primary);
//     margin: 0 0 0.5rem 0;
// }

// .user-role {
//     color: var(--text-secondary);
//     font-size: 1rem;
//     font-weight: 500;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//     margin: 0;
// }

// .user-role i {
//     color: var(--primary-color);
// }


// /* ===== HORAIRES — 7 colonnes pleine largeur ===== */
// .horaires-grid {
//     display: grid;
//     grid-template-columns: repeat(7, 1fr);
//     gap: 1rem;
// }

// .horaire-item {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 0.75rem;
//     padding: 1.25rem 0.5rem;
//     background: linear-gradient(135deg, #fffbeb, #f9fafb);
//     border-radius: 1rem;
//     border: 2px solid rgba(245, 158, 11, 0.1);
//     transition: all 0.2s ease;
//     text-align: center;
// }

// .horaire-item:hover {
//     transform: translateY(-3px);
//     box-shadow: var(--shadow-md);
//     border-color: rgba(245, 158, 11, 0.35);
// }

// .horaire-item.ferme {
//     background: linear-gradient(135deg, #fef2f2, #fff5f5);
//     border-color: rgba(239, 68, 68, 0.15);
//     opacity: 0.82;
// }

// .horaire-jour { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }

// .jour-dot { width: 10px; height: 10px; border-radius: 50%; }
// .jour-dot.open { background: var(--primary-color); box-shadow: 0 0 0 3px rgba(245,158,11,0.2); }
// .jour-dot.closed { background: var(--danger-color); box-shadow: 0 0 0 3px rgba(239,68,68,0.2); }

// .jour-label { font-weight: 700; color: var(--text-primary); font-size: 0.9rem; }

// .horaire-time { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }


// .time-badge { padding: 0.3rem 0.65rem; border-radius: 9999px; font-size: 0.82rem; font-weight: 700; white-space: nowrap; }
// .time-badge.open-time { background: #d1fae5; color: #065f46; }
// .time-badge.close-time { background: #fee2e2; color: #991b1b; }
// .time-separator { color: var(--text-light); font-size: 0.8rem; }

// .ferme-badge { padding: 0.35rem 0.9rem; border-radius: 9999px; background: #fee2e2; color: #991b1b; font-size: 0.82rem; font-weight: 700; }

// /* No data */
// .no-data { text-align: center; padding: 4rem 2rem; background: var(--bg-primary); border-radius: 1.5rem; box-shadow: var(--shadow-xl); }
// .no-data i { font-size: 4rem; color: var(--warning-color); margin-bottom: 1.5rem; display: block; }
// .no-data h3 { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin: 0 0 0.5rem 0; }
// .no-data p { color: var(--text-secondary); margin: 0 0 2rem 0; }

// /* Dialog */
// ::ng-deep .p-dialog { border-radius: 16px; box-shadow: 0 10px 40px rgba(245,158,11,0.15); border: 1px solid #fef3c7; }
// ::ng-deep .p-dialog-header { background: #f59e0b; color: white; border-radius: 16px 16px 0 0; padding: 1.5rem 2rem; font-size: 1.2rem; font-weight: 600; }
// ::ng-deep .p-dialog-header-icon { color: white; }
// ::ng-deep .p-dialog-header-icon:hover { background-color: rgba(255,255,255,0.2); }
// ::ng-deep .p-dialog-content { padding: 2rem; background: white; }
// .dialog-content { display: flex; flex-direction: column; gap: 1.5rem; }
// .dialog-description { display: flex; align-items: center; gap: 0.75rem; color: #92400e; font-size: 0.95rem; margin: 0; padding: 1rem; background: #fffbeb; border-radius: 8px; border-left: 4px solid #f59e0b; }
// .dialog-description i { font-size: 1.25rem; color: #f59e0b; flex-shrink: 0; }
// .form-grid { display: flex; flex-direction: column; gap: 1.5rem; }
// .form-field { display: flex; flex-direction: column; gap: 0.5rem; }
// .field-label { display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: #92400e; font-size: 0.95rem; }
// .field-label i { color: #f59e0b; font-size: 1.1rem; }
// ::ng-deep .p-inputtext, ::ng-deep .p-inputnumber-input { border-radius: 8px; border: 2px solid #fef3c7; padding: 0.75rem 1rem; font-size: 0.95rem; transition: all 0.2s ease; }
// ::ng-deep .p-inputtext:focus, ::ng-deep .p-inputnumber-input:focus { border-color: #f59e0b; box-shadow: 0 0 0 3px rgba(245,158,11,0.1); }
// ::ng-deep .p-inputnumber-input { width: 100%; }
// .dialog-footer { display: flex; justify-content: flex-end; gap: 0.75rem; padding: 1.5rem 2rem; background: #f9fafb; border-radius: 0 0 16px 16px; margin: 1.5rem -2rem -2rem -2rem; border-top: 1px solid #fef3c7; }
// ::ng-deep .p-dialog-footer { padding: 0; border: none; }
// ::ng-deep .p-button { border-radius: 8px; padding: 0.75rem 1.5rem; font-weight: 600; font-size: 0.95rem; }
// ::ng-deep .p-button-success { background: #f59e0b; border: none; color: white; }
// ::ng-deep .p-button-success:hover { background: #d97706; transform: translateY(-1px); }
// ::ng-deep .p-button-outlined { border: 2px solid #fef3c7; color: #92400e; background: white; }
// ::ng-deep .p-button-outlined:hover { background: #fffbeb; }

// .w-full { width: 100%; }

// @media (max-width: 1024px) {
//     .top-row { grid-template-columns: 1fr; }
//     .horaires-grid { grid-template-columns: repeat(4, 1fr); }
// }
// @media (max-width: 600px) {
//     .horaires-grid { grid-template-columns: repeat(2, 1fr); }
// }
    

// /* ============================================
//    INFORMATIONS DE CONTACT
//    ============================================ */
// .contact-info {
//     display: flex;
//     flex-direction: column;
//     gap: 1.5rem;
//     margin-top: 2rem;
// }

// .info-row {
//     display: grid;
//     grid-template-columns: 200px 1fr;
//     gap: 1rem;
//     align-items: center;
// }

// .info-label {
//     color: var(--text-secondary);
//     font-weight: 600;
//     font-size: 0.95rem;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
// }

// .info-label i {
//     color: var(--primary-color);
//     font-size: 1.1rem;
// }

// .info-value {
//     color: var(--text-primary);
//     font-weight: 500;
//     font-size: 1rem;
//     padding: 0.75rem 1rem;
//     background: var(--bg-secondary);
//     border-radius: 0.5rem;
//     border-left: 3px solid var(--primary-color);
// }

// /* ============================================
//    BOUTONS D'ACTION
//    ============================================ */
// .action-buttons {
//     display: flex;
//     gap: 1rem;
//     margin-top: 2rem;
//     padding-top: 2rem;
//     border-top: 2px solid var(--border-color-light);
// }

// .action-buttons button {
//     flex: 1;
//     padding: 0.875rem 1.5rem !important;
//     font-weight: 700 !important;
//     border-radius: 0.75rem !important;
//     transition: all 0.3s ease !important;
// }

// ::ng-deep .action-buttons .p-button-danger:enabled:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3) !important;
// }

// ::ng-deep .action-buttons .p-button-success:enabled:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3) !important;
// }

// ::ng-deep .action-buttons .p-button-outlined:enabled:hover {
//     transform: translateY(-3px);
// }

// /* ============================================
//    INFORMATIONS BOUTIQUE
//    ============================================ */
// .shop-header-info {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     margin-bottom: 1.5rem;
// }

// .shop-name {
//     font-size: 1.5rem;
//     font-weight: 800;
//     color: var(--text-primary);
//     margin: 0 0 0.5rem 0;
// }

// .shop-category {
//     color: var(--text-secondary);
//     font-size: 1rem;
//     font-weight: 500;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//     margin: 0;
// }

// .shop-category i {
//     color: var(--primary-color);
// }

// .shop-rating {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-end;
//     gap: 0.5rem;
// }

// .rating-value {
//     color: var(--text-secondary);
//     font-weight: 600;
//     font-size: 0.875rem;
// }

// /* ============================================
//    GRILLE D'INFORMATIONS
//    ============================================ */
// .shop-info-grid {
//     display: grid;
//     grid-template-columns: repeat(2, 1fr);
//     gap: 1.5rem;
//     margin-top: 2rem;
// }

// .info-card {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     padding: 1.25rem;
//     background: linear-gradient(135deg, #fffbeb, #fef3c7);
//     border-radius: 1rem;
//     border: 2px solid rgba(245, 158, 11, 0.1);
//     transition: all 0.3s ease;
// }

// .info-card:hover {
//     transform: translateY(-3px);
//     box-shadow: var(--shadow-md);
//     border-color: rgba(245, 158, 11, 0.3);
// }

// .info-card-icon {
//     width: 50px;
//     height: 50px;
//     border-radius: 0.75rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 1.5rem;
//     color: white;
//     flex-shrink: 0;
// }

// .info-card-icon.location {
//     background: linear-gradient(135deg, #f59e0b, #d97706);
// }

// .info-card-icon.category {
//     background: linear-gradient(135deg, #06b6d4, #0891b2);
// }

// .info-card-icon.date {
//     background: linear-gradient(135deg, #8b5cf6, #7c3aed);
// }

// .info-card-icon.status {
//     background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
// }

// .info-card-content {
//     display: flex;
//     flex-direction: column;
//     gap: 0.25rem;
// }

// .info-card-label {
//     color: var(--text-secondary);
//     font-size: 0.875rem;
//     font-weight: 600;
// }

// .info-card-value {
//     color: var(--text-primary);
//     font-size: 1rem;
//     font-weight: 700;
// }

// .info-card-value.status-text.active {
//     color: var(--success-color);
// }

// /* ============================================
//    DESCRIPTION
//    ============================================ */
// .shop-description {
//     margin-top: 2rem;
//     padding: 1.5rem;
//     background: var(--bg-secondary);
//     border-radius: 1rem;
//     border-left: 4px solid var(--primary-color);
// }

// .shop-description h4 {
//     font-size: 1.125rem;
//     font-weight: 700;
//     color: var(--text-primary);
//     margin: 0 0 1rem 0;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
// }

// .shop-description h4 i {
//     color: var(--primary-color);
// }

// .shop-description p {
//     color: var(--text-secondary);
//     line-height: 1.6;
//     margin: 0;
// }

// /* ============================================
//    NO DATA
//    ============================================ */
// .no-data {
//     text-align: center;
//     padding: 4rem 2rem;
//     background: var(--bg-primary);
//     border-radius: 1.5rem;
//     box-shadow: var(--shadow-xl);
// }

// .no-data i {
//     font-size: 4rem;
//     color: var(--warning-color);
//     margin-bottom: 1.5rem;
//     display: block;
// }

// .no-data h3 {
//     font-size: 1.5rem;
//     font-weight: 700;
//     color: var(--text-primary);
//     margin: 0 0 0.5rem 0;
// }

// .no-data p {
//     color: var(--text-secondary);
//     margin: 0 0 2rem 0;
// }

// /* ============================================
//    RESPONSIVE
//    ============================================ */
// @media (max-width: 1200px) {
//     .profile-content {
//         grid-template-columns: 1fr;
//     }
// }

// @media (max-width: 768px) {
//     .profile-container {
//         padding: 1.5rem;
//     }

//     .profile-header {
//         flex-direction: column;
//         align-items: flex-start;
//         gap: 1rem;
//     }

//     .page-title {
//         font-size: 1.5rem;
//     }

//     .avatar-section {
//         flex-direction: column;
//         text-align: center;
//     }

//     .user-name-section h3 {
//         font-size: 1.5rem;
//     }

//     .info-row {
//         grid-template-columns: 1fr;
//         gap: 0.5rem;
//     }

//     .shop-info-grid {
//         grid-template-columns: 1fr;
//         gap: 1rem;
//     }

//     .action-buttons {
//         flex-direction: column;
//     }

//     .shop-header-info {
//         flex-direction: column;
//         gap: 1rem;
//     }

//     .shop-rating {
//         align-items: flex-start;
//     }
// }

// @media (max-width: 480px) {
//     .card-header-custom {
//         flex-direction: column;
//         align-items: flex-start;
//         gap: 1rem;
//     }

//     .avatar-large,
//     .avatar-placeholder-large {
//         width: 100px;
//         height: 100px;
//     }

//     .avatar-placeholder-large {
//         font-size: 2.5rem;
//     }
// }`],
//     providers: [ConfirmationService, MessageService]
// })
// export class infoplusBoutique{
    
//     managerId: string = '';
//     shopData: any = null;
//     userData: any = null;
//     boutique: any = null;
//     loading: boolean = true;
//     baseUrl = "http://localhost:5000";

//     constructor(
//         private route: ActivatedRoute,
//         private userService:UserService,
//         private router: Router,
//         private boutiqueService: BoutiqueService,
//         private confirmationService: ConfirmationService,
//         private messageService: MessageService
//     ) 
//     {
//         // Récupérer les données passées via navigation
//         const navigation = this.router.getCurrentNavigation();
//         if (navigation?.extras.state) {
//             this.shopData = navigation.extras.state['shopData'];
//         }
//     }

//     ngOnInit() {
//         this.route.params.subscribe(params => {
//             this.managerId = params['id'];
//             this.loadUserProfile();
//         });
//     }

//     loadUserProfile() {
//         this.loading = true;
//         // Charger les détails complets de la boutique et du manager
//         this.boutiqueService.getAllBoutiqueForAdmin().subscribe({
//             next: (data: any[]) => {
//                 const shop = data.find((s: any) => s.manager_id?._id === this.managerId);
//                 if (shop) { 
//                     this.boutique = {
//                         id: shop._id,
//                         name: shop.nom_boutique,
//                         categorie: shop.id_categorie?.map((c: any) => c.nom).join(', ') || 'Non défini',
//                         location: shop.location || 'Non défini',
//                         rating: shop.rating || 0,
//                         description: shop.description_boutique || 'Aucune description',
//                         created: shop.createdAt || null,
//                         status: shop.status?.nom_status || 'active',
//                         horaires: shop.horaires || []  // ✅ ajouté
//                     };

//                     this.userData = {
//                         id: shop.manager_id._id,
//                         nom: shop.manager_id.nom_client || '',
//                         prenom: shop.manager_id.prenom_client || '',
//                         email: shop.manager_id.email || '',
//                         telephone: shop.manager_id.numero_telephone || 'Non renseigné',
//                         avatar: shop.manager_id.avatar?.length
//                             ? `${this.baseUrl}${shop.manager_id.avatar[0].url}`
//                             : null,
//                         isActive: shop.manager_id.is_active,
//                         createdAt: shop.manager_id.createdAt || null
//                     };
//                 }
//                 this.loading = false;
//             },
//             error: (err) => {
//                 console.error('Erreur:', err);
//                 this.messageService.add({
//                     severity: 'error',
//                     summary: 'Erreur',
//                     detail: 'Impossible de charger le profil'
//                 });
//                 this.loading = false;
//             }
//         });
//     }



//     toggleAccountStatus() {
//         const action = this.userData.isActive ? 'désactiver' : 'activer';
        
//         this.confirmationService.confirm({
//             message: `Êtes-vous sûr de vouloir ${action} ce compte ?`,
//             header: `Confirmation de ${action}`,
//             icon: 'pi pi-exclamation-triangle',
//             acceptLabel: 'Oui',
//             rejectLabel: 'Non',
//             acceptButtonStyleClass: this.userData.isActive ? 'p-button-danger' : 'p-button-success',
//             accept: () => {
//                 // Appel API pour changer le statut
//                 // this.boutiqueService.updateManagerStatus(this.userData.id, !this.userData.isActive).subscribe({
//                 //     next: () => {
                
//                 const isActive = this.userData.isActive;
//                 const id = this.userData.id;
//                 const _id = id.toString();
//                     if (isActive == false) 
//                     {
                        
//                         //FUNCTION REACTIVATION =>active account
//                         this.userService.updateToConnectAccount({_id}).subscribe(
//                         {
//                             next:(res)=>{
//                                 console.log("activate account ",res);
//                                 this.messageService.add({
//                                     severity: 'success',
//                                     summary: 'Succès',
//                                     detail: `Compte active avec succès`
//                                 });
//                             },
//                             error: (err) => {
//                                 console.log("error",err);
                                
//                                 this.messageService.add({
//                                     severity: 'error',
//                                     summary: 'Erreur',
//                                     detail: `Impossible de ${action} le compte`
//                                 });
//                             }
//                         })
                        
//                     } else {
//                         //FUNCTION DESACTIVER => desactuv account 
//                         this.userService.updateToDisconnectAccount({_id}).subscribe({
//                             next:(res)=>{
//                                 console.log("disactive account ",res);
//                                 this.messageService.add({
//                                     severity: 'success',
//                                     summary: 'Succès',
//                                     detail: `Compte désactivé avec succès`
//                                 });
//                             },
//                             error:(err) =>{
//                                 console.log("error",err);
                                
//                                 this.messageService.add({
//                                     severity: 'error',
//                                     summary: 'Erreur',
//                                     detail: `Impossible de ${action} le compte`
//                                 });
//                             }
//                         });
                        
//                     }
                
//                         // this.userData.isActive = !this.userData.isActive;
//                         // this.messageService.add({
//                         //     severity: 'success',
//                         //     summary: 'Succès',
//                         //     detail: `Compte ${this.userData.isActive ? 'activé' : 'désactivé'} avec succès`
//                         // });
//                 //     },
//                 //     error: (err) => {
//                 //         this.messageService.add({
//                 //             severity: 'error',
//                 //             summary: 'Erreur',
//                 //             detail: `Impossible de ${action} le compte`
//                 //         });
//                 //     }
//                 // });
//             }
//         });
//     }

//     goBack() {
//         this.router.navigate(['/admin/home/listeBoutique']);
//     }

//     editProfile() {
//         this.messageService.add({
//             severity: 'info',
//             summary: 'Info',
//             detail: 'Fonction de modification à venir'
//         });
//     }

// }

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { AvatarModule } from "primeng/avatar";
import { BadgeModule } from "primeng/badge";
import { DividerModule } from "primeng/divider";
import { TagModule } from "primeng/tag";
import { RatingModule } from "primeng/rating";
import { ToastModule } from "primeng/toast";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TabsModule } from "primeng/tabs";
import { BoutiqueService } from "@/pages/service/boutique.service";
import { FormsModule } from "@angular/forms";
import { UserService } from "@/pages/service/user.service";

@Component({
    selector: 'app-infoplusBoutique',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        CardModule,
        AvatarModule,
        BadgeModule,
        DividerModule,
        TagModule,
        RatingModule,
        ToastModule,
        ConfirmDialogModule,
        TabsModule
    ],
    template:`<div class="profile-container">
    <p-toast></p-toast>
    <p-confirmDialog></p-confirmDialog>

    <!-- En-tête avec bouton retour -->
    <div class="profile-header">
        <button 
            pButton 
            type="button"
            icon="pi pi-arrow-left"
            label="Retour"
            class="p-button-text back-btn"
            (click)="goBack()">
        </button>
        <h1 class="page-title">
            <i class="pi pi-user"></i>
            Profil Utilisateur
        </h1>
    </div>

    <!-- Loader -->
    @if (loading) {
    <div class="loading-container">
        <i class="pi pi-spin pi-spinner" style="font-size: 3rem; color: var(--primary-color);"></i>
        <p>Chargement du profil...</p>
    </div>
    }

    <!-- Contenu du profil -->
    @if (!loading && userData) {
    <div>

        <!-- Card Informations Utilisateur + Boutique -->
        <div class="profile-content">
        
            <!-- Card Informations Utilisateur -->
            <div class="user-info-card">
                <div class="card-header-custom">
                    <h2>
                        <i class="pi pi-id-card"></i>
                        Informations du Manager
                    </h2>
                    <div class="status-badge" [class.active]="userData.isActive" [class.inactive]="!userData.isActive">
                        <i class="pi" [class.pi-check-circle]="userData.isActive" [class.pi-ban]="!userData.isActive"></i>
                        {{ userData.isActive ? 'Actif' : 'Désactivé' }}
                    </div>
                </div>

                <div class="user-details">
                    <!-- Avatar et Nom -->
                    <div class="avatar-section">
                        <div class="avatar-container">
                            @if (userData.avatar) {
                                <img [src]="userData.avatar" alt="Avatar" class="avatar-large">
                            } @else {
                                <div class="avatar-placeholder-large">
                                    <i class="pi pi-user"></i>
                                </div>
                            }
                        </div>
                        <div class="user-name-section">
                            <h3>{{ userData.prenom }} {{ userData.nom }}</h3>
                            <p class="user-role">
                                <i class="pi pi-briefcase"></i>
                                Manager de Boutique
                            </p>
                        </div>
                    </div>

                    <p-divider></p-divider>

                    <!-- Informations de contact -->
                    <div class="contact-info">
                        <div class="info-row">
                            <div class="info-label">
                                <i class="pi pi-envelope"></i>
                                Email
                            </div>
                            <div class="info-value">{{ userData.email }}</div>
                        </div>

                        <div class="info-row">
                            <div class="info-label">
                                <i class="pi pi-phone"></i>
                                Téléphone
                            </div>
                            <div class="info-value">{{ userData.telephone }}</div>
                        </div>

                        @if (userData.createdAt) {
                        <div class="info-row">
                            <div class="info-label">
                                <i class="pi pi-calendar"></i>
                                Membre depuis
                            </div>
                            <div class="info-value">{{ userData.createdAt | date: 'dd/MM/yyyy' }}</div>
                        </div>
                        }
                    </div>

                    <!-- Actions -->
                    <div class="action-buttons">
                        <button 
                            pButton 
                            type="button"
                            [label]="userData.isActive ? 'Désactiver le compte' : 'Activer le compte'"
                            [icon]="userData.isActive ? 'pi pi-ban' : 'pi pi-check'"
                            [class]="userData.isActive ? 'p-button-danger' : 'p-button-success'"
                            (click)="toggleAccountStatus()">
                        </button>
                    </div>
                </div>
            </div>

            <!-- Card Informations Boutique -->
            @if (boutique) {
            <div class="shop-info-card">
                <div class="card-header-custom">
                    <h2>
                        <i class="pi pi-shopping-bag"></i>
                        Informations de la Boutique
                    </h2>
                </div>

                <div class="shop-details">
                    <!-- Nom et Note -->
                    <div class="shop-header-info">
                        <div>
                            <h3 class="shop-name">{{ boutique.name }}</h3>
                            <p class="shop-category">
                                <i class="pi pi-tag"></i>
                                {{ boutique.categorie }}
                            </p>
                        </div>
                        <div class="shop-rating">
                            <p-rating 
                                [(ngModel)]="boutique.rating"
                                [readonly]="true">
                            </p-rating>
                            <span class="rating-value">{{ boutique.rating }}/5</span>
                        </div>
                    </div>

                    <p-divider></p-divider>

                    <!-- Détails de la boutique -->
                    <div class="shop-info-grid">
                        <div class="info-card">
                            <div class="info-card-icon category">
                                <i class="pi pi-th-large"></i>
                            </div>
                            <div class="info-card-content">
                                <span class="info-card-label">Catégorie</span>
                                <span class="info-card-value">{{ boutique.categorie }}</span>
                            </div>
                        </div>

                        @if (boutique.created) {
                        <div class="info-card">
                            <div class="info-card-icon date">
                                <i class="pi pi-calendar-plus"></i>
                            </div>
                            <div class="info-card-content">
                                <span class="info-card-label">Créée le</span>
                                <span class="info-card-value">{{ boutique.created | date: 'dd/MM/yyyy' }}</span>
                            </div>
                        </div>
                        }

                        <div class="info-card">
                            <div class="info-card-icon status">
                                <i class="pi pi-circle-fill"></i>
                            </div>
                            <div class="info-card-content">
                                <span class="info-card-label">Statut</span>
                                <span class="info-card-value status-text" [class.active]="boutique.status === 'active'">
                                    {{ boutique.status === 'active' ? 'Active' : 'Inactive' }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Description -->
                    @if (boutique.description) {
                    <div class="shop-description">
                        <h4>
                            <i class="pi pi-info-circle"></i>
                            Description
                        </h4>
                        <p>{{ boutique.description }}</p>
                    </div>
                    }
                </div>
            </div>
            }

        </div>

        <!-- ===== LIGNE 2 : Horaires pleine largeur ===== -->
        @if (boutique?.horaires && boutique.horaires.length > 0) {
        <div class="horaires-card">
            <div class="card-header-custom">
                <h2><i class="pi pi-clock"></i> Horaires d'ouverture</h2>
            </div>
            <div class="horaires-grid">
                @for (h of boutique.horaires; track h.jour) {
                <div class="horaire-item" [class.ferme]="h.est_ferme">
                    <div class="horaire-jour">
                        <span class="jour-dot" [class.open]="!h.est_ferme" [class.closed]="h.est_ferme"></span>
                        <span class="jour-label">{{ h.jour }}</span>
                    </div>
                    <div class="horaire-time">
                        @if (!h.est_ferme) {
                            <span class="time-badge open-time">{{ h.ouverture }}</span>
                            <span class="time-separator">—</span>
                            <span class="time-badge close-time">{{ h.fermeture }}</span>
                        } @else {
                            <span class="ferme-badge">Fermé</span>
                        }
                    </div>
                </div>
                }
            </div>
        </div>
        }

    </div>
    }

    <!-- Message si aucune donnée -->
    @if (!loading && !userData) {
    <div class="no-data">
        <i class="pi pi-exclamation-triangle"></i>
        <h3>Aucune donnée trouvée</h3>
        <p>Impossible de charger les informations du profil</p>
        <button
            pButton
            type="button"
            label="Retour"
            icon="pi pi-arrow-left"
            (click)="goBack()">
        </button>
    </div>
    }
</div>`,
    styles:[`/* ============================================
   VARIABLES DU THÈME
   ============================================ */
:host {
    --primary-color: #f59e0b;
    --primary-light: #fbbf24;
    --primary-dark: #d97706;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
    --info-color: #0369a1;

    --bg-primary: #ffffff;
    --bg-secondary: #f9fafb;
    --bg-hover: #fffbeb;
    
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
    --text-light: #9ca3af;
    
    --border-color: #e5e7eb;
    --border-color-light: #f3f4f6;
    
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* ============================================
   CONTAINER PRINCIPAL
   ============================================ */
.profile-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ============================================
   EN-TÊTE
   ============================================ */
.profile-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid var(--border-color-light);
}

.page-title {
    font-size: 2rem;
    font-weight: 800;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.page-title i {
    color: var(--primary-color);
    -webkit-text-fill-color: var(--primary-color);
}

::ng-deep .back-btn {
    font-weight: 600;
    transition: all 0.3s ease;
}

::ng-deep .back-btn:hover {
    background: var(--bg-hover) !important;
    transform: translateX(-5px);
}

/* ============================================
   LOADING
   ============================================ */
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem;
    gap: 1.5rem;
}

.loading-container p {
    color: var(--text-secondary);
    font-size: 1.125rem;
    font-weight: 500;
}

/* ============================================
   CONTENU DU PROFIL
   ============================================ */
.profile-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
}

/* ============================================
   CARDS
   ============================================ */
.user-info-card,
.shop-info-card,
.horaires-card {
    background: var(--bg-primary);
    border-radius: 1.5rem;
    box-shadow: var(--shadow-xl);
    padding: 2rem;
    border: 1px solid rgba(245, 158, 11, 0.08);
    transition: all 0.3s ease;
}

.user-info-card:hover,
.shop-info-card:hover,
.horaires-card:hover {
    box-shadow: 0 25px 35px -5px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
}

.card-header-custom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--border-color-light);
}

.card-header-custom h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0;
}

.card-header-custom h2 i {
    color: var(--primary-color);
}

/* ============================================
   STATUS BADGE
   ============================================ */
.status-badge {
    padding: 0.5rem 1.25rem;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
}

.status-badge.active {
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
    color: #065f46;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.status-badge.inactive {
    background: linear-gradient(135deg, #fee2e2, #fecaca);
    color: #991b1b;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
}

/* ============================================
   SECTION AVATAR
   ============================================ */
.avatar-section {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
}

.avatar-container {
    position: relative;
}

.avatar-large {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--primary-color);
    box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
}

.avatar-placeholder-large {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 3rem;
    box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
}

.user-name-section h3 {
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--text-primary);
    margin: 0 0 0.5rem 0;
}

.user-role {
    color: var(--text-secondary);
    font-size: 1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
}

.user-role i {
    color: var(--primary-color);
}


/* ===== HORAIRES — 7 colonnes pleine largeur ===== */
.horaires-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1rem;
}

.horaire-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1.25rem 0.5rem;
    background: linear-gradient(135deg, #fffbeb, #f9fafb);
    border-radius: 1rem;
    border: 2px solid rgba(245, 158, 11, 0.1);
    transition: all 0.2s ease;
    text-align: center;
}

.horaire-item:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    border-color: rgba(245, 158, 11, 0.35);
}

.horaire-item.ferme {
    background: linear-gradient(135deg, #fef2f2, #fff5f5);
    border-color: rgba(239, 68, 68, 0.15);
    opacity: 0.82;
}

.horaire-jour { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }

.jour-dot { width: 10px; height: 10px; border-radius: 50%; }
.jour-dot.open { background: var(--primary-color); box-shadow: 0 0 0 3px rgba(245,158,11,0.2); }
.jour-dot.closed { background: var(--danger-color); box-shadow: 0 0 0 3px rgba(239,68,68,0.2); }

.jour-label { font-weight: 700; color: var(--text-primary); font-size: 0.9rem; }

.horaire-time { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }


.time-badge { padding: 0.3rem 0.65rem; border-radius: 9999px; font-size: 0.82rem; font-weight: 700; white-space: nowrap; }
.time-badge.open-time { background: #d1fae5; color: #065f46; }
.time-badge.close-time { background: #fee2e2; color: #991b1b; }
.time-separator { color: var(--text-light); font-size: 0.8rem; }

.ferme-badge { padding: 0.35rem 0.9rem; border-radius: 9999px; background: #fee2e2; color: #991b1b; font-size: 0.82rem; font-weight: 700; }

/* No data */
.no-data { text-align: center; padding: 4rem 2rem; background: var(--bg-primary); border-radius: 1.5rem; box-shadow: var(--shadow-xl); }
.no-data i { font-size: 4rem; color: var(--warning-color); margin-bottom: 1.5rem; display: block; }
.no-data h3 { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin: 0 0 0.5rem 0; }
.no-data p { color: var(--text-secondary); margin: 0 0 2rem 0; }

/* Dialog */
::ng-deep .p-dialog { border-radius: 16px; box-shadow: 0 10px 40px rgba(245,158,11,0.15); border: 1px solid #fef3c7; }
::ng-deep .p-dialog-header { background: #f59e0b; color: white; border-radius: 16px 16px 0 0; padding: 1.5rem 2rem; font-size: 1.2rem; font-weight: 600; }
::ng-deep .p-dialog-header-icon { color: white; }
::ng-deep .p-dialog-header-icon:hover { background-color: rgba(255,255,255,0.2); }
::ng-deep .p-dialog-content { padding: 2rem; background: white; }
.dialog-content { display: flex; flex-direction: column; gap: 1.5rem; }
.dialog-description { display: flex; align-items: center; gap: 0.75rem; color: #92400e; font-size: 0.95rem; margin: 0; padding: 1rem; background: #fffbeb; border-radius: 8px; border-left: 4px solid #f59e0b; }
.dialog-description i { font-size: 1.25rem; color: #f59e0b; flex-shrink: 0; }
.form-grid { display: flex; flex-direction: column; gap: 1.5rem; }
.form-field { display: flex; flex-direction: column; gap: 0.5rem; }
.field-label { display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: #92400e; font-size: 0.95rem; }
.field-label i { color: #f59e0b; font-size: 1.1rem; }
::ng-deep .p-inputtext, ::ng-deep .p-inputnumber-input { border-radius: 8px; border: 2px solid #fef3c7; padding: 0.75rem 1rem; font-size: 0.95rem; transition: all 0.2s ease; }
::ng-deep .p-inputtext:focus, ::ng-deep .p-inputnumber-input:focus { border-color: #f59e0b; box-shadow: 0 0 0 3px rgba(245,158,11,0.1); }
::ng-deep .p-inputnumber-input { width: 100%; }
.dialog-footer { display: flex; justify-content: flex-end; gap: 0.75rem; padding: 1.5rem 2rem; background: #f9fafb; border-radius: 0 0 16px 16px; margin: 1.5rem -2rem -2rem -2rem; border-top: 1px solid #fef3c7; }
::ng-deep .p-dialog-footer { padding: 0; border: none; }
::ng-deep .p-button { border-radius: 8px; padding: 0.75rem 1.5rem; font-weight: 600; font-size: 0.95rem; }
::ng-deep .p-button-success { background: #f59e0b; border: none; color: white; }
::ng-deep .p-button-success:hover { background: #d97706; transform: translateY(-1px); }
::ng-deep .p-button-outlined { border: 2px solid #fef3c7; color: #92400e; background: white; }
::ng-deep .p-button-outlined:hover { background: #fffbeb; }

.w-full { width: 100%; }

@media (max-width: 1024px) {
    .profile-content { grid-template-columns: 1fr; }
    .horaires-grid { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 600px) {
    .horaires-grid { grid-template-columns: repeat(2, 1fr); }
}
    

/* ============================================
   INFORMATIONS DE CONTACT
   ============================================ */
.contact-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;
}

.info-row {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1rem;
    align-items: center;
}

.info-label {
    color: var(--text-secondary);
    font-weight: 600;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.info-label i {
    color: var(--primary-color);
    font-size: 1.1rem;
}

.info-value {
    color: var(--text-primary);
    font-weight: 500;
    font-size: 1rem;
    padding: 0.75rem 1rem;
    background: var(--bg-secondary);
    border-radius: 0.5rem;
    border-left: 3px solid var(--primary-color);
}

/* ============================================
   BOUTONS D'ACTION
   ============================================ */
.action-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 2px solid var(--border-color-light);
}

.action-buttons button {
    flex: 1;
    padding: 0.875rem 1.5rem !important;
    font-weight: 700 !important;
    border-radius: 0.75rem !important;
    transition: all 0.3s ease !important;
}

::ng-deep .action-buttons .p-button-danger:enabled:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3) !important;
}

::ng-deep .action-buttons .p-button-success:enabled:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3) !important;
}

::ng-deep .action-buttons .p-button-outlined:enabled:hover {
    transform: translateY(-3px);
}

/* ============================================
   INFORMATIONS BOUTIQUE
   ============================================ */
.shop-header-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
}

.shop-name {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--text-primary);
    margin: 0 0 0.5rem 0;
}

.shop-category {
    color: var(--text-secondary);
    font-size: 1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
}

.shop-category i {
    color: var(--primary-color);
}

.shop-rating {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
}

.rating-value {
    color: var(--text-secondary);
    font-weight: 600;
    font-size: 0.875rem;
}

/* ============================================
   GRILLE D'INFORMATIONS
   ============================================ */
.shop-info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;
}

.info-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    background: linear-gradient(135deg, #fffbeb, #fef3c7);
    border-radius: 1rem;
    border: 2px solid rgba(245, 158, 11, 0.1);
    transition: all 0.3s ease;
}

.info-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    border-color: rgba(245, 158, 11, 0.3);
}

.info-card-icon {
    width: 50px;
    height: 50px;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    flex-shrink: 0;
}

.info-card-icon.location {
    background: linear-gradient(135deg, #f59e0b, #d97706);
}

.info-card-icon.category {
    background: linear-gradient(135deg, #06b6d4, #0891b2);
}

.info-card-icon.date {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.info-card-icon.status {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
}

.info-card-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.info-card-label {
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 600;
}

.info-card-value {
    color: var(--text-primary);
    font-size: 1rem;
    font-weight: 700;
}

.info-card-value.status-text.active {
    color: var(--success-color);
}

/* ============================================
   DESCRIPTION
   ============================================ */
.shop-description {
    margin-top: 2rem;
    padding: 1.5rem;
    background: var(--bg-secondary);
    border-radius: 1rem;
    border-left: 4px solid var(--primary-color);
}

.shop-description h4 {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.shop-description h4 i {
    color: var(--primary-color);
}

.shop-description p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
}

/* ============================================
   NO DATA
   ============================================ */
.no-data {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--bg-primary);
    border-radius: 1.5rem;
    box-shadow: var(--shadow-xl);
}

.no-data i {
    font-size: 4rem;
    color: var(--warning-color);
    margin-bottom: 1.5rem;
    display: block;
}

.no-data h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 0.5rem 0;
}

.no-data p {
    color: var(--text-secondary);
    margin: 0 0 2rem 0;
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 1200px) {
    .profile-content {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .profile-container {
        padding: 1.5rem;
    }

    .profile-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .page-title {
        font-size: 1.5rem;
    }

    .avatar-section {
        flex-direction: column;
        text-align: center;
    }

    .user-name-section h3 {
        font-size: 1.5rem;
    }

    .info-row {
        grid-template-columns: 1fr;
        gap: 0.5rem;
    }

    .shop-info-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .action-buttons {
        flex-direction: column;
    }

    .shop-header-info {
        flex-direction: column;
        gap: 1rem;
    }

    .shop-rating {
        align-items: flex-start;
    }
}

@media (max-width: 480px) {
    .card-header-custom {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .avatar-large,
    .avatar-placeholder-large {
        width: 100px;
        height: 100px;
    }

    .avatar-placeholder-large {
        font-size: 2.5rem;
    }
}`],
    providers: [ConfirmationService, MessageService]
})
export class infoplusBoutique{
    
    managerId: string = '';
    shopData: any = null;
    userData: any = null;
    boutique: any = null;
    loading: boolean = true;
    baseUrl = "http://localhost:5000";

    constructor(
        private route: ActivatedRoute,
        private userService:UserService,
        private router: Router,
        private boutiqueService: BoutiqueService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) 
    {
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras.state) {
            this.shopData = navigation.extras.state['shopData'];
        }
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.managerId = params['id'];
            this.loadUserProfile();
        });
    }

    loadUserProfile() {
        this.loading = true;
        this.boutiqueService.getAllBoutiqueForAdmin().subscribe({
            next: (data: any[]) => {
                const shop = data.find((s: any) => s.manager_id?._id === this.managerId);
                if (shop) { 
                    this.boutique = {
                        id: shop._id,
                        name: shop.nom_boutique,
                        categorie: shop.id_categorie?.map((c: any) => c.nom).join(', ') || 'Non défini',
                        location: shop.location || 'Non défini',
                        rating: shop.rating || 0,
                        description: shop.description_boutique || 'Aucune description',
                        created: shop.createdAt || null,
                        status: shop.status?.nom_status || 'active',
                        horaires: shop.horaires || []
                    };

                    this.userData = {
                        id: shop.manager_id._id,
                        nom: shop.manager_id.nom_client || '',
                        prenom: shop.manager_id.prenom_client || '',
                        email: shop.manager_id.email || '',
                        telephone: shop.manager_id.numero_telephone || 'Non renseigné',
                        avatar: shop.manager_id.avatar?.length
                            ? `${this.baseUrl}${shop.manager_id.avatar[0].url}`
                            : null,
                        isActive: shop.manager_id.is_active,
                        createdAt: shop.manager_id.createdAt || null
                    };
                }
                this.loading = false;
            },
            error: (err) => {
                console.error('Erreur:', err);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de charger le profil'
                });
                this.loading = false;
            }
        });
    }

    toggleAccountStatus() {
        const action = this.userData.isActive ? 'désactiver' : 'activer';
        
        this.confirmationService.confirm({
            message: `Êtes-vous sûr de vouloir ${action} ce compte ?`,
            header: `Confirmation de ${action}`,
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            acceptButtonStyleClass: this.userData.isActive ? 'p-button-danger' : 'p-button-success',
            accept: () => {
                const isActive = this.userData.isActive;
                const id = this.userData.id;
                const _id = id.toString();
                    if (isActive == false) 
                    {
                        this.userService.updateToConnectAccount({_id}).subscribe(
                        {
                            next:(res)=>{
                                console.log("activate account ",res);
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Succès',
                                    detail: `Compte active avec succès`
                                });
                            },
                            error: (err) => {
                                console.log("error",err);
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Erreur',
                                    detail: `Impossible de ${action} le compte`
                                });
                            }
                        })
                        
                    } else {
                        this.userService.updateToDisconnectAccount({_id}).subscribe({
                            next:(res)=>{
                                console.log("disactive account ",res);
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Succès',
                                    detail: `Compte désactivé avec succès`
                                });
                            },
                            error:(err) =>{
                                console.log("error",err);
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Erreur',
                                    detail: `Impossible de ${action} le compte`
                                });
                            }
                        });
                    }
            }
        });
    }

    goBack() {
        this.router.navigate(['/admin/home/listeBoutique']);
    }

    editProfile() {
        this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Fonction de modification à venir'
        });
    }

}