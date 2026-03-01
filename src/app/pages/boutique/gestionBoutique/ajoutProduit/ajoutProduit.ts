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
    selector: 'app-ajoutProduit',
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
                    <i class="pi pi-shopping-bag text-4xl text-primary"></i>
                    <div>
                        <div class="font-semibold text-2xl text-primary">
                            Ajouter un produit
                        </div>
                        <p class="text-600 text-sm mt-1">Complétez les informations de votre produit</p>
                    </div>
                </div>
                
                <form (ngSubmit)="addProduit()">
                    <!-- Informations générales -->
                    <div class="surface-50 border-round-lg p-4 mb-4">
                        <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
                            <i class="pi pi-info-circle"></i>
                            Informations générales
                        </h3>
                        
                        <div class="flex flex-wrap gap-4">
                            <div class="flex flex-col grow basis-0 gap-2">
                                <label for="name" class="font-semibold text-900">
                                    Nom du produit <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    pInputText 
                                    id="name" 
                                    type="text" 
                                    [(ngModel)]="produit.nomProduit" 
                                    name="nomProduit"
                                    placeholder="Ex: iPhone 15 Pro"
                                    class="p-inputtext-lg" />
                            </div>
                            
                            <div class="flex flex-col grow basis-0 gap-2">
                                <label for="category" class="font-semibold text-900">
                                    Catégorie produit <span class="text-red-500">*</span>
                                </label>
                                <p-select appendTo="body" 
                                    id="category"
                                    [options]="categories" 
                                    [(ngModel)]="produit.categorie"
                                    name="categorie"
                                    optionLabel="name" 
                                    optionValue="value"
                                    placeholder="Sélectionnez une catégorie"
                                    styleClass="w-full">
                                </p-select>
                            </div>

                            <div class="flex flex-col grow basis-0 gap-2">
                                <label for="name" class="font-semibold text-900">
                                    Categorie du produit <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    pInputText 
                                    id="name" 
                                    type="text" 
                                    [(ngModel)]="produit.sous_categorie" 
                                    name="souscategorie"
                                    placeholder="Ex: Telephone portable"
                                    class="p-inputtext-lg" />
                            </div>

                        </div>
                    </div>

                    <!-- Prix et stock -->
                    <div class="surface-50 border-round-lg p-4 mb-4">
                        <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
                            <i class="pi pi-dollar"></i>
                            Prix et disponibilité
                        </h3>
                        
                        <div class="flex flex-wrap gap-4">
                            <div class="flex flex-col grow basis-0 gap-2">
                                <label for="prix" class="font-semibold text-900">
                                    Prix hors taxe (Ar) <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    pInputText
                                    id="prix"
                                    type="number"
                                    [(ngModel)]="produit.prix" 
                                    name="prix"
                                    step="0.01"
                                    min="0"
                                    placeholder="2000Ar"
                                    class="p-inputtext-lg" />
                            </div>
                            
                            <div class="flex flex-col grow basis-0 gap-2">
                                <label for="stock" class="font-semibold text-900">
                                    Stock disponible <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    pInputText
                                    id="stock"
                                    type="number"
                                    [(ngModel)]="produit.stock" 
                                    name="stock"
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
                            Description
                        </h3>
                        
                        <div class="flex flex-col gap-2">
                            <label for="description" class="font-semibold text-900">
                                Description du produit
                            </label>
                            <textarea
                                pTextarea
                                id="description"
                                [(ngModel)]="produit.description"
                                name="description"
                                rows="6"
                                placeholder="Décrivez votre produit en détail..."
                                class="w-full"
                                [autoResize]="true">
                            </textarea>
                            <small class="text-500">Minimum 50 caractères recommandés</small>
                        </div>
                    </div>

                    <!-- Photos -->
                    <div class="surface-50 border-round-lg p-4 mb-4">
                        <h3 class="text-lg font-semibold text-700 mb-3 flex align-items-center gap-2">
                            <i class="pi pi-images"></i>
                            Photos du produit
                        </h3>
                        
                        <p-fileUpload
                            (onSelect)="onFileSelected($event)"
                            name="photos"
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
                                
                                <!-- Affichage des photos sélectionnées -->
                                <div *ngIf="selectedPhotos.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                                    <div *ngFor="let photo of selectedPhotos; let i = index" 
                                         class="relative border-2 border-round-lg overflow-hidden hover:shadow-4 transition-all">
                                        <img [src]="photo.objectURL" 
                                             [alt]="photo.name" 
                                             class="w-full h-full object-cover"
                                             style="aspect-ratio: 1; max-height: 200px;">
                                        
                                        <!-- Badge numéro -->
                                        <div class="absolute top-2 left-2 bg-primary text-white px-2 py-1 border-round text-xs font-semibold">
                                            {{i + 1}}
                                        </div>
                                        
                                        <!-- Bouton supprimer -->
                                        <button 
                                            type="button"
                                            (click)="removePhoto(i)"
                                            class="absolute top-2 right-2 bg-red-500 text-white border-circle w-2rem h-2rem flex align-items-center justify-content-center hover:bg-red-600 transition-colors border-none cursor-pointer">
                                            <i class="pi pi-times"></i>
                                        </button>
                                        
                                        <!-- Info fichier -->
                                        <div class="absolute bottom-0 left-0 right-0 bg-black-alpha-60 text-white p-2">
                                            <p class="text-xs truncate m-0">{{photo.name}}</p>
                                            <p class="text-xs text-300 m-0">{{formatFileSize(photo.size)}}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Compteur de photos -->
                                <div *ngIf="selectedPhotos.length > 0" class="text-center pt-3 border-top-1 surface-border mt-3">
                                    <p class="text-600 m-0">
                                        <i class="pi pi-images mr-2"></i>
                                        {{selectedPhotos.length}} photo(s) sélectionnée(s)
                                    </p>
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
</p-fluid>`,
    providers: [MessageService]
})
export class AjoutProduit {

    produit: any = {};
    selectedPhotos: any[] = [];
    
    categories: any[] = [];
    statuts: any[] = [];
    constructor(
        private userservice: UserService, 
        private boutiqueService: BoutiqueService,
        private router: Router,
        private categorieService:CategorieService,
        private StatusService:StatusService
    ) {}

    ngOnInit() {
        this.loadStatus();
        this.loadCategories();
        
    }

    addProduit(){
            
    }

    // statuts = [
    //     { name: 'En stock', value: 'en-stock', class: 'bg-green-100 text-green-900' },
    //     { name: 'Stock limité', value: 'stock-limite', class: 'bg-orange-100 text-orange-900' },
    //     { name: 'Rupture de stock', value: 'rupture', class: 'bg-red-100 text-red-900' },
    //     { name: 'Pré-commande', value: 'precommande', class: 'bg-blue-100 text-blue-900' }
    // ];

    loadStatus(){
        this.StatusService.getAllStatus().subscribe({
           next:(data)=> {
               console.log('Status chargeee',data);
               this.statuts.map((stat:any)=>({
                    name:stat.nom_status,
                    value: stat._id
               }));
               
           }, 
        });
    }

    loadCategories() {
        this.categorieService.getAllCategorie().subscribe({
            next: (data) => {
                console.log('Catégories chargées:', data);
                // Adaptez selon la structure de votre réponse API
                this.categories = data.map((cat: any) => ({
                    name: cat.nom_categorie,
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

    onFileSelected(event: any) {
        console.log('Fichiers sélectionnés:', event);
        
        // Gérer les différents formats de event (event.files peut être FileList ou Array)
        const files = event.currentFiles || event.files;
        
        if (files) {
            // Convertir FileList en Array si nécessaire
            const filesArray = Array.from(files) as File[];
            
            // Ajouter les nouvelles photos à la liste existante
            filesArray.forEach((file: File) => {
                this.selectedPhotos.push({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    objectURL: URL.createObjectURL(file),
                    file: file
                });
            });
        }
    }

    removePhoto(index: number) {
        // Libérer l'URL de l'objet pour éviter les fuites mémoire
        URL.revokeObjectURL(this.selectedPhotos[index].objectURL);
        
        // Supprimer la photo de la liste
        this.selectedPhotos.splice(index, 1);
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
}
