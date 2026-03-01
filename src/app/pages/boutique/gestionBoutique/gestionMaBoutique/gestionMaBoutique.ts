import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { TabsModule } from 'primeng/tabs';
import { FluidModule } from 'primeng/fluid';
import { MessageModule } from 'primeng/message';
import { BoutiqueService } from '@/pages/service/boutique.service';
import { CategorieService } from '@/pages/service/categorie.service';
import { environment } from '@env/environment';

@Component({
    selector: 'app-gestion-ma-boutique',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        TextareaModule,
        MultiSelectModule,
        CheckboxModule,
        FileUploadModule,
        TabsModule,
        FluidModule,
        MessageModule
    ],
    template: `
    <div class="page-container">
        <div class="page-header">
            <div>
                <h2 class="page-title"><i class="pi pi-shop"></i> Gestion de ma Boutique</h2>
                <p class="page-subtitle">Gérez le profil, les horaires et la galerie de votre boutique</p>
            </div>
        </div>

        <p-message *ngIf="successMessage" severity="success" [text]="successMessage" styleClass="mb-4 w-full"></p-message>
        <p-message *ngIf="errorMessage" severity="error" [text]="errorMessage" styleClass="mb-4 w-full"></p-message>

        <p-tabs value="0">
            <p-tablist>
                <p-tab value="0"><i class="pi pi-id-card mr-2"></i> Profil Boutique</p-tab>
                <p-tab value="1"><i class="pi pi-clock mr-2"></i> Horaires d'ouverture</p-tab>
                <p-tab value="2"><i class="pi pi-images mr-2"></i> Galerie photos</p-tab>
            </p-tablist>

            <p-tabpanels>
                <!-- ONGLET 1 : Profil Boutique -->
                <p-tabpanel value="0">
                    <div class="mt-4" *ngIf="boutique">
                        <p-fluid>
                            <div class="surface-50 border-round-lg p-4 mb-4">
                                <h3 class="text-lg font-semibold text-700 mb-3 flex items-center gap-2">
                                    <i class="pi pi-info-circle"></i>
                                    Informations de base
                                </h3>

                                <div class="flex flex-wrap gap-4 mb-4">
                                    <div class="flex flex-col grow basis-0 gap-2">
                                        <label for="nom" class="font-semibold text-900">Nom de la boutique <span class="text-red-500">*</span></label>
                                        <input pInputText id="nom" type="text" [(ngModel)]="boutique.nom_boutique" placeholder="Nom de votre boutique" />
                                    </div>
                                    <div class="flex flex-col grow basis-0 gap-2">
                                        <label for="categorie" class="font-semibold text-900">Categories</label>
                                        <p-multiselect appendTo="body" id="categorie" [options]="categories" [(ngModel)]="selectedCategories"
                                            optionLabel="name" optionValue="value"
                                            placeholder="Selectionnez les categories"
                                            display="chip" styleClass="w-full">
                                        </p-multiselect>
                                    </div>
                                </div>

                                <div class="flex flex-col gap-2 mb-4">
                                    <label for="location" class="font-semibold text-900">Adresse / Localisation</label>
                                    <input pInputText id="location" type="text" [(ngModel)]="boutique.location" placeholder="Adresse de votre boutique" />
                                </div>

                                <div class="flex flex-col gap-2">
                                    <label for="description" class="font-semibold text-900">Description</label>
                                    <textarea pTextarea id="description" [(ngModel)]="boutique.description_boutique"
                                        rows="5" placeholder="Decrivez votre boutique..." [autoResize]="true"></textarea>
                                </div>
                            </div>

                            <div class="flex justify-end pt-4">
                                <button pButton label="Enregistrer les modifications" icon="pi pi-check"
                                    (click)="saveInfo()" [loading]="savingInfo"></button>
                            </div>
                        </p-fluid>
                    </div>
                </p-tabpanel>

                <!-- ONGLET 2 : Horaires d'ouverture -->
                <p-tabpanel value="1">
                    <div class="mt-4" *ngIf="boutique">
                        <div class="surface-50 border-round-lg p-4 mb-4">
                            <h3 class="text-lg font-semibold text-700 mb-3 flex items-center gap-2">
                                <i class="pi pi-clock"></i>
                                Horaires d'ouverture
                            </h3>

                            <div class="flex flex-col gap-3">
                                <div *ngFor="let h of horaires; let i = index"
                                     class="flex items-center gap-4 p-3 surface-0 border-round-lg border-1 surface-border">
                                    <div class="w-8rem font-semibold text-900">{{ h.jour }}</div>

                                    <div class="flex items-center gap-2">
                                        <p-checkbox [(ngModel)]="h.est_ferme" [binary]="true" inputId="ferme_{{i}}"></p-checkbox>
                                        <label for="ferme_{{i}}" class="text-600">Ferme</label>
                                    </div>

                                    <div class="flex items-center gap-2" *ngIf="!h.est_ferme">
                                        <label class="text-600">De</label>
                                        <input pInputText type="time" [(ngModel)]="h.ouverture" class="w-8rem" />
                                        <label class="text-600">a</label>
                                        <input pInputText type="time" [(ngModel)]="h.fermeture" class="w-8rem" />
                                    </div>

                                    <div *ngIf="h.est_ferme" class="text-500 italic">Ferme toute la journee</div>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-end pt-4">
                            <button pButton label="Enregistrer les horaires" icon="pi pi-check"
                                (click)="saveHoraires()" [loading]="savingHoraires"></button>
                        </div>
                    </div>
                </p-tabpanel>

                <!-- ONGLET 3 : Galerie photos -->
                <p-tabpanel value="2">
                    <div class="mt-4" *ngIf="boutique">
                        <!-- Logo -->
                        <div class="surface-50 border-round-lg p-4 mb-4">
                            <h3 class="text-lg font-semibold text-700 mb-3 flex items-center gap-2">
                                <i class="pi pi-image"></i>
                                Logo de la boutique
                            </h3>
                            <div class="flex items-center gap-4">
                                <div *ngIf="boutique.logo && boutique.logo.length > 0"
                                     class="w-8rem h-8rem border-round-lg overflow-hidden border-2 surface-border">
                                    <img [src]="environment.apiUrl + '/uploads/logo/' + boutique.logo[0].filename"
                                         alt="Logo" class="w-full h-full" style="object-fit: cover;" />
                                </div>
                                <div *ngIf="!boutique.logo || boutique.logo.length === 0"
                                     class="w-8rem h-8rem border-round-lg border-2 border-dashed surface-border flex items-center justify-center">
                                    <i class="pi pi-image text-4xl text-400"></i>
                                </div>
                                <p-fileUpload mode="basic" name="logo_boutique" accept="image/*"
                                    [maxFileSize]="10000000" chooseLabel="Changer le logo"
                                    (onSelect)="onLogoSelected($event)" [auto]="false"
                                    chooseIcon="pi pi-upload"></p-fileUpload>
                            </div>
                        </div>

                        <!-- Photos galerie -->
                        <div class="surface-50 border-round-lg p-4 mb-4">
                            <h3 class="text-lg font-semibold text-700 mb-3 flex items-center gap-2">
                                <i class="pi pi-images"></i>
                                Photos de la boutique
                            </h3>

                            <!-- Photos existantes -->
                            <div *ngIf="boutique.photo_boutique && boutique.photo_boutique.length > 0"
                                 class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                                <div *ngFor="let photo of boutique.photo_boutique"
                                     class="relative border-2 border-round-lg overflow-hidden hover:shadow-4 transition-all"
                                     style="aspect-ratio: 1;">
                                    <img [src]="environment.apiUrl + '/uploads/boutique/' + photo.filename"
                                         [alt]="photo.filename"
                                         class="w-full h-full" style="object-fit: cover;" />
                                    <button type="button" (click)="deletePhoto(photo._id)"
                                        class="absolute top-2 right-2 bg-red-500 text-white border-circle w-2rem h-2rem flex items-center justify-center hover:bg-red-600 transition-colors border-none cursor-pointer">
                                        <i class="pi pi-times"></i>
                                    </button>
                                </div>
                            </div>

                            <div *ngIf="!boutique.photo_boutique || boutique.photo_boutique.length === 0"
                                 class="text-center p-6 border-2 border-dashed surface-border border-round-lg mb-4">
                                <i class="pi pi-images text-6xl text-400 mb-3"></i>
                                <p class="text-600">Aucune photo pour le moment</p>
                            </div>

                            <!-- Upload nouvelles photos -->
                            <p-fileUpload
                                (onSelect)="onPhotosSelected($event)"
                                name="photo_boutique"
                                [multiple]="true"
                                accept="image/*"
                                [maxFileSize]="10000000"
                                [showUploadButton]="false"
                                [showCancelButton]="false"
                                chooseLabel="Ajouter des photos">
                            </p-fileUpload>
                        </div>

                        <div class="flex justify-end pt-4">
                            <button pButton label="Enregistrer les photos" icon="pi pi-check"
                                (click)="savePhotos()" [loading]="savingPhotos"
                                [disabled]="!newPhotos.length && !newLogo"></button>
                        </div>
                    </div>
                </p-tabpanel>
            </p-tabpanels>
        </p-tabs>

        <!-- Loading state -->
        <div *ngIf="loading" class="flex items-center justify-center p-8">
            <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
            <span class="ml-3 text-600">Chargement des donnees de votre boutique...</span>
        </div>
    </div>
    `,
    styles: [`
:host {
    --primary: #f59e0b; --primary-dark: #d97706; --card: #ffffff;
    --text-900: #0f172a; --text-600: #475569; --text-400: #94a3b8;
    --border: #e2e8f0; --border-100: #f8fafc;
    --shadow: 0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04);
    --radius: 1rem;
}
.page-container { padding: 2rem; }
.page-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:2rem; }
.page-title { font-size:1.75rem; font-weight:700; color:var(--text-900); display:flex; align-items:center; gap:0.75rem; margin:0; }
.page-title i { color:var(--primary); font-size:1.5rem; }
.page-subtitle { color:var(--text-600); font-size:0.875rem; margin:0.25rem 0 0; }
::ng-deep .p-button:not(.p-button-text):not(.p-button-outlined):not(.p-button-link) { background:var(--primary) !important; border-color:var(--primary) !important; color:#fff !important; }
::ng-deep .p-button:not(.p-button-text):not(.p-button-outlined):not(.p-button-link):enabled:hover { background:var(--primary-dark) !important; border-color:var(--primary-dark) !important; }
::ng-deep .p-tabs .p-tab[aria-selected="true"] { color:var(--primary) !important; border-color:var(--primary) !important; }
::ng-deep .p-tabs .p-tab:hover { color:var(--primary) !important; }
::ng-deep .p-inputtext:focus { border-color:var(--primary) !important; box-shadow:0 0 0 3px rgba(245,158,11,0.15) !important; }
    `]
})
export class GestionMaBoutique implements OnInit {
    protected environment = environment;

    boutique: any = null;
    loading = true;
    categories: any[] = [];
    selectedCategories: string[] = [];

    // Horaires par defaut
    horaires: any[] = [];

    // Flags de sauvegarde
    savingInfo = false;
    savingHoraires = false;
    savingPhotos = false;

    // Messages
    successMessage = '';
    errorMessage = '';

    // Nouvelles photos a uploader
    newPhotos: File[] = [];
    newLogo: File | null = null;

    private readonly defaultHoraires = [
        { jour: 'Lundi', ouverture: '08:00', fermeture: '18:00', est_ferme: false },
        { jour: 'Mardi', ouverture: '08:00', fermeture: '18:00', est_ferme: false },
        { jour: 'Mercredi', ouverture: '08:00', fermeture: '18:00', est_ferme: false },
        { jour: 'Jeudi', ouverture: '08:00', fermeture: '18:00', est_ferme: false },
        { jour: 'Vendredi', ouverture: '08:00', fermeture: '18:00', est_ferme: false },
        { jour: 'Samedi', ouverture: '08:00', fermeture: '12:00', est_ferme: false },
        { jour: 'Dimanche', ouverture: '', fermeture: '', est_ferme: true }
    ];

    constructor(
        private boutiqueService: BoutiqueService,
        private categorieService: CategorieService
    ) {}

    ngOnInit() {
        this.loadBoutique();
        this.loadCategories();
    }

    loadBoutique() {
        this.loading = true;
        this.boutiqueService.getMyBoutique().subscribe({
            next: (data) => {
                this.boutique = data;
                // Initialiser les horaires
                if (this.boutique.horaires && this.boutique.horaires.length > 0) {
                    this.horaires = this.boutique.horaires;
                } else {
                    this.horaires = JSON.parse(JSON.stringify(this.defaultHoraires));
                }
                // Mapper id_categorie (tableau) vers un tableau de string IDs pour le multiselect
                if (this.boutique.id_categorie && this.boutique.id_categorie.length > 0) {
                    this.selectedCategories = this.boutique.id_categorie.map((c: any) =>
                        typeof c === 'object' ? (c._id || c.id)?.toString() : c?.toString()
                    );
                } else {
                    this.selectedCategories = [];
                }
                this.loading = false;
            },
            error: (err) => {
                console.error('Erreur chargement boutique:', err);
                this.errorMessage = 'Impossible de charger les donnees de votre boutique';
                this.loading = false;
            }
        });
    }

    loadCategories() {
        this.categorieService.getAllCategorie().subscribe({
            next: (data) => {
                this.categories = data.map((cat: any) => ({
                    name: cat.nom,
                    value: cat._id
                }));
            },
            error: (err) => {
                console.error('Erreur chargement categories:', err);
            }
        });
    }

    saveInfo() {
        this.clearMessages();
        this.savingInfo = true;
        const data = {
            nom_boutique: this.boutique.nom_boutique,
            description_boutique: this.boutique.description_boutique,
            location: this.boutique.location,
            id_categorie: JSON.stringify(this.selectedCategories)
        };
        this.boutiqueService.updateBoutiqueInfo(data).subscribe({
            next: () => {
                this.successMessage = 'Informations mises a jour avec succes';
                this.savingInfo = false;
            },
            error: (err) => {
                console.error(err);
                this.errorMessage = 'Erreur lors de la mise a jour des informations';
                this.savingInfo = false;
            }
        });
    }

    saveHoraires() {
        this.clearMessages();
        this.savingHoraires = true;
        this.boutiqueService.updateBoutiqueHoraires({ horaires: this.horaires }).subscribe({
            next: () => {
                this.successMessage = 'Horaires mis a jour avec succes';
                this.savingHoraires = false;
            },
            error: (err) => {
                console.error(err);
                this.errorMessage = 'Erreur lors de la mise a jour des horaires';
                this.savingHoraires = false;
            }
        });
    }

    onPhotosSelected(event: any) {
        const files = event.currentFiles || event.files;
        if (files) {
            this.newPhotos = Array.from(files) as File[];
        }
    }

    onLogoSelected(event: any) {
        const files = event.currentFiles || event.files;
        if (files && files.length > 0) {
            this.newLogo = files[0];
        }
    }

    savePhotos() {
        this.clearMessages();
        this.savingPhotos = true;
        const formData = new FormData();

        this.newPhotos.forEach((file) => {
            formData.append('photo_boutique', file, file.name);
        });

        if (this.newLogo) {
            formData.append('logo_boutique', this.newLogo, this.newLogo.name);
        }

        this.boutiqueService.updateBoutiquePhotos(formData).subscribe({
            next: (res) => {
                this.successMessage = 'Photos mises a jour avec succes';
                this.savingPhotos = false;
                this.newPhotos = [];
                this.newLogo = null;
                // Recharger les donnees
                this.loadBoutique();
            },
            error: (err) => {
                console.error(err);
                this.errorMessage = 'Erreur lors de la mise a jour des photos';
                this.savingPhotos = false;
            }
        });
    }

    deletePhoto(photoId: string) {
        this.clearMessages();
        this.boutiqueService.deleteBoutiquePhoto(photoId).subscribe({
            next: (res) => {
                this.successMessage = 'Photo supprimee avec succes';
                // Supprimer localement
                this.boutique.photo_boutique = this.boutique.photo_boutique.filter(
                    (p: any) => p._id !== photoId
                );
            },
            error: (err) => {
                console.error(err);
                this.errorMessage = 'Erreur lors de la suppression de la photo';
            }
        });
    }

    private clearMessages() {
        this.successMessage = '';
        this.errorMessage = '';
    }
}
