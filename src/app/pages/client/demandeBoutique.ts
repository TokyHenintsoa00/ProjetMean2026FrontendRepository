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
//         ToastModule 
//     ],
//     providers: [MessageService],
//     template:`<p-toast></p-toast>
// <p-fluid>
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
//                             (click)="returnToHome()"
//                             icon="pi pi-times" 
//                             severity="secondary"
//                             [text]="true"
//                             type="button">
//                         </button>
//                         <button 
//                             pButton 
//                             label="Valider la demande" 
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
// </p-fluid>`
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
//         };
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

//     //creation 
//     private addBoutiqueByAdmin(): void {
//         const formData = new FormData();
        
//         formData.append('nom_boutique', this.boutique.nom_boutique);
//         formData.append('description_boutique', this.boutique.description);
//         formData.append('loyer', this.boutique.loyer);
//         formData.append('location', this.boutique.location);
//         formData.append('id_categorie', this.boutique.categorie);
        
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
        
//         this.boutiqueService.registerBoutiqueByClient(formData).subscribe({
//             next: (res) => {
//                 console.log("✅ Boutique créée avec succès", res);
                
//                 this.messageService.add({
//                     severity: 'success',
//                     summary: 'Succès',
//                     detail: 'La boutique a été créée avec succès !',
//                     life: 5000
//                 });
                
//                 // Réinitialiser tous les formulaires
//                 this.resetAllForms();
//                 this.isSubmitting = false;
                
//                 // Optionnel : rediriger vers la liste des boutiques après 2 secondes
//                 // setTimeout(() => {
//                 //     this.router.navigate(['/boutiques']);
//                 // }, 2000);
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

//     //creaction user manager
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
//         // Validation simple
//         // if (!this.boutique.nom_boutique || !this.boutique.categorie) {
//         //     this.messageService.add({
//         //         severity: 'warn',
//         //         summary: 'Attention',
//         //         detail: 'Veuillez remplir tous les champs obligatoires',
//         //         life: 3000
//         //     });
//         //     return;
//         // }

//         // this.isSubmitting = true;
        
//         // Si vous voulez créer le manager ET la boutique
//         await this.addManagerBoutique();
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
        CheckboxModule
    ],
    providers: [MessageService],
    template:`<p-toast></p-toast>
<p-fluid>
    <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/1">
            <div class="card flex flex-col gap-6 shadow-2 border-round-xl p-6">
                <!-- Header -->
                <div class="flex align-items-center gap-3 pb-3 border-bottom-1 surface-border">
                    <i class="pi pi-shop text-4xl text-primary"></i>
                    <div>
                        <div class="font-semibold text-2xl text-primary">
                            Ajouter une boutique
                        </div>
                        <p class="text-600 text-sm mt-1">Complétez les informations de votre boutique</p>
                    </div>
                </div>
                
                <form (ngSubmit)="addBoutique()">

                    <!-- Informations utilisateur -->
                    <div class="surface-50 border-round-lg p-4 mb-4">
                        <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
                            <i class="pi pi-user"></i>
                            Informations utilisateur
                        </h3>
                        
                        <div class="flex flex-wrap gap-4">
                            <div class="flex flex-col grow basis-0 gap-2">
                                <label for="nom_client" class="font-semibold text-900">
                                    Nom <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    pInputText 
                                    id="nom_client" 
                                    type="text" 
                                    [(ngModel)]="user.nom_client" 
                                    name="nom_client"
                                    placeholder="Ex: Dupont"
                                    class="p-inputtext-lg" />
                            </div>
                            
                            <div class="flex flex-col grow basis-0 gap-2">
                                <label for="prenom_client" class="font-semibold text-900">
                                    Prénom <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    pInputText 
                                    id="prenom_client" 
                                    type="text" 
                                    [(ngModel)]="user.prenom_client" 
                                    name="prenom_client"
                                    placeholder="Ex: Jean"
                                    class="p-inputtext-lg" />
                            </div>

                            <div class="flex flex-col grow basis-0 gap-2">
                                <label for="email" class="font-semibold text-900">
                                    Email <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    pInputText 
                                    id="email" 
                                    type="email" 
                                    [(ngModel)]="user.email" 
                                    name="email"
                                    placeholder="Ex: jean.dupont@gmail.com"
                                    class="p-inputtext-lg" />
                            </div>

                            <div class="flex flex-col grow basis-0 gap-2">
                                <label for="pwd" class="font-semibold text-900">
                                    Mot de passe <span class="text-red-500">*</span>
                                </label>
                                <div class="relative">
                                    <input 
                                        pInputText 
                                        id="pwd" 
                                        [type]="showPassword ? 'text' : 'password'" 
                                        [(ngModel)]="user.pwd" 
                                        name="pwd"
                                        placeholder="••••••••"
                                        class="p-inputtext-lg w-full pr-10" />
                                    <i 
                                        [class]="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" 
                                        (click)="showPassword = !showPassword"
                                        class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500">
                                    </i>
                                </div>
                            </div>

                            <div class="flex flex-col grow basis-0 gap-2">
                                <label for="date_naissance" class="font-semibold text-900">
                                    Date de naissance <span class="text-red-500">*</span>
                                </label>
                                <p-datePicker
                                    type
                                    id="date_naissance"
                                    [(ngModel)]="user.date_naissance"
                                    name="date_naissance"
                                    dateFormat="dd/mm/yy"
                                    placeholder="JJ/MM/AAAA"
                                    styleClass="w-full">
                                </p-datePicker>
                            </div>

                            <div class="flex flex-col grow basis-0 gap-2">
                                <label for="numero_telephone" class="font-semibold text-900">
                                    Numéro de téléphone <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    pInputText 
                                    id="numero_telephone" 
                                    type="tel" 
                                    [(ngModel)]="user.numero_telephone" 
                                    name="numero_telephone"
                                    placeholder="Ex: +33 6 12 34 56 78"
                                    class="p-inputtext-lg" />
                            </div>
                        </div>
                    </div>

                    <!-- Avatar utilisateur -->
                    <div class="surface-50 border-round-lg p-4 mb-4">
                        <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
                            <i class="pi pi-user-circle"></i>
                            Avatar utilisateur
                        </h3>
                        
                        <p-fileUpload
                            (onSelect)="onAvatarSelected($event)"
                            name="avatar"
                            accept="image/*"
                            [maxFileSize]="5000000"
                            [showUploadButton]="false"
                            [showCancelButton]="false"
                            chooseLabel="Choisir un avatar"
                            class="w-full">
                            <ng-template pTemplate="content">
                                <div *ngIf="!selectedAvatar" class="text-center p-6 border-2 border-dashed surface-border border-round-lg">
                                    <i class="pi pi-cloud-upload text-6xl text-400 mb-3"></i>
                                    <p class="text-600 font-medium mb-2">
                                        Glissez-déposez votre avatar ici
                                    </p>
                                    <p class="text-500 text-sm">
                                        PNG, JPG jusqu'à 5MB
                                    </p>
                                </div>
                                
                                <div *ngIf="selectedAvatar" class="flex justify-content-center p-4">
                                    <div class="relative border-2 border-round-circle overflow-hidden hover:shadow-4 transition-all" style="width: 200px; height: 200px;">
                                        <img [src]="selectedAvatar.objectURL" 
                                            [alt]="selectedAvatar.name" 
                                            class="w-full h-full object-cover">
                                        
                                        <button 
                                            type="button"
                                            (click)="removeAvatar()"
                                            class="absolute top-2 right-2 bg-red-500 text-white border-circle w-2rem h-2rem flex align-items-center justify-content-center hover:bg-red-600 transition-colors border-none cursor-pointer">
                                            <i class="pi pi-times"></i>
                                        </button>
                                        
                                        <div class="absolute bottom-0 left-0 right-0 bg-black-alpha-60 text-white p-2">
                                            <p class="text-xs truncate m-0">{{selectedAvatar.name}}</p>
                                            <p class="text-xs text-300 m-0">{{formatFileSize(selectedAvatar.size)}}</p>
                                        </div>
                                    </div>
                                </div>
                            </ng-template>
                        </p-fileUpload>
                    </div>

                    <!-- Informations générales -->
                    <div class="surface-50 border-round-lg p-4 mb-4">
                        <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
                            <i class="pi pi-info-circle"></i>
                            Informations générales
                        </h3>
                        
                        <div class="flex flex-wrap gap-4">
                            <div class="flex flex-col grow basis-0 gap-2">
                                <label for="name" class="font-semibold text-900">
                                    Nom du boutique <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    pInputText 
                                    id="name_boutique" 
                                    type="text" 
                                    [(ngModel)]="boutique.nom_boutique" 
                                    name="nom_boutique"
                                    placeholder="Ex: boutique KFC"
                                    class="p-inputtext-lg" />
                            </div>
                            
                            <div class="flex flex-col grow basis-0 gap-2">
                                <label for="category" class="font-semibold text-900">
                                    Catégorie du boutique <span class="text-red-500">*</span>
                                </label>
                                <p-select 
                                    id="category"
                                    [options]="categories" 
                                    [(ngModel)]="boutique.categorie"
                                    name="categorie"
                                    optionLabel="name" 
                                    optionValue="value"
                                    placeholder="Sélectionnez une catégorie"
                                    styleClass="w-full">
                                </p-select>
                            </div>
                        </div>
                    </div>

                    <!-- Horaires d'ouverture -->
<div class="surface-50 border-round-lg p-4 mb-4">
    <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
        <i class="pi pi-clock"></i>
        Horaires d'ouverture
    </h3>
    
    <div class="bg-white border-round-lg p-4">
        <!-- Actions rapides -->
        <div class="flex flex-wrap gap-2 mb-4 pb-3 border-bottom-1 surface-border">
            <button 
                pButton 
                type="button"
                label="Ouvrir tous les jours" 
                icon="pi pi-check-circle"
                size="small"
                severity="success"
                [outlined]="true"
                (click)="setAllDaysOpen()">
            </button>
            <button 
                pButton 
                type="button"
                label="Dupliquer le lundi" 
                icon="pi pi-copy"
                size="small"
                severity="info"
                [outlined]="true"
                (click)="copyFirstDayToAll()">
            </button>
            <button 
                pButton 
                type="button"
                label="Fermer week-end" 
                icon="pi pi-times-circle"
                size="small"
                severity="warn"
                [outlined]="true"
                (click)="closeWeekend()">
            </button>
        </div>
        
        <!-- Liste des jours -->
        <div class="flex flex-col gap-2">
            <div *ngFor="let horaire of boutique.horaires; let i = index" 
                [class]="getHoraireCardClass(horaire)"
                class="p-3 border-round-lg transition-all duration-200">
                
                <div class="flex flex-wrap align-items-center gap-3">
                    <!-- Jour et checkbox -->
                    <div class="flex align-items-center gap-3 min-w-10rem">
                        <p-checkbox 
                            [(ngModel)]="horaire.est_ferme"
                            [name]="'ferme_' + i"
                            [binary]="true"
                            (onChange)="onFermeChange(i)"
                            inputId="'cb_' + i">
                        </p-checkbox>
                        <label [for]="'cb_' + i" class="cursor-pointer select-none">
                            <div class="flex align-items-center gap-2">
                                <i [class]="getJourIcon(horaire.jour)" class="text-xl"></i>
                                <span class="font-semibold text-900">{{horaire.jour}}</span>
                            </div>
                        </label>
                    </div>
                    
                    <!-- Horaires ou message fermé -->
                    <div class="flex-1 flex align-items-center gap-3">
                        <div *ngIf="!horaire.est_ferme" class="flex align-items-center gap-3 flex-1">
                            <!-- Ouverture -->
                            <div class="flex flex-col gap-1 flex-1 max-w-10rem">
                                <label class="text-xs text-500 font-medium uppercase">Ouverture</label>
                                <div class="p-inputgroup">
                                    <span class="p-inputgroup-addon bg-primary-50">
                                        <i class="pi pi-sun text-primary"></i>
                                    </span>
                                    <input 
                                        pInputText 
                                        type="time"
                                        [(ngModel)]="horaire.ouverture"
                                        [name]="'ouverture_' + i"
                                        class="text-center font-semibold" />
                                </div>
                            </div>
                            
                            <!-- Séparateur -->
                            <i class="pi pi-arrow-right text-400 text-xl mt-3"></i>
                            
                            <!-- Fermeture -->
                            <div class="flex flex-col gap-1 flex-1 max-w-10rem">
                                <label class="text-xs text-500 font-medium uppercase">Fermeture</label>
                                <div class="p-inputgroup">
                                    <span class="p-inputgroup-addon bg-orange-50">
                                        <i class="pi pi-moon text-orange-500"></i>
                                    </span>
                                    <input 
                                        pInputText 
                                        type="time"
                                        [(ngModel)]="horaire.fermeture"
                                        [name]="'fermeture_' + i"
                                        class="text-center font-semibold" />
                                </div>
                            </div>
                        </div>
                        
                        <!-- Message fermé -->
                        <div *ngIf="horaire.est_ferme" class="flex-1">
                            <div class="bg-red-50 border-1 border-red-200 border-round p-2 text-center">
                                <i class="pi pi-lock text-red-500 mr-2"></i>
                                <span class="text-red-600 font-semibold">Fermé toute la journée</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Badge statut -->
                    <div class="min-w-7rem text-right">
                        <span *ngIf="horaire.est_ferme" 
                            class="inline-flex align-items-center gap-1 px-3 py-1 bg-red-100 text-red-700 border-round-full font-semibold text-sm">
                            <i class="pi pi-times-circle"></i>
                            Fermé
                        </span>
                        <span *ngIf="!horaire.est_ferme && horaire.ouverture && horaire.fermeture" 
                            class="inline-flex align-items-center gap-1 px-3 py-1 bg-green-100 text-green-700 border-round-full font-semibold text-sm">
                            <i class="pi pi-check-circle"></i>
                            Ouvert
                        </span>
                        <span *ngIf="!horaire.est_ferme && (!horaire.ouverture || !horaire.fermeture)" 
                            class="inline-flex align-items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 border-round-full font-semibold text-sm">
                            <i class="pi pi-exclamation-circle"></i>
                            Incomplet
                        </span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Info footer -->
        <div class="mt-4 p-3 bg-blue-50 border-1 border-blue-200 border-round-lg">
            <div class="flex align-items-start gap-2">
                <i class="pi pi-info-circle text-blue-500 mt-1"></i>
                <div class="text-sm text-700">
                    <p class="m-0 mb-1 font-semibold">Conseils :</p>
                    <ul class="m-0 pl-3 text-600">
                        <li>Cochez la case pour marquer un jour comme fermé</li>
                        <li>Utilisez les boutons rapides pour gagner du temps</li>
                        <li>Tous les horaires doivent être complétés pour les jours ouverts</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

                    <!-- Description -->
                    <div class="surface-50 border-round-lg p-4 mb-4">
                        <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
                            <i class="pi pi-align-left"></i>
                            Description du boutique
                        </h3>
                        
                        <div class="flex flex-col gap-2">
                            <label for="description" class="font-semibold text-900">
                                Description du boutique
                            </label>
                            <textarea
                                pTextarea
                                id="description"
                                [(ngModel)]="boutique.description"
                                name="description"
                                rows="6"
                                placeholder="Décrivez le boutique en détail..."
                                class="w-full"
                                [autoResize]="true">
                            </textarea>
                            <small class="text-500">Minimum 50 caractères recommandés</small>
                        </div>
                    </div>

                    <!-- Photos boutique -->
                    <div class="surface-50 border-round-lg p-4 mb-4">
                        <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
                            <i class="pi pi-images"></i>
                            Photos boutique
                        </h3>
                        
                        <p-fileUpload
                            #fileUpload
                            (onSelect)="onPhotosSelected($event, fileUpload)"
                            name="photos"
                            accept="image/png,image/jpeg,image/jpg,image/webp"
                            [maxFileSize]="52428800"
                            [multiple]="true"
                            [fileLimit]="3"
                            [showUploadButton]="false"
                            [showCancelButton]="false"
                            chooseLabel="Choisir photos boutique"
                            class="w-full">
                            <ng-template pTemplate="content">
                                <div *ngIf="!selectedPhotos || selectedPhotos.length === 0" 
                                    class="text-center p-6 border-2 border-dashed surface-border border-round-lg">
                                    <i class="pi pi-cloud-upload text-6xl text-400 mb-3"></i>
                                    <p class="text-600 font-medium mb-2">
                                        Glissez-déposez vos photos ici
                                    </p>
                                    <p class="text-500 text-sm">
                                        PNG, JPG jusqu'à 5MB (max 3 photos)
                                    </p>
                                </div>
                                
                                <div *ngIf="selectedPhotos && selectedPhotos.length > 0">
                                    <div class="flex gap-3 p-4 overflow-x-auto border-2 border-dashed surface-border border-round-lg">
                                        <div *ngFor="let photo of selectedPhotos; let i = index">
                                            <div class="relative border-2 border-round overflow-hidden hover:shadow-4 transition-all" 
                                                style="width: 200px; height: 200px;">
                                                <img [src]="photo.objectURL" 
                                                    [alt]="photo.name" 
                                                    class="w-full h-full object-cover">
                                                
                                                <button 
                                                    type="button"
                                                    (click)="removePhoto(i)"
                                                    class="absolute top-2 right-2 bg-red-500 text-white border-circle w-2rem h-2rem flex align-items-center justify-content-center hover:bg-red-600 transition-colors border-none cursor-pointer">
                                                    <i class="pi pi-times"></i>
                                                </button>
                                                
                                                <div class="absolute bottom-0 left-0 right-0 bg-black-alpha-60 text-white p-2">
                                                    <p class="text-xs truncate m-0">{{photo.name}}</p>
                                                    <p class="text-xs text-300 m-0">{{formatFileSize(photo.size)}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="text-sm text-500 mt-2">
                                        <i class="pi pi-info-circle"></i> 
                                        Cliquez sur "Choisir photos boutique" pour ajouter plus de photos ({{selectedPhotos.length}}/3)
                                    </p>
                                </div>
                            </ng-template>
                        </p-fileUpload>
                    </div>

                    <!-- Logo boutique -->
                    <div class="surface-50 border-round-lg p-4 mb-4">
                        <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
                            <i class="pi pi-image"></i>
                            Logo du boutique
                        </h3>
                        <p-fileUpload
                            (onSelect)="onLogoSelected($event)"
                            name="avatar"
                            accept="image/*"
                            [maxFileSize]="5000000"
                            [showUploadButton]="false"
                            [showCancelButton]="false"
                            chooseLabel="Choisir votre logo"
                            class="w-full">
                            <ng-template pTemplate="content">
                                <div *ngIf="!selectedLogo" class="text-center p-6 border-2 border-dashed surface-border border-round-lg">
                                    <i class="pi pi-cloud-upload text-6xl text-400 mb-3"></i>
                                    <p class="text-600 font-medium mb-2">
                                        Glissez-déposez votre logo ici
                                    </p>
                                    <p class="text-500 text-sm">
                                        PNG, JPG jusqu'à 5MB
                                    </p>
                                </div>
                                
                                <div *ngIf="selectedLogo" class="flex justify-content-center p-4">
                                    <div class="relative border-2 border-round-circle overflow-hidden hover:shadow-4 transition-all" style="width: 200px; height: 200px;">
                                        <img [src]="selectedLogo.objectURL" 
                                            [alt]="selectedLogo.name" 
                                            class="w-full h-full object-cover">
                                        
                                        <button 
                                            type="button"
                                            (click)="removeLogo()"
                                            class="absolute top-2 right-2 bg-red-500 text-white border-circle w-2rem h-2rem flex align-items-center justify-content-center hover:bg-red-600 transition-colors border-none cursor-pointer">
                                            <i class="pi pi-times"></i>
                                        </button>
                                        
                                        <div class="absolute bottom-0 left-0 right-0 bg-black-alpha-60 text-white p-2">
                                            <p class="text-xs truncate m-0">{{selectedLogo.name}}</p>
                                            <p class="text-xs text-300 m-0">{{formatFileSize(selectedLogo.size)}}</p>
                                        </div>
                                    </div>
                                </div>
                            </ng-template>
                        </p-fileUpload>
                    </div>

                    <!-- Buttons -->
                    <div class="flex justify-content-between align-items-center pt-4 border-top-1 surface-border">
                        <button 
                            pButton 
                            label="Annuler" 
                            (click)="returnToHome()"
                            icon="pi pi-times" 
                            severity="secondary"
                            [text]="true"
                            type="button">
                        </button>
                        <button 
                            pButton 
                            label="Valider la demande" 
                            icon="pi pi-check" 
                            size="large"
                            type="submit"
                            [loading]="isSubmitting">
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</p-fluid>`
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
    selectedLogo: any;
    categories: any[] = [];
    statuts: any[] = [];
    selectedAvatar: any;
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
            jour: jour,
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
        this.boutique.horaires.forEach(horaire => {
            horaire.est_ferme = false;
            horaire.ouverture = '09:00';
            horaire.fermeture = '18:00';
        });
        this.messageService.add({
            severity: 'success',
            summary: 'Horaires mis à jour',
            detail: 'Tous les jours sont ouverts de 09:00 à 18:00',
            life: 2000
        });
    }

    copyFirstDayToAll(): void {
        const firstDay = this.boutique.horaires[0];
        this.boutique.horaires.forEach((horaire, index) => {
            if (index !== 0) {
                horaire.ouverture = firstDay.ouverture;
                horaire.fermeture = firstDay.fermeture;
                horaire.est_ferme = firstDay.est_ferme;
            }
        });
        this.messageService.add({
            severity: 'success',
            summary: 'Horaires copiés',
            detail: 'Les horaires du lundi ont été appliqués à tous les jours',
            life: 2000
        });
    }

    private resetBoutiqueForm(): void {
        this.boutique = {
            nom_boutique: '',
            categorie: '',
            email_manager: '',
            location: '',
            loyer: '',
            description: '',
            photo_boutique: null,
            boutique_logo: null,
            horaires: []
        };
        this.initializeHoraires();
        this.selectedPhotos = [];
        this.selectedLogo = null;
    }

    private resetUserForm(): void {
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
        
        // Ajouter les horaires
        formData.append('horaires', JSON.stringify(this.boutique.horaires));
        
        // Logo boutique
        if (this.boutique.boutique_logo) {
            formData.append('logo_boutique', this.boutique.boutique_logo, this.boutique.boutique_logo.name);
        }
        
        // Photos boutique
        if (this.selectedPhotos && this.selectedPhotos.length > 0) {
            this.selectedPhotos.forEach((photo) => {
                formData.append('photo_boutique', photo.file, photo.file.name);
            });
        }
        
        console.log('📤 Envoi de', this.selectedPhotos.length, 'photos');
        console.log('📅 Envoi des horaires:', this.boutique.horaires);
        
        this.boutiqueService.registerBoutiqueByClient(formData).subscribe({
            next: (res) => {
                console.log("✅ Boutique créée avec succès", res);
                
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'La boutique a été créée avec succès !',
                    life: 5000
                });
                
                this.resetAllForms();
                this.isSubmitting = false;
            },
            error: (err) => {
                console.error("❌ Erreur lors de la création", err);
                
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: err.error?.message || 'Une erreur est survenue lors de la création de la boutique',
                    life: 5000
                });
                
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
        formData.append('role', "697b0d19b784b5da2ab3ba22");
        formData.append('numero_telephone', this.user.numero_telephone);
        formData.append('rememberMe', 'false');
        
        if (this.user.avatarFile) {
            formData.append('avatar', this.user.avatarFile, this.user.avatarFile.name);
            console.log('Avatar ajouté au FormData:', this.user.avatarFile.name);
        }
        
        this.userservice.signUpByAddClientFormData(formData).subscribe({
            next: (res) => {
                console.log("✅ Manager créé avec succès", res);
                
                this.messageService.add({
                    severity: 'success',
                    summary: 'Manager créé',
                    detail: 'Le manager a été créé avec succès',
                    life: 3000
                });
                
                this.resetUserForm();
            },
            error: (err) => {
                console.error('❌ Erreur lors de la création du manager', err);
                
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
        // Validation
        // if (!this.boutique.nom_boutique || !this.boutique.categorie) {
        //     this.messageService.add({
        //         severity: 'warn',
        //         summary: 'Attention',
        //         detail: 'Veuillez remplir tous les champs obligatoires',
        //         life: 3000
        //     });
        //     return;
        // }

        // // Vérifier que les horaires sont cohérents
        // const horaireInvalide = this.boutique.horaires.find(h => 
        //     !h.est_ferme && (!h.ouverture || !h.fermeture)
        // );
        
        // if (horaireInvalide) {
        //     this.messageService.add({
        //         severity: 'warn',
        //         summary: 'Horaires incomplets',
        //         detail: `Veuillez compléter les horaires pour ${horaireInvalide.jour} ou marquer le jour comme fermé`,
        //         life: 3000
        //     });
        //     return;
        // }

        // this.isSubmitting = true;
        
        await this.addManagerBoutique();
        await this.addBoutiqueByAdmin();
    }

    loadCategories() {
        this.categorieService.getAllCategorie().subscribe({
            next: (data) => {
                console.log('Catégories chargées:', data);
                this.categories = data.map((cat: any) => ({
                    name: cat.nom,
                    value: cat._id
                }));
            },
            error: (error) => {
                console.error('Erreur lors du chargement des catégories:', error);
                this.categories = [
                    { name: 'Électronique', value: 'electronique' },
                    { name: 'Vêtements', value: 'vetements' }
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
            
            console.log('Photos sélectionnées:', this.selectedPhotos.length);
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
                this.selectedAvatar = {
                    name: file.name,
                    size: file.size,
                    objectURL: e.target.result
                };
            };
            reader.readAsDataURL(file);
            
            console.log('Fichier avatar sélectionné:', file.name, file.size);
        }
    }

    onLogoSelected(event: any) {
        if (event.currentFiles && event.currentFiles.length > 0) {
            const file = event.currentFiles[0];
            
            this.boutique.boutique_logo = file;
            
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.selectedLogo = {
                    name: file.name,
                    size: file.size,
                    objectURL: e.target.result
                };
            };
            reader.readAsDataURL(file);
            
            console.log('Fichier logo sélectionné:', file.name, file.size);
        }
    }

    removeLogo() {
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

    removeAvatar(): void {
        this.selectedAvatar = null;
        this.user.avatarFile = null;
    }


    getHoraireCardClass(horaire: Horaire): string {
    if (horaire.est_ferme) {
        return 'bg-red-50 border-1 border-red-200';
    }
    if (horaire.ouverture && horaire.fermeture) {
        return 'bg-green-50 border-1 border-green-200 hover:bg-green-100';
    }
    return 'bg-orange-50 border-1 border-orange-200';
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

closeWeekend(): void {
    this.boutique.horaires.forEach(horaire => {
        if (horaire.jour === 'Samedi' || horaire.jour === 'Dimanche') {
            horaire.est_ferme = true;
            horaire.ouverture = '';
            horaire.fermeture = '';
        }
    });
    this.messageService.add({
        severity: 'success',
        summary: 'Week-end fermé',
        detail: 'Samedi et dimanche ont été marqués comme fermés',
        life: 2000
    });
}
}