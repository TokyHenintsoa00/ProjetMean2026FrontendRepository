

// import { Component } from "@angular/core";
// import { MessageService } from "primeng/api";
// import { UserService } from "@/pages/service/user.service";
// import { Router } from "@angular/router";
// import { BoutiqueService } from "@/pages/service/boutique.service";
// import { CommonModule } from "@angular/common";
// import { FormsModule } from "@angular/forms";
// import { ButtonModule } from "primeng/button";
// import { DatePickerModule } from "primeng/datepicker";
// import { FluidModule } from "primeng/fluid";
// import { InputTextModule } from "primeng/inputtext";
// import { SelectModule } from "primeng/select";
// import { TextareaModule } from "primeng/textarea";
// import { CategorieService } from "@/pages/service/categorie.service";
// import { StatusService } from "@/pages/service/status.service";
// import { FileUploadModule } from 'primeng/fileupload';
// import { FileUpload } from 'primeng/fileupload';
// import { ToastModule } from 'primeng/toast';
// import { CheckboxModule } from 'primeng/checkbox';
// import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';

// interface Horaire {
//     jour: string;
//     ouverture: string;
//     fermeture: string;
//     est_ferme: boolean;
// }

// @Component({
//     selector: 'app-demandeBoutique',
//     imports: [
//         CommonModule,
//         FormsModule,
//         InputTextModule,
//         ButtonModule,
//         SelectModule,
//         FluidModule,
//         TextareaModule,
//         FileUploadModule,
//         FileUpload,
//         DatePickerModule,
//         ToastModule,
//         CheckboxModule,
//         AppFloatingConfigurator
//     ],
//     providers: [MessageService],
//     template:`<app-floating-configurator />

// <div class="demande-page">

//   <!-- Fond animé -->
//   <div class="bg-layer">
//     <div class="bg-orb orb-1"></div>
//     <div class="bg-orb orb-2"></div>
//     <div class="bg-orb orb-3"></div>
//     <div class="grid-overlay"></div>
//   </div>

//   <!-- Header flottant -->
//   <header class="top-bar">
//     <div class="top-bar-inner">
//       <div class="brand-logo">
//         <svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
//           <path fill-rule="evenodd" clip-rule="evenodd"
//             d="M17.1637 19.2467C17.1566 19.4033 17.1529 19.561 17.1529 19.7194C17.1529 25.3503 21.7203 29.915 27.3546 29.915C32.9887 29.915 37.5561 25.3503 37.5561 19.7194C37.5561 19.5572 37.5524 19.3959 37.5449 19.2355C38.5617 19.0801 39.5759 18.9013 40.5867 18.6994L40.6926 18.6782C40.7191 19.0218 40.7326 19.369 40.7326 19.7194C40.7326 27.1036 34.743 33.0896 27.3546 33.0896C19.966 33.0896 13.9765 27.1036 13.9765 19.7194C13.9765 19.374 13.9896 19.0316 14.0154 18.6927L14.0486 18.6994C15.0837 18.9062 16.1223 19.0886 17.1637 19.2467ZM33.3284 11.4538C31.6493 10.2396 29.5855 9.52381 27.3546 9.52381C25.1195 9.52381 23.0524 10.2421 21.3717 11.4603C20.0078 11.3232 18.6475 11.1387 17.2933 10.907C19.7453 8.11308 23.3438 6.34921 27.3546 6.34921C31.36 6.34921 34.9543 8.10844 37.4061 10.896C36.0521 11.1292 34.692 11.3152 33.3284 11.4538ZM43.826 18.0518C43.881 18.6003 43.9091 19.1566 43.9091 19.7194C43.9091 28.8568 36.4973 36.2642 27.3546 36.2642C18.2117 36.2642 10.8 28.8568 10.8 19.7194C10.8 19.1615 10.8276 18.61 10.8816 18.0663L7.75383 17.4411C7.66775 18.1886 7.62354 18.9488 7.62354 19.7194C7.62354 30.6102 16.4574 39.4388 27.3546 39.4388C38.2517 39.4388 47.0855 30.6102 47.0855 19.7194C47.0855 18.9439 47.0407 18.1789 46.9536 17.4267L43.826 18.0518ZM44.2613 9.54743L40.9084 10.2176C37.9134 5.95821 32.9593 3.1746 27.3546 3.1746C21.7442 3.1746 16.7856 5.96385 13.7915 10.2305L10.4399 9.56057C13.892 3.83178 20.1756 0 27.3546 0C34.5281 0 40.8075 3.82591 44.2613 9.54743Z"
//             fill="white"/>
//         </svg>
//         <span class="brand-name">ShopMall</span>
//       </div>
//       <a routerLink="/" class="back-link">
//         <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
//         Retour
//       </a>
//     </div>
//   </header>

//   <!-- Contenu -->
//   <main class="page-content">

//     <!-- Hero -->
//     <div class="page-hero">
//       <div class="hero-tag">Nouvelle boutique</div>
//       <h1 class="hero-title">Ouvrez votre boutique</h1>
//       <p class="hero-sub">Rejoignez notre réseau de commerçants et touchez des milliers de clients dès aujourd'hui.</p>
//       <div class="steps-row">
//         <div class="step-pill"><span class="step-n">01</span><span class="step-l">Compte</span></div>
//         <div class="step-line"></div>
//         <div class="step-pill"><span class="step-n">02</span><span class="step-l">Boutique</span></div>
//         <div class="step-line"></div>
//         <div class="step-pill"><span class="step-n">03</span><span class="step-l">Médias</span></div>
//       </div>
//     </div>

//     <!-- Formulaire -->
//     <div class="form-card">
//       <p-toast></p-toast>

//       <form (ngSubmit)="addBoutique()" class="demande-form">

//         <!-- Informations utilisateur -->
//         <div class="form-section">
//           <div class="section-header">
//             <div class="section-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
//             </div>
//             <div>
//               <span class="section-title">Informations utilisateur</span>
//               <span class="section-sub">Compte propriétaire de la boutique</span>
//             </div>
//           </div>
//           <div class="fields-grid">
//             <div class="field-group">
//               <label class="field-label">Nom <span class="req">*</span></label>
//               <input pInputText type="text" [(ngModel)]="user.nom_client" name="nom_client" placeholder="Dupont" class="custom-input" />
//             </div>
//             <div class="field-group">
//               <label class="field-label">Prénom <span class="req">*</span></label>
//               <input pInputText type="text" [(ngModel)]="user.prenom_client" name="prenom_client" placeholder="Jean" class="custom-input" />
//             </div>
//             <div class="field-group">
//               <label class="field-label">Email <span class="req">*</span></label>
//               <input pInputText type="email" [(ngModel)]="user.email" name="email" placeholder="votre@email.com" class="custom-input" />
//             </div>
//             <div class="field-group">
//               <label class="field-label">Mot de passe <span class="req">*</span></label>
//               <div class="pw-wrap">
//                 <input pInputText [type]="showPassword ? 'text' : 'password'" [(ngModel)]="user.pwd" name="pwd" placeholder="••••••••" class="custom-input" />
//                 <button type="button" class="pw-toggle" (click)="showPassword = !showPassword">
//                   <svg *ngIf="!showPassword" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
//                   <svg *ngIf="showPassword" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
//                 </button>
//               </div>
//             </div>
//             <div class="field-group">
//               <label class="field-label">Date de naissance <span class="req">*</span></label>
//               <p-datePicker [(ngModel)]="user.date_naissance" name="date_naissance" dateFormat="dd/mm/yy" placeholder="JJ/MM/AAAA" styleClass="custom-datepicker w-full"></p-datePicker>
//             </div>
//             <div class="field-group">
//               <label class="field-label">Téléphone <span class="req">*</span></label>
//               <input pInputText type="tel" [(ngModel)]="user.numero_telephone" name="numero_telephone" placeholder="+33 6 12 34 56 78" class="custom-input" />
//             </div>
//           </div>
//         </div>

//         <!-- Avatar -->
//         <div class="form-section">
//           <div class="section-header">
//             <div class="section-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>
//             </div>
//             <div>
//               <span class="section-title">Avatar utilisateur</span>
//               <span class="section-sub">Photo de profil du propriétaire</span>
//             </div>
//           </div>
//           <div class="upload-zone" [class.has-file]="selectedAvatar">
//             <ng-container *ngIf="!selectedAvatar">
//               <p-fileUpload (onSelect)="onAvatarSelected($event)" name="avatar" accept="image/*" [maxFileSize]="5000000" [showUploadButton]="false" [showCancelButton]="false" chooseLabel="Choisir un avatar" styleClass="custom-upload">
//                 <ng-template pTemplate="content">
//                   <div class="upload-placeholder">
//                     <div class="upload-icon-wrap">
//                       <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
//                     </div>
//                     <p class="upload-text">Glissez votre avatar ici</p>
//                     <p class="upload-hint">PNG, JPG — max 5MB</p>
//                   </div>
//                 </ng-template>
//               </p-fileUpload>
//             </ng-container>
//             <div *ngIf="selectedAvatar" class="file-preview">
//               <div class="preview-wrap circle">
//                 <img [src]="selectedAvatar.objectURL" [alt]="selectedAvatar.name" />
//                 <button type="button" class="remove-btn" (click)="removeAvatar()">✕</button>
//               </div>
//               <div class="file-meta">
//                 <span class="file-name">{{selectedAvatar.name}}</span>
//                 <span class="file-size">{{formatFileSize(selectedAvatar.size)}}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <!-- Infos boutique -->
//         <div class="form-section">
//           <div class="section-header">
//             <div class="section-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
//             </div>
//             <div>
//               <span class="section-title">Informations générales</span>
//               <span class="section-sub">Nom et catégorie de votre boutique</span>
//             </div>
//           </div>
//           <div class="fields-grid">
//             <div class="field-group">
//               <label class="field-label">Nom de la boutique <span class="req">*</span></label>
//               <input pInputText type="text" [(ngModel)]="boutique.nom_boutique" name="nom_boutique" placeholder="Ex: Boutique KFC" class="custom-input" />
//             </div>
//             <div class="field-group">
//               <label class="field-label">Catégorie <span class="req">*</span></label>
//               <p-select [options]="categories" [(ngModel)]="boutique.categorie" name="categorie" optionLabel="name" optionValue="value" placeholder="Sélectionnez une catégorie" styleClass="custom-select w-full"></p-select>
//             </div>
//           </div>
//         </div>

//         <!-- Horaires -->
//         <div class="form-section">
//           <div class="section-header">
//             <div class="section-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
//             </div>
//             <div>
//               <span class="section-title">Horaires d'ouverture</span>
//               <span class="section-sub">Définissez vos jours et créneaux</span>
//             </div>
//           </div>
//           <div class="quick-actions">
//             <button pButton type="button" label="Ouvrir tous les jours" icon="pi pi-check-circle" size="small" severity="success" [outlined]="true" (click)="setAllDaysOpen()"></button>
//             <button pButton type="button" label="Dupliquer le lundi" icon="pi pi-copy" size="small" severity="info" [outlined]="true" (click)="copyFirstDayToAll()"></button>
//             <button pButton type="button" label="Fermer week-end" icon="pi pi-times-circle" size="small" severity="warn" [outlined]="true" (click)="closeWeekend()"></button>
//           </div>
//           <div class="horaires-list">
//             <div *ngFor="let horaire of boutique.horaires; let i = index" class="horaire-row" [class.is-closed]="horaire.est_ferme">
//               <div class="horaire-day">
//                 <p-checkbox [(ngModel)]="horaire.est_ferme" [name]="'ferme_' + i" [binary]="true" (onChange)="onFermeChange(i)" [inputId]="'cb_' + i"></p-checkbox>
//                 <label [for]="'cb_' + i" class="day-label">{{horaire.jour}}</label>
//               </div>
//               <div class="horaire-times" *ngIf="!horaire.est_ferme">
//                 <div class="time-field">
//                   <span class="ti open">☀</span>
//                   <input pInputText type="time" [(ngModel)]="horaire.ouverture" [name]="'ouverture_' + i" class="time-input" />
//                 </div>
//                 <span class="time-sep">→</span>
//                 <div class="time-field">
//                   <span class="ti close">☽</span>
//                   <input pInputText type="time" [(ngModel)]="horaire.fermeture" [name]="'fermeture_' + i" class="time-input" />
//                 </div>
//               </div>
//               <div class="horaire-closed-msg" *ngIf="horaire.est_ferme">Fermé toute la journée</div>
//               <div class="horaire-badge">
//                 <span *ngIf="horaire.est_ferme" class="badge badge-closed">Fermé</span>
//                 <span *ngIf="!horaire.est_ferme && horaire.ouverture && horaire.fermeture" class="badge badge-open">Ouvert</span>
//                 <span *ngIf="!horaire.est_ferme && (!horaire.ouverture || !horaire.fermeture)" class="badge badge-incomplete">Incomplet</span>
//               </div>
//             </div>
//           </div>
//           <div class="info-tip">
//             <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
//             Cochez la case pour marquer un jour comme fermé. Tous les jours ouverts doivent avoir des horaires complets.
//           </div>
//         </div>

//         <!-- Description -->
//         <div class="form-section">
//           <div class="section-header">
//             <div class="section-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
//             </div>
//             <div>
//               <span class="section-title">Description</span>
//               <span class="section-sub">Présentez votre boutique aux clients</span>
//             </div>
//           </div>
//           <div class="field-group">
//             <textarea pTextarea [(ngModel)]="boutique.description" name="description" rows="5" placeholder="Décrivez votre boutique en détail… (min. 50 caractères recommandés)" class="custom-textarea w-full" [autoResize]="true"></textarea>
//             <small class="field-hint">Minimum 50 caractères recommandés</small>
//           </div>
//         </div>

//         <!-- Photos -->
//         <div class="form-section">
//           <div class="section-header">
//             <div class="section-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
//             </div>
//             <div>
//               <span class="section-title">Photos de la boutique</span>
//               <span class="section-sub">Jusqu'à 3 photos (PNG, JPG)</span>
//             </div>
//           </div>
//           <div class="upload-zone" [class.has-files]="selectedPhotos && selectedPhotos.length > 0">
//             <p-fileUpload #fileUpload (onSelect)="onPhotosSelected($event, fileUpload)" name="photos" accept="image/png,image/jpeg,image/jpg,image/webp" [maxFileSize]="52428800" [multiple]="true" [fileLimit]="3" [showUploadButton]="false" [showCancelButton]="false" chooseLabel="Ajouter des photos" styleClass="custom-upload">
//               <ng-template pTemplate="content">
//                 <div *ngIf="!selectedPhotos || selectedPhotos.length === 0" class="upload-placeholder">
//                   <div class="upload-icon-wrap">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
//                   </div>
//                   <p class="upload-text">Glissez vos photos ici</p>
//                   <p class="upload-hint">PNG, JPG — max 3 photos</p>
//                 </div>
//                 <div *ngIf="selectedPhotos && selectedPhotos.length > 0" class="photos-grid">
//                   <div *ngFor="let photo of selectedPhotos; let i = index" class="photo-thumb">
//                     <img [src]="photo.objectURL" [alt]="photo.name" />
//                     <button type="button" class="remove-btn" (click)="removePhoto(i)">✕</button>
//                     <div class="photo-overlay">{{formatFileSize(photo.size)}}</div>
//                   </div>
//                   <p class="photos-count">{{selectedPhotos.length}}/3 photos</p>
//                 </div>
//               </ng-template>
//             </p-fileUpload>
//           </div>
//         </div>

//         <!-- Logo -->
//         <div class="form-section">
//           <div class="section-header">
//             <div class="section-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
//             </div>
//             <div>
//               <span class="section-title">Logo de la boutique</span>
//               <span class="section-sub">Image principale de votre marque</span>
//             </div>
//           </div>
//           <div class="upload-zone" [class.has-file]="selectedLogo">
//             <ng-container *ngIf="!selectedLogo">
//               <p-fileUpload (onSelect)="onLogoSelected($event)" name="logo" accept="image/*" [maxFileSize]="5000000" [showUploadButton]="false" [showCancelButton]="false" chooseLabel="Choisir votre logo" styleClass="custom-upload">
//                 <ng-template pTemplate="content">
//                   <div class="upload-placeholder">
//                     <div class="upload-icon-wrap">
//                       <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>
//                     </div>
//                     <p class="upload-text">Glissez votre logo ici</p>
//                     <p class="upload-hint">PNG, JPG — max 5MB</p>
//                   </div>
//                 </ng-template>
//               </p-fileUpload>
//             </ng-container>
//             <div *ngIf="selectedLogo" class="file-preview">
//               <div class="preview-wrap circle">
//                 <img [src]="selectedLogo.objectURL" [alt]="selectedLogo.name" />
//                 <button type="button" class="remove-btn" (click)="removeLogo()">✕</button>
//               </div>
//               <div class="file-meta">
//                 <span class="file-name">{{selectedLogo.name}}</span>
//                 <span class="file-size">{{formatFileSize(selectedLogo.size)}}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <!-- Actions -->
//         <div class="form-actions">
//           <button type="button" class="btn-secondary" (click)="returnToHome()">
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
//             Annuler
//           </button>
//           <button type="submit" class="btn-primary" [disabled]="isSubmitting">
//             <span>{{ isSubmitting ? 'Envoi en cours…' : 'Valider la demande' }}</span>
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
//           </button>
//         </div>

//       </form>
//     </div>
//   </main>
// </div>

// <style>
// @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

// * { box-sizing: border-box; margin: 0; padding: 0; }

// /* ── PAGE ── */
// .demande-page {
//   min-height: 100vh;
//   width: 100%;
//   background: #0f1419;
//   position: relative;
//   overflow-x: hidden;
//   font-family: 'DM Sans', sans-serif;
// }

// /* ── BACKGROUND ── */
// .bg-layer { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
// .bg-orb { position: absolute; border-radius: 50%; filter: blur(100px); }

// .orb-1 {
//   width: 600px; height: 600px;
//   background: radial-gradient(circle, rgba(30,40,50,0.9), transparent);
//   top: -200px; left: -200px;
//   animation: floatOrb 9s ease-in-out infinite;
// }
// .orb-2 {
//   width: 500px; height: 500px;
//   background: radial-gradient(circle, rgba(42,54,66,0.7), transparent);
//   bottom: -150px; right: -150px;
//   animation: floatOrb 11s ease-in-out infinite reverse;
// }
// .orb-3 {
//   width: 400px; height: 400px;
//   background: radial-gradient(circle, rgba(16,185,129,0.05), transparent);
//   top: 50%; left: 50%;
//   transform: translate(-50%,-50%);
//   animation: floatOrb 13s ease-in-out infinite;
// }
// .grid-overlay {
//   position: absolute; inset: 0;
//   background-image:
//     linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
//     linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
//   background-size: 60px 60px;
// }
// @keyframes floatOrb {
//   0%,100% { transform: translate(0,0); }
//   50% { transform: translate(20px,-20px); }
// }

// /* ── TOP BAR ── */
// .top-bar {
//   position: sticky; top: 0; z-index: 50;
//   background: rgba(15,20,25,0.82);
//   backdrop-filter: blur(18px);
//   border-bottom: 1px solid rgba(255,255,255,0.06);
// }
// .top-bar-inner {
//   max-width: 800px; margin: 0 auto;
//   padding: 0 2rem; height: 58px;
//   display: flex; align-items: center; justify-content: space-between;
// }
// .brand-logo { display: flex; align-items: center; gap: 10px; }
// .brand-name {
//   font-family: 'Syne', sans-serif; font-size: 1.1rem;
//   font-weight: 800; color: white; letter-spacing: -0.5px;
// }
// .back-link {
//   display: flex; align-items: center; gap: 7px;
//   font-size: 0.78rem; font-weight: 600;
//   color: rgba(255,255,255,0.38); text-decoration: none;
//   transition: color 0.2s;
// }
// .back-link:hover { color: rgba(255,255,255,0.8); }

// /* ── CONTENT ── */
// .page-content {
//   position: relative; z-index: 1;
//   max-width: 800px; margin: 0 auto;
//   padding: 3rem 2rem 6rem;
//   display: flex; flex-direction: column; gap: 2.5rem;
//   animation: pageIn 0.5s cubic-bezier(0.4,0,0.2,1);
// }
// @keyframes pageIn {
//   from { opacity: 0; transform: translateY(22px); }
//   to   { opacity: 1; transform: translateY(0); }
// }

// /* ── HERO ── */
// .page-hero {
//   display: flex; flex-direction: column;
//   align-items: center; text-align: center; gap: 1rem;
// }
// .hero-tag {
//   display: inline-block;
//   background: rgba(255,255,255,0.07);
//   border: 1px solid rgba(255,255,255,0.1);
//   color: rgba(255,255,255,0.5);
//   font-size: 0.63rem; font-weight: 700;
//   letter-spacing: 2.5px; text-transform: uppercase;
//   padding: 6px 16px; border-radius: 30px;
// }
// .hero-title {
//   font-family: 'Syne', sans-serif; font-size: 3.2rem;
//   font-weight: 800; color: white; letter-spacing: -2px; line-height: 1;
// }
// .hero-sub {
//   color: rgba(255,255,255,0.38); font-size: 0.88rem;
//   line-height: 1.75; max-width: 400px;
// }
// .steps-row { display: flex; align-items: center; gap: 0; margin-top: 0.5rem; }
// .step-pill {
//   display: flex; align-items: center; gap: 8px;
//   background: rgba(255,255,255,0.05);
//   border: 1px solid rgba(255,255,255,0.08);
//   border-radius: 30px; padding: 6px 16px;
// }
// .step-n {
//   font-family: 'Syne', sans-serif; font-size: 0.58rem;
//   font-weight: 800; color: rgba(255,255,255,0.22); letter-spacing: 1px;
// }
// .step-l { font-size: 0.73rem; font-weight: 600; color: rgba(255,255,255,0.6); }
// .step-line { width: 36px; height: 1px; background: rgba(255,255,255,0.1); flex-shrink: 0; }

// /* ── CARD ── */
// .form-card {
//   background: rgba(255,255,255,0.975);
//   border-radius: 24px; padding: 3rem;
//   box-shadow:
//     0 0 0 1px rgba(255,255,255,0.07),
//     0 32px 80px rgba(0,0,0,0.65);
// }
// .demande-form { display: flex; flex-direction: column; gap: 0; }

// /* ── SECTIONS ── */
// .form-section {
//   padding: 2rem 0; border-bottom: 1px solid #edf2f7;
//   display: flex; flex-direction: column; gap: 1.2rem;
// }
// .form-section:first-child { padding-top: 0; }
// .form-section:last-of-type { border-bottom: none; }

// .section-header { display: flex; align-items: center; gap: 12px; }
// .section-icon {
//   width: 32px; height: 32px; background: #1e2832;
//   border-radius: 9px; display: flex; align-items: center;
//   justify-content: center; color: white; flex-shrink: 0;
// }
// .section-title {
//   display: block; font-family: 'Syne', sans-serif;
//   font-size: 0.88rem; font-weight: 700; color: #1e2832;
// }
// .section-sub { display: block; font-size: 0.71rem; color: #94a3b8; margin-top: 1px; }

// /* ── FIELDS ── */
// .fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
// .field-group { display: flex; flex-direction: column; gap: 6px; }
// .field-label {
//   font-size: 0.68rem; font-weight: 700; color: #374151;
//   letter-spacing: 0.5px; text-transform: uppercase;
// }
// .req { color: #ef4444; }

// .custom-input {
//   width: 100%; padding: 11px 13px !important;
//   border: 1.5px solid #e2e8f0 !important; border-radius: 11px !important;
//   font-size: 13.5px !important; font-family: 'DM Sans', sans-serif !important;
//   color: #1e2832 !important; background: white !important;
//   transition: border-color 0.2s, box-shadow 0.2s !important;
//   outline: none !important; box-shadow: 0 1px 2px rgba(0,0,0,0.04) !important;
// }
// .custom-input:focus {
//   border-color: #1e2832 !important;
//   box-shadow: 0 0 0 3px rgba(30,40,50,0.08) !important;
// }
// .custom-input::placeholder { color: #cbd5e0 !important; }

// .custom-textarea {
//   padding: 11px 13px !important; border: 1.5px solid #e2e8f0 !important;
//   border-radius: 11px !important; font-size: 13.5px !important;
//   font-family: 'DM Sans', sans-serif !important; color: #1e2832 !important;
//   background: white !important; transition: border-color 0.2s, box-shadow 0.2s !important;
//   outline: none !important; box-shadow: 0 1px 2px rgba(0,0,0,0.04) !important; resize: none;
// }
// .custom-textarea:focus {
//   border-color: #1e2832 !important;
//   box-shadow: 0 0 0 3px rgba(30,40,50,0.08) !important;
// }
// .custom-textarea::placeholder { color: #cbd5e0 !important; }

// .field-hint { font-size: 0.7rem; color: #94a3b8; }

// .pw-wrap { position: relative; }
// .pw-toggle {
//   position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
//   background: none; border: none; cursor: pointer; color: #94a3b8;
//   display: flex; align-items: center; transition: color 0.2s; padding: 0;
// }
// .pw-toggle:hover { color: #1e2832; }

// :host ::ng-deep .custom-select {
//   border: 1.5px solid #e2e8f0 !important; border-radius: 11px !important;
//   box-shadow: 0 1px 2px rgba(0,0,0,0.04) !important;
// }
// :host ::ng-deep .custom-select:focus-within,
// :host ::ng-deep .custom-select.p-focus {
//   border-color: #1e2832 !important;
//   box-shadow: 0 0 0 3px rgba(30,40,50,0.08) !important;
// }
// :host ::ng-deep .custom-datepicker .p-inputtext {
//   padding: 11px 13px !important; border: 1.5px solid #e2e8f0 !important;
//   border-radius: 11px !important; font-family: 'DM Sans', sans-serif !important;
//   box-shadow: 0 1px 2px rgba(0,0,0,0.04) !important;
// }

// /* ── UPLOAD ── */
// .upload-zone {
//   border: 1.5px dashed #d1dae6; border-radius: 14px;
//   background: #fafbfc; overflow: hidden; transition: border-color 0.2s;
// }
// .upload-zone.has-file, .upload-zone.has-files {
//   border-style: solid; border-color: #1e2832; background: white;
// }
// :host ::ng-deep .custom-upload .p-fileupload-choose {
//   background: #1e2832 !important; border: none !important;
//   border-radius: 9px !important; font-family: 'DM Sans', sans-serif !important;
//   font-weight: 700 !important; font-size: 0.78rem !important;
//   padding: 9px 15px !important; transition: transform 0.2s, box-shadow 0.2s !important;
// }
// :host ::ng-deep .custom-upload .p-fileupload-choose:hover {
//   transform: translateY(-1px) !important;
//   box-shadow: 0 4px 14px rgba(30,40,50,0.3) !important;
// }
// :host ::ng-deep .custom-upload .p-fileupload-header {
//   background: transparent !important; border: none !important;
//   padding: 1rem 1rem 0.5rem !important;
// }
// :host ::ng-deep .custom-upload .p-fileupload-content {
//   border: none !important; background: transparent !important; padding: 0 !important;
// }

// .upload-placeholder {
//   display: flex; flex-direction: column; align-items: center;
//   justify-content: center; padding: 2rem; gap: 0.4rem;
// }
// .upload-icon-wrap {
//   width: 46px; height: 46px; border-radius: 12px; background: #f1f5f9;
//   display: flex; align-items: center; justify-content: center;
//   color: #94a3b8; margin-bottom: 0.2rem;
// }
// .upload-text { font-size: 0.83rem; font-weight: 600; color: #374151; }
// .upload-hint { font-size: 0.7rem; color: #94a3b8; }

// .file-preview { display: flex; align-items: center; gap: 1rem; padding: 1.2rem; }
// .preview-wrap {
//   position: relative; width: 70px; height: 70px;
//   border-radius: 10px; overflow: hidden; border: 2px solid #e2e8f0; flex-shrink: 0;
// }
// .preview-wrap.circle { border-radius: 50%; }
// .preview-wrap img { width: 100%; height: 100%; object-fit: cover; }
// .remove-btn {
//   position: absolute; top: -5px; right: -5px;
//   width: 20px; height: 20px; background: #ef4444; border: none;
//   border-radius: 50%; cursor: pointer; display: flex; align-items: center;
//   justify-content: center; color: white; font-size: 0.5rem; font-weight: 900;
//   transition: background 0.2s, transform 0.2s;
// }
// .remove-btn:hover { background: #dc2626; transform: scale(1.1); }
// .file-meta { display: flex; flex-direction: column; gap: 3px; }
// .file-name { font-size: 0.8rem; font-weight: 600; color: #1e2832; }
// .file-size { font-size: 0.7rem; color: #94a3b8; }

// .photos-grid { display: flex; gap: 10px; padding: 1rem; flex-wrap: wrap; }
// .photo-thumb {
//   position: relative; width: 95px; height: 95px;
//   border-radius: 10px; overflow: hidden; border: 2px solid #e2e8f0;
// }
// .photo-thumb img { width: 100%; height: 100%; object-fit: cover; }
// .photo-overlay {
//   position: absolute; bottom: 0; left: 0; right: 0;
//   background: rgba(0,0,0,0.55); padding: 3px 6px;
//   font-size: 0.58rem; color: rgba(255,255,255,0.85); text-align: center;
// }
// .photos-count { width: 100%; font-size: 0.7rem; color: #94a3b8; margin: 0; padding: 0 0 0.25rem; }

// /* ── HORAIRES ── */
// .quick-actions { display: flex; flex-wrap: wrap; gap: 8px; }
// .horaires-list { display: flex; flex-direction: column; gap: 5px; }
// .horaire-row {
//   display: flex; align-items: center; gap: 1rem;
//   background: white; border: 1.5px solid #e9eef4;
//   border-radius: 11px; padding: 10px 14px; transition: all 0.2s;
// }
// .horaire-row.is-closed { background: #fef2f2; border-color: #fecaca; }
// .horaire-day { display: flex; align-items: center; gap: 9px; min-width: 115px; }
// .day-label { font-size: 0.82rem; font-weight: 700; color: #1e2832; cursor: pointer; user-select: none; }
// .horaire-times { display: flex; align-items: center; gap: 8px; flex: 1; }
// .time-field {
//   display: flex; align-items: center; gap: 5px;
//   background: #f8fafc; border: 1.5px solid #e2e8f0;
//   border-radius: 9px; padding: 5px 9px;
// }
// .ti { font-size: 0.72rem; }
// .ti.open { color: #f59e0b; }
// .ti.close { color: #6366f1; }
// .time-input {
//   border: none !important; background: transparent !important;
//   padding: 0 !important; font-size: 0.8rem !important; font-weight: 600 !important;
//   color: #1e2832 !important; font-family: 'DM Sans', sans-serif !important;
//   outline: none !important; box-shadow: none !important; width: 78px;
// }
// .time-sep { font-size: 0.78rem; color: #cbd5e0; font-weight: 600; }
// .horaire-closed-msg { flex: 1; font-size: 0.76rem; font-weight: 600; color: #ef4444; }
// .horaire-badge { margin-left: auto; }
// .badge {
//   display: inline-flex; align-items: center;
//   font-size: 0.65rem; font-weight: 700;
//   padding: 3px 9px; border-radius: 30px; letter-spacing: 0.3px;
// }
// .badge-open { background: #dcfce7; color: #15803d; }
// .badge-closed { background: #fee2e2; color: #dc2626; }
// .badge-incomplete { background: #fff7ed; color: #c2410c; }
// .info-tip {
//   display: flex; align-items: flex-start; gap: 8px;
//   font-size: 0.73rem; color: #64748b;
//   background: #f0f6ff; border: 1px solid #c7deff;
//   border-radius: 10px; padding: 9px 13px;
// }
// .info-tip svg { flex-shrink: 0; color: #3b82f6; margin-top: 1px; }

// /* ── ACTIONS ── */
// .form-actions {
//   display: flex; align-items: center; justify-content: space-between;
//   padding-top: 2rem; border-top: 1px solid #e9eef4;
// }
// .btn-primary {
//   display: flex; align-items: center; gap: 10px;
//   padding: 13px 26px;
//   background: linear-gradient(135deg, #1e2832 0%, #2a3642 100%);
//   color: white; border: none; border-radius: 12px;
//   font-family: 'DM Sans', sans-serif; font-size: 0.875rem;
//   font-weight: 700; letter-spacing: 0.3px; cursor: pointer;
//   transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.2s;
//   box-shadow: 0 6px 20px rgba(30,40,50,0.35);
// }
// .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(30,40,50,0.45); }
// .btn-primary:active:not(:disabled) { transform: translateY(0); }
// .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
// .btn-primary svg { transition: transform 0.2s; }
// .btn-primary:hover:not(:disabled) svg { transform: translateX(4px); }

// .btn-secondary {
//   display: flex; align-items: center; gap: 7px;
//   padding: 13px 20px; background: transparent; color: #64748b;
//   border: none; border-radius: 12px; font-family: 'DM Sans', sans-serif;
//   font-size: 0.875rem; font-weight: 600; cursor: pointer;
//   transition: color 0.2s, background 0.2s;
// }
// .btn-secondary:hover { color: #1e2832; background: #f1f5f9; }

// /* ── RESPONSIVE ── */
// @media (max-width: 640px) {
//   .hero-title { font-size: 2.3rem; }
//   .form-card { padding: 2rem 1.4rem; }
//   .fields-grid { grid-template-columns: 1fr; }
//   .steps-row { gap: 4px; }
//   .step-line { width: 18px; }
//   .horaire-row { flex-wrap: wrap; }
//   .page-content { padding: 2rem 1rem 4rem; }
// }
// </style>`
// })
// export class demandeBoutique {
//     boutique = {
//         nom_boutique: '',
//         categorie: '',
//         email_manager: '',
//         location: '',
//         loyer: '',
//         description: '',
//         photo_boutique: null as File | null,
//         boutique_logo: null as File | null,
//         horaires: [] as Horaire[]
//     };
    
//     showPassword = false;
//     user = {
//         nom_client: '',
//         prenom_client: '',
//         email: '',
//         pwd: '',
//         date_naissance: new Date(),
//         role: '',
//         numero_telephone: '',
//         avatarFile: null as File | null
//     }

//     selectedPhotos: any[] = [];
//     selectedLogo: any;
//     categories: any[] = [];
//     statuts: any[] = [];
//     selectedAvatar: any;
//     isSubmitting: boolean = false;

//     constructor(
//         private userservice: UserService, 
//         private boutiqueService: BoutiqueService,
//         private router: Router,
//         private categorieService: CategorieService,
//         private StatusService: StatusService,
//         private messageService: MessageService
//     ) {}

//     returnToHome() {
//         this.router.navigate(['']);
//     }

//     ngOnInit() {
//         this.loadCategories();
//         this.initializeHoraires();
//     }

//     private initializeHoraires(): void {
//         const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
//         this.boutique.horaires = jours.map(jour => ({
//             jour: jour,
//             ouverture: '09:00',
//             fermeture: '18:00',
//             est_ferme: false
//         }));
//     }

//     onFermeChange(index: number): void {
//         if (this.boutique.horaires[index].est_ferme) {
//             this.boutique.horaires[index].ouverture = '';
//             this.boutique.horaires[index].fermeture = '';
//         } else {
//             this.boutique.horaires[index].ouverture = '09:00';
//             this.boutique.horaires[index].fermeture = '18:00';
//         }
//     }

//     setAllDaysOpen(): void {
//         this.boutique.horaires.forEach(horaire => {
//             horaire.est_ferme = false;
//             horaire.ouverture = '09:00';
//             horaire.fermeture = '18:00';
//         });
//         this.messageService.add({
//             severity: 'success',
//             summary: 'Horaires mis à jour',
//             detail: 'Tous les jours sont ouverts de 09:00 à 18:00',
//             life: 2000
//         });
//     }

//     copyFirstDayToAll(): void {
//         const firstDay = this.boutique.horaires[0];
//         this.boutique.horaires.forEach((horaire, index) => {
//             if (index !== 0) {
//                 horaire.ouverture = firstDay.ouverture;
//                 horaire.fermeture = firstDay.fermeture;
//                 horaire.est_ferme = firstDay.est_ferme;
//             }
//         });
//         this.messageService.add({
//             severity: 'success',
//             summary: 'Horaires copiés',
//             detail: 'Les horaires du lundi ont été appliqués à tous les jours',
//             life: 2000
//         });
//     }

//     private resetBoutiqueForm(): void {
//         this.boutique = {
//             nom_boutique: '',
//             categorie: '',
//             email_manager: '',
//             location: '',
//             loyer: '',
//             description: '',
//             photo_boutique: null,
//             boutique_logo: null,
//             horaires: []
//         };
//         this.initializeHoraires();
//         this.selectedPhotos = [];
//         this.selectedLogo = null;
//     }

//     private resetUserForm(): void {
//         this.user = {
//             nom_client: '',
//             prenom_client: '',
//             email: '',
//             pwd: '',
//             date_naissance: new Date(),
//             role: '',
//             numero_telephone: '',
//             avatarFile: null
//         };
//         this.selectedAvatar = null;
//     }

//     private resetAllForms(): void {
//         this.resetBoutiqueForm();
//         this.resetUserForm();
//     }

//     private addBoutiqueByAdmin(): void {
//         const formData = new FormData();
        
//         formData.append('nom_boutique', this.boutique.nom_boutique);
//         formData.append('description_boutique', this.boutique.description);
//         formData.append('loyer', this.boutique.loyer);
//         formData.append('location', this.boutique.location);
//         formData.append('id_categorie', this.boutique.categorie);
        
//         // Ajouter les horaires
//         formData.append('horaires', JSON.stringify(this.boutique.horaires));
        
//         // Logo boutique
//         if (this.boutique.boutique_logo) {
//             formData.append('logo_boutique', this.boutique.boutique_logo, this.boutique.boutique_logo.name);
//         }
        
//         // Photos boutique
//         if (this.selectedPhotos && this.selectedPhotos.length > 0) {
//             this.selectedPhotos.forEach((photo) => {
//                 formData.append('photo_boutique', photo.file, photo.file.name);
//             });
//         }
        
//         console.log('📤 Envoi de', this.selectedPhotos.length, 'photos');
//         console.log('📅 Envoi des horaires:', this.boutique.horaires);
        
//         this.boutiqueService.registerBoutiqueByClient(formData).subscribe({
//             next: (res) => {
//                 console.log("✅ Boutique créée avec succès", res);
                
//                 this.messageService.add({
//                     severity: 'success',
//                     summary: 'Succès',
//                     detail: 'La boutique a été créée avec succès !',
//                     life: 5000
//                 });
                
//                 this.resetAllForms();
//                 this.isSubmitting = false;
//             },
//             error: (err) => {
//                 console.error("❌ Erreur lors de la création", err);
                
//                 this.messageService.add({
//                     severity: 'error',
//                     summary: 'Erreur',
//                     detail: err.error?.message || 'Une erreur est survenue lors de la création de la boutique',
//                     life: 5000
//                 });
                
//                 this.isSubmitting = false;
//             }
//         });
//     }

//     private addManagerBoutique(): void {
//         const formData = new FormData();
        
//         formData.append('nom_client', this.user.nom_client);
//         formData.append('prenom_client', this.user.prenom_client);
//         formData.append('email', this.user.email);
//         formData.append('pwd', this.user.pwd);
//         formData.append('date_naissance', this.user.date_naissance.toISOString());
//         formData.append('role', "697b0d19b784b5da2ab3ba22");
//         formData.append('numero_telephone', this.user.numero_telephone);
//         formData.append('rememberMe', 'false');
        
//         if (this.user.avatarFile) {
//             formData.append('avatar', this.user.avatarFile, this.user.avatarFile.name);
//             console.log('Avatar ajouté au FormData:', this.user.avatarFile.name);
//         }
        
//         this.userservice.signUpByAddClientFormData(formData).subscribe({
//             next: (res) => {
//                 console.log("✅ Manager créé avec succès", res);
                
//                 this.messageService.add({
//                     severity: 'success',
//                     summary: 'Manager créé',
//                     detail: 'Le manager a été créé avec succès',
//                     life: 3000
//                 });
                
//                 this.resetUserForm();
//             },
//             error: (err) => {
//                 console.error('❌ Erreur lors de la création du manager', err);
                
//                 this.messageService.add({
//                     severity: 'error',
//                     summary: 'Erreur Manager',
//                     detail: 'Erreur lors de la création du manager',
//                     life: 5000
//                 });
//             }
//         });
//     }
    
//     async addBoutique() {
        
//         await this.addManagerBoutique();
//         //temps 2 seconde 
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         await this.addBoutiqueByAdmin();
//     }

//     loadCategories() {
//         this.categorieService.getAllCategorie().subscribe({
//             next: (data) => {
//                 console.log('Catégories chargées:', data);
//                 this.categories = data.map((cat: any) => ({
//                     name: cat.nom,
//                     value: cat._id
//                 }));
//             },
//             error: (error) => {
//                 console.error('Erreur lors du chargement des catégories:', error);
//                 this.categories = [
//                     { name: 'Électronique', value: 'electronique' },
//                     { name: 'Vêtements', value: 'vetements' }
//                 ];
//             }
//         });  
//     }

//     onPhotosSelected(event: any, fileUpload: FileUpload): void {
//         if (event.currentFiles && event.currentFiles.length > 0) {
//             const newFiles: File[] = event.currentFiles;
            
//             if (this.selectedPhotos.length + newFiles.length > 3) {
//                 this.messageService.add({
//                     severity: 'error',
//                     summary: 'Limite dépassée',
//                     detail: 'Vous ne pouvez sélectionner que 3 photos maximum'
//                 });
//                 fileUpload.clear();
//                 return;
//             }
            
//             newFiles.forEach((file: File) => {
//                 if (file.size > 52428800) {
//                     this.messageService.add({
//                         severity: 'error',
//                         summary: 'Fichier trop volumineux',
//                         detail: `${file.name} dépasse 50MB`
//                     });
//                     return;
//                 }
                
//                 const reader = new FileReader();
//                 reader.onload = (e: any) => {
//                     this.selectedPhotos.push({
//                         file: file,
//                         name: file.name,
//                         size: file.size,
//                         objectURL: e.target.result
//                     });
//                 };
//                 reader.readAsDataURL(file);
//             });
            
//             console.log('Photos sélectionnées:', this.selectedPhotos.length);
//             fileUpload.clear();
//         }
//     }

//     removePhoto(index: number) {
//         this.selectedPhotos.splice(index, 1);
//         this.selectedPhotos = [...this.selectedPhotos];
//     }

//     onAvatarSelected(event: any): void {
//         if (event.currentFiles && event.currentFiles.length > 0) {
//             const file = event.currentFiles[0];
            
//             this.user.avatarFile = file;
            
//             const reader = new FileReader();
//             reader.onload = (e: any) => {
//                 this.selectedAvatar = {
//                     name: file.name,
//                     size: file.size,
//                     objectURL: e.target.result
//                 };
//             };
//             reader.readAsDataURL(file);
            
//             console.log('Fichier avatar sélectionné:', file.name, file.size);
//         }
//     }

//     onLogoSelected(event: any) {
//         if (event.currentFiles && event.currentFiles.length > 0) {
//             const file = event.currentFiles[0];
            
//             this.boutique.boutique_logo = file;
            
//             const reader = new FileReader();
//             reader.onload = (e: any) => {
//                 this.selectedLogo = {
//                     name: file.name,
//                     size: file.size,
//                     objectURL: e.target.result
//                 };
//             };
//             reader.readAsDataURL(file);
            
//             console.log('Fichier logo sélectionné:', file.name, file.size);
//         }
//     }

//     removeLogo() {
//         this.selectedLogo = null;
//         this.boutique.boutique_logo = null;
//     }

//     formatFileSize(bytes: number): string {
//         if (bytes === 0) return '0 Bytes';
//         const k = 1024;
//         const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//         const i = Math.floor(Math.log(bytes) / Math.log(k));
//         return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
//     }

//     removeAvatar(): void {
//         this.selectedAvatar = null;
//         this.user.avatarFile = null;
//     }


//     getHoraireCardClass(horaire: Horaire): string {
//     if (horaire.est_ferme) {
//         return 'bg-red-50 border-1 border-red-200';
//     }
//     if (horaire.ouverture && horaire.fermeture) {
//         return 'bg-green-50 border-1 border-green-200 hover:bg-green-100';
//     }
//     return 'bg-orange-50 border-1 border-orange-200';
// }

// getJourIcon(jour: string): string {
//     const icons: { [key: string]: string } = {
//         'Lundi': 'pi pi-calendar text-blue-500',
//         'Mardi': 'pi pi-calendar text-cyan-500',
//         'Mercredi': 'pi pi-calendar text-green-500',
//         'Jeudi': 'pi pi-calendar text-yellow-500',
//         'Vendredi': 'pi pi-calendar text-orange-500',
//         'Samedi': 'pi pi-calendar text-purple-500',
//         'Dimanche': 'pi pi-calendar text-red-500'
//     };
//     return icons[jour] || 'pi pi-calendar';
// }

// closeWeekend(): void {
//     this.boutique.horaires.forEach(horaire => {
//         if (horaire.jour === 'Samedi' || horaire.jour === 'Dimanche') {
//             horaire.est_ferme = true;
//             horaire.ouverture = '';
//             horaire.fermeture = '';
//         }
//     });
//     this.messageService.add({
//         severity: 'success',
//         summary: 'Week-end fermé',
//         detail: 'Samedi et dimanche ont été marqués comme fermés',
//         life: 2000
//     });
// }
// }

import { Component, ViewChild } from "@angular/core";
import { MessageService } from "primeng/api";
import { UserService } from "@/pages/service/user.service";
import { Router } from "@angular/router";
import { BoutiqueService } from "@/pages/service/boutique.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DatePickerModule } from "primeng/datepicker";
import { FluidModule } from "primeng/fluid";
import { InputTextModule } from "primeng/inputtext";
import { SelectModule } from "primeng/select";
import { TextareaModule } from "primeng/textarea";
import { CategorieService } from "@/pages/service/categorie.service";
import { StatusService } from "@/pages/service/status.service";
import { FileUploadModule } from 'primeng/fileupload';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';

interface Horaire {
    jour: string;
    ouverture: string;
    fermeture: string;
    est_ferme: boolean;
}

@Component({
    selector: 'app-demandeBoutique',
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        SelectModule,
        FluidModule,
        TextareaModule,
        FileUploadModule,
        FileUpload,
        DatePickerModule,
        ToastModule,
        CheckboxModule,
        AppFloatingConfigurator
    ],
    providers: [MessageService],
    template:`<app-floating-configurator />

<div class="demande-page">
  <div class="bg-layer">
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>
    <div class="bg-orb orb-3"></div>
    <div class="grid-overlay"></div>
  </div>

  <header class="top-bar">
    <div class="top-bar-inner">
      <div class="brand-logo">
        <svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M17.1637 19.2467C17.1566 19.4033 17.1529 19.561 17.1529 19.7194C17.1529 25.3503 21.7203 29.915 27.3546 29.915C32.9887 29.915 37.5561 25.3503 37.5561 19.7194C37.5561 19.5572 37.5524 19.3959 37.5449 19.2355C38.5617 19.0801 39.5759 18.9013 40.5867 18.6994L40.6926 18.6782C40.7191 19.0218 40.7326 19.369 40.7326 19.7194C40.7326 27.1036 34.743 33.0896 27.3546 33.0896C19.966 33.0896 13.9765 27.1036 13.9765 19.7194C13.9765 19.374 13.9896 19.0316 14.0154 18.6927L14.0486 18.6994C15.0837 18.9062 16.1223 19.0886 17.1637 19.2467ZM33.3284 11.4538C31.6493 10.2396 29.5855 9.52381 27.3546 9.52381C25.1195 9.52381 23.0524 10.2421 21.3717 11.4603C20.0078 11.3232 18.6475 11.1387 17.2933 10.907C19.7453 8.11308 23.3438 6.34921 27.3546 6.34921C31.36 6.34921 34.9543 8.10844 37.4061 10.896C36.0521 11.1292 34.692 11.3152 33.3284 11.4538ZM43.826 18.0518C43.881 18.6003 43.9091 19.1566 43.9091 19.7194C43.9091 28.8568 36.4973 36.2642 27.3546 36.2642C18.2117 36.2642 10.8 28.8568 10.8 19.7194C10.8 19.1615 10.8276 18.61 10.8816 18.0663L7.75383 17.4411C7.66775 18.1886 7.62354 18.9488 7.62354 19.7194C7.62354 30.6102 16.4574 39.4388 27.3546 39.4388C38.2517 39.4388 47.0855 30.6102 47.0855 19.7194C47.0855 18.9439 47.0407 18.1789 46.9536 17.4267L43.826 18.0518ZM44.2613 9.54743L40.9084 10.2176C37.9134 5.95821 32.9593 3.1746 27.3546 3.1746C21.7442 3.1746 16.7856 5.96385 13.7915 10.2305L10.4399 9.56057C13.892 3.83178 20.1756 0 27.3546 0C34.5281 0 40.8075 3.82591 44.2613 9.54743Z"
            fill="white"/>
        </svg>
        <span class="brand-name">ShopMall</span>
      </div>
      <a (click)="goHome()" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Retour
      </a>
    </div>
  </header>

  <main class="page-content">
    <div class="page-hero">
      <div class="hero-tag">Nouvelle boutique</div>
      <h1 class="hero-title">Ouvrez votre boutique</h1>
      <p class="hero-sub">Rejoignez notre réseau de commerçants et touchez des milliers de clients dès aujourd'hui.</p>
      <div class="steps-row">
        <div class="step-pill"><span class="step-n">01</span><span class="step-l">Compte</span></div>
        <div class="step-line"></div>
        <div class="step-pill"><span class="step-n">02</span><span class="step-l">Boutique</span></div>
        <div class="step-line"></div>
        <div class="step-pill"><span class="step-n">03</span><span class="step-l">Médias</span></div>
      </div>
    </div>

    <div class="form-card">
      <p-toast></p-toast>
      <form (ngSubmit)="addBoutique()" class="demande-form">

        <!-- ═══ SECTION UTILISATEUR ═══ -->
        <div class="form-section">
          <div class="section-left">
            <div class="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <span class="section-title">Informations utilisateur</span>
            <span class="section-sub">Compte propriétaire de la boutique</span>
          </div>
          <div class="section-right">
            <div class="fields-grid cols-2">
              <div class="field-group">
                <label class="field-label">Nom <span class="req">*</span></label>
                <input pInputText type="text" [(ngModel)]="user.nom_client" name="nom_client" placeholder="Dupont" class="custom-input" />
              </div>
              <div class="field-group">
                <label class="field-label">Prénom <span class="req">*</span></label>
                <input pInputText type="text" [(ngModel)]="user.prenom_client" name="prenom_client" placeholder="Jean" class="custom-input" />
              </div>
              <div class="field-group">
                <label class="field-label">Email <span class="req">*</span></label>
                <input pInputText type="email" [(ngModel)]="user.email" name="email" placeholder="votre@email.com" class="custom-input" />
              </div>
              <div class="field-group">
                <label class="field-label">Mot de passe <span class="req">*</span></label>
                <div class="pw-wrap">
                  <input pInputText [type]="showPassword ? 'text' : 'password'" [(ngModel)]="user.pwd" name="pwd" placeholder="••••••••" class="custom-input" />
                  <button type="button" class="pw-toggle" (click)="showPassword = !showPassword">
                    <svg *ngIf="!showPassword" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    <svg *ngIf="showPassword" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  </button>
                </div>
              </div>
              <div class="field-group">
                <label class="field-label">Date de naissance <span class="req">*</span></label>
                <p-datePicker [(ngModel)]="user.date_naissance" name="date_naissance" dateFormat="dd/mm/yy" placeholder="JJ/MM/AAAA" styleClass="custom-datepicker w-full"></p-datePicker>
              </div>
              <div class="field-group">
                <label class="field-label">Téléphone <span class="req">*</span></label>
                <input pInputText type="tel" [(ngModel)]="user.numero_telephone" name="numero_telephone" placeholder="+33 6 12 34 56 78" class="custom-input" />
              </div>
            </div>
          </div>
        </div>

        <!-- ═══ SECTION AVATAR ═══ -->
        <div class="form-section">
          <div class="section-left">
            <div class="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>
            </div>
            <span class="section-title">Avatar utilisateur</span>
            <span class="section-sub">Photo de profil du propriétaire</span>
          </div>
          <div class="section-right">
            <!-- Prévisualisation avatar -->
            <div *ngIf="selectedAvatar" class="media-preview-card">
              <div class="media-thumb circle">
                <img [src]="selectedAvatar.objectURL" [alt]="selectedAvatar.name" />
              </div>
              <div class="media-info">
                <span class="media-name">{{ selectedAvatar.name }}</span>
                <span class="media-size">{{ formatFileSize(selectedAvatar.size) }}</span>
              </div>
              <!-- Bouton remove indépendant du p-fileUpload -->
              <button type="button" class="media-remove-btn" (click)="removeAvatar()">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Supprimer
              </button>
            </div>

            <!-- Uploader avatar — affiché uniquement si pas de fichier -->
            <div class="upload-zone" *ngIf="!selectedAvatar">
              <p-fileUpload
                #avatarUpload
                (onSelect)="onAvatarSelected($event, avatarUpload)"
                name="avatar"
                accept="image/*"
                [maxFileSize]="5000000"
                [showUploadButton]="false"
                [showCancelButton]="false"
                chooseLabel="Choisir un avatar"
                styleClass="custom-upload">
                <ng-template pTemplate="content">
                  <div class="upload-placeholder">
                    <div class="upload-icon-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    </div>
                    <p class="upload-text">Glissez votre avatar ici</p>
                    <p class="upload-hint">PNG, JPG — max 5MB</p>
                  </div>
                </ng-template>
              </p-fileUpload>
            </div>
          </div>
        </div>

        <!-- ═══ SECTION INFOS BOUTIQUE ═══ -->
        <div class="form-section">
          <div class="section-left">
            <div class="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <span class="section-title">Informations générales</span>
            <span class="section-sub">Nom et catégorie de votre boutique</span>
          </div>
          <div class="section-right">
            <div class="fields-grid cols-2">
              <div class="field-group">
                <label class="field-label">Nom de la boutique <span class="req">*</span></label>
                <input pInputText type="text" [(ngModel)]="boutique.nom_boutique" name="nom_boutique" placeholder="Ex: Boutique KFC" class="custom-input" />
              </div>
              <div class="field-group">
                <label class="field-label">Catégorie <span class="req">*</span></label>
                <p-select [options]="categories" [(ngModel)]="boutique.categorie" name="categorie" optionLabel="name" optionValue="value" placeholder="Sélectionnez une catégorie" styleClass="custom-select w-full"></p-select>
              </div>
            </div>
          </div>
        </div>

        <!-- ═══ SECTION HORAIRES ═══ -->
        <div class="form-section">
          <div class="section-left">
            <div class="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <span class="section-title">Horaires d'ouverture</span>
            <span class="section-sub">Définissez vos jours et créneaux</span>
          </div>
          <div class="section-right">
            <div class="quick-actions">
              <button pButton type="button" label="Ouvrir tous les jours" icon="pi pi-check-circle" size="small" severity="success" [outlined]="true" (click)="setAllDaysOpen()"></button>
              <button pButton type="button" label="Dupliquer le lundi" icon="pi pi-copy" size="small" severity="info" [outlined]="true" (click)="copyFirstDayToAll()"></button>
              <button pButton type="button" label="Fermer week-end" icon="pi pi-times-circle" size="small" severity="warn" [outlined]="true" (click)="closeWeekend()"></button>
            </div>
            <div class="horaires-list">
              <div *ngFor="let horaire of boutique.horaires; let i = index" class="horaire-row" [class.is-closed]="horaire.est_ferme">
                <div class="horaire-day">
                  <p-checkbox [(ngModel)]="horaire.est_ferme" [name]="'ferme_' + i" [binary]="true" (onChange)="onFermeChange(i)" [inputId]="'cb_' + i"></p-checkbox>
                  <label [for]="'cb_' + i" class="day-label">{{horaire.jour}}</label>
                </div>
                <div class="horaire-times" *ngIf="!horaire.est_ferme">
                  <div class="time-field">
                    <span class="ti open">☀</span>
                    <input pInputText type="time" [(ngModel)]="horaire.ouverture" [name]="'ouverture_' + i" class="time-input" />
                  </div>
                  <span class="time-sep">→</span>
                  <div class="time-field">
                    <span class="ti close">☽</span>
                    <input pInputText type="time" [(ngModel)]="horaire.fermeture" [name]="'fermeture_' + i" class="time-input" />
                  </div>
                </div>
                <div class="horaire-closed-msg" *ngIf="horaire.est_ferme">Fermé toute la journée</div>
                <div class="horaire-badge">
                  <span *ngIf="horaire.est_ferme" class="badge badge-closed">Fermé</span>
                  <span *ngIf="!horaire.est_ferme && horaire.ouverture && horaire.fermeture" class="badge badge-open">Ouvert</span>
                  <span *ngIf="!horaire.est_ferme && (!horaire.ouverture || !horaire.fermeture)" class="badge badge-incomplete">Incomplet</span>
                </div>
              </div>
            </div>
            <div class="info-tip">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Cochez la case pour marquer un jour comme fermé.
            </div>
          </div>
        </div>

        <!-- ═══ SECTION DESCRIPTION ═══ -->
        <div class="form-section">
          <div class="section-left">
            <div class="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
            </div>
            <span class="section-title">Description</span>
            <span class="section-sub">Présentez votre boutique</span>
          </div>
          <div class="section-right">
            <div class="field-group">
              <textarea pTextarea [(ngModel)]="boutique.description" name="description" rows="5" placeholder="Décrivez votre boutique en détail… (min. 50 caractères recommandés)" class="custom-textarea w-full" [autoResize]="true"></textarea>
              <small class="field-hint">Minimum 50 caractères recommandés</small>
            </div>
          </div>
        </div>

        <!-- ═══ SECTION PHOTOS ═══ -->
        <div class="form-section">
          <div class="section-left">
            <div class="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
            <span class="section-title">Photos boutique</span>
            <span class="section-sub">Jusqu'à 3 photos (PNG, JPG)</span>
          </div>
          <div class="section-right">

            <!-- Liste des photos sélectionnées — même style que avatar/logo -->
            <div *ngFor="let photo of selectedPhotos; let i = index" class="media-preview-card">
              <div class="media-thumb square">
                <img [src]="photo.objectURL" [alt]="photo.name" />
              </div>
              <div class="media-info">
                <span class="media-name">{{ photo.name }}</span>
                <span class="media-size">{{ formatFileSize(photo.size) }}</span>
              </div>
              <button type="button" class="media-remove-btn" (click)="removePhoto(i)">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Supprimer
              </button>
            </div>

            <!-- Uploader photos — masqué si 3 photos déjà sélectionnées -->
            <div class="upload-zone" *ngIf="selectedPhotos.length < 3">
              <p-fileUpload
                #photoUpload
                (onSelect)="onPhotosSelected($event, photoUpload)"
                name="photos"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                [maxFileSize]="52428800"
                [multiple]="true"
                [fileLimit]="3"
                [showUploadButton]="false"
                [showCancelButton]="false"
                chooseLabel="Ajouter des photos"
                styleClass="custom-upload">
                <ng-template pTemplate="content">
                  <div class="upload-placeholder">
                    <div class="upload-icon-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    </div>
                    <p class="upload-text">Glissez vos photos ici</p>
                    <p class="upload-hint">{{ selectedPhotos.length }}/3 photos — PNG, JPG</p>
                  </div>
                </ng-template>
              </p-fileUpload>
            </div>

          </div>
        </div>

        <!-- ═══ SECTION LOGO ═══ -->
        <div class="form-section">
          <div class="section-left">
            <div class="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
            </div>
            <span class="section-title">Logo de la boutique</span>
            <span class="section-sub">Image principale de votre marque</span>
          </div>
          <div class="section-right">
            <!-- Prévisualisation logo -->
            <div *ngIf="selectedLogo" class="media-preview-card">
              <div class="media-thumb square">
                <img [src]="selectedLogo.objectURL" [alt]="selectedLogo.name" />
              </div>
              <div class="media-info">
                <span class="media-name">{{ selectedLogo.name }}</span>
                <span class="media-size">{{ formatFileSize(selectedLogo.size) }}</span>
              </div>
              <!-- Bouton remove indépendant du p-fileUpload -->
              <button type="button" class="media-remove-btn" (click)="removeLogo()">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Supprimer
              </button>
            </div>

            <!-- Uploader logo — affiché uniquement si pas de fichier -->
            <div class="upload-zone" *ngIf="!selectedLogo">
              <p-fileUpload
                #logoUpload
                (onSelect)="onLogoSelected($event, logoUpload)"
                name="logo"
                accept="image/*"
                [maxFileSize]="5000000"
                [showUploadButton]="false"
                [showCancelButton]="false"
                chooseLabel="Choisir votre logo"
                styleClass="custom-upload">
                <ng-template pTemplate="content">
                  <div class="upload-placeholder">
                    <div class="upload-icon-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>
                    </div>
                    <p class="upload-text">Glissez votre logo ici</p>
                    <p class="upload-hint">PNG, JPG — max 5MB</p>
                  </div>
                </ng-template>
              </p-fileUpload>
            </div>
          </div>
        </div>

        <!-- ═══ ACTIONS ═══ -->
        <div class="form-actions">
          <button type="button" class="btn-secondary" (click)="returnToHome()">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Annuler
          </button>
          <button type="submit" class="btn-primary" [disabled]="isSubmitting">
            <span>{{ isSubmitting ? 'Envoi en cours…' : 'Valider la demande' }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>

      </form>
    </div>
  </main>
</div>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

/* ── PAGE ── */
.demande-page {
  min-height: 100vh;
  width: 100%;
  background: #0f1419;
  position: relative;
  overflow-x: hidden;
  font-family: 'DM Sans', sans-serif;
}

/* ── BACKGROUND ── */
.bg-layer { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
.bg-orb { position: absolute; border-radius: 50%; filter: blur(100px); }
.orb-1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(30,40,50,0.9), transparent); top: -200px; left: -200px; animation: floatOrb 9s ease-in-out infinite; }
.orb-2 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(42,54,66,0.7), transparent); bottom: -150px; right: -150px; animation: floatOrb 11s ease-in-out infinite reverse; }
.orb-3 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(16,185,129,0.05), transparent); top: 50%; left: 50%; transform: translate(-50%,-50%); animation: floatOrb 13s ease-in-out infinite; }
.grid-overlay { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px); background-size: 60px 60px; }
@keyframes floatOrb { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-20px); } }

/* ── TOP BAR ── */
.top-bar { position: sticky; top: 0; z-index: 50; background: rgba(15,20,25,0.82); backdrop-filter: blur(18px); border-bottom: 1px solid rgba(255,255,255,0.06); }
.top-bar-inner { max-width: 1100px; margin: 0 auto; padding: 0 2rem; height: 58px; display: flex; align-items: center; justify-content: space-between; }
.brand-logo { display: flex; align-items: center; gap: 10px; }
.brand-name { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 800; color: white; letter-spacing: -0.5px; }
.back-link { display: flex; align-items: center; gap: 7px; font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.38); text-decoration: none; transition: color 0.2s; }
.back-link:hover { color: rgba(255,255,255,0.8); }

/* ── CONTENT ── */
.page-content {
  position: relative; z-index: 1;
  max-width: 1100px; margin: 0 auto;
  padding: 3rem 2rem 6rem;
  display: flex; flex-direction: column; gap: 2.5rem;
  animation: pageIn 0.5s cubic-bezier(0.4,0,0.2,1);
}
@keyframes pageIn { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }

/* ── HERO ── */
.page-hero { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1rem; }
.hero-tag { display: inline-block; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); font-size: 0.63rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; padding: 6px 16px; border-radius: 30px; }
.hero-title { font-family: 'Syne', sans-serif; font-size: 3.2rem; font-weight: 800; color: white; letter-spacing: -2px; line-height: 1; }
.hero-sub { color: rgba(255,255,255,0.38); font-size: 0.88rem; line-height: 1.75; max-width: 400px; }
.steps-row { display: flex; align-items: center; gap: 0; margin-top: 0.5rem; }
.step-pill { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 30px; padding: 6px 16px; }
.step-n { font-family: 'Syne', sans-serif; font-size: 0.58rem; font-weight: 800; color: rgba(255,255,255,0.22); letter-spacing: 1px; }
.step-l { font-size: 0.73rem; font-weight: 600; color: rgba(255,255,255,0.6); }
.step-line { width: 36px; height: 1px; background: rgba(255,255,255,0.1); flex-shrink: 0; }

/* ── CARD ── */
.form-card { background: rgba(255,255,255,0.975); border-radius: 24px; padding: 0; box-shadow: 0 0 0 1px rgba(255,255,255,0.07), 0 32px 80px rgba(0,0,0,0.65); overflow: hidden; }
.demande-form { display: flex; flex-direction: column; }

/* ── SECTIONS HORIZONTALES ── */
/* Chaque section = ligne avec colonne gauche (label) + colonne droite (contenu) */
.form-section {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 0;
  border-bottom: 1px solid #edf2f7;
  min-height: 0;
}
.form-section:last-of-type { border-bottom: none; }

.section-left {
  padding: 2rem 2rem;
  background: #f8fafc;
  border-right: 1px solid #edf2f7;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
}
.section-right {
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.section-icon { width: 32px; height: 32px; background: #1e2832; border-radius: 9px; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; margin-bottom: 4px; }
.section-title { font-family: 'Syne', sans-serif; font-size: 0.82rem; font-weight: 700; color: #1e2832; }
.section-sub { font-size: 0.7rem; color: #94a3b8; line-height: 1.5; }

/* ── FIELDS ── */
.fields-grid { display: grid; gap: 1rem; }
.fields-grid.cols-2 { grid-template-columns: 1fr 1fr; }
.field-group { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-size: 0.68rem; font-weight: 700; color: #374151; letter-spacing: 0.5px; text-transform: uppercase; }
.req { color: #ef4444; }

.custom-input { width: 100%; padding: 11px 13px !important; border: 1.5px solid #e2e8f0 !important; border-radius: 11px !important; font-size: 13.5px !important; font-family: 'DM Sans', sans-serif !important; color: #1e2832 !important; background: white !important; transition: border-color 0.2s, box-shadow 0.2s !important; outline: none !important; box-shadow: 0 1px 2px rgba(0,0,0,0.04) !important; }
.custom-input:focus { border-color: #1e2832 !important; box-shadow: 0 0 0 3px rgba(30,40,50,0.08) !important; }
.custom-input::placeholder { color: #cbd5e0 !important; }

.custom-textarea { padding: 11px 13px !important; border: 1.5px solid #e2e8f0 !important; border-radius: 11px !important; font-size: 13.5px !important; font-family: 'DM Sans', sans-serif !important; color: #1e2832 !important; background: white !important; transition: border-color 0.2s, box-shadow 0.2s !important; outline: none !important; box-shadow: 0 1px 2px rgba(0,0,0,0.04) !important; resize: none; }
.custom-textarea:focus { border-color: #1e2832 !important; box-shadow: 0 0 0 3px rgba(30,40,50,0.08) !important; }
.custom-textarea::placeholder { color: #cbd5e0 !important; }

.field-hint { font-size: 0.7rem; color: #94a3b8; }

.pw-wrap { position: relative; }
.pw-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #94a3b8; display: flex; align-items: center; transition: color 0.2s; padding: 0; }
.pw-toggle:hover { color: #1e2832; }

:host ::ng-deep .custom-select { border: 1.5px solid #e2e8f0 !important; border-radius: 11px !important; box-shadow: 0 1px 2px rgba(0,0,0,0.04) !important; }
:host ::ng-deep .custom-select:focus-within, :host ::ng-deep .custom-select.p-focus { border-color: #1e2832 !important; box-shadow: 0 0 0 3px rgba(30,40,50,0.08) !important; }
:host ::ng-deep .custom-datepicker .p-inputtext { padding: 11px 13px !important; border: 1.5px solid #e2e8f0 !important; border-radius: 11px !important; font-family: 'DM Sans', sans-serif !important; box-shadow: 0 1px 2px rgba(0,0,0,0.04) !important; }

/* ── UPLOAD ── */
.upload-zone { border: 1.5px dashed #d1dae6; border-radius: 14px; background: #fafbfc; overflow: hidden; transition: border-color 0.2s; }
.upload-zone.has-files { border-color: #1e2832; border-style: solid; background: white; }

:host ::ng-deep .custom-upload .p-fileupload-choose { background: #1e2832 !important; border: none !important; border-radius: 9px !important; font-family: 'DM Sans', sans-serif !important; font-weight: 700 !important; font-size: 0.78rem !important; padding: 9px 15px !important; transition: transform 0.2s, box-shadow 0.2s !important; }
:host ::ng-deep .custom-upload .p-fileupload-choose:hover { transform: translateY(-1px) !important; box-shadow: 0 4px 14px rgba(30,40,50,0.3) !important; }
:host ::ng-deep .custom-upload .p-fileupload-header { background: transparent !important; border: none !important; padding: 1rem 1rem 0.5rem !important; }
:host ::ng-deep .custom-upload .p-fileupload-content { border: none !important; background: transparent !important; padding: 0 !important; }

.upload-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; gap: 0.4rem; }
.upload-placeholder.small { padding: 1rem; }
.upload-icon-wrap { width: 46px; height: 46px; border-radius: 12px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; color: #94a3b8; margin-bottom: 0.2rem; }
.upload-text { font-size: 0.83rem; font-weight: 600; color: #374151; }
.upload-hint { font-size: 0.7rem; color: #94a3b8; }

/* ── MEDIA PREVIEW CARD (avatar & logo) ── */
/* Structure indépendante du p-fileUpload pour que le bouton "Supprimer" fonctionne toujours */
.media-preview-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  border: 1.5px solid #1e2832;
  border-radius: 14px;
  padding: 1rem 1.2rem;
}
.media-thumb { flex-shrink: 0; overflow: hidden; border: 2px solid #e2e8f0; }
.media-thumb.circle { width: 64px; height: 64px; border-radius: 50%; }
.media-thumb.square { width: 64px; height: 64px; border-radius: 10px; }
.media-thumb img { width: 100%; height: 100%; object-fit: cover; }
.media-info { flex: 1; display: flex; flex-direction: column; gap: 3px; overflow: hidden; }
.media-name { font-size: 0.82rem; font-weight: 600; color: #1e2832; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.media-size { font-size: 0.7rem; color: #94a3b8; }
.media-remove-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 13px;
  background: #fff0f0; border: 1.5px solid #fecaca;
  border-radius: 9px; cursor: pointer; color: #dc2626;
  font-size: 0.75rem; font-weight: 700; font-family: 'DM Sans', sans-serif;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
}
.media-remove-btn:hover { background: #fee2e2; border-color: #ef4444; transform: translateY(-1px); }



/* ── HORAIRES ── */
.quick-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.horaires-list { display: flex; flex-direction: column; gap: 5px; }
.horaire-row { display: flex; align-items: center; gap: 1rem; background: white; border: 1.5px solid #e9eef4; border-radius: 11px; padding: 10px 14px; transition: all 0.2s; }
.horaire-row.is-closed { background: #fef2f2; border-color: #fecaca; }
.horaire-day { display: flex; align-items: center; gap: 9px; min-width: 110px; }
.day-label { font-size: 0.82rem; font-weight: 700; color: #1e2832; cursor: pointer; user-select: none; }
.horaire-times { display: flex; align-items: center; gap: 8px; flex: 1; }
.time-field { display: flex; align-items: center; gap: 5px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 9px; padding: 5px 9px; }
.ti { font-size: 0.72rem; }
.ti.open { color: #f59e0b; }
.ti.close { color: #6366f1; }
.time-input { border: none !important; background: transparent !important; padding: 0 !important; font-size: 0.8rem !important; font-weight: 600 !important; color: #1e2832 !important; font-family: 'DM Sans', sans-serif !important; outline: none !important; box-shadow: none !important; width: 78px; }
.time-sep { font-size: 0.78rem; color: #cbd5e0; font-weight: 600; }
.horaire-closed-msg { flex: 1; font-size: 0.76rem; font-weight: 600; color: #ef4444; }
.horaire-badge { margin-left: auto; }
.badge { display: inline-flex; align-items: center; font-size: 0.65rem; font-weight: 700; padding: 3px 9px; border-radius: 30px; letter-spacing: 0.3px; }
.badge-open { background: #dcfce7; color: #15803d; }
.badge-closed { background: #fee2e2; color: #dc2626; }
.badge-incomplete { background: #fff7ed; color: #c2410c; }
.info-tip { display: flex; align-items: flex-start; gap: 8px; font-size: 0.73rem; color: #64748b; background: #f0f6ff; border: 1px solid #c7deff; border-radius: 10px; padding: 9px 13px; }
.info-tip svg { flex-shrink: 0; color: #3b82f6; margin-top: 1px; }

/* ── ACTIONS ── */
.form-actions { display: flex; align-items: center; justify-content: space-between; padding: 2rem 2rem; border-top: 1px solid #e9eef4; background: #f8fafc; }
.btn-primary { display: flex; align-items: center; gap: 10px; padding: 13px 26px; background: linear-gradient(135deg, #1e2832 0%, #2a3642 100%); color: white; border: none; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 700; letter-spacing: 0.3px; cursor: pointer; transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.2s; box-shadow: 0 6px 20px rgba(30,40,50,0.35); }
.btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(30,40,50,0.45); }
.btn-primary:active:not(:disabled) { transform: translateY(0); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-primary svg { transition: transform 0.2s; }
.btn-primary:hover:not(:disabled) svg { transform: translateX(4px); }
.btn-secondary { display: flex; align-items: center; gap: 7px; padding: 13px 20px; background: transparent; color: #64748b; border: none; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: color 0.2s, background 0.2s; }
.btn-secondary:hover { color: #1e2832; background: #edf2f7; }

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .form-section { grid-template-columns: 1fr; }
  .section-left { border-right: none; border-bottom: 1px solid #edf2f7; padding: 1.2rem 1.4rem; flex-direction: row; align-items: center; gap: 10px; flex-wrap: wrap; }
  .section-right { padding: 1.2rem 1.4rem; }
  .fields-grid.cols-2 { grid-template-columns: 1fr; }
  .hero-title { font-size: 2.3rem; }
  .form-card { border-radius: 16px; }
  .page-content { padding: 2rem 1rem 4rem; }
  .top-bar-inner { max-width: 100%; }
}
</style>`
})
export class demandeBoutique {
    boutique = {
        nom_boutique: '',
        categorie: '',
        email_manager: '',
        location: '',
        loyer: '',
        description: '',
        photo_boutique: null as File | null,
        boutique_logo: null as File | null,
        horaires: [] as Horaire[]
    };

    showPassword = false;
    user = {
        nom_client: '',
        prenom_client: '',
        email: '',
        pwd: '',
        date_naissance: new Date(),
        role: '',
        numero_telephone: '',
        avatarFile: null as File | null
    }

    selectedPhotos: any[] = [];
    selectedLogo: any = null;
    categories: any[] = [];
    statuts: any[] = [];
    selectedAvatar: any = null;
    isSubmitting: boolean = false;

    constructor(
        private userservice: UserService,
        private boutiqueService: BoutiqueService,
        private router: Router,
        private categorieService: CategorieService,
        private StatusService: StatusService,
        private messageService: MessageService
    ) {}

    returnToHome() {
        this.router.navigate(['']);
    }

    ngOnInit() {
        this.loadCategories();
        this.initializeHoraires();
    }

    private initializeHoraires(): void {
        const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
        this.boutique.horaires = jours.map(jour => ({
            jour,
            ouverture: '09:00',
            fermeture: '18:00',
            est_ferme: false
        }));
    }

    onFermeChange(index: number): void {
        if (this.boutique.horaires[index].est_ferme) {
            this.boutique.horaires[index].ouverture = '';
            this.boutique.horaires[index].fermeture = '';
        } else {
            this.boutique.horaires[index].ouverture = '09:00';
            this.boutique.horaires[index].fermeture = '18:00';
        }
    }

    setAllDaysOpen(): void {
        this.boutique.horaires.forEach(h => { h.est_ferme = false; h.ouverture = '09:00'; h.fermeture = '18:00'; });
        this.messageService.add({ severity: 'success', summary: 'Horaires mis à jour', detail: 'Tous les jours sont ouverts de 09:00 à 18:00', life: 2000 });
    }

    copyFirstDayToAll(): void {
        const first = this.boutique.horaires[0];
        this.boutique.horaires.forEach((h, i) => { if (i !== 0) { h.ouverture = first.ouverture; h.fermeture = first.fermeture; h.est_ferme = first.est_ferme; } });
        this.messageService.add({ severity: 'success', summary: 'Horaires copiés', detail: 'Les horaires du lundi ont été appliqués à tous les jours', life: 2000 });
    }

    closeWeekend(): void {
        this.boutique.horaires.forEach(h => { if (h.jour === 'Samedi' || h.jour === 'Dimanche') { h.est_ferme = true; h.ouverture = ''; h.fermeture = ''; } });
        this.messageService.add({ severity: 'success', summary: 'Week-end fermé', detail: 'Samedi et dimanche ont été marqués comme fermés', life: 2000 });
    }

    private resetBoutiqueForm(): void {
        this.boutique = { nom_boutique: '', categorie: '', email_manager: '', location: '', loyer: '', description: '', photo_boutique: null, boutique_logo: null, horaires: [] };
        this.initializeHoraires();
        this.selectedPhotos = [];
        this.selectedLogo = null;
    }

    private resetUserForm(): void {
        this.user = { nom_client: '', prenom_client: '', email: '', pwd: '', date_naissance: new Date(), role: '', numero_telephone: '', avatarFile: null };
        this.selectedAvatar = null;
    }

    private resetAllForms(): void {
        this.resetBoutiqueForm();
        this.resetUserForm();
    }

    private addBoutiqueByAdmin(): void {
        const formData = new FormData();
        formData.append('nom_boutique', this.boutique.nom_boutique);
        formData.append('description_boutique', this.boutique.description);
        formData.append('loyer', this.boutique.loyer);
        formData.append('location', this.boutique.location);
        formData.append('id_categorie', this.boutique.categorie);
        formData.append('horaires', JSON.stringify(this.boutique.horaires));
        if (this.boutique.boutique_logo) formData.append('logo_boutique', this.boutique.boutique_logo, this.boutique.boutique_logo.name);
        if (this.selectedPhotos?.length > 0) this.selectedPhotos.forEach(p => formData.append('photo_boutique', p.file, p.file.name));

        this.boutiqueService.registerBoutiqueByClient(formData).subscribe({
            next: (res) => {
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'La boutique a été créée avec succès !', life: 5000 });
                this.resetAllForms();
                this.isSubmitting = false;
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.error?.message || 'Une erreur est survenue', life: 5000 });
                this.isSubmitting = false;
            }
        });
    }

    private addManagerBoutique(): void {
        const formData = new FormData();
        formData.append('nom_client', this.user.nom_client);
        formData.append('prenom_client', this.user.prenom_client);
        formData.append('email', this.user.email);
        formData.append('pwd', this.user.pwd);
        formData.append('date_naissance', this.user.date_naissance.toISOString());
        formData.append('role', '697b0d19b784b5da2ab3ba22');
        formData.append('numero_telephone', this.user.numero_telephone);
        formData.append('rememberMe', 'false');
        if (this.user.avatarFile) formData.append('avatar', this.user.avatarFile, this.user.avatarFile.name);

        this.userservice.signUpByAddClientFormData(formData).subscribe({
            next: () => { this.messageService.add({ severity: 'success', summary: 'Manager créé', detail: 'Le manager a été créé avec succès', life: 3000 }); this.resetUserForm(); },
            error: () => { this.messageService.add({ severity: 'error', summary: 'Erreur Manager', detail: 'Erreur lors de la création du manager', life: 5000 }); }
        });
    }

    async addBoutique() {
        this.isSubmitting = true;
        await this.addManagerBoutique();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await this.addBoutiqueByAdmin();
    }

    loadCategories() {
        this.categorieService.getAllCategorie().subscribe({
            next: (data) => { this.categories = data.map((cat: any) => ({ name: cat.nom, value: cat._id })); },
            error: () => { this.categories = [{ name: 'Électronique', value: 'electronique' }, { name: 'Vêtements', value: 'vetements' }]; }
        });
    }

    onPhotosSelected(event: any, fileUpload: FileUpload): void {
        if (!event.currentFiles?.length) return;
        const newFiles: File[] = event.currentFiles;

        if (this.selectedPhotos.length + newFiles.length > 3) {
            this.messageService.add({ severity: 'error', summary: 'Limite dépassée', detail: 'Vous ne pouvez sélectionner que 3 photos maximum' });
            fileUpload.clear();
            return;
        }

        newFiles.forEach((file: File) => {
            if (file.size > 52428800) {
                this.messageService.add({ severity: 'error', summary: 'Fichier trop volumineux', detail: `${file.name} dépasse 50MB` });
                return;
            }
            const reader = new FileReader();
            reader.onload = (e: any) => { this.selectedPhotos.push({ file, name: file.name, size: file.size, objectURL: e.target.result }); };
            reader.readAsDataURL(file);
        });

        // On clear toujours le composant interne pour éviter les doublons
        fileUpload.clear();
    }

    removePhoto(index: number) {
        this.selectedPhotos.splice(index, 1);
        this.selectedPhotos = [...this.selectedPhotos];
    }

    /**
     * FIX : on passe `fileUpload` en paramètre pour appeler clear()
     * et on vide selectedAvatar + avatarFile.
     * Le *ngIf="!selectedAvatar" dans le template cache/recrée le composant,
     * ce qui garantit qu'il n'y a plus d'état interne résiduel.
     */
    onAvatarSelected(event: any, fileUpload: FileUpload): void {
        if (!event.currentFiles?.length) return;
        const file = event.currentFiles[0];
        this.user.avatarFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.selectedAvatar = { name: file.name, size: file.size, objectURL: e.target.result };
        };
        reader.readAsDataURL(file);
        // Vider l'état interne du composant pour éviter tout re-trigger
        fileUpload.clear();
    }

    removeAvatar(): void {
        // La prévisualisation disparaît via *ngIf="selectedAvatar"
        // Le p-fileUpload est recréé proprement grâce au *ngIf="!selectedAvatar"
        this.selectedAvatar = null;
        this.user.avatarFile = null;
    }

    /**
     * FIX : même pattern que pour l'avatar
     */
    onLogoSelected(event: any, logoUpload: FileUpload): void {
        if (!event.currentFiles?.length) return;
        const file = event.currentFiles[0];
        this.boutique.boutique_logo = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.selectedLogo = { name: file.name, size: file.size, objectURL: e.target.result };
        };
        reader.readAsDataURL(file);
        logoUpload.clear();
    }

    removeLogo(): void {
        this.selectedLogo = null;
        this.boutique.boutique_logo = null;
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    getHoraireCardClass(horaire: Horaire): string {
        if (horaire.est_ferme) return 'bg-red-50 border-1 border-red-200';
        if (horaire.ouverture && horaire.fermeture) return 'bg-green-50 border-1 border-green-200 hover:bg-green-100';
        return 'bg-orange-50 border-1 border-orange-200';
    }

    getJourIcon(jour: string): string {
        const icons: { [key: string]: string } = { 'Lundi': 'pi pi-calendar text-blue-500', 'Mardi': 'pi pi-calendar text-cyan-500', 'Mercredi': 'pi pi-calendar text-green-500', 'Jeudi': 'pi pi-calendar text-yellow-500', 'Vendredi': 'pi pi-calendar text-orange-500', 'Samedi': 'pi pi-calendar text-purple-500', 'Dimanche': 'pi pi-calendar text-red-500' };
        return icons[jour] || 'pi pi-calendar';
    }

    goHome() {
    this.router.navigate(['/']);
    }
}