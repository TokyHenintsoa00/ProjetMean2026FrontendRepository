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
// import { FileUploadModule } from 'primeng/fileupload';  // ← Changez ici
// import { FileUpload } from 'primeng/fileupload';
// import { ToastModule } from 'primeng/toast';  // ← Importez le module
// import { CheckboxModule } from 'primeng/checkbox';
// interface Horaire {
//     jour: string;
//     ouverture: string;
//     fermeture: string;
//     est_ferme: boolean;
// }

// @Component({
//     selector: 'app-creationBoutique',
//     imports: [
//         CommonModule,
//         FormsModule,
//         InputTextModule,
//         ButtonModule,
//         SelectModule,
//         FluidModule,
//         TextareaModule,
//          FileUploadModule,
//         FileUpload,
//         DatePickerModule,
//         ToastModule,
//         CheckboxModule
//     ],
//     providers: [MessageService],
//     template:`<p-fluid>
//     <div class="flex flex-col md:flex-row gap-8">
//         <div class="md:w-1/1">
//             <div class="card flex flex-col gap-6 shadow-2 border-round-xl p-6">
//                 <!-- Header -->
//                 <div class="flex align-items-center gap-3 pb-3 border-bottom-1 surface-border">
//                     <i class="pi pi-shop text-4xl text-primary"></i>
//                     <div>
//                         <div class="font-semibold text-2xl text-primary">
//                             Ajouter une boutique
//                         </div>
//                         <p class="text-600 text-sm mt-1">Complétez les informations de votre boutique</p>
//                     </div>
//                 </div>
                
//                 <form (ngSubmit)="addBoutique()">


//                     <!-- Informations utilisateur -->
//                     <div class="surface-50 border-round-lg p-4 mb-4">
//                         <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
//                             <i class="pi pi-user"></i>
//                             Informations utilisateur
//                         </h3>
                        
//                         <div class="flex flex-wrap gap-4">
//                             <div class="flex flex-col grow basis-0 gap-2">
//                                 <label for="nom_client" class="font-semibold text-900">
//                                     Nom <span class="text-red-500">*</span>
//                                 </label>
//                                 <input 
//                                     pInputText 
//                                     id="nom_client" 
//                                     type="text" 
//                                     [(ngModel)]="user.nom_client" 
//                                     name="nom_client"
//                                     placeholder="Ex: Dupont"
//                                     class="p-inputtext-lg" />
//                             </div>
                            
//                             <div class="flex flex-col grow basis-0 gap-2">
//                                 <label for="prenom_client" class="font-semibold text-900">
//                                     Prénom <span class="text-red-500">*</span>
//                                 </label>
//                                 <input 
//                                     pInputText 
//                                     id="prenom_client" 
//                                     type="text" 
//                                     [(ngModel)]="user.prenom_client" 
//                                     name="prenom_client"
//                                     placeholder="Ex: Jean"
//                                     class="p-inputtext-lg" />
//                             </div>

//                             <div class="flex flex-col grow basis-0 gap-2">
//                                 <label for="email" class="font-semibold text-900">
//                                     Email <span class="text-red-500">*</span>
//                                 </label>
//                                 <input 
//                                     pInputText 
//                                     id="email" 
//                                     type="email" 
//                                     [(ngModel)]="user.email" 
//                                     name="email"
//                                     placeholder="Ex: jean.dupont@gmail.com"
//                                     class="p-inputtext-lg" />
//                             </div>

//                             <div class="flex flex-col grow basis-0 gap-2">
//                                 <label for="pwd" class="font-semibold text-900">
//                                     Mot de passe <span class="text-red-500">*</span>
//                                 </label>
//                                 <div class="relative">
//                                     <input 
//                                         pInputText 
//                                         id="pwd" 
//                                         [type]="showPassword ? 'text' : 'password'" 
//                                         [(ngModel)]="user.pwd" 
//                                         name="pwd"
//                                         placeholder="••••••••"
//                                         class="p-inputtext-lg w-full pr-10" />
//                                     <i 
//                                         [class]="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" 
//                                         (click)="showPassword = !showPassword"
//                                         class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500">
//                                     </i>
//                                 </div>
//                             </div>

//                             <div class="flex flex-col grow basis-0 gap-2">
//                                 <label for="date_naissance" class="font-semibold text-900">
//                                     Date de naissance <span class="text-red-500">*</span>
//                                 </label>
//                                 <p-datePicker
//                                     type
//                                     id="date_naissance"
//                                     [(ngModel)]="user.date_naissance"
//                                     name="date_naissance"
//                                     dateFormat="dd/mm/yy"
//                                     placeholder="JJ/MM/AAAA"
//                                     styleClass="w-full">
//                                 </p-datePicker>
//                             </div>

//                             <div class="flex flex-col grow basis-0 gap-2">
//                                 <label for="numero_telephone" class="font-semibold text-900">
//                                     Numéro de téléphone <span class="text-red-500">*</span>
//                                 </label>
//                                 <input 
//                                     pInputText 
//                                     id="numero_telephone" 
//                                     type="tel" 
//                                     [(ngModel)]="user.numero_telephone" 
//                                     name="numero_telephone"
//                                     placeholder="Ex: +33 6 12 34 56 78"
//                                     class="p-inputtext-lg" />
//                             </div>

//                         </div>
//                     </div>

//                     <!-- Avatar utilisateur -->
//                     <div class="surface-50 border-round-lg p-4 mb-4">
//                         <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
//                             <i class="pi pi-user-circle"></i>
//                             Avatar utilisateur
//                         </h3>
                        
//                         <p-fileUpload
//                             (onSelect)="onAvatarSelected($event)"
//                             name="avatar"
//                             accept="image/*"
//                             [maxFileSize]="5000000"
//                             [showUploadButton]="false"
//                             [showCancelButton]="false"
//                             chooseLabel="Choisir un avatar"
//                             class="w-full">
//                             <ng-template pTemplate="content">
//                                 <div *ngIf="!selectedAvatar" class="text-center p-6 border-2 border-dashed surface-border border-round-lg">
//                                     <i class="pi pi-cloud-upload text-6xl text-400 mb-3"></i>
//                                     <p class="text-600 font-medium mb-2">
//                                         Glissez-déposez votre avatar ici
//                                     </p>
//                                     <p class="text-500 text-sm">
//                                         PNG, JPG jusqu'à 5MB
//                                     </p>
//                                 </div>
                                
//                                 <div *ngIf="selectedAvatar" class="flex justify-content-center p-4">
//                                     <div class="relative border-2 border-round-circle overflow-hidden hover:shadow-4 transition-all" style="width: 200px; height: 200px;">
//                                         <img [src]="selectedAvatar.objectURL" 
//                                             [alt]="selectedAvatar.name" 
//                                             class="w-full h-full object-cover">
                                        
//                                         <button 
//                                             type="button"
//                                             (click)="removeAvatar()"
//                                             class="absolute top-2 right-2 bg-red-500 text-white border-circle w-2rem h-2rem flex align-items-center justify-content-center hover:bg-red-600 transition-colors border-none cursor-pointer">
//                                             <i class="pi pi-times"></i>
//                                         </button>
                                        
//                                         <div class="absolute bottom-0 left-0 right-0 bg-black-alpha-60 text-white p-2">
//                                             <p class="text-xs truncate m-0">{{selectedAvatar.name}}</p>
//                                             <p class="text-xs text-300 m-0">{{formatFileSize(selectedAvatar.size)}}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </ng-template>
//                         </p-fileUpload>
//                     </div>


//                     <!-- Informations générales -->
//                     <div class="surface-50 border-round-lg p-4 mb-4">
//                         <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
//                             <i class="pi pi-info-circle"></i>
//                             Informations générales
//                         </h3>
                        
//                         <div class="flex flex-wrap gap-4">
//                             <div class="flex flex-col grow basis-0 gap-2">
//                                 <label for="name" class="font-semibold text-900">
//                                     Nom du boutique <span class="text-red-500">*</span>
//                                 </label>
//                                 <input 
//                                     pInputText 
//                                     id="name_boutique" 
//                                     type="text" 
//                                     [(ngModel)]="boutique.nom_boutique" 
//                                     name="nom_boutique"
//                                     placeholder="Ex: boutique KFC"
//                                     class="p-inputtext-lg" />
//                             </div>
                            
//                             <div class="flex flex-col grow basis-0 gap-2">
//                                 <label for="category" class="font-semibold text-900">
//                                     Catégorie du boutique <span class="text-red-500">*</span>
//                                 </label>
//                                 <p-select 
//                                     id="category"
//                                     [options]="categories" 
//                                     [(ngModel)]="boutique.categorie"
//                                     name="categorie"
//                                     optionLabel="name" 
//                                     optionValue="value"
//                                     placeholder="Sélectionnez une catégorie"
//                                     styleClass="w-full">
//                                 </p-select>
//                             </div>
//                         </div>
//                     </div>


                    
//         <!-- Horaires d'ouverture -->
//         <div class="surface-50 border-round-lg p-4 mb-4">
//             <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
//                 <i class="pi pi-clock"></i>
//                 Horaires d'ouverture
//             </h3>
            
//             <div class="bg-white border-round-lg p-4">
//                 <!-- Actions rapides -->
//                 <div class="flex flex-wrap gap-2 mb-4 pb-3 border-bottom-1 surface-border">
//                     <button 
//                         pButton 
//                         type="button"
//                         label="Ouvrir tous les jours" 
//                         icon="pi pi-check-circle"
//                         size="small"
//                         severity="success"
//                         [outlined]="true"
//                         (click)="setAllDaysOpen()">
//                     </button>
//                     <button 
//                         pButton 
//                         type="button"
//                         label="Dupliquer le lundi" 
//                         icon="pi pi-copy"
//                         size="small"
//                         severity="info"
//                         [outlined]="true"
//                         (click)="copyFirstDayToAll()">
//                     </button>
//                     <button 
//                         pButton 
//                         type="button"
//                         label="Fermer week-end" 
//                         icon="pi pi-times-circle"
//                         size="small"
//                         severity="warn"
//                         [outlined]="true"
//                         (click)="closeWeekend()">
//                     </button>
//                 </div>
                
//                 <!-- Liste des jours -->
//                 <div class="flex flex-col gap-2">
//                     <div *ngFor="let horaire of boutique.horaires; let i = index" 
//                         [class]="getHoraireCardClass(horaire)"
//                         class="p-3 border-round-lg transition-all duration-200">
                        
//                         <div class="flex flex-wrap align-items-center gap-3">
//                             <!-- Jour et checkbox -->
//                             <div class="flex align-items-center gap-3 min-w-10rem">
//                                 <p-checkbox 
//                                     [(ngModel)]="horaire.est_ferme"
//                                     [name]="'ferme_' + i"
//                                     [binary]="true"
//                                     (onChange)="onFermeChange(i)"
//                                     inputId="'cb_' + i">
//                                 </p-checkbox>
//                                 <label [for]="'cb_' + i" class="cursor-pointer select-none">
//                                     <div class="flex align-items-center gap-2">
//                                         <i [class]="getJourIcon(horaire.jour)" class="text-xl"></i>
//                                         <span class="font-semibold text-900">{{horaire.jour}}</span>
//                                     </div>
//                                 </label>
//                             </div>
                            
//                             <!-- Horaires ou message fermé -->
//                             <div class="flex-1 flex align-items-center gap-3">
//                                 <div *ngIf="!horaire.est_ferme" class="flex align-items-center gap-3 flex-1">
//                                     <!-- Ouverture -->
//                                     <div class="flex flex-col gap-1 flex-1 max-w-10rem">
//                                         <label class="text-xs text-500 font-medium uppercase">Ouverture</label>
//                                         <div class="p-inputgroup">
//                                             <span class="p-inputgroup-addon bg-primary-50">
//                                                 <i class="pi pi-sun text-primary"></i>
//                                             </span>
//                                             <input 
//                                                 pInputText 
//                                                 type="time"
//                                                 [(ngModel)]="horaire.ouverture"
//                                                 [name]="'ouverture_' + i"
//                                                 class="text-center font-semibold" />
//                                         </div>
//                                     </div>
                                    
//                                     <!-- Séparateur -->
//                                     <i class="pi pi-arrow-right text-400 text-xl mt-3"></i>
                                    
//                                     <!-- Fermeture -->
//                                     <div class="flex flex-col gap-1 flex-1 max-w-10rem">
//                                         <label class="text-xs text-500 font-medium uppercase">Fermeture</label>
//                                         <div class="p-inputgroup">
//                                             <span class="p-inputgroup-addon bg-orange-50">
//                                                 <i class="pi pi-moon text-orange-500"></i>
//                                             </span>
//                                             <input 
//                                                 pInputText 
//                                                 type="time"
//                                                 [(ngModel)]="horaire.fermeture"
//                                                 [name]="'fermeture_' + i"
//                                                 class="text-center font-semibold" />
//                                         </div>
//                                     </div>
//                                 </div>
                                
//                                 <!-- Message fermé -->
//                                 <div *ngIf="horaire.est_ferme" class="flex-1">
//                                     <div class="bg-red-50 border-1 border-red-200 border-round p-2 text-center">
//                                         <i class="pi pi-lock text-red-500 mr-2"></i>
//                                         <span class="text-red-600 font-semibold">Fermé toute la journée</span>
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             <!-- Badge statut -->
//                             <div class="min-w-7rem text-right">
//                                 <span *ngIf="horaire.est_ferme" 
//                                     class="inline-flex align-items-center gap-1 px-3 py-1 bg-red-100 text-red-700 border-round-full font-semibold text-sm">
//                                     <i class="pi pi-times-circle"></i>
//                                     Fermé
//                                 </span>
//                                 <span *ngIf="!horaire.est_ferme && horaire.ouverture && horaire.fermeture" 
//                                     class="inline-flex align-items-center gap-1 px-3 py-1 bg-green-100 text-green-700 border-round-full font-semibold text-sm">
//                                     <i class="pi pi-check-circle"></i>
//                                     Ouvert
//                                 </span>
//                                 <span *ngIf="!horaire.est_ferme && (!horaire.ouverture || !horaire.fermeture)" 
//                                     class="inline-flex align-items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 border-round-full font-semibold text-sm">
//                                     <i class="pi pi-exclamation-circle"></i>
//                                     Incomplet
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
                
//                 <!-- Info footer -->
//                 <div class="mt-4 p-3 bg-blue-50 border-1 border-blue-200 border-round-lg">
//                     <div class="flex align-items-start gap-2">
//                         <i class="pi pi-info-circle text-blue-500 mt-1"></i>
//                         <div class="text-sm text-700">
//                             <p class="m-0 mb-1 font-semibold">Conseils :</p>
//                             <ul class="m-0 pl-3 text-600">
//                                 <li>Cochez la case pour marquer un jour comme fermé</li>
//                                 <li>Utilisez les boutons rapides pour gagner du temps</li>
//                                 <li>Tous les horaires doivent être complétés pour les jours ouverts</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

                    

//                     <!-- Prix et stock -->
//                     <div class="surface-50 border-round-lg p-4 mb-4">
//                         <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
//                             <i class="pi pi-map-marker"></i>
//                             Localisation et loyer et comission
//                         </h3>
                        
//                         <div class="flex flex-wrap gap-4">
//                             <div class="flex flex-col grow basis-0 gap-2">
//                                 <label for="prix" class="font-semibold text-900">
//                                     Location <span class="text-red-500">*</span>
//                                 </label>
//                                 <input 
//                                     pInputText
//                                     id="location"
//                                     type="text"
//                                     [(ngModel)]="boutique.location" 
//                                     name="location"
//                                     step="0.01"
//                                     min="0"
//                                     placeholder="P-001-A"
//                                     class="p-inputtext-lg" />
//                             </div>
                            
//                             <div class="flex flex-col grow basis-0 gap-2">
//                                 <label for="stock" class="font-semibold text-900">
//                                     Loyer <span class="text-red-500">*</span>
//                                 </label>
//                                 <input 
//                                     pInputText
//                                     id="loyer"
//                                     type="number"
//                                     [(ngModel)]="boutique.loyer" 
//                                     name="loyer"
//                                     min="0"
//                                     placeholder="0"
//                                     class="p-inputtext-lg" />
//                             </div>

//                             <div class="flex flex-col grow basis-0 gap-2">
//                                 <label for="stock" class="font-semibold text-900">
//                                     Comission <span class="text-red-500">*</span>
//                                 </label>
//                                 <input 
//                                     pInputText
//                                     id="comission"
//                                     type="number"
//                                     [(ngModel)]="boutique.commission" 
//                                     name="commission"
//                                     min="0"
//                                     placeholder="0"
//                                     class="p-inputtext-lg" />
//                             </div>
//                         </div>
//                     </div>

//                     <!-- Description -->
//                     <div class="surface-50 border-round-lg p-4 mb-4">
//                         <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
//                             <i class="pi pi-align-left"></i>
//                             Description du boutique
//                         </h3>
                        
//                         <div class="flex flex-col gap-2">
//                             <label for="description" class="font-semibold text-900">
//                                 Description du boutique
//                             </label>
//                             <textarea
//                                 pTextarea
//                                 id="description"
//                                 [(ngModel)]="boutique.description"
//                                 name="description"
//                                 rows="6"
//                                 placeholder="Décrivez le boutique en détail..."
//                                 class="w-full"
//                                 [autoResize]="true">
//                             </textarea>
//                             <small class="text-500">Minimum 50 caractères recommandés</small>
//                         </div>
//                     </div>

//                     <!-- Photos boutique -->
                
//                     <div class="surface-50 border-round-lg p-4 mb-4">
//                     <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
//                         <i class="pi pi-images"></i>
//                         Photos boutique
//                     </h3>
                    
//                     <p-fileUpload
//                         #fileUpload
//                         (onSelect)="onPhotosSelected($event, fileUpload)"
//                         name="photos"
//                         accept="image/png,image/jpeg,image/jpg,image/webp"
//                         [maxFileSize]="52428800"
//                         [multiple]="true"
//                         [fileLimit]="3"
//                         [showUploadButton]="false"
//                         [showCancelButton]="false"
//                         chooseLabel="Choisir photos boutique"
//                         class="w-full">
//                         <ng-template pTemplate="content">
//                             <div *ngIf="!selectedPhotos || selectedPhotos.length === 0" 
//                                 class="text-center p-6 border-2 border-dashed surface-border border-round-lg">
//                                 <i class="pi pi-cloud-upload text-6xl text-400 mb-3"></i>
//                                 <p class="text-600 font-medium mb-2">
//                                     Glissez-déposez vos photos ici
//                                 </p>
//                                 <p class="text-500 text-sm">
//                                     PNG, JPG jusqu'à 5MB (max 3 photos)
//                                 </p>
//                             </div>
                            
//                             <div *ngIf="selectedPhotos && selectedPhotos.length > 0">
//                                 <div class="flex gap-3 p-4 overflow-x-auto border-2 border-dashed surface-border border-round-lg">
//                                     <div *ngFor="let photo of selectedPhotos; let i = index">
//                                         <div class="relative border-2 border-round overflow-hidden hover:shadow-4 transition-all" 
//                                             style="width: 200px; height: 200px;">
//                                             <img [src]="photo.objectURL" 
//                                                 [alt]="photo.name" 
//                                                 class="w-full h-full object-cover">
                                            
//                                             <button 
//                                                 type="button"
//                                                 (click)="removePhoto(i)"
//                                                 class="absolute top-2 right-2 bg-red-500 text-white border-circle w-2rem h-2rem flex align-items-center justify-content-center hover:bg-red-600 transition-colors border-none cursor-pointer">
//                                                 <i class="pi pi-times"></i>
//                                             </button>
                                            
//                                             <div class="absolute bottom-0 left-0 right-0 bg-black-alpha-60 text-white p-2">
//                                                 <p class="text-xs truncate m-0">{{photo.name}}</p>
//                                                 <p class="text-xs text-300 m-0">{{formatFileSize(photo.size)}}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <p class="text-sm text-500 mt-2">
//                                     <i class="pi pi-info-circle"></i> 
//                                     Cliquez sur "Choisir photos boutique" pour ajouter plus de photos ({{selectedPhotos.length}}/3)
//                                 </p>
//                             </div>
//                         </ng-template>
//                     </p-fileUpload>
//                 </div>
                   



//                     <!-- Logo boutique -->
//                     <div class="surface-50 border-round-lg p-4 mb-4">
//                         <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
//                             <i class="pi pi-image"></i>
//                             Logo du boutique
//                         </h3>
//                         <p-fileUpload
//                             (onSelect)="onLogoSelected($event)"
//                             name="avatar"
//                             accept="image/*"
//                             [maxFileSize]="5000000"
//                             [showUploadButton]="false"
//                             [showCancelButton]="false"
//                             chooseLabel="Choisir votre logo"
//                             class="w-full">
//                             <ng-template pTemplate="content">
//                                 <div *ngIf="!selectedLogo" class="text-center p-6 border-2 border-dashed surface-border border-round-lg">
//                                     <i class="pi pi-cloud-upload text-6xl text-400 mb-3"></i>
//                                     <p class="text-600 font-medium mb-2">
//                                         Glissez-déposez votre logo ici
//                                     </p>
//                                     <p class="text-500 text-sm">
//                                         PNG, JPG jusqu'à 5MB
//                                     </p>
//                                 </div>
                                
//                                 <div *ngIf="selectedLogo" class="flex justify-content-center p-4">
//                                     <div class="relative border-2 border-round-circle overflow-hidden hover:shadow-4 transition-all" style="width: 200px; height: 200px;">
//                                         <img [src]="selectedLogo.objectURL" 
//                                             [alt]="selectedLogo.name" 
//                                             class="w-full h-full object-cover">
                                        
//                                         <button 
//                                             type="button"
//                                             (click)="removeLogo()"
//                                             class="absolute top-2 right-2 bg-red-500 text-white border-circle w-2rem h-2rem flex align-items-center justify-content-center hover:bg-red-600 transition-colors border-none cursor-pointer">
//                                             <i class="pi pi-times"></i>
//                                         </button>
                                        
//                                         <div class="absolute bottom-0 left-0 right-0 bg-black-alpha-60 text-white p-2">
//                                             <p class="text-xs truncate m-0">{{selectedLogo.name}}</p>
//                                             <p class="text-xs text-300 m-0">{{formatFileSize(selectedLogo.size)}}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </ng-template>
//                         </p-fileUpload>
                       
//                     </div>

//                     <!-- Buttons -->
//                     <div class="flex justify-content-between align-items-center pt-4 border-top-1 surface-border">
//                         <button 
//                             pButton 
//                             label="Annuler" 
//                             icon="pi pi-times" 
//                             severity="secondary"
//                             [text]="true"
//                             type="button">
//                         </button>
//                         <button 
//                             pButton 
//                             label="Valider" 
//                             icon="pi pi-check" 
//                             size="large"
//                             type="submit"
//                             [loading]="isSubmitting">
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </div>
// </p-fluid>



// `
// })

// export class CreationBoutique{

//     boutique = {
//         nom_boutique:'',
//         categorie:'',
//         email_manager:'',
//         location:'',
//         loyer:'',
//         description:'',
//         photo_boutique:null as File | null,
//         boutique_logo:null as File | null,
//         horaires: [] as Horaire[],
//         commission:''
//     };

//     showPassword = false;
//     resetBoutiqueForm():void{
//         this.boutique ={
//         nom_boutique:'',
//         categorie:'',
//         email_manager:'',
//         location:'',
//         loyer:'',
//         description:'',
//         photo_boutique:null ,
//         boutique_logo:null ,
//         horaires: [] as Horaire[],
//         commission:''
//         };
//         this.initializeHoraires();
//         this.selectedPhotos = [];
//         this.selectedLogo = null;
//     }

//     user = {
//         //info user
//         nom_client: '',
//         prenom_client: '',
//         email: '',
//         pwd: '',
//         date_naissance: new Date(),
//         role: '',
//         numero_telephone: '',
//         avatarFile: null as File | null
//     }

//     resetUserForm(): void {
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


//     // resestBoutiqueForm():void{
//     //     this.boutique = {
//     //         nom_boutique:'',
//     //         categorie:'',
//     //         email_manager:'',
//     //         location:'',
//     //         loyer:'',
//     //         description:'',
//     //         photo_boutique:null as File | null,
//     //         boutique_logo:null as File | null,
//     //     }    
//     // }


//     selectedPhotos: any[] = []
//     selectedLogo: any ;
//     categories: any[] = [];
//     statuts: any[] = [];
//     selectedAvatar: any ;
//  isSubmitting: boolean = false;
//     constructor(
//         private userservice: UserService, 
//         private boutiqueService: BoutiqueService,
//         private router: Router,
//         private categorieService:CategorieService,
//         private StatusService:StatusService,
//         private messageService:MessageService
//     ) {}

//     ngOnInit() {
//         this.loadCategories();
//         this.initializeHoraires();
//     }

//     private addBoutiqueByAdmin(): void {
//         try {
            
        
//         const formData = new FormData();
        
//         formData.append('nom_boutique', this.boutique.nom_boutique);
//         formData.append('description_boutique', this.boutique.description);
//         formData.append('loyer', this.boutique.loyer);
//         formData.append('location', this.boutique.location);
//         formData.append('id_categorie', this.boutique.categorie);
        
//         // Ajouter les horaires
//         formData.append('horaires', JSON.stringify(this.boutique.horaires));
        

//         // ✅ Logo boutique
//         if (this.boutique.boutique_logo) {
//             formData.append('logo_boutique', this.boutique.boutique_logo, this.boutique.boutique_logo.name);
//         }
        
//         // ✅ Photos boutique - utiliser this.selectedPhotos au lieu de this.boutique.photo_boutique
//         if (this.selectedPhotos && this.selectedPhotos.length > 0) {
//             this.selectedPhotos.forEach((photo) => {
//                 formData.append('photo_boutique', photo.file, photo.file.name);
//             });
//         }
        
//         formData.append('commission',this.boutique.commission);

//         console.log('📤 Envoi de', this.selectedPhotos.length, 'photos');
        
//         this.boutiqueService.registerBoutiqueByAdminV1(formData).subscribe({
//             next: (res) => {
//                 console.log("Boutique créée", res);
//                 this.messageService.add({
//                     severity: 'success',
//                     summary: 'Succès',
//                     detail: 'Boutique créée avec succès',
//                      life: 5000
//                 });
//                 this.resetBoutiqueForm();
//                 this.isSubmitting = false;
//             },
//             error: (err) => {
//                 console.error("Erreur", err);
//                 this.messageService.add({
//                     severity: 'error',
//                     summary: 'Erreur',
//                     detail: 'Erreur lors de la création de la boutique',
//                      life: 5000
//                 });
//                 this.isSubmitting = false;
//             }
//         });

//         } catch (error) {
//             console.log(error);
            
//         }
//     }



//      private addManagerBoutique(): void {
//         const formData = new FormData();
        
//         // Ajouter les champs texte
//         formData.append('nom_client', this.user.nom_client);
//         formData.append('prenom_client', this.user.prenom_client);
//         formData.append('email', this.user.email);
//         formData.append('pwd', this.user.pwd);
//         formData.append('date_naissance', this.user.date_naissance.toISOString());
//         formData.append('role', "697b0d19b784b5da2ab3ba22");
//         formData.append('numero_telephone', this.user.numero_telephone);
//         formData.append('rememberMe', 'false');
        
//         // Ajouter l'avatar SI présent
//         if (this.user.avatarFile) {
//             formData.append('avatar', this.user.avatarFile, this.user.avatarFile.name);
//             console.log('Avatar ajouté au FormData:', this.user.avatarFile.name);
//         } else {
//             console.warn('Aucun avatar sélectionné');
//         }
        
//         // Envoyer directement le FormData
//         this.userservice.signUpByAddAdminFormData(formData).subscribe({
//             next: (res) => {
//                 console.log("Manager inséré avec succès", res);
//                 this.messageService.add({
//                     severity: 'success',
//                     summary: 'Manager créé',
//                     detail: 'Le manager a été créé avec succès',
//                     life: 3000
//                 });
//                 this.resetUserForm();
//             },
//             error: (err) => {
//                 console.error('Erreur lors de l\'ajout', err);
//                  this.messageService.add({
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
//                 // Adaptez selon la structure de votre réponse API
//                 this.categories = data.map((cat: any) => ({
//                     name: cat.nom,
//                     value: cat._id
//                 }));
//             },
//             error: (error) => {
//                 console.error('Erreur lors du chargement des catégories:', error);
//                 // Gardez les catégories par défaut en cas d'erreur
//                 this.categories = [
//                     { name: 'Électronique', value: 'electronique' },
//                     { name: 'Vêtements', value: 'vetements' },
//                     // ... etc
//                 ];
//             }
//         });  
//     }



//   onPhotosSelected(event: any, fileUpload: FileUpload): void {
//     if (event.currentFiles && event.currentFiles.length > 0) {
//         const newFiles: File[] = event.currentFiles;
        
//         // Vérifier limite max 3
//         if (this.selectedPhotos.length + newFiles.length > 3) {
//             this.messageService.add({
//                 severity: 'error',
//                 summary: 'Limite dépassée',
//                 detail: 'Vous ne pouvez sélectionner que 3 photos maximum'
//             });
//             fileUpload.clear();
//             return;
//         }
        
//         newFiles.forEach((file: File) => {
//             // Vérifier taille (50MB)
//             if (file.size > 52428800) {
//                 this.messageService.add({
//                     severity: 'error',
//                     summary: 'Fichier trop volumineux',
//                     detail: `${file.name} dépasse 50MB`
//                 });
//                 return;
//             }
            
//             const reader = new FileReader();
//             reader.onload = (e: any) => {
//                 this.selectedPhotos.push({
//                     file: file,
//                     name: file.name,
//                     size: file.size,
//                     objectURL: e.target.result
//                 });
//             };
//             reader.readAsDataURL(file);
//         });
        
//         console.log('Photos sélectionnées:', this.selectedPhotos.length);
//         fileUpload.clear();
//     }
// }
    



// removePhoto(index: number) {
//     this.selectedPhotos.splice(index, 1);
//     this.selectedPhotos = [...this.selectedPhotos]; // Pour déclencher la détection de changement
// }
//     // Gestion de l'avatar
//     onAvatarSelected(event: any): void {
//         if (event.currentFiles && event.currentFiles.length > 0) {
//             const file = event.currentFiles[0];
            
//             // Stocker le fichier directement
//             this.user.avatarFile = file;
            
//             // Créer l'aperçu
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


//     // // Pour le logo unique
//     onLogoSelected(event: any) {
        
//         if (event.currentFiles && event.currentFiles.length > 0) {
//             const file = event.currentFiles[0];
            
//             // Stocker le fichier directement
//             this.boutique.boutique_logo = file;
            
//             // Créer l'aperçu
//             const reader = new FileReader();
//             reader.onload = (e: any) => {
//                 this.selectedLogo = {
//                     name: file.name,
//                     size: file.size,
//                     objectURL: e.target.result
//                 };
//             };
//             reader.readAsDataURL(file);
            
//             console.log('Fichier avatar sélectionné:', file.name, file.size);
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


//      private initializeHoraires(): void {
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

// interface Horaire {
//     jour: string;
//     ouverture: string;
//     fermeture: string;
//     est_ferme: boolean;
// }

// @Component({
//     selector: 'app-creationBoutique',
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
//         CheckboxModule
//     ],
//     providers: [MessageService],
//     template: `
// <p-toast></p-toast>

// <div class="page-wrapper">

//     <!-- LEFT SIDEBAR -->
//     <aside class="sidebar">
//         <div class="sidebar-brand">
//             <div class="brand-icon"><i class="pi pi-shop"></i></div>
//             <div>
//                 <p class="brand-title">Nouvelle boutique</p>
//                 <p class="brand-sub">Formulaire de création</p>
//             </div>
//         </div>

//         <nav class="sidebar-nav">
//             <a class="nav-item" [class.active]="activeSection === 'user'" (click)="scrollTo('user')">
//                 <span class="nav-dot"></span>
//                 <i class="pi pi-user"></i>
//                 <span>Utilisateur</span>
//             </a>
//             <a class="nav-item" [class.active]="activeSection === 'avatar'" (click)="scrollTo('avatar')">
//                 <span class="nav-dot"></span>
//                 <i class="pi pi-user-circle"></i>
//                 <span>Avatar</span>
//             </a>
//             <a class="nav-item" [class.active]="activeSection === 'info'" (click)="scrollTo('info')">
//                 <span class="nav-dot"></span>
//                 <i class="pi pi-info-circle"></i>
//                 <span>Informations</span>
//             </a>
//             <a class="nav-item" [class.active]="activeSection === 'horaires'" (click)="scrollTo('horaires')">
//                 <span class="nav-dot"></span>
//                 <i class="pi pi-clock"></i>
//                 <span>Horaires</span>
//             </a>
//             <a class="nav-item" [class.active]="activeSection === 'location'" (click)="scrollTo('location')">
//                 <span class="nav-dot"></span>
//                 <i class="pi pi-map-marker"></i>
//                 <span>Localisation</span>
//             </a>
//             <a class="nav-item" [class.active]="activeSection === 'desc'" (click)="scrollTo('desc')">
//                 <span class="nav-dot"></span>
//                 <i class="pi pi-align-left"></i>
//                 <span>Description</span>
//             </a>
//             <a class="nav-item" [class.active]="activeSection === 'photos'" (click)="scrollTo('photos')">
//                 <span class="nav-dot"></span>
//                 <i class="pi pi-images"></i>
//                 <span>Photos</span>
//             </a>
//             <a class="nav-item" [class.active]="activeSection === 'logo'" (click)="scrollTo('logo')">
//                 <span class="nav-dot"></span>
//                 <i class="pi pi-image"></i>
//                 <span>Logo</span>
//             </a>
//         </nav>

//         <div class="sidebar-footer">
//             <button pButton label="Créer la boutique" icon="pi pi-check" type="submit"
//                 form="mainForm" [loading]="isSubmitting" class="btn-submit-side">
//             </button>
//             <button pButton label="Annuler" icon="pi pi-times" severity="secondary"
//                 [text]="true" type="button" class="btn-cancel-side">
//             </button>
//         </div>
//     </aside>

//     <!-- RIGHT CONTENT -->
//     <main class="main-content">
//     <form id="mainForm" (ngSubmit)="addBoutique()">

//         <!-- SECTION: Informations utilisateur -->
//         <div class="form-card" id="user">
//             <div class="section-header">
//                 <div class="section-icon user-icon">
//                     <i class="pi pi-user"></i>
//                 </div>
//                 <div>
//                     <h3 class="section-title">Informations utilisateur</h3>
//                     <p class="section-desc">Données du manager de la boutique</p>
//                 </div>
//             </div>

//             <div class="fields-grid">
//                 <div class="field-group">
//                     <label class="field-label">Nom <span class="required">*</span></label>
//                     <div class="input-wrap">
//                         <i class="pi pi-id-card input-icon"></i>
//                         <input pInputText type="text" [(ngModel)]="user.nom_client" name="nom_client"
//                             placeholder="Ex: Dupont" class="styled-input" />
//                     </div>
//                 </div>

//                 <div class="field-group">
//                     <label class="field-label">Prénom <span class="required">*</span></label>
//                     <div class="input-wrap">
//                         <i class="pi pi-id-card input-icon"></i>
//                         <input pInputText type="text" [(ngModel)]="user.prenom_client" name="prenom_client"
//                             placeholder="Ex: Jean" class="styled-input" />
//                     </div>
//                 </div>

//                 <div class="field-group">
//                     <label class="field-label">Email <span class="required">*</span></label>
//                     <div class="input-wrap">
//                         <i class="pi pi-envelope input-icon"></i>
//                         <input pInputText type="email" [(ngModel)]="user.email" name="email"
//                             placeholder="jean.dupont@gmail.com" class="styled-input" />
//                     </div>
//                 </div>

//                 <div class="field-group">
//                     <label class="field-label">Mot de passe <span class="required">*</span></label>
//                     <div class="input-wrap">
//                         <i class="pi pi-lock input-icon"></i>
//                         <input pInputText [type]="showPassword ? 'text' : 'password'"
//                             [(ngModel)]="user.pwd" name="pwd" placeholder="••••••••"
//                             class="styled-input" style="padding-right: 2.75rem;" />
//                         <i [class]="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
//                             (click)="showPassword = !showPassword" class="input-icon-right"></i>
//                     </div>
//                 </div>

//                 <div class="field-group">
//                     <label class="field-label">Date de naissance <span class="required">*</span></label>
//                     <div class="input-wrap datepicker-wrap">
//                         <i class="pi pi-calendar input-icon"></i>
//                         <p-datePicker [(ngModel)]="user.date_naissance" name="date_naissance"
//                             dateFormat="dd/mm/yy" placeholder="JJ/MM/AAAA" styleClass="w-full styled-datepicker">
//                         </p-datePicker>
//                     </div>
//                 </div>

//                 <div class="field-group">
//                     <label class="field-label">Téléphone <span class="required">*</span></label>
//                     <div class="input-wrap">
//                         <i class="pi pi-phone input-icon"></i>
//                         <input pInputText type="tel" [(ngModel)]="user.numero_telephone" name="numero_telephone"
//                             placeholder="+33 6 12 34 56 78" class="styled-input" />
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <!-- SECTION: Avatar utilisateur -->
//         <div class="form-card" id="avatar">
//             <div class="section-header">
//                 <div class="section-icon avatar-icon">
//                     <i class="pi pi-user-circle"></i>
//                 </div>
//                 <div>
//                     <h3 class="section-title">Avatar utilisateur</h3>
//                     <p class="section-desc">Photo de profil du manager</p>
//                 </div>
//             </div>

//             <p-fileUpload (onSelect)="onAvatarSelected($event)" name="avatar" accept="image/*"
//                 [maxFileSize]="5000000" [showUploadButton]="false" [showCancelButton]="false"
//                 chooseLabel="Choisir un avatar" styleClass="custom-upload">
//                 <ng-template pTemplate="content">
//                     <div *ngIf="!selectedAvatar" class="upload-zone">
//                         <div class="upload-zone-inner">
//                             <div class="upload-icon-wrap">
//                                 <i class="pi pi-cloud-upload"></i>
//                             </div>
//                             <p class="upload-title">Glissez-déposez votre avatar ici</p>
//                             <p class="upload-hint">PNG, JPG jusqu'à 5MB</p>
//                         </div>
//                     </div>

//                     <div *ngIf="selectedAvatar" class="preview-container">
//                         <div class="preview-circle">
//                             <img [src]="selectedAvatar.objectURL" [alt]="selectedAvatar.name"
//                                 class="preview-img" />
//                             <button type="button" (click)="removeAvatar()" class="remove-btn">
//                                 <i class="pi pi-times"></i>
//                             </button>
//                         </div>
//                         <div class="preview-meta">
//                             <p class="preview-name">{{ selectedAvatar.name }}</p>
//                             <p class="preview-size">{{ formatFileSize(selectedAvatar.size) }}</p>
//                         </div>
//                     </div>
//                 </ng-template>
//             </p-fileUpload>
//         </div>

//         <!-- SECTION: Informations générales -->
//         <div class="form-card" id="info">
//             <div class="section-header">
//                 <div class="section-icon info-icon">
//                     <i class="pi pi-info-circle"></i>
//                 </div>
//                 <div>
//                     <h3 class="section-title">Informations générales</h3>
//                     <p class="section-desc">Nom et catégorie de la boutique</p>
//                 </div>
//             </div>

//             <div class="fields-grid">
//                 <div class="field-group">
//                     <label class="field-label">Nom de la boutique <span class="required">*</span></label>
//                     <div class="input-wrap">
//                         <i class="pi pi-shop input-icon"></i>
//                         <input pInputText type="text" [(ngModel)]="boutique.nom_boutique" name="nom_boutique"
//                             placeholder="Ex: boutique KFC" class="styled-input" />
//                     </div>
//                 </div>

//                 <div class="field-group">
//                     <label class="field-label">Catégorie <span class="required">*</span></label>
//                     <p-select [options]="categories" [(ngModel)]="boutique.categorie" name="categorie"
//                         optionLabel="name" optionValue="value" placeholder="Sélectionnez une catégorie"
//                         styleClass="w-full styled-select">
//                     </p-select>
//                 </div>
//             </div>
//         </div>

//         <!-- SECTION: Horaires d'ouverture -->
//         <div class="form-card" id="horaires">
//             <div class="section-header">
//                 <div class="section-icon clock-icon">
//                     <i class="pi pi-clock"></i>
//                 </div>
//                 <div>
//                     <h3 class="section-title">Horaires d'ouverture</h3>
//                     <p class="section-desc">Définissez les plages horaires de la boutique</p>
//                 </div>
//             </div>

//             <!-- Quick actions -->
//             <div class="quick-actions">
//                 <button pButton type="button" label="Ouvrir tous les jours" icon="pi pi-check-circle"
//                     size="small" severity="success" [outlined]="true" (click)="setAllDaysOpen()" class="quick-btn">
//                 </button>
//                 <button pButton type="button" label="Dupliquer lundi" icon="pi pi-copy"
//                     size="small" severity="info" [outlined]="true" (click)="copyFirstDayToAll()" class="quick-btn">
//                 </button>
//                 <button pButton type="button" label="Fermer week-end" icon="pi pi-times-circle"
//                     size="small" severity="warn" [outlined]="true" (click)="closeWeekend()" class="quick-btn">
//                 </button>
//             </div>

//             <!-- Jours -->
//             <div class="horaires-list">
//                 <div *ngFor="let horaire of boutique.horaires; let i = index"
//                     [class]="'horaire-row ' + getHoraireRowClass(horaire)">

//                     <!-- Checkbox + Jour -->
//                     <div class="jour-cell">
//                         <p-checkbox [(ngModel)]="horaire.est_ferme" [name]="'ferme_' + i"
//                             [binary]="true" (onChange)="onFermeChange(i)" [inputId]="'cb_' + i">
//                         </p-checkbox>
//                         <label [for]="'cb_' + i" class="jour-label">
//                             <i [class]="getJourIcon(horaire.jour)"></i>
//                             <span>{{ horaire.jour }}</span>
//                         </label>
//                     </div>

//                     <!-- Horaires inputs -->
//                     <div class="horaires-inputs">
//                         <div *ngIf="!horaire.est_ferme" class="time-inputs">
//                             <div class="time-field">
//                                 <span class="time-label">
//                                     <i class="pi pi-sun"></i> Ouverture
//                                 </span>
//                                 <input pInputText type="time" [(ngModel)]="horaire.ouverture"
//                                     [name]="'ouverture_' + i" class="time-input" />
//                             </div>
//                             <i class="pi pi-arrow-right time-sep"></i>
//                             <div class="time-field">
//                                 <span class="time-label">
//                                     <i class="pi pi-moon"></i> Fermeture
//                                 </span>
//                                 <input pInputText type="time" [(ngModel)]="horaire.fermeture"
//                                     [name]="'fermeture_' + i" class="time-input" />
//                             </div>
//                         </div>

//                         <div *ngIf="horaire.est_ferme" class="ferme-msg">
//                             <i class="pi pi-lock"></i>
//                             <span>Fermé toute la journée</span>
//                         </div>
//                     </div>

//                     <!-- Badge statut -->
//                     <div class="status-badge-wrap">
//                         <span *ngIf="horaire.est_ferme" class="status-badge badge-ferme">
//                             <i class="pi pi-times-circle"></i> Fermé
//                         </span>
//                         <span *ngIf="!horaire.est_ferme && horaire.ouverture && horaire.fermeture"
//                             class="status-badge badge-ouvert">
//                             <i class="pi pi-check-circle"></i> Ouvert
//                         </span>
//                         <span *ngIf="!horaire.est_ferme && (!horaire.ouverture || !horaire.fermeture)"
//                             class="status-badge badge-incomplet">
//                             <i class="pi pi-exclamation-circle"></i> Incomplet
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             <div class="info-tip">
//                 <i class="pi pi-info-circle"></i>
//                 <span>Cochez la case pour marquer un jour comme fermé. Tous les jours ouverts doivent avoir des horaires complets.</span>
//             </div>
//         </div>

//         <!-- SECTION: Localisation, loyer & commission -->
//         <div class="form-card" id="location">
//             <div class="section-header">
//                 <div class="section-icon location-icon">
//                     <i class="pi pi-map-marker"></i>
//                 </div>
//                 <div>
//                     <h3 class="section-title">Localisation & Financier</h3>
//                     <p class="section-desc">Emplacement, loyer et commission de la boutique</p>
//                 </div>
//             </div>

//             <div class="fields-grid">
//                 <div class="field-group">
//                     <label class="field-label">Location <span class="required">*</span></label>
//                     <div class="input-wrap">
//                         <i class="pi pi-map-marker input-icon"></i>
//                         <input pInputText type="text" [(ngModel)]="boutique.location" name="location"
//                             placeholder="P-001-A" class="styled-input" />
//                     </div>
//                 </div>

//                 <div class="field-group">
//                     <label class="field-label">Loyer <span class="required">*</span></label>
//                     <div class="input-wrap">
//                         <i class="pi pi-dollar input-icon"></i>
//                         <input pInputText type="number" [(ngModel)]="boutique.loyer" name="loyer"
//                             min="0" placeholder="0" class="styled-input" />
//                     </div>
//                 </div>

//                 <div class="field-group">
//                     <label class="field-label">Commission <span class="required">*</span></label>
//                     <div class="input-wrap">
//                         <i class="pi pi-percentage input-icon"></i>
//                         <input pInputText type="number" [(ngModel)]="boutique.commission" name="commission"
//                             min="0" placeholder="0" class="styled-input" />
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <!-- SECTION: Description -->
//         <div class="form-card" id="desc">
//             <div class="section-header">
//                 <div class="section-icon desc-icon">
//                     <i class="pi pi-align-left"></i>
//                 </div>
//                 <div>
//                     <h3 class="section-title">Description</h3>
//                     <p class="section-desc">Présentation détaillée de la boutique</p>
//                 </div>
//             </div>

//             <div class="field-group full-width">
//                 <label class="field-label">Description de la boutique</label>
//                 <textarea pTextarea [(ngModel)]="boutique.description" name="description"
//                     rows="5" placeholder="Décrivez la boutique en détail..." class="styled-textarea w-full"
//                     [autoResize]="true">
//                 </textarea>
//                 <small class="field-hint">Minimum 50 caractères recommandés</small>
//             </div>
//         </div>

//         <!-- SECTION: Photos boutique -->
//         <div class="form-card" id="photos">
//             <div class="section-header">
//                 <div class="section-icon photos-icon">
//                     <i class="pi pi-images"></i>
//                 </div>
//                 <div>
//                     <h3 class="section-title">Photos boutique</h3>
//                     <p class="section-desc">Jusqu'à 3 photos pour illustrer la boutique</p>
//                 </div>
//             </div>

//             <p-fileUpload #fileUpload (onSelect)="onPhotosSelected($event, fileUpload)" name="photos"
//                 accept="image/png,image/jpeg,image/jpg,image/webp" [maxFileSize]="52428800"
//                 [multiple]="true" [fileLimit]="3" [showUploadButton]="false" [showCancelButton]="false"
//                 chooseLabel="Choisir photos" styleClass="custom-upload">
//                 <ng-template pTemplate="content">
//                     <div *ngIf="!selectedPhotos || selectedPhotos.length === 0" class="upload-zone">
//                         <div class="upload-zone-inner">
//                             <div class="upload-icon-wrap">
//                                 <i class="pi pi-images"></i>
//                             </div>
//                             <p class="upload-title">Glissez-déposez vos photos ici</p>
//                             <p class="upload-hint">PNG, JPG jusqu'à 50MB (max 3 photos)</p>
//                         </div>
//                     </div>

//                     <div *ngIf="selectedPhotos && selectedPhotos.length > 0">
//                         <div class="photos-grid">
//                             <div *ngFor="let photo of selectedPhotos; let i = index" class="photo-card">
//                                 <img [src]="photo.objectURL" [alt]="photo.name" class="photo-img" />
//                                 <button type="button" (click)="removePhoto(i)" class="remove-btn-sm">
//                                     <i class="pi pi-times"></i>
//                                 </button>
//                                 <div class="photo-overlay">
//                                     <p class="photo-name">{{ photo.name }}</p>
//                                     <p class="photo-size">{{ formatFileSize(photo.size) }}</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <p class="photos-count-hint">
//                             <i class="pi pi-info-circle"></i>
//                             {{ selectedPhotos.length }}/3 photos sélectionnées
//                         </p>
//                     </div>
//                 </ng-template>
//             </p-fileUpload>
//         </div>

//         <!-- SECTION: Logo boutique -->
//         <div class="form-card" id="logo">
//             <div class="section-header">
//                 <div class="section-icon logo-icon">
//                     <i class="pi pi-image"></i>
//                 </div>
//                 <div>
//                     <h3 class="section-title">Logo boutique</h3>
//                     <p class="section-desc">Logo officiel affiché sur le profil de la boutique</p>
//                 </div>
//             </div>

//             <p-fileUpload (onSelect)="onLogoSelected($event)" name="logo" accept="image/*"
//                 [maxFileSize]="5000000" [showUploadButton]="false" [showCancelButton]="false"
//                 chooseLabel="Choisir le logo" styleClass="custom-upload">
//                 <ng-template pTemplate="content">
//                     <div *ngIf="!selectedLogo" class="upload-zone">
//                         <div class="upload-zone-inner">
//                             <div class="upload-icon-wrap">
//                                 <i class="pi pi-image"></i>
//                             </div>
//                             <p class="upload-title">Glissez-déposez le logo ici</p>
//                             <p class="upload-hint">PNG, JPG jusqu'à 5MB</p>
//                         </div>
//                     </div>

//                     <div *ngIf="selectedLogo" class="preview-container">
//                         <div class="preview-circle">
//                             <img [src]="selectedLogo.objectURL" [alt]="selectedLogo.name" class="preview-img" />
//                             <button type="button" (click)="removeLogo()" class="remove-btn">
//                                 <i class="pi pi-times"></i>
//                             </button>
//                         </div>
//                         <div class="preview-meta">
//                             <p class="preview-name">{{ selectedLogo.name }}</p>
//                             <p class="preview-size">{{ formatFileSize(selectedLogo.size) }}</p>
//                         </div>
//                     </div>
//                 </ng-template>
//             </p-fileUpload>
//         </div>

//         </form>
//     </main>

// </div>
//     `,
//     styles: [`
//         :host {
//             --primary: #f59e0b;
//             --primary-dark: #d97706;
//             --primary-light: #fef3c7;
//             --card: #ffffff;
//             --text-900: #0f172a;
//             --text-700: #334155;
//             --text-600: #475569;
//             --text-400: #94a3b8;
//             --border: #e2e8f0;
//             --border-100: #f8fafc;
//             --shadow: 0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04);
//             --sidebar-w: 240px;
//         }

//         /* ─── Page Wrapper: sidebar + content ─── */
//         .page-wrapper {
//             display: flex;
//             min-height: 100vh;
//             background: var(--border-100);
//         }

//         /* ─── SIDEBAR ─── */
//         .sidebar {
//             width: var(--sidebar-w);
//             flex-shrink: 0;
//             background: var(--card);
//             border-right: 1px solid var(--border);
//             display: flex;
//             flex-direction: column;
//             position: sticky;
//             top: 0;
//             height: 100vh;
//             overflow-y: auto;
//             box-shadow: 2px 0 12px rgba(15,23,42,0.05);
//         }

//         .sidebar-brand {
//             display: flex;
//             align-items: center;
//             gap: 0.75rem;
//             padding: 1.5rem 1.25rem;
//             border-bottom: 1px solid var(--border);
//             background: linear-gradient(135deg, #fffbeb 0%, #fff 100%);
//         }

//         .brand-icon {
//             width: 40px;
//             height: 40px;
//             background: var(--primary);
//             border-radius: 0.75rem;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             box-shadow: 0 4px 10px rgba(245,158,11,0.3);
//             flex-shrink: 0;
//         }

//         .brand-icon i { color: #fff; font-size: 1.1rem; }

//         .brand-title {
//             font-weight: 700;
//             font-size: 0.9rem;
//             color: var(--text-900);
//             margin: 0 0 0.15rem;
//             line-height: 1.2;
//         }

//         .brand-sub {
//             font-size: 0.72rem;
//             color: var(--text-400);
//             margin: 0;
//         }

//         /* ─── Sidebar Nav ─── */
//         .sidebar-nav {
//             flex: 1;
//             padding: 1rem 0.75rem;
//             display: flex;
//             flex-direction: column;
//             gap: 0.25rem;
//         }

//         .nav-item {
//             display: flex;
//             align-items: center;
//             gap: 0.75rem;
//             padding: 0.625rem 0.875rem;
//             border-radius: 0.625rem;
//             cursor: pointer;
//             font-size: 0.85rem;
//             font-weight: 500;
//             color: var(--text-600);
//             text-decoration: none;
//             transition: all 0.15s;
//             position: relative;
//         }

//         .nav-item:hover {
//             background: var(--border-100);
//             color: var(--text-900);
//         }

//         .nav-item.active {
//             background: var(--primary-light);
//             color: var(--primary-dark);
//             font-weight: 700;
//         }

//         .nav-item i { font-size: 0.9rem; flex-shrink: 0; }

//         .nav-dot {
//             width: 6px;
//             height: 6px;
//             border-radius: 50%;
//             background: var(--border);
//             flex-shrink: 0;
//             margin-left: auto;
//             transition: background 0.15s;
//         }

//         .nav-item.active .nav-dot { background: var(--primary); }

//         /* ─── Sidebar Footer ─── */
//         .sidebar-footer {
//             padding: 1rem 0.75rem 1.5rem;
//             border-top: 1px solid var(--border);
//             display: flex;
//             flex-direction: column;
//             gap: 0.5rem;
//         }

//         ::ng-deep .btn-submit-side.p-button {
//             width: 100% !important;
//             background: var(--primary) !important;
//             border-color: var(--primary) !important;
//             font-weight: 700 !important;
//             font-size: 0.875rem !important;
//             border-radius: 0.625rem !important;
//             box-shadow: 0 4px 10px rgba(245,158,11,0.25) !important;
//             justify-content: center !important;
//         }

//         ::ng-deep .btn-submit-side.p-button:enabled:hover {
//             background: var(--primary-dark) !important;
//             border-color: var(--primary-dark) !important;
//         }

//         ::ng-deep .btn-cancel-side.p-button {
//             width: 100% !important;
//             color: var(--text-400) !important;
//             font-size: 0.8rem !important;
//             justify-content: center !important;
//         }

//         /* ─── MAIN CONTENT ─── */
//         .main-content {
//             flex: 1;
//             padding: 2rem 2.5rem;
//             overflow-y: auto;
//             min-width: 0;
//         }

//         /* ─── Form Cards ─── */
//         .form-card {
//             background: var(--card);
//             border-radius: 1rem;
//             border: 1px solid var(--border);
//             box-shadow: var(--shadow);
//             padding: 1.75rem;
//             margin-bottom: 1.5rem;
//             scroll-margin-top: 1.5rem;
//         }

//         /* ─── Section Header ─── */
//         .section-header {
//             display: flex;
//             align-items: center;
//             gap: 1rem;
//             margin-bottom: 1.5rem;
//             padding-bottom: 1.25rem;
//             border-bottom: 1px solid var(--border);
//         }

//         .section-icon {
//             width: 40px;
//             height: 40px;
//             border-radius: 0.625rem;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 1rem;
//             flex-shrink: 0;
//         }

//         .section-icon i { color: #fff; }

//         .user-icon     { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
//         .avatar-icon   { background: linear-gradient(135deg, #8b5cf6, #6d28d9); }
//         .info-icon     { background: linear-gradient(135deg, #0ea5e9, #0369a1); }
//         .clock-icon    { background: linear-gradient(135deg, #10b981, #059669); }
//         .location-icon { background: linear-gradient(135deg, #f59e0b, #d97706); }
//         .desc-icon     { background: linear-gradient(135deg, #6366f1, #4338ca); }
//         .photos-icon   { background: linear-gradient(135deg, #ec4899, #be185d); }
//         .logo-icon     { background: linear-gradient(135deg, #f97316, #c2410c); }

//         .section-title {
//             font-size: 1rem;
//             font-weight: 700;
//             color: var(--text-900);
//             margin: 0 0 0.2rem;
//         }

//         .section-desc {
//             font-size: 0.78rem;
//             color: var(--text-400);
//             margin: 0;
//         }

//         /* ─── Fields Grid ─── */
//         .fields-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
//             gap: 1.25rem;
//         }

//         .field-group {
//             display: flex;
//             flex-direction: column;
//             gap: 0.5rem;
//         }

//         .full-width { grid-column: 1 / -1; }

//         .field-label {
//             font-size: 0.75rem;
//             font-weight: 600;
//             color: var(--text-700);
//             text-transform: uppercase;
//             letter-spacing: 0.04em;
//         }

//         .required { color: #ef4444; }
//         .field-hint { font-size: 0.78rem; color: var(--text-400); margin-top: 0.25rem; }

//         /* ─── Inputs ─── */
//         .input-wrap { position: relative; display: flex; align-items: center; }

//         .input-icon {
//             position: absolute;
//             left: 0.875rem;
//             color: var(--text-400);
//             font-size: 0.85rem;
//             pointer-events: none;
//             z-index: 1;
//         }

//         .input-icon-right {
//             position: absolute;
//             right: 0.875rem;
//             color: var(--text-400);
//             font-size: 0.9rem;
//             cursor: pointer;
//             z-index: 1;
//             transition: color 0.15s;
//         }

//         .input-icon-right:hover { color: var(--primary); }

//         .styled-input {
//             width: 100%;
//             padding: 0.65rem 1rem 0.65rem 2.5rem !important;
//             border: 1px solid var(--border) !important;
//             border-radius: 0.625rem !important;
//             background: var(--border-100) !important;
//             color: var(--text-900) !important;
//             font-size: 0.875rem !important;
//             transition: border-color 0.15s, box-shadow 0.15s, background 0.15s !important;
//         }

//         .styled-input:focus {
//             outline: none !important;
//             border-color: var(--primary) !important;
//             box-shadow: 0 0 0 3px rgba(245,158,11,0.12) !important;
//             background: #fff !important;
//         }

//         .styled-input::placeholder { color: var(--text-400) !important; }

//         .styled-textarea {
//             padding: 0.75rem 1rem !important;
//             border: 1px solid var(--border) !important;
//             border-radius: 0.625rem !important;
//             background: var(--border-100) !important;
//             color: var(--text-900) !important;
//             font-size: 0.875rem !important;
//             resize: vertical;
//             transition: border-color 0.15s, box-shadow 0.15s !important;
//         }

//         .styled-textarea:focus {
//             outline: none !important;
//             border-color: var(--primary) !important;
//             box-shadow: 0 0 0 3px rgba(245,158,11,0.12) !important;
//             background: #fff !important;
//         }

//         .datepicker-wrap { display: block; }

//         ::ng-deep .styled-datepicker .p-datepicker-input,
//         ::ng-deep .styled-datepicker input {
//             padding-left: 2.5rem !important;
//             border: 1px solid var(--border) !important;
//             border-radius: 0.625rem !important;
//             background: var(--border-100) !important;
//         }

//         ::ng-deep .styled-select .p-select {
//             border: 1px solid var(--border) !important;
//             border-radius: 0.625rem !important;
//             background: var(--border-100) !important;
//         }

//         ::ng-deep .styled-select .p-select.p-focus {
//             border-color: var(--primary) !important;
//             box-shadow: 0 0 0 3px rgba(245,158,11,0.12) !important;
//         }

//         /* ─── Upload Zone ─── */
//         ::ng-deep .custom-upload .p-fileupload-choose {
//             background: #fff !important;
//             border: 1px solid var(--primary) !important;
//             color: var(--primary) !important;
//             border-radius: 0.625rem !important;
//             font-weight: 600 !important;
//             font-size: 0.875rem !important;
//             padding: 0.55rem 1.1rem !important;
//             transition: all 0.15s !important;
//             margin-bottom: 1rem;
//         }

//         ::ng-deep .custom-upload .p-fileupload-choose:hover {
//             background: var(--primary) !important;
//             color: #fff !important;
//         }

//         ::ng-deep .custom-upload .p-fileupload-content {
//             border: none !important;
//             padding: 0 !important;
//             background: transparent !important;
//         }

//         ::ng-deep .custom-upload .p-fileupload-header {
//             border: none !important;
//             padding: 0 0 0.5rem !important;
//             background: transparent !important;
//         }

//         .upload-zone {
//             border: 2px dashed var(--border);
//             border-radius: 0.875rem;
//             background: var(--border-100);
//             transition: border-color 0.2s, background 0.2s;
//             cursor: pointer;
//         }

//         .upload-zone:hover { border-color: var(--primary); background: #fffbeb; }

//         .upload-zone-inner {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             padding: 2.5rem 1rem;
//             gap: 0.5rem;
//         }

//         .upload-icon-wrap {
//             width: 52px;
//             height: 52px;
//             background: #fff;
//             border: 1px solid var(--border);
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             margin-bottom: 0.5rem;
//             box-shadow: var(--shadow);
//         }

//         .upload-icon-wrap i { font-size: 1.4rem; color: var(--primary); }
//         .upload-title { font-weight: 600; color: var(--text-700); margin: 0; font-size: 0.875rem; }
//         .upload-hint { color: var(--text-400); font-size: 0.78rem; margin: 0; }

//         /* ─── Preview ─── */
//         .preview-container {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             gap: 0.75rem;
//             padding: 1rem 0;
//         }

//         .preview-circle {
//             position: relative;
//             width: 130px;
//             height: 130px;
//             border-radius: 50%;
//             overflow: hidden;
//             border: 3px solid var(--primary);
//             box-shadow: 0 4px 16px rgba(245,158,11,0.25);
//         }

//         .preview-img { width: 100%; height: 100%; object-fit: cover; }

//         .remove-btn {
//             position: absolute;
//             top: 5px;
//             right: 5px;
//             width: 24px;
//             height: 24px;
//             background: #ef4444;
//             color: #fff;
//             border: none;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             cursor: pointer;
//             font-size: 0.68rem;
//         }

//         .remove-btn:hover { background: #dc2626; }

//         .preview-meta { text-align: center; }
//         .preview-name { font-size: 0.82rem; font-weight: 600; color: var(--text-700); margin: 0 0 0.15rem; }
//         .preview-size { font-size: 0.75rem; color: var(--text-400); margin: 0; }

//         /* ─── Photos Grid ─── */
//         .photos-grid {
//             display: flex;
//             gap: 1rem;
//             flex-wrap: wrap;
//             padding: 1rem;
//             border: 2px dashed var(--border);
//             border-radius: 0.875rem;
//             background: var(--border-100);
//         }

//         .photo-card {
//             position: relative;
//             width: 150px;
//             height: 150px;
//             border-radius: 0.75rem;
//             overflow: hidden;
//             border: 2px solid var(--border);
//             box-shadow: var(--shadow);
//         }

//         .photo-img { width: 100%; height: 100%; object-fit: cover; display: block; }

//         .remove-btn-sm {
//             position: absolute;
//             top: 5px;
//             right: 5px;
//             width: 24px;
//             height: 24px;
//             background: #ef4444;
//             color: #fff;
//             border: none;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             cursor: pointer;
//             font-size: 0.68rem;
//         }

//         .remove-btn-sm:hover { background: #dc2626; }

//         .photo-overlay {
//             position: absolute;
//             bottom: 0;
//             left: 0;
//             right: 0;
//             background: rgba(15,23,42,0.7);
//             padding: 0.35rem 0.5rem;
//         }

//         .photo-name, .photo-size {
//             color: #fff;
//             font-size: 0.7rem;
//             margin: 0;
//             white-space: nowrap;
//             overflow: hidden;
//             text-overflow: ellipsis;
//         }

//         .photos-count-hint {
//             font-size: 0.78rem;
//             color: var(--text-400);
//             margin-top: 0.625rem;
//             display: flex;
//             align-items: center;
//             gap: 0.4rem;
//         }

//         /* ─── Horaires ─── */
//         .quick-actions {
//             display: flex;
//             flex-wrap: wrap;
//             gap: 0.5rem;
//             margin-bottom: 1.25rem;
//             padding-bottom: 1.25rem;
//             border-bottom: 1px solid var(--border);
//         }

//         .horaires-list {
//             display: flex;
//             flex-direction: column;
//             gap: 0.4rem;
//             margin-bottom: 1rem;
//         }

//         .horaire-row {
//             display: flex;
//             flex-wrap: wrap;
//             align-items: center;
//             gap: 1rem;
//             padding: 0.75rem 1rem;
//             border-radius: 0.625rem;
//             border: 1px solid transparent;
//             transition: all 0.15s;
//         }

//         .horaire-open { background: #f0fdf4; border-color: #bbf7d0; }
//         .horaire-ferme { background: #fef2f2; border-color: #fecaca; }
//         .horaire-incomplet { background: #fffbeb; border-color: #fed7aa; }

//         .jour-cell {
//             display: flex;
//             align-items: center;
//             gap: 0.75rem;
//             min-width: 130px;
//         }

//         .jour-label {
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//             font-weight: 600;
//             color: var(--text-900);
//             cursor: pointer;
//             user-select: none;
//             font-size: 0.875rem;
//         }

//         .horaires-inputs { flex: 1; }

//         .time-inputs {
//             display: flex;
//             align-items: center;
//             gap: 0.75rem;
//             flex-wrap: wrap;
//         }

//         .time-field { display: flex; flex-direction: column; gap: 0.2rem; }

//         .time-label {
//             font-size: 0.67rem;
//             color: var(--text-400);
//             font-weight: 600;
//             text-transform: uppercase;
//             letter-spacing: 0.04em;
//             display: flex;
//             align-items: center;
//             gap: 0.25rem;
//         }

//         .time-input {
//             padding: 0.45rem 0.7rem !important;
//             border: 1px solid var(--border) !important;
//             border-radius: 0.5rem !important;
//             background: #fff !important;
//             color: var(--text-900) !important;
//             font-weight: 600 !important;
//             font-size: 0.85rem !important;
//             width: 120px;
//         }

//         .time-input:focus {
//             outline: none !important;
//             border-color: var(--primary) !important;
//             box-shadow: 0 0 0 2px rgba(245,158,11,0.15) !important;
//         }

//         .time-sep { color: var(--text-400); font-size: 0.8rem; margin-top: 1rem; }

//         .ferme-msg {
//             display: inline-flex;
//             align-items: center;
//             gap: 0.5rem;
//             background: #fef2f2;
//             border: 1px solid #fecaca;
//             border-radius: 0.5rem;
//             padding: 0.45rem 0.875rem;
//             color: #ef4444;
//             font-weight: 600;
//             font-size: 0.82rem;
//         }

//         .status-badge-wrap { min-width: 90px; text-align: right; }

//         .status-badge {
//             display: inline-flex;
//             align-items: center;
//             gap: 0.25rem;
//             padding: 0.25rem 0.7rem;
//             border-radius: 9999px;
//             font-weight: 600;
//             font-size: 0.75rem;
//         }

//         .badge-ferme { background: #fee2e2; color: #dc2626; }
//         .badge-ouvert { background: #dcfce7; color: #16a34a; }
//         .badge-incomplet { background: #ffedd5; color: #ea580c; }

//         .info-tip {
//             display: flex;
//             align-items: flex-start;
//             gap: 0.5rem;
//             background: #eff6ff;
//             border: 1px solid #bfdbfe;
//             border-radius: 0.625rem;
//             padding: 0.75rem 1rem;
//             font-size: 0.8rem;
//             color: #1d4ed8;
//         }

//         .info-tip i { margin-top: 0.1rem; flex-shrink: 0; }

//         /* ─── Responsive ─── */
//         @media (max-width: 900px) {
//             .page-wrapper { flex-direction: column; }
//             .sidebar {
//                 width: 100%;
//                 height: auto;
//                 position: static;
//                 flex-direction: row;
//                 flex-wrap: wrap;
//                 padding: 0.75rem;
//             }
//             .sidebar-brand { border-bottom: none; padding: 0.5rem; }
//             .sidebar-nav { flex-direction: row; flex-wrap: wrap; padding: 0.25rem; gap: 0.25rem; }
//             .sidebar-footer { flex-direction: row; border-top: none; padding: 0.5rem; }
//             .main-content { padding: 1rem; }
//             .fields-grid { grid-template-columns: 1fr; }
//         }
//     `]
// })
// export class CreationBoutique {

//     boutique = {
//         nom_boutique: '',
//         categorie: '',
//         email_manager: '',
//         location: '',
//         loyer: '',
//         description: '',
//         photo_boutique: null as File | null,
//         boutique_logo: null as File | null,
//         horaires: [] as Horaire[],
//         commission: ''
//     };

//     showPassword = false;

//     resetBoutiqueForm(): void {
//         this.boutique = {
//             nom_boutique: '',
//             categorie: '',
//             email_manager: '',
//             location: '',
//             loyer: '',
//             description: '',
//             photo_boutique: null,
//             boutique_logo: null,
//             horaires: [] as Horaire[],
//             commission: ''
//         };
//         this.initializeHoraires();
//         this.selectedPhotos = [];
//         this.selectedLogo = null;
//     }

//     user = {
//         nom_client: '',
//         prenom_client: '',
//         email: '',
//         pwd: '',
//         date_naissance: new Date(),
//         role: '',
//         numero_telephone: '',
//         avatarFile: null as File | null
//     };

//     resetUserForm(): void {
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

//     selectedPhotos: any[] = [];
//     selectedLogo: any;
//     categories: any[] = [];
//     statuts: any[] = [];
//     selectedAvatar: any;
//     isSubmitting: boolean = false;
//     activeSection: string = 'user';

//     scrollTo(sectionId: string): void {
//         this.activeSection = sectionId;
//         const el = document.getElementById(sectionId);
//         if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }

//     constructor(
//         private userservice: UserService,
//         private boutiqueService: BoutiqueService,
//         private router: Router,
//         private categorieService: CategorieService,
//         private StatusService: StatusService,
//         private messageService: MessageService
//     ) {}

//     ngOnInit() {
//         this.loadCategories();
//         this.initializeHoraires();
//     }

//     private addBoutiqueByAdmin(): void {
//         try {
//             const formData = new FormData();
//             formData.append('nom_boutique', this.boutique.nom_boutique);
//             formData.append('description_boutique', this.boutique.description);
//             formData.append('loyer', this.boutique.loyer);
//             formData.append('location', this.boutique.location);
//             formData.append('id_categorie', this.boutique.categorie);
//             formData.append('horaires', JSON.stringify(this.boutique.horaires));

//             if (this.boutique.boutique_logo) {
//                 formData.append('logo_boutique', this.boutique.boutique_logo, this.boutique.boutique_logo.name);
//             }

//             if (this.selectedPhotos && this.selectedPhotos.length > 0) {
//                 this.selectedPhotos.forEach((photo) => {
//                     formData.append('photo_boutique', photo.file, photo.file.name);
//                 });
//             }

//             formData.append('commission', this.boutique.commission);

//             this.boutiqueService.registerBoutiqueByAdminV1(formData).subscribe({
//                 next: (res) => {
//                     this.messageService.add({
//                         severity: 'success',
//                         summary: 'Succès',
//                         detail: 'Boutique créée avec succès',
//                         life: 5000
//                     });
//                     this.resetBoutiqueForm();
//                     this.isSubmitting = false;
//                 },
//                 error: (err) => {
//                     this.messageService.add({
//                         severity: 'error',
//                         summary: 'Erreur',
//                         detail: 'Erreur lors de la création de la boutique',
//                         life: 5000
//                     });
//                     this.isSubmitting = false;
//                 }
//             });
//         } catch (error) {
//             console.log(error);
//         }
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
//         }

//         this.userservice.signUpByAddAdminFormData(formData).subscribe({
//             next: (res) => {
//                 this.messageService.add({
//                     severity: 'success',
//                     summary: 'Manager créé',
//                     detail: 'Le manager a été créé avec succès',
//                     life: 3000
//                 });
//                 this.resetUserForm();
//             },
//             error: (err) => {
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
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         await this.addBoutiqueByAdmin();
//     }

//     loadCategories() {
//         this.categorieService.getAllCategorie().subscribe({
//             next: (data) => {
//                 this.categories = data.map((cat: any) => ({
//                     name: cat.nom,
//                     value: cat._id
//                 }));
//             },
//             error: (error) => {
//                 this.categories = [
//                     { name: 'Électronique', value: 'electronique' },
//                     { name: 'Vêtements', value: 'vetements' },
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
//                 this.selectedAvatar = { name: file.name, size: file.size, objectURL: e.target.result };
//             };
//             reader.readAsDataURL(file);
//         }
//     }

//     onLogoSelected(event: any) {
//         if (event.currentFiles && event.currentFiles.length > 0) {
//             const file = event.currentFiles[0];
//             this.boutique.boutique_logo = file;
//             const reader = new FileReader();
//             reader.onload = (e: any) => {
//                 this.selectedLogo = { name: file.name, size: file.size, objectURL: e.target.result };
//             };
//             reader.readAsDataURL(file);
//         }
//     }

//     removeLogo() {
//         this.selectedLogo = null;
//         this.boutique.boutique_logo = null;
//     }

//     removeAvatar(): void {
//         this.selectedAvatar = null;
//         this.user.avatarFile = null;
//     }

//     formatFileSize(bytes: number): string {
//         if (bytes === 0) return '0 Bytes';
//         const k = 1024;
//         const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//         const i = Math.floor(Math.log(bytes) / Math.log(k));
//         return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
//     }

//     private initializeHoraires(): void {
//         const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
//         this.boutique.horaires = jours.map(jour => ({
//             jour,
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
//         this.boutique.horaires.forEach(h => {
//             h.est_ferme = false; h.ouverture = '09:00'; h.fermeture = '18:00';
//         });
//         this.messageService.add({ severity: 'success', summary: 'Mis à jour', detail: 'Tous les jours ouverts de 09:00 à 18:00', life: 2000 });
//     }

//     copyFirstDayToAll(): void {
//         const first = this.boutique.horaires[0];
//         this.boutique.horaires.forEach((h, i) => {
//             if (i !== 0) { h.ouverture = first.ouverture; h.fermeture = first.fermeture; h.est_ferme = first.est_ferme; }
//         });
//         this.messageService.add({ severity: 'success', summary: 'Copié', detail: 'Horaires du lundi appliqués à tous', life: 2000 });
//     }

//     closeWeekend(): void {
//         this.boutique.horaires.forEach(h => {
//             if (h.jour === 'Samedi' || h.jour === 'Dimanche') {
//                 h.est_ferme = true; h.ouverture = ''; h.fermeture = '';
//             }
//         });
//         this.messageService.add({ severity: 'success', summary: 'Week-end fermé', detail: 'Samedi et dimanche marqués comme fermés', life: 2000 });
//     }

//     getHoraireRowClass(horaire: Horaire): string {
//         if (horaire.est_ferme) return 'horaire-ferme';
//         if (horaire.ouverture && horaire.fermeture) return 'horaire-open';
//         return 'horaire-incomplet';
//     }

//     getJourIcon(jour: string): string {
//         const icons: { [key: string]: string } = {
//             'Lundi': 'pi pi-calendar text-blue-500',
//             'Mardi': 'pi pi-calendar text-cyan-500',
//             'Mercredi': 'pi pi-calendar text-green-500',
//             'Jeudi': 'pi pi-calendar text-yellow-500',
//             'Vendredi': 'pi pi-calendar text-orange-500',
//             'Samedi': 'pi pi-calendar text-purple-500',
//             'Dimanche': 'pi pi-calendar text-red-500'
//         };
//         return icons[jour] || 'pi pi-calendar';
//     }
// }


import { Component } from "@angular/core";
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

interface Horaire {
    jour: string;
    ouverture: string;
    fermeture: string;
    est_ferme: boolean;
}

@Component({
    selector: 'app-creationBoutique',
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
        CheckboxModule
    ],
    providers: [MessageService],
    template: `
<p-toast></p-toast>

<div class="page-wrapper">

    <!-- LEFT SIDEBAR -->
    <aside class="sidebar">
        <div class="sidebar-brand">
            <div class="brand-icon"><i class="pi pi-shop"></i></div>
            <div>
                <p class="brand-title">Nouvelle boutique</p>
                <p class="brand-sub">Formulaire de création</p>
            </div>
        </div>

        <nav class="sidebar-nav">
            <a class="nav-item" [class.active]="activeSection === 'user'" (click)="scrollTo('user')">
                <span class="nav-dot"></span>
                <i class="pi pi-user"></i>
                <span>Utilisateur</span>
            </a>
            <a class="nav-item" [class.active]="activeSection === 'avatar'" (click)="scrollTo('avatar')">
                <span class="nav-dot"></span>
                <i class="pi pi-user-circle"></i>
                <span>Avatar</span>
            </a>
            <a class="nav-item" [class.active]="activeSection === 'info'" (click)="scrollTo('info')">
                <span class="nav-dot"></span>
                <i class="pi pi-info-circle"></i>
                <span>Informations</span>
            </a>
            <a class="nav-item" [class.active]="activeSection === 'horaires'" (click)="scrollTo('horaires')">
                <span class="nav-dot"></span>
                <i class="pi pi-clock"></i>
                <span>Horaires</span>
            </a>
            <a class="nav-item" [class.active]="activeSection === 'location'" (click)="scrollTo('location')">
                <span class="nav-dot"></span>
                <i class="pi pi-map-marker"></i>
                <span>Localisation</span>
            </a>
            <a class="nav-item" [class.active]="activeSection === 'desc'" (click)="scrollTo('desc')">
                <span class="nav-dot"></span>
                <i class="pi pi-align-left"></i>
                <span>Description</span>
            </a>
            <a class="nav-item" [class.active]="activeSection === 'photos'" (click)="scrollTo('photos')">
                <span class="nav-dot"></span>
                <i class="pi pi-images"></i>
                <span>Photos</span>
            </a>
            <a class="nav-item" [class.active]="activeSection === 'logo'" (click)="scrollTo('logo')">
                <span class="nav-dot"></span>
                <i class="pi pi-image"></i>
                <span>Logo</span>
            </a>
        </nav>

        <div class="sidebar-footer">
            <button pButton label="Créer la boutique" icon="pi pi-check" type="submit"
                form="mainForm" [loading]="isSubmitting" class="btn-submit-side">
            </button>
            <button pButton label="Annuler" icon="pi pi-times" severity="secondary"
                [text]="true" type="button" class="btn-cancel-side">
            </button>
        </div>
    </aside>

    <!-- RIGHT CONTENT -->
    <main class="main-content">
    <form id="mainForm" (ngSubmit)="addBoutique()">

        <!-- SECTION: Informations utilisateur -->
        <div class="form-card" id="user">
            <div class="section-header">
                <div class="section-icon user-icon">
                    <i class="pi pi-user"></i>
                </div>
                <div>
                    <h3 class="section-title">Informations utilisateur</h3>
                    <p class="section-desc">Données du manager de la boutique</p>
                </div>
            </div>

            <div class="fields-grid">
                <div class="field-group">
                    <label class="field-label">Nom <span class="required">*</span></label>
                    <div class="input-wrap">
                        <i class="pi pi-id-card input-icon"></i>
                        <input pInputText type="text" [(ngModel)]="user.nom_client" name="nom_client"
                            placeholder="Ex: Dupont" class="styled-input" />
                    </div>
                </div>

                <div class="field-group">
                    <label class="field-label">Prénom <span class="required">*</span></label>
                    <div class="input-wrap">
                        <i class="pi pi-id-card input-icon"></i>
                        <input pInputText type="text" [(ngModel)]="user.prenom_client" name="prenom_client"
                            placeholder="Ex: Jean" class="styled-input" />
                    </div>
                </div>

                <div class="field-group">
                    <label class="field-label">Email <span class="required">*</span></label>
                    <div class="input-wrap">
                        <i class="pi pi-envelope input-icon"></i>
                        <input pInputText type="email" [(ngModel)]="user.email" name="email"
                            placeholder="jean.dupont@gmail.com" class="styled-input" />
                    </div>
                </div>

                <div class="field-group">
                    <label class="field-label">Mot de passe <span class="required">*</span></label>
                    <div class="input-wrap">
                        <i class="pi pi-lock input-icon"></i>
                        <input pInputText [type]="showPassword ? 'text' : 'password'"
                            [(ngModel)]="user.pwd" name="pwd" placeholder="••••••••"
                            class="styled-input" style="padding-right: 2.75rem;" />
                        <i [class]="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
                            (click)="showPassword = !showPassword" class="input-icon-right"></i>
                    </div>
                </div>

                <div class="field-group">
                    <label class="field-label">Date de naissance <span class="required">*</span></label>
                    <div class="datepicker-wrap">
                        <i class="pi pi-calendar input-icon" style="z-index:2; pointer-events:none;"></i>
                        <p-datePicker [(ngModel)]="user.date_naissance" name="date_naissance"
                            dateFormat="dd/mm/yy" placeholder="JJ/MM/AAAA" styleClass="w-full styled-datepicker">
                        </p-datePicker>
                    </div>
                </div>

                <div class="field-group">
                    <label class="field-label">Téléphone <span class="required">*</span></label>
                    <div class="input-wrap">
                        <i class="pi pi-phone input-icon"></i>
                        <input pInputText type="tel" [(ngModel)]="user.numero_telephone" name="numero_telephone"
                            placeholder="+33 6 12 34 56 78" class="styled-input" />
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION: Avatar utilisateur -->
        <div class="form-card" id="avatar">
            <div class="section-header">
                <div class="section-icon avatar-icon">
                    <i class="pi pi-user-circle"></i>
                </div>
                <div>
                    <h3 class="section-title">Avatar utilisateur</h3>
                    <p class="section-desc">Photo de profil du manager</p>
                </div>
            </div>

            <p-fileUpload (onSelect)="onAvatarSelected($event)" name="avatar" accept="image/*"
                [maxFileSize]="5000000" [showUploadButton]="false" [showCancelButton]="false"
                chooseLabel="Choisir un avatar" styleClass="custom-upload">
                <ng-template pTemplate="content">
                    <div *ngIf="!selectedAvatar" class="upload-zone">
                        <div class="upload-zone-inner">
                            <div class="upload-icon-wrap">
                                <i class="pi pi-cloud-upload"></i>
                            </div>
                            <p class="upload-title">Glissez-déposez votre avatar ici</p>
                            <p class="upload-hint">PNG, JPG jusqu'à 5MB</p>
                        </div>
                    </div>

                    <div *ngIf="selectedAvatar" class="preview-container">
                        <div class="preview-circle">
                            <img [src]="selectedAvatar.objectURL" [alt]="selectedAvatar.name"
                                class="preview-img" />
                            <button type="button" (click)="removeAvatar()" class="remove-btn">
                                <i class="pi pi-times"></i>
                            </button>
                        </div>
                        <div class="preview-meta">
                            <p class="preview-name">{{ selectedAvatar.name }}</p>
                            <p class="preview-size">{{ formatFileSize(selectedAvatar.size) }}</p>
                        </div>
                    </div>
                </ng-template>
            </p-fileUpload>
        </div>

        <!-- SECTION: Informations générales -->
        <div class="form-card" id="info">
            <div class="section-header">
                <div class="section-icon info-icon">
                    <i class="pi pi-info-circle"></i>
                </div>
                <div>
                    <h3 class="section-title">Informations générales</h3>
                    <p class="section-desc">Nom et catégorie de la boutique</p>
                </div>
            </div>

            <div class="fields-grid">
                <div class="field-group">
                    <label class="field-label">Nom de la boutique <span class="required">*</span></label>
                    <div class="input-wrap">
                        <i class="pi pi-shop input-icon"></i>
                        <input pInputText type="text" [(ngModel)]="boutique.nom_boutique" name="nom_boutique"
                            placeholder="Ex: boutique KFC" class="styled-input" />
                    </div>
                </div>

                <div class="field-group">
                    <label class="field-label">Catégorie <span class="required">*</span></label>
                    <p-select [options]="categories" [(ngModel)]="boutique.categorie" name="categorie"
                        optionLabel="name" optionValue="value" placeholder="Sélectionnez une catégorie"
                        styleClass="w-full styled-select">
                    </p-select>
                </div>
            </div>
        </div>

        <!-- SECTION: Horaires d'ouverture -->
        <div class="form-card" id="horaires">
            <div class="section-header">
                <div class="section-icon clock-icon">
                    <i class="pi pi-clock"></i>
                </div>
                <div>
                    <h3 class="section-title">Horaires d'ouverture</h3>
                    <p class="section-desc">Définissez les plages horaires de la boutique</p>
                </div>
            </div>

            <!-- Quick actions -->
            <div class="quick-actions">
                <button pButton type="button" label="Ouvrir tous les jours" icon="pi pi-check-circle"
                    size="small" severity="success" [outlined]="true" (click)="setAllDaysOpen()" class="quick-btn">
                </button>
                <button pButton type="button" label="Dupliquer lundi" icon="pi pi-copy"
                    size="small" severity="info" [outlined]="true" (click)="copyFirstDayToAll()" class="quick-btn">
                </button>
                <button pButton type="button" label="Fermer week-end" icon="pi pi-times-circle"
                    size="small" severity="warn" [outlined]="true" (click)="closeWeekend()" class="quick-btn">
                </button>
            </div>

            <!-- Jours -->
            <div class="horaires-list">
                <div *ngFor="let horaire of boutique.horaires; let i = index"
                    [class]="'horaire-row ' + getHoraireRowClass(horaire)">

                    <!-- Checkbox + Jour -->
                    <div class="jour-cell">
                        <p-checkbox [(ngModel)]="horaire.est_ferme" [name]="'ferme_' + i"
                            [binary]="true" (onChange)="onFermeChange(i)" [inputId]="'cb_' + i">
                        </p-checkbox>
                        <label [for]="'cb_' + i" class="jour-label">
                            <i [class]="getJourIcon(horaire.jour)"></i>
                            <span>{{ horaire.jour }}</span>
                        </label>
                    </div>

                    <!-- Horaires inputs -->
                    <div class="horaires-inputs">
                        <div *ngIf="!horaire.est_ferme" class="time-inputs">
                            <div class="time-field">
                                <span class="time-label">
                                    <i class="pi pi-sun"></i> Ouverture
                                </span>
                                <input pInputText type="time" [(ngModel)]="horaire.ouverture"
                                    [name]="'ouverture_' + i" class="time-input" />
                            </div>
                            <i class="pi pi-arrow-right time-sep"></i>
                            <div class="time-field">
                                <span class="time-label">
                                    <i class="pi pi-moon"></i> Fermeture
                                </span>
                                <input pInputText type="time" [(ngModel)]="horaire.fermeture"
                                    [name]="'fermeture_' + i" class="time-input" />
                            </div>
                        </div>

                        <div *ngIf="horaire.est_ferme" class="ferme-msg">
                            <i class="pi pi-lock"></i>
                            <span>Fermé toute la journée</span>
                        </div>
                    </div>

                    <!-- Badge statut -->
                    <div class="status-badge-wrap">
                        <span *ngIf="horaire.est_ferme" class="status-badge badge-ferme">
                            <i class="pi pi-times-circle"></i> Fermé
                        </span>
                        <span *ngIf="!horaire.est_ferme && horaire.ouverture && horaire.fermeture"
                            class="status-badge badge-ouvert">
                            <i class="pi pi-check-circle"></i> Ouvert
                        </span>
                        <span *ngIf="!horaire.est_ferme && (!horaire.ouverture || !horaire.fermeture)"
                            class="status-badge badge-incomplet">
                            <i class="pi pi-exclamation-circle"></i> Incomplet
                        </span>
                    </div>
                </div>
            </div>

            <div class="info-tip">
                <i class="pi pi-info-circle"></i>
                <span>Cochez la case pour marquer un jour comme fermé. Tous les jours ouverts doivent avoir des horaires complets.</span>
            </div>
        </div>

        <!-- SECTION: Localisation, loyer & commission 
        <div class="form-card" id="location">
            <div class="section-header">
                <div class="section-icon location-icon">
                    <i class="pi pi-map-marker"></i>
                </div>
                <div>
                    <h3 class="section-title">Localisation & Financier</h3>
                    <p class="section-desc">Emplacement, loyer et commission de la boutique</p>
                </div>
            </div>

            <div class="fields-grid">
                <div class="field-group">
                    <label class="field-label">Location <span class="required">*</span></label>
                    <div class="input-wrap">
                        <i class="pi pi-map-marker input-icon"></i>
                        <input pInputText type="text" [(ngModel)]="boutique.location" name="location"
                            placeholder="P-001-A" class="styled-input" />
                    </div>
                </div>

                <div class="field-group">
                    <label class="field-label">Loyer <span class="required">*</span></label>
                    <div class="input-wrap">
                        <i class="pi pi-dollar input-icon"></i>
                        <input pInputText type="number" [(ngModel)]="boutique.loyer" name="loyer"
                            min="0" placeholder="0" class="styled-input" />
                    </div>
                </div>

                <div class="field-group">
                    <label class="field-label">Commission <span class="required">*</span></label>
                    <div class="input-wrap">
                        <i class="pi pi-percentage input-icon"></i>
                        <input pInputText type="number" [(ngModel)]="boutique.commission" name="commission"
                            min="0" placeholder="0" class="styled-input" />
                    </div>
                </div>
            </div>
        </div>
        -->

        <!-- SECTION: Description -->
        <div class="form-card" id="desc">
            <div class="section-header">
                <div class="section-icon desc-icon">
                    <i class="pi pi-align-left"></i>
                </div>
                <div>
                    <h3 class="section-title">Description</h3>
                    <p class="section-desc">Présentation détaillée de la boutique</p>
                </div>
            </div>

            <div class="field-group full-width">
                <label class="field-label">Description de la boutique</label>
                <textarea pTextarea [(ngModel)]="boutique.description" name="description"
                    rows="5" placeholder="Décrivez la boutique en détail..." class="styled-textarea w-full"
                    [autoResize]="true">
                </textarea>
                <small class="field-hint">Minimum 50 caractères recommandés</small>
            </div>
        </div>

        <!-- SECTION: Photos boutique -->
        <div class="form-card" id="photos">
            <div class="section-header">
                <div class="section-icon photos-icon">
                    <i class="pi pi-images"></i>
                </div>
                <div>
                    <h3 class="section-title">Photos boutique</h3>
                    <p class="section-desc">Jusqu'à 3 photos pour illustrer la boutique</p>
                </div>
            </div>

            <p-fileUpload #fileUpload (onSelect)="onPhotosSelected($event, fileUpload)" name="photos"
                accept="image/png,image/jpeg,image/jpg,image/webp" [maxFileSize]="52428800"
                [multiple]="true" [fileLimit]="3" [showUploadButton]="false" [showCancelButton]="false"
                chooseLabel="Choisir photos" styleClass="custom-upload">
                <ng-template pTemplate="content">
                    <div *ngIf="!selectedPhotos || selectedPhotos.length === 0" class="upload-zone">
                        <div class="upload-zone-inner">
                            <div class="upload-icon-wrap">
                                <i class="pi pi-images"></i>
                            </div>
                            <p class="upload-title">Glissez-déposez vos photos ici</p>
                            <p class="upload-hint">PNG, JPG jusqu'à 50MB (max 3 photos)</p>
                        </div>
                    </div>

                    <div *ngIf="selectedPhotos && selectedPhotos.length > 0">
                        <div class="photos-grid">
                            <div *ngFor="let photo of selectedPhotos; let i = index" class="photo-card">
                                <img [src]="photo.objectURL" [alt]="photo.name" class="photo-img" />
                                <button type="button" (click)="removePhoto(i)" class="remove-btn-sm">
                                    <i class="pi pi-times"></i>
                                </button>
                                <div class="photo-overlay">
                                    <p class="photo-name">{{ photo.name }}</p>
                                    <p class="photo-size">{{ formatFileSize(photo.size) }}</p>
                                </div>
                            </div>
                        </div>
                        <p class="photos-count-hint">
                            <i class="pi pi-info-circle"></i>
                            {{ selectedPhotos.length }}/3 photos sélectionnées
                        </p>
                    </div>
                </ng-template>
            </p-fileUpload>
        </div>

        <!-- SECTION: Logo boutique -->
        <div class="form-card" id="logo">
            <div class="section-header">
                <div class="section-icon logo-icon">
                    <i class="pi pi-image"></i>
                </div>
                <div>
                    <h3 class="section-title">Logo boutique</h3>
                    <p class="section-desc">Logo officiel affiché sur le profil de la boutique</p>
                </div>
            </div>

            <p-fileUpload (onSelect)="onLogoSelected($event)" name="logo" accept="image/*"
                [maxFileSize]="5000000" [showUploadButton]="false" [showCancelButton]="false"
                chooseLabel="Choisir le logo" styleClass="custom-upload">
                <ng-template pTemplate="content">
                    <div *ngIf="!selectedLogo" class="upload-zone">
                        <div class="upload-zone-inner">
                            <div class="upload-icon-wrap">
                                <i class="pi pi-image"></i>
                            </div>
                            <p class="upload-title">Glissez-déposez le logo ici</p>
                            <p class="upload-hint">PNG, JPG jusqu'à 5MB</p>
                        </div>
                    </div>

                    <div *ngIf="selectedLogo" class="preview-container">
                        <div class="preview-circle">
                            <img [src]="selectedLogo.objectURL" [alt]="selectedLogo.name" class="preview-img" />
                            <button type="button" (click)="removeLogo()" class="remove-btn">
                                <i class="pi pi-times"></i>
                            </button>
                        </div>
                        <div class="preview-meta">
                            <p class="preview-name">{{ selectedLogo.name }}</p>
                            <p class="preview-size">{{ formatFileSize(selectedLogo.size) }}</p>
                        </div>
                    </div>
                </ng-template>
            </p-fileUpload>
        </div>

        </form>
    </main>

</div>
    `,
    styles: [`
        :host {
            --primary: #f59e0b;
            --primary-dark: #d97706;
            --primary-light: #fef3c7;
            --card: #ffffff;
            --text-900: #0f172a;
            --text-700: #334155;
            --text-600: #475569;
            --text-400: #94a3b8;
            --border: #e2e8f0;
            --border-100: #f8fafc;
            --shadow: 0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04);
            --sidebar-w: 240px;
        }

        /* ─── Page Wrapper: sidebar + content ─── */
        .page-wrapper {
            display: flex;
            min-height: 100vh;
            background: var(--border-100);
        }

        /* ─── SIDEBAR ─── */
        .sidebar {
            width: var(--sidebar-w);
            flex-shrink: 0;
            background: var(--card);
            border-right: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            position: sticky;
            top: 0;
            height: 100vh;
            overflow-y: auto;
            box-shadow: 2px 0 12px rgba(15,23,42,0.05);
        }

        .sidebar-brand {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1.5rem 1.25rem;
            border-bottom: 1px solid var(--border);
            background: linear-gradient(135deg, #fffbeb 0%, #fff 100%);
        }

        .brand-icon {
            width: 40px;
            height: 40px;
            background: var(--primary);
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(245,158,11,0.3);
            flex-shrink: 0;
        }

        .brand-icon i { color: #fff; font-size: 1.1rem; }

        .brand-title {
            font-weight: 700;
            font-size: 0.9rem;
            color: var(--text-900);
            margin: 0 0 0.15rem;
            line-height: 1.2;
        }

        .brand-sub {
            font-size: 0.72rem;
            color: var(--text-400);
            margin: 0;
        }

        /* ─── Sidebar Nav ─── */
        .sidebar-nav {
            flex: 1;
            padding: 1rem 0.75rem;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .nav-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.625rem 0.875rem;
            border-radius: 0.625rem;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: 500;
            color: var(--text-600);
            text-decoration: none;
            transition: all 0.15s;
            position: relative;
        }

        .nav-item:hover {
            background: var(--border-100);
            color: var(--text-900);
        }

        .nav-item.active {
            background: var(--primary-light);
            color: var(--primary-dark);
            font-weight: 700;
        }

        .nav-item i { font-size: 0.9rem; flex-shrink: 0; }

        .nav-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--border);
            flex-shrink: 0;
            margin-left: auto;
            transition: background 0.15s;
        }

        .nav-item.active .nav-dot { background: var(--primary); }

        /* ─── Sidebar Footer ─── */
        .sidebar-footer {
            padding: 1rem 0.75rem 1.5rem;
            border-top: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        ::ng-deep .btn-submit-side.p-button {
            width: 100% !important;
            background: var(--primary) !important;
            border-color: var(--primary) !important;
            font-weight: 700 !important;
            font-size: 0.875rem !important;
            border-radius: 0.625rem !important;
            box-shadow: 0 4px 10px rgba(245,158,11,0.25) !important;
            justify-content: center !important;
        }

        ::ng-deep .btn-submit-side.p-button:enabled:hover {
            background: var(--primary-dark) !important;
            border-color: var(--primary-dark) !important;
        }

        ::ng-deep .btn-cancel-side.p-button {
            width: 100% !important;
            color: var(--text-400) !important;
            font-size: 0.8rem !important;
            justify-content: center !important;
        }

        /* ─── MAIN CONTENT ─── */
        .main-content {
            flex: 1;
            padding: 2rem 2.5rem;
            overflow-y: auto;
            min-width: 0;
        }

        /* ─── Form Cards ─── */
        .form-card {
            background: var(--card);
            border-radius: 1rem;
            border: 1px solid var(--border);
            box-shadow: var(--shadow);
            padding: 1.75rem;
            margin-bottom: 1.5rem;
            scroll-margin-top: 1.5rem;
        }

        /* ─── Section Header ─── */
        .section-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding-bottom: 1.25rem;
            border-bottom: 1px solid var(--border);
        }

        .section-icon {
            width: 40px;
            height: 40px;
            border-radius: 0.625rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            flex-shrink: 0;
        }

        .section-icon i { color: #fff; }

        .user-icon     { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
        .avatar-icon   { background: linear-gradient(135deg, #8b5cf6, #6d28d9); }
        .info-icon     { background: linear-gradient(135deg, #0ea5e9, #0369a1); }
        .clock-icon    { background: linear-gradient(135deg, #10b981, #059669); }
        .location-icon { background: linear-gradient(135deg, #f59e0b, #d97706); }
        .desc-icon     { background: linear-gradient(135deg, #6366f1, #4338ca); }
        .photos-icon   { background: linear-gradient(135deg, #ec4899, #be185d); }
        .logo-icon     { background: linear-gradient(135deg, #f97316, #c2410c); }

        .section-title {
            font-size: 1rem;
            font-weight: 700;
            color: var(--text-900);
            margin: 0 0 0.2rem;
        }

        .section-desc {
            font-size: 0.78rem;
            color: var(--text-400);
            margin: 0;
        }

        /* ─── Fields Grid ─── */
        .fields-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 1.25rem;
        }

        .field-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .full-width { grid-column: 1 / -1; }

        .field-label {
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--text-700);
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }

        .required { color: #ef4444; }
        .field-hint { font-size: 0.78rem; color: var(--text-400); margin-top: 0.25rem; }

        /* ─── Inputs ─── */
        .input-wrap { position: relative; display: flex; align-items: center; }

        .input-icon {
            position: absolute;
            left: 0.875rem;
            color: var(--text-400);
            font-size: 0.85rem;
            pointer-events: none;
            z-index: 1;
        }

        .input-icon-right {
            position: absolute;
            right: 0.875rem;
            color: var(--text-400);
            font-size: 0.9rem;
            cursor: pointer;
            z-index: 1;
            transition: color 0.15s;
        }

        .input-icon-right:hover { color: var(--primary); }

        .styled-input {
            width: 100%;
            padding: 0.65rem 1rem 0.65rem 2.5rem !important;
            border: 1px solid var(--border) !important;
            border-radius: 0.625rem !important;
            background: var(--border-100) !important;
            color: var(--text-900) !important;
            font-size: 0.875rem !important;
            transition: border-color 0.15s, box-shadow 0.15s, background 0.15s !important;
        }

        .styled-input:focus {
            outline: none !important;
            border-color: var(--primary) !important;
            box-shadow: 0 0 0 3px rgba(245,158,11,0.12) !important;
            background: #fff !important;
        }

        .styled-input::placeholder { color: var(--text-400) !important; }

        .styled-textarea {
            padding: 0.75rem 1rem !important;
            border: 1px solid var(--border) !important;
            border-radius: 0.625rem !important;
            background: var(--border-100) !important;
            color: var(--text-900) !important;
            font-size: 0.875rem !important;
            resize: vertical;
            transition: border-color 0.15s, box-shadow 0.15s !important;
        }

        .styled-textarea:focus {
            outline: none !important;
            border-color: var(--primary) !important;
            box-shadow: 0 0 0 3px rgba(245,158,11,0.12) !important;
            background: #fff !important;
        }

        .datepicker-wrap {
            position: relative;
            display: flex;
            align-items: center;
        }

        ::ng-deep .styled-datepicker {
            width: 100%;
        }

        ::ng-deep .styled-datepicker .p-datepicker-input,
        ::ng-deep .styled-datepicker input {
            padding-left: 2.5rem !important;
            border: 1px solid var(--border) !important;
            border-radius: 0.625rem !important;
            background: var(--border-100) !important;
            height: 42px;
        }

        ::ng-deep .styled-select .p-select {
            border: 1px solid var(--border) !important;
            border-radius: 0.625rem !important;
            background: var(--border-100) !important;
        }

        ::ng-deep .styled-select .p-select.p-focus {
            border-color: var(--primary) !important;
            box-shadow: 0 0 0 3px rgba(245,158,11,0.12) !important;
        }

        /* ─── Upload Zone ─── */
        ::ng-deep .custom-upload .p-fileupload-choose {
            background: #fff !important;
            border: 1px solid var(--primary) !important;
            color: var(--primary) !important;
            border-radius: 0.625rem !important;
            font-weight: 600 !important;
            font-size: 0.875rem !important;
            padding: 0.55rem 1.1rem !important;
            transition: all 0.15s !important;
            margin-bottom: 1rem;
        }

        ::ng-deep .custom-upload .p-fileupload-choose:hover {
            background: var(--primary) !important;
            color: #fff !important;
        }

        ::ng-deep .custom-upload .p-fileupload-content {
            border: none !important;
            padding: 0 !important;
            background: transparent !important;
        }

        ::ng-deep .custom-upload .p-fileupload-header {
            border: none !important;
            padding: 0 0 0.5rem !important;
            background: transparent !important;
        }

        .upload-zone {
            border: 2px dashed var(--border);
            border-radius: 0.875rem;
            background: var(--border-100);
            transition: border-color 0.2s, background 0.2s;
            cursor: pointer;
        }

        .upload-zone:hover { border-color: var(--primary); background: #fffbeb; }

        .upload-zone-inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2.5rem 1rem;
            gap: 0.5rem;
        }

        .upload-icon-wrap {
            width: 52px;
            height: 52px;
            background: #fff;
            border: 1px solid var(--border);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.5rem;
            box-shadow: var(--shadow);
        }

        .upload-icon-wrap i { font-size: 1.4rem; color: var(--primary); }
        .upload-title { font-weight: 600; color: var(--text-700); margin: 0; font-size: 0.875rem; }
        .upload-hint { color: var(--text-400); font-size: 0.78rem; margin: 0; }

        /* ─── Preview ─── */
        .preview-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem 0;
        }

        .preview-circle {
            position: relative;
            width: 130px;
            height: 130px;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid var(--primary);
            box-shadow: 0 4px 16px rgba(245,158,11,0.25);
        }

        .preview-img { width: 100%; height: 100%; object-fit: cover; }

        .remove-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 24px;
            height: 24px;
            background: #ef4444;
            color: #fff;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 0.68rem;
        }

        .remove-btn:hover { background: #dc2626; }

        .preview-meta { text-align: center; }
        .preview-name { font-size: 0.82rem; font-weight: 600; color: var(--text-700); margin: 0 0 0.15rem; }
        .preview-size { font-size: 0.75rem; color: var(--text-400); margin: 0; }

        /* ─── Photos Grid ─── */
        .photos-grid {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            padding: 1rem;
            border: 2px dashed var(--border);
            border-radius: 0.875rem;
            background: var(--border-100);
        }

        .photo-card {
            position: relative;
            width: 150px;
            height: 150px;
            border-radius: 0.75rem;
            overflow: hidden;
            border: 2px solid var(--border);
            box-shadow: var(--shadow);
        }

        .photo-img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .remove-btn-sm {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 24px;
            height: 24px;
            background: #ef4444;
            color: #fff;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 0.68rem;
        }

        .remove-btn-sm:hover { background: #dc2626; }

        .photo-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(15,23,42,0.7);
            padding: 0.35rem 0.5rem;
        }

        .photo-name, .photo-size {
            color: #fff;
            font-size: 0.7rem;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .photos-count-hint {
            font-size: 0.78rem;
            color: var(--text-400);
            margin-top: 0.625rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }

        /* ─── Horaires ─── */
        .quick-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1.25rem;
            padding-bottom: 1.25rem;
            border-bottom: 1px solid var(--border);
        }

        .horaires-list {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            margin-bottom: 1rem;
        }

        .horaire-row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 1rem;
            padding: 0.75rem 1rem;
            border-radius: 0.625rem;
            border: 1px solid transparent;
            transition: all 0.15s;
        }

        .horaire-open { background: #f0fdf4; border-color: #bbf7d0; }
        .horaire-ferme { background: #fef2f2; border-color: #fecaca; }
        .horaire-incomplet { background: #fffbeb; border-color: #fed7aa; }

        .jour-cell {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            min-width: 130px;
        }

        .jour-label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 600;
            color: var(--text-900);
            cursor: pointer;
            user-select: none;
            font-size: 0.875rem;
        }

        .horaires-inputs { flex: 1; }

        .time-inputs {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
        }

        .time-field { display: flex; flex-direction: column; gap: 0.2rem; }

        .time-label {
            font-size: 0.67rem;
            color: var(--text-400);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }

        .time-input {
            padding: 0.45rem 0.7rem !important;
            border: 1px solid var(--border) !important;
            border-radius: 0.5rem !important;
            background: #fff !important;
            color: var(--text-900) !important;
            font-weight: 600 !important;
            font-size: 0.85rem !important;
            width: 120px;
        }

        .time-input:focus {
            outline: none !important;
            border-color: var(--primary) !important;
            box-shadow: 0 0 0 2px rgba(245,158,11,0.15) !important;
        }

        .time-sep { color: var(--text-400); font-size: 0.8rem; margin-top: 1rem; }

        .ferme-msg {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 0.5rem;
            padding: 0.45rem 0.875rem;
            color: #ef4444;
            font-weight: 600;
            font-size: 0.82rem;
        }

        .status-badge-wrap { min-width: 90px; text-align: right; }

        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            padding: 0.25rem 0.7rem;
            border-radius: 9999px;
            font-weight: 600;
            font-size: 0.75rem;
        }

        .badge-ferme { background: #fee2e2; color: #dc2626; }
        .badge-ouvert { background: #dcfce7; color: #16a34a; }
        .badge-incomplet { background: #ffedd5; color: #ea580c; }

        .info-tip {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 0.625rem;
            padding: 0.75rem 1rem;
            font-size: 0.8rem;
            color: #1d4ed8;
        }

        .info-tip i { margin-top: 0.1rem; flex-shrink: 0; }

        /* ─── Responsive ─── */
        @media (max-width: 900px) {
            .page-wrapper { flex-direction: column; }
            .sidebar {
                width: 100%;
                height: auto;
                position: static;
                flex-direction: row;
                flex-wrap: wrap;
                padding: 0.75rem;
            }
            .sidebar-brand { border-bottom: none; padding: 0.5rem; }
            .sidebar-nav { flex-direction: row; flex-wrap: wrap; padding: 0.25rem; gap: 0.25rem; }
            .sidebar-footer { flex-direction: row; border-top: none; padding: 0.5rem; }
            .main-content { padding: 1rem; }
            .fields-grid { grid-template-columns: 1fr; }
        }
    `]
})
export class CreationBoutique {

    boutique = {
        nom_boutique: '',
        categorie: '',
        email_manager: '',
        location: '',
        loyer: '',
        description: '',
        photo_boutique: null as File | null,
        boutique_logo: null as File | null,
        horaires: [] as Horaire[],
        commission: ''
    };

    showPassword = false;

    resetBoutiqueForm(): void {
        this.boutique = {
            nom_boutique: '',
            categorie: '',
            email_manager: '',
            location: '',
            loyer: '',
            description: '',
            photo_boutique: null,
            boutique_logo: null,
            horaires: [] as Horaire[],
            commission: ''
        };
        this.initializeHoraires();
        this.selectedPhotos = [];
        this.selectedLogo = null;
    }

    user = {
        nom_client: '',
        prenom_client: '',
        email: '',
        pwd: '',
        date_naissance: new Date(),
        role: '',
        numero_telephone: '',
        avatarFile: null as File | null
    };

    resetUserForm(): void {
        this.user = {
            nom_client: '',
            prenom_client: '',
            email: '',
            pwd: '',
            date_naissance: new Date(),
            role: '',
            numero_telephone: '',
            avatarFile: null
        };
        this.selectedAvatar = null;
    }

    selectedPhotos: any[] = [];
    selectedLogo: any;
    categories: any[] = [];
    statuts: any[] = [];
    selectedAvatar: any;
    isSubmitting: boolean = false;
    activeSection: string = 'user';

    scrollTo(sectionId: string): void {
        this.activeSection = sectionId;
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    constructor(
        private userservice: UserService,
        private boutiqueService: BoutiqueService,
        private router: Router,
        private categorieService: CategorieService,
        private StatusService: StatusService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.loadCategories();
        this.initializeHoraires();
    }

    private addBoutiqueByAdmin(): void {
        try {
            const formData = new FormData();
            formData.append('nom_boutique', this.boutique.nom_boutique);
            formData.append('description_boutique', this.boutique.description);
            //formData.append('loyer', this.boutique.loyer);
            //formData.append('location', this.boutique.location);
            formData.append('id_categorie', this.boutique.categorie);
            formData.append('horaires', JSON.stringify(this.boutique.horaires));

            if (this.boutique.boutique_logo) {
                formData.append('logo_boutique', this.boutique.boutique_logo, this.boutique.boutique_logo.name);
            }

            if (this.selectedPhotos && this.selectedPhotos.length > 0) {
                this.selectedPhotos.forEach((photo) => {
                    formData.append('photo_boutique', photo.file, photo.file.name);
                });
            }

            formData.append('commission', this.boutique.commission);

            this.boutiqueService.registerBoutiqueByAdminV1(formData).subscribe({
                next: (res) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Boutique créée avec succès',
                        life: 5000
                    });
                    this.resetBoutiqueForm();
                    this.isSubmitting = false;
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Erreur lors de la création de la boutique',
                        life: 5000
                    });
                    this.isSubmitting = false;
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    private addManagerBoutique(): void {
        const formData = new FormData();
        formData.append('nom_client', this.user.nom_client);
        formData.append('prenom_client', this.user.prenom_client);
        formData.append('email', this.user.email);
        formData.append('pwd', this.user.pwd);
        formData.append('date_naissance', this.user.date_naissance.toISOString());
        formData.append('role', "697b0d19b784b5da2ab3ba22");
        formData.append('numero_telephone', this.user.numero_telephone);
        formData.append('rememberMe', 'false');

        if (this.user.avatarFile) {
            formData.append('avatar', this.user.avatarFile, this.user.avatarFile.name);
        }

        this.userservice.signUpByAddAdminFormData(formData).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Manager créé',
                    detail: 'Le manager a été créé avec succès',
                    life: 3000
                });
                this.resetUserForm();
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur Manager',
                    detail: 'Erreur lors de la création du manager',
                    life: 5000
                });
            }
        });
    }

    async addBoutique() {
        await this.addManagerBoutique();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await this.addBoutiqueByAdmin();
    }

    loadCategories() {
        this.categorieService.getAllCategorie().subscribe({
            next: (data) => {
                this.categories = data.map((cat: any) => ({
                    name: cat.nom,
                    value: cat._id
                }));
            },
            error: (error) => {
                this.categories = [
                    { name: 'Électronique', value: 'electronique' },
                    { name: 'Vêtements', value: 'vetements' },
                ];
            }
        });
    }

    onPhotosSelected(event: any, fileUpload: FileUpload): void {
        if (event.currentFiles && event.currentFiles.length > 0) {
            const newFiles: File[] = event.currentFiles;

            if (this.selectedPhotos.length + newFiles.length > 3) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Limite dépassée',
                    detail: 'Vous ne pouvez sélectionner que 3 photos maximum'
                });
                fileUpload.clear();
                return;
            }

            newFiles.forEach((file: File) => {
                if (file.size > 52428800) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Fichier trop volumineux',
                        detail: `${file.name} dépasse 50MB`
                    });
                    return;
                }

                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.selectedPhotos.push({
                        file: file,
                        name: file.name,
                        size: file.size,
                        objectURL: e.target.result
                    });
                };
                reader.readAsDataURL(file);
            });

            fileUpload.clear();
        }
    }

    removePhoto(index: number) {
        this.selectedPhotos.splice(index, 1);
        this.selectedPhotos = [...this.selectedPhotos];
    }

    onAvatarSelected(event: any): void {
        if (event.currentFiles && event.currentFiles.length > 0) {
            const file = event.currentFiles[0];
            this.user.avatarFile = file;
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.selectedAvatar = { name: file.name, size: file.size, objectURL: e.target.result };
            };
            reader.readAsDataURL(file);
        }
    }

    onLogoSelected(event: any) {
        if (event.currentFiles && event.currentFiles.length > 0) {
            const file = event.currentFiles[0];
            this.boutique.boutique_logo = file;
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.selectedLogo = { name: file.name, size: file.size, objectURL: e.target.result };
            };
            reader.readAsDataURL(file);
        }
    }

    removeLogo() {
        this.selectedLogo = null;
        this.boutique.boutique_logo = null;
    }

    removeAvatar(): void {
        this.selectedAvatar = null;
        this.user.avatarFile = null;
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
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
        this.boutique.horaires.forEach(h => {
            h.est_ferme = false; h.ouverture = '09:00'; h.fermeture = '18:00';
        });
        this.messageService.add({ severity: 'success', summary: 'Mis à jour', detail: 'Tous les jours ouverts de 09:00 à 18:00', life: 2000 });
    }

    copyFirstDayToAll(): void {
        const first = this.boutique.horaires[0];
        this.boutique.horaires.forEach((h, i) => {
            if (i !== 0) { h.ouverture = first.ouverture; h.fermeture = first.fermeture; h.est_ferme = first.est_ferme; }
        });
        this.messageService.add({ severity: 'success', summary: 'Copié', detail: 'Horaires du lundi appliqués à tous', life: 2000 });
    }

    closeWeekend(): void {
        this.boutique.horaires.forEach(h => {
            if (h.jour === 'Samedi' || h.jour === 'Dimanche') {
                h.est_ferme = true; h.ouverture = ''; h.fermeture = '';
            }
        });
        this.messageService.add({ severity: 'success', summary: 'Week-end fermé', detail: 'Samedi et dimanche marqués comme fermés', life: 2000 });
    }

    getHoraireRowClass(horaire: Horaire): string {
        if (horaire.est_ferme) return 'horaire-ferme';
        if (horaire.ouverture && horaire.fermeture) return 'horaire-open';
        return 'horaire-incomplet';
    }

    getJourIcon(jour: string): string {
        const icons: { [key: string]: string } = {
            'Lundi': 'pi pi-calendar text-blue-500',
            'Mardi': 'pi pi-calendar text-cyan-500',
            'Mercredi': 'pi pi-calendar text-green-500',
            'Jeudi': 'pi pi-calendar text-yellow-500',
            'Vendredi': 'pi pi-calendar text-orange-500',
            'Samedi': 'pi pi-calendar text-purple-500',
            'Dimanche': 'pi pi-calendar text-red-500'
        };
        return icons[jour] || 'pi pi-calendar';
    }
}