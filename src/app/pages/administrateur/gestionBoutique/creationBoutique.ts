import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { UserService } from "@/pages/service/user.service";
import { Router } from "@angular/router";
import { BoutiqueService } from "@/pages/service/boutique.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DatePickerModule } from "primeng/datepicker";
import { FileUploadModule } from "primeng/fileupload";
import { FluidModule } from "primeng/fluid";
import { InputTextModule } from "primeng/inputtext";
import { SelectModule } from "primeng/select";
import { TextareaModule } from "primeng/textarea";
import { CategorieService } from "@/pages/service/categorie.service";
import { StatusService } from "@/pages/service/status.service";

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
        DatePickerModule
    ],
    template:`<p-fluid>
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

                            <div class="flex flex-col grow basis-0 gap-2">
                                <label for="name" class="font-semibold text-900">
                                    Manager du boutique <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    pInputText 
                                    id="email_manager" 
                                    type="text" 
                                    [(ngModel)]="boutique.email_manager" 
                                    name="email_manager"
                                    placeholder="Ex: manager@gmail.com"
                                    class="p-inputtext-lg" />
                            </div>
                        </div>
                    </div>

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
                                <input 
                                    pInputText 
                                    id="pwd" 
                                    type="password" 
                                    [(ngModel)]="user.pwd" 
                                    name="pwd"
                                    placeholder="••••••••"
                                    class="p-inputtext-lg" />
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

                    <!-- Prix et stock -->
                    <div class="surface-50 border-round-lg p-4 mb-4">
                        <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
                            <i class="pi pi-map-marker"></i>
                            Localisation et loyer
                        </h3>
                        
                        <div class="flex flex-wrap gap-4">
                            <div class="flex flex-col grow basis-0 gap-2">
                                <label for="prix" class="font-semibold text-900">
                                    Location <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    pInputText
                                    id="location"
                                    type="text"
                                    [(ngModel)]="boutique.location" 
                                    name="location"
                                    step="0.01"
                                    min="0"
                                    placeholder="P-001-A"
                                    class="p-inputtext-lg" />
                            </div>
                            
                            <div class="flex flex-col grow basis-0 gap-2">
                                <label for="stock" class="font-semibold text-900">
                                    Loyer <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    pInputText
                                    id="loyer"
                                    type="number"
                                    [(ngModel)]="boutique.loyer" 
                                    name="loyer"
                                    min="0"
                                    placeholder="0"
                                    class="p-inputtext-lg" />
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
                            Photos du boutique
                        </h3>
                        
                        <p-fileUpload
                            (onSelect)="onPhotosSelected($event)"
                            name="photo_boutique"
                            [multiple]="true"
                            accept="image/*"
                            [maxFileSize]="10000000"
                            [showUploadButton]="false"
                            [showCancelButton]="false"
                            chooseLabel="Choisir des images"
                            class="w-full">
                            <ng-template pTemplate="content">
                                <div *ngIf="selectedPhotos.length === 0" class="text-center p-6 border-2 border-dashed surface-border border-round-lg">
                                    <i class="pi pi-cloud-upload text-6xl text-400 mb-3"></i>
                                    <p class="text-600 font-medium mb-2">
                                        Glissez-déposez vos images ici
                                    </p>
                                    <p class="text-500 text-sm">
                                        PNG, JPG jusqu'à 10MB
                                    </p>
                                </div>
                                
                                <div *ngIf="selectedPhotos.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                                    <div *ngFor="let photo of selectedPhotos; let i = index" 
                                        class="relative border-2 border-round-lg overflow-hidden hover:shadow-4 transition-all">
                                        <img [src]="photo.objectURL" 
                                            [alt]="photo.name" 
                                            class="w-full h-full object-cover"
                                            style="aspect-ratio: 1; max-height: 200px;">
                                        
                                        <div class="absolute top-2 left-2 bg-primary text-white px-2 py-1 border-round text-xs font-semibold">
                                            {{i + 1}}
                                        </div>
                                        
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
                                
                                <div *ngIf="selectedPhotos.length > 0" class="text-center pt-3 border-top-1 surface-border mt-3">
                                    <p class="text-600 m-0">
                                        <i class="pi pi-images mr-2"></i>
                                        {{selectedPhotos.length}} photo(s) sélectionnée(s)
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
                            name="boutique_logo"
                            [multiple]="false"
                            accept="image/*"
                            [maxFileSize]="10000000"
                            [showUploadButton]="false"
                            [showCancelButton]="false"
                            chooseLabel="Choisir un logo"
                            class="w-full">
                            <ng-template pTemplate="content">
                                <div *ngIf="!selectedLogo" class="text-center p-6 border-2 border-dashed surface-border border-round-lg">
                                    <i class="pi pi-cloud-upload text-6xl text-400 mb-3"></i>
                                    <p class="text-600 font-medium mb-2">
                                        Glissez-déposez votre logo ici
                                    </p>
                                    <p class="text-500 text-sm">
                                        PNG, JPG jusqu'à 10MB
                                    </p>
                                </div>
                                
                                <div *ngIf="selectedLogo" class="flex justify-content-center p-4">
                                    <div class="relative border-2 border-round-lg overflow-hidden hover:shadow-4 transition-all" style="max-width: 300px;">
                                        <img [src]="selectedLogo.objectURL" 
                                            [alt]="selectedLogo.name" 
                                            class="w-full h-full object-cover"
                                            style="aspect-ratio: 1; max-height: 300px;">
                                        
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
                            icon="pi pi-times" 
                            severity="secondary"
                            [text]="true"
                            type="button">
                        </button>
                        <button 
                            pButton 
                            label="Publier le produit" 
                            icon="pi pi-check" 
                            size="large"
                            type="submit">
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</p-fluid>`
})

export class CreationBoutique{

    boutique = {
        nom_boutique:'',
        categorie:'',
        email_manager:'',
        location:'',
        loyer:'',
        description:'',
        photo_boutique:null as File | null,
        boutique_logo:null as File | null,
    };


    user = {
        //info user
        nom_client: '',
        prenom_client: '',
        email: '',
        pwd: '',
        date_naissance: new Date(),
        role: '',
        numero_telephone: '',
        avatarFile: null as File | null
    }

    selectedPhotos: any;
    selectedLogo: any ;
    categories: any[] = [];
    statuts: any[] = [];
    selectedAvatar: any ;

    constructor(
        private userservice: UserService, 
        private boutiqueService: BoutiqueService,
        private router: Router,
        private categorieService:CategorieService,
        private StatusService:StatusService
    ) {}

    ngOnInit() {
        this.loadCategories();
    }


    private addBoutiqueByAdmin():void{
        const formData = new FormData();
        formData.append('nom_boutique',this.boutique.nom_boutique);
        formData.append('description_boutique',this.boutique.description);
        if (this.boutique.boutique_logo) {
            formData.append('boutique_logo',this.boutique.boutique_logo , this.boutique.boutique_logo.name);
        } 

        
    }

     private addManagerBoutique(): void {
        const formData = new FormData();
        
        // Ajouter les champs texte
        formData.append('nom_client', this.user.nom_client);
        formData.append('prenom_client', this.user.prenom_client);
        formData.append('email', this.user.email);
        formData.append('pwd', this.user.pwd);
        formData.append('date_naissance', this.user.date_naissance.toISOString());
        formData.append('role', "697b0d19b784b5da2ab3ba22");
        formData.append('numero_telephone', this.user.numero_telephone);
        formData.append('rememberMe', 'false');
        
        // Ajouter l'avatar SI présent
        if (this.user.avatarFile) {
            formData.append('avatar', this.user.avatarFile, this.user.avatarFile.name);
            console.log('Avatar ajouté au FormData:', this.user.avatarFile.name);
        } else {
            console.warn('Aucun avatar sélectionné');
        }
        
        // Envoyer directement le FormData
        this.userservice.signUpByAddAdminFormData(formData).subscribe({
            next: (res) => {
                console.log("Manager inséré avec succès", res);
                this.resetUserForm();
            },
            error: (err) => {
                console.error('Erreur lors de l\'ajout', err);
            }
        });
    }
    
    addBoutique(){
       const formData = new FormData();
       this.addManagerBoutique();

       
    }

    // statuts = [
    //     { name: 'En stock', value: 'en-stock', class: 'bg-green-100 text-green-900' },
    //     { name: 'Stock limité', value: 'stock-limite', class: 'bg-orange-100 text-orange-900' },
    //     { name: 'Rupture de stock', value: 'rupture', class: 'bg-red-100 text-red-900' },
    //     { name: 'Pré-commande', value: 'precommande', class: 'bg-blue-100 text-blue-900' }
    // ];

   

    loadCategories() {
        this.categorieService.getAllCategorie().subscribe({
            next: (data) => {
                console.log('Catégories chargées:', data);
                // Adaptez selon la structure de votre réponse API
                this.categories = data.map((cat: any) => ({
                    name: cat.nom,
                    value: cat._id
                }));
            },
            error: (error) => {
                console.error('Erreur lors du chargement des catégories:', error);
                // Gardez les catégories par défaut en cas d'erreur
                this.categories = [
                    { name: 'Électronique', value: 'electronique' },
                    { name: 'Vêtements', value: 'vetements' },
                    // ... etc
                ];
            }
        });  
    }

    
    // categories = [
    //     { name: 'Électronique', value: 'electronique' },
    //     { name: 'Vêtements', value: 'vetements' },
    //     { name: 'Alimentation', value: 'alimentation' },
    //     { name: 'Maison & Jardin', value: 'maison-jardin' },
    //     { name: 'Sport & Loisirs', value: 'sport-loisirs' },
    //     { name: 'Beauté & Santé', value: 'beaute-sante' },
    //     { name: 'Livres & Médias', value: 'livres-medias' },
    //     { name: 'Automobile', value: 'automobile' }
    // ];



// Pour les photos multiples
onPhotosSelected(event: any) {
    const files = event.currentFiles || event.files;
    
    files.forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.selectedPhotos.push({
                name: file.name,
                size: file.size,
                objectURL: e.target.result,
                file: file
            });
        };
        reader.readAsDataURL(file);
    });
}

// Pour le logo unique
onLogoSelected(event: any) {
    const file = event.currentFiles[0] || event.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.selectedLogo = {
                name: file.name,
                size: file.size,
                objectURL: e.target.result,
                file: file
            };
        };
        reader.readAsDataURL(file);
    }
}

removePhoto(index: number) {
    this.selectedPhotos.splice(index, 1);
}

removeLogo() {
    this.selectedLogo = null;
}

formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}


 // Gestion de l'avatar
    onAvatarSelected(event: any): void {
        if (event.currentFiles && event.currentFiles.length > 0) {
            const file = event.currentFiles[0];
            
            // Stocker le fichier directement
            this.user.avatarFile = file;
            
            // Créer l'aperçu
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

     removeAvatar(): void {
        this.selectedAvatar = null;
        this.user.avatarFile = null;
    }

}