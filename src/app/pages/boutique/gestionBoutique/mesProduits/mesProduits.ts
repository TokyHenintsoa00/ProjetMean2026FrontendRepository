import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { FluidModule } from 'primeng/fluid';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SelectModule } from 'primeng/select';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { ProduitService } from '@/pages/service/produit.service';
import { CategorieService } from '@/pages/service/categorie.service';
import { PromotionService } from '@/pages/service/promotion.service';
import { CascadeCategorie, CategorieNode } from '@/shared/components/cascade-categorie/cascade-categorie';
import { environment } from '@env/environment';

@Component({
    selector: 'app-mes-produits',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        TextareaModule,
        TableModule,
        DialogModule,
        FileUploadModule,
        FluidModule,
        ConfirmDialogModule,
        SelectModule,
        ToastModule,
        TagModule,
        CascadeCategorie
    ],
    providers: [ConfirmationService, MessageService],
    template: `
    <p-toast></p-toast>
    <p-confirmDialog></p-confirmDialog>

    <div class="page-container">
        <div class="page-header">
            <div>
                <h2 class="page-title"><i class="pi pi-box"></i> Mes Produits</h2>
                <p class="page-subtitle">{{ produits.length }} modèle(s) de produit</p>
            </div>
            <button pButton label="Nouveau produit" icon="pi pi-plus" (click)="openNew()"></button>
        </div>

        <!-- Loading -->
        <div *ngIf="loading" class="flex items-center justify-center p-8">
            <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
            <span class="ml-3 text-600">Chargement...</span>
        </div>

        <!-- Table -->
        <div class="table-card" *ngIf="!loading">
        <p-table [value]="produits" [paginator]="true" [rows]="10"
                 styleClass="custom-table"
                 [tableStyle]="{'min-width': '60rem'}" [rowHover]="true" dataKey="_id"
                 [showCurrentPageReport]="true"
                 currentPageReportTemplate="{first} - {last} sur {totalRecords} produits">

            <ng-template pTemplate="header">
                <tr>
                    <th style="width:5rem">Images</th>
                    <th pSortableColumn="nom_produit">Nom <p-sortIcon field="nom_produit"></p-sortIcon></th>
                    <th>Categories</th>
                    <th>Attributs</th>
                    <th>Variantes</th>
                    <th style="width:12rem">Actions</th>
                </tr>
            </ng-template>

            <ng-template pTemplate="body" let-produit>
                <tr>
                    <td>
                        <div class="relative w-3rem h-3rem border-round overflow-hidden surface-100 flex items-center justify-center">
                            <img *ngIf="produit.images && produit.images.length > 0"
                                 [src]="environment.apiUrl + '/uploads/produits/' + produit.images[0].filename"
                                 [alt]="produit.nom_produit" class="w-full h-full" style="object-fit:cover;" />
                            <i *ngIf="!produit.images || produit.images.length === 0" class="pi pi-image text-xl text-400"></i>
                            <span *ngIf="produit.images && produit.images.length > 1"
                                  class="absolute bottom-0 right-0 bg-primary text-white text-xs px-1 border-round"
                                  style="font-size:9px;">+{{ produit.images.length - 1 }}</span>
                        </div>
                    </td>
                    <td><span class="font-semibold">{{ produit.nom_produit }}</span></td>
                    <td>
                        <span class="text-600 text-sm">{{ getCategorieLabel(produit.id_categorie) }}</span>
                    </td>
                    <td>
                        <span *ngIf="produit.attributs && produit.attributs.length > 0" class="text-600 text-sm">
                            {{ getAttributsLabel(produit.attributs) }}
                        </span>
                        <span *ngIf="!produit.attributs || produit.attributs.length === 0" class="text-400 text-sm">-</span>
                    </td>
                    <td>
                        <div style="display:flex;flex-direction:column;gap:0.3rem;align-items:flex-start;">
                            <p-tag [value]="(produit.variantes?.length || 0) + ' variante(s)'"
                                   severity="info"></p-tag>
                            <ng-container *ngIf="getPromoForProduit(produit._id) as promo">
                                <div class="mp-promo-tag">
                                    <i class="pi pi-percentage" style="font-size:0.65rem;"></i>
                                    {{ promo.nom }} —
                                    {{ promo.type_reduction === 'pourcentage' ? ('-' + promo.valeur_reduction + '%') : ('-' + promo.valeur_reduction + ' DT') }}
                                </div>
                            </ng-container>
                        </div>
                    </td>
                    <td>
                        <div class="flex gap-1">
                            <button pButton icon="pi pi-pencil" [rounded]="true" [text]="true"
                                    pTooltip="Modifier le modele"
                                    severity="info" (click)="editProduit(produit)"></button>
                            <button pButton icon="pi pi-sitemap" [rounded]="true" [text]="true"
                                    pTooltip="Gerer les variantes"
                                    severity="secondary" (click)="openVariantes(produit)"></button>
                            <button pButton icon="pi pi-trash" [rounded]="true" [text]="true"
                                    pTooltip="Supprimer"
                                    severity="danger" (click)="confirmDelete(produit)"></button>
                        </div>
                    </td>
                </tr>
            </ng-template>

            <ng-template pTemplate="emptymessage">
                <tr>
                    <td colspan="6" class="text-center p-8">
                        <i class="pi pi-box text-6xl text-400 mb-3 block"></i>
                        <p class="text-600 text-lg">Aucun produit pour le moment</p>
                        <button pButton label="Creer votre premier produit" icon="pi pi-plus" class="mt-3" (click)="openNew()"></button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
        </div>
    </div>

    <!-- =============================================
         DIALOG 1 : Creer / Modifier le modele produit
    ============================================== -->
    <p-dialog [(visible)]="produitDialog"
              [style]="{width: '720px'}"
              [header]="editMode ? 'Modifier le modele produit' : 'Nouveau modele produit'"
              [modal]="true" [closable]="true">

        <ng-template pTemplate="content">
            <p-fluid>
            <div class="flex flex-col gap-4 pt-2">

                <!-- Images -->
                <div class="flex flex-col gap-2">
                    <label class="font-semibold text-900">Images du produit</label>
                    <div *ngIf="editMode && currentProduit.images && currentProduit.images.length > 0"
                         class="flex flex-wrap gap-3 mb-3">
                        <div *ngFor="let img of currentProduit.images"
                             class="relative border-round overflow-hidden border-2 surface-border"
                             style="width:80px;height:80px;">
                            <img [src]="environment.apiUrl + '/uploads/produits/' + img.filename"
                                 alt="img" class="w-full h-full" style="object-fit:cover;" />
                            <button type="button" (click)="removeExistingImage(img)"
                                class="absolute top-0 right-0 bg-red-500 text-white border-none cursor-pointer p-1"
                                style="width:20px;height:20px;display:flex;align-items:center;justify-content:center;border-radius:0 0 0 4px;">
                                <i class="pi pi-times" style="font-size:10px;"></i>
                            </button>
                        </div>
                    </div>
                    <div *ngIf="newImagePreviews.length > 0" class="flex flex-wrap gap-3 mb-3">
                        <div *ngFor="let preview of newImagePreviews; let i = index"
                             class="relative border-round overflow-hidden border-2 border-primary"
                             style="width:80px;height:80px;">
                            <img [src]="preview" alt="prev" class="w-full h-full" style="object-fit:cover;" />
                            <button type="button" (click)="removeNewImage(i)"
                                class="absolute top-0 right-0 bg-orange-500 text-white border-none cursor-pointer p-1"
                                style="width:20px;height:20px;display:flex;align-items:center;justify-content:center;border-radius:0 0 0 4px;">
                                <i class="pi pi-times" style="font-size:10px;"></i>
                            </button>
                        </div>
                    </div>
                    <p-fileUpload mode="basic" name="images" accept="image/*"
                        [maxFileSize]="10000000" chooseLabel="Ajouter des images"
                        (onSelect)="onImagesSelected($event)" [auto]="false"
                        chooseIcon="pi pi-images" [multiple]="true"></p-fileUpload>
                </div>

                <!-- Nom -->
                <div class="flex flex-col gap-2">
                    <label for="nom" class="font-semibold text-900">Nom du produit <span class="text-red-500">*</span></label>
                    <input pInputText id="nom" [(ngModel)]="currentProduit.nom_produit" placeholder="Ex: T-shirt coton" />
                    <small *ngIf="submitted && !currentProduit.nom_produit" class="text-red-500">Le nom est requis.</small>
                </div>

                <!-- Categories -->
                <div class="surface-50 border-round-lg p-3">
                    <label class="font-semibold text-900 block mb-3">
                        <i class="pi pi-tag mr-2 text-primary"></i>Categories
                    </label>
                    <app-cascade-categorie
                        *ngIf="categorieTree.length > 0"
                        [tree]="categorieTree"
                        [initialIds]="currentCategorieIds"
                        (categoriesChange)="onCategoriesChange($event)">
                    </app-cascade-categorie>
                </div>

                <!-- Attributs de variantes -->
                <div class="surface-50 border-round-lg p-3">
                    <div class="flex items-center justify-between mb-3">
                        <label class="font-semibold text-900">
                            <i class="pi pi-sliders-h mr-2 text-primary"></i>Attributs de variantes
                            <small class="text-500 font-normal ml-2">(optionnel — ex: Taille, Couleur)</small>
                        </label>
                        <button pButton icon="pi pi-plus" label="Ajouter attribut" [text]="true"
                                size="small" (click)="addAttribut()"></button>
                    </div>
                    <div *ngFor="let attr of currentAttributs; let i = index"
                         class="flex items-start gap-3 mb-3 p-3 surface-0 border-round border-1 surface-border">
                        <div class="flex flex-col gap-1 grow basis-0">
                            <label class="text-sm text-600">Nom de l'attribut</label>
                            <input pInputText [(ngModel)]="attr.nom" placeholder="Ex: Taille" />
                        </div>
                        <div class="flex flex-col gap-1 grow-2 basis-0">
                            <label class="text-sm text-600">Valeurs (separees par virgule)</label>
                            <input pInputText [(ngModel)]="attr.valeursStr" placeholder="Ex: S, M, L, XL" />
                        </div>
                        <button pButton icon="pi pi-trash" [rounded]="true" [text]="true"
                                severity="danger" (click)="removeAttribut(i)" class="mt-4"></button>
                    </div>
                    <p *ngIf="currentAttributs.length === 0" class="text-400 text-sm">
                        Aucun attribut — ce produit n'aura pas de variantes (une variante par defaut sera creee).
                    </p>
                </div>

                <!-- Description -->
                <div class="flex flex-col gap-2">
                    <label for="desc" class="font-semibold text-900">Description</label>
                    <textarea pTextarea id="desc" [(ngModel)]="currentProduit.description"
                        rows="3" placeholder="Decrivez votre produit..." [autoResize]="true"></textarea>
                </div>
            </div>
            </p-fluid>
        </ng-template>

        <ng-template pTemplate="footer">
            <button pButton label="Annuler" icon="pi pi-times" [text]="true" (click)="hideDialog()"></button>
            <button pButton [label]="editMode ? 'Enregistrer' : 'Creer'" icon="pi pi-check"
                    (click)="saveProduit()" [loading]="saving"></button>
        </ng-template>
    </p-dialog>

    <!-- =============================================
         DIALOG 2 : Gestion des variantes
    ============================================== -->
    <p-dialog [(visible)]="varianteDialog"
              [style]="{width: '800px'}"
              [header]="'Variantes — ' + (varianteProduit?.nom_produit || '')"
              [modal]="true" [closable]="true">

        <ng-template pTemplate="content">
            <div class="flex flex-col gap-4 pt-2">

                <!-- Tableau variantes existantes -->
                <p-table [value]="varianteProduit?.variantes || []" [tableStyle]="{'min-width':'600px'}">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>Combinaison</th>
                            <th>Reference</th>
                            <th>Stock actuel</th>
                            <th>Prix actuel HT</th>
                            <th style="width:6rem">Actions</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-v>
                        <tr>
                            <td>
                                <span *ngIf="v.is_default" class="text-500 italic">Par defaut</span>
                                <span *ngIf="!v.is_default">
                                    <span *ngFor="let c of v.combinaison; let last=last" class="font-semibold">
                                        {{ c.attribut }}: {{ c.valeur }}<span *ngIf="!last">, </span>
                                    </span>
                                </span>
                            </td>
                            <td>{{ v.reference || '-' }}</td>
                            <td>
                                <p-tag [value]="v.stock + ''"
                                       [severity]="v.stock > 10 ? 'success' : v.stock > 0 ? 'warn' : 'danger'"></p-tag>
                            </td>
                            <td>
                                <span *ngIf="v.historique_prix && v.historique_prix.length > 0">
                                    {{ getPrixActuel(v) | number:'1.0-0' }} {{ getDeviseActuel(v) }}
                                </span>
                                <span *ngIf="!v.historique_prix || v.historique_prix.length === 0" class="text-400">-</span>
                            </td>
                            <td>
                                <button pButton icon="pi pi-trash" [rounded]="true" [text]="true"
                                        severity="danger" (click)="deleteVariante(v)"
                                        [disabled]="v.is_default"></button>
                            </td>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="emptymessage">
                        <tr><td colspan="5" class="text-center p-4 text-400">Aucune variante</td></tr>
                    </ng-template>
                </p-table>

                <!-- Ajouter une variante -->
                <div *ngIf="varianteProduit?.attributs && varianteProduit.attributs.length > 0"
                     class="surface-50 border-round-lg p-4">
                    <h4 class="font-semibold text-900 mb-3">
                        <i class="pi pi-plus-circle mr-2 text-primary"></i>Ajouter une variante
                    </h4>

                    <!-- Selects par attribut -->
                    <div class="flex flex-wrap gap-3 mb-3">
                        <div *ngFor="let attr of varianteProduit.attributs" class="flex flex-col gap-1">
                            <label class="text-sm font-semibold text-700">{{ attr.nom }}</label>
                            <p-select appendTo="body" [options]="attr.valeurs" [(ngModel)]="newVarianteSelection[attr.nom]"
                                [placeholder]="'Choisir ' + attr.nom" styleClass="w-10rem"></p-select>
                        </div>
                        <div class="flex flex-col gap-1">
                            <label class="text-sm font-semibold text-700">Reference (optionnel)</label>
                            <input pInputText [(ngModel)]="newVarianteRef" placeholder="SKU..." class="w-10rem" />
                        </div>
                    </div>

                    <!-- Prix, devise et stock initiaux -->
                    <div class="flex gap-3 mb-3 flex-wrap">
                        <div class="flex flex-col gap-1">
                            <label class="text-sm font-semibold text-700">Devise</label>
                            <p-select appendTo="body" [options]="deviseOptions" [(ngModel)]="newVarianteDevise"
                                      optionLabel="label" optionValue="value" styleClass="w-10rem"
                                      [disabled]="true"></p-select>
                        </div>
                        <div class="flex flex-col gap-1">
                            <label class="text-sm font-semibold text-700">Prix HT initial</label>
                            <input pInputText type="number" [(ngModel)]="newVariantePrix" placeholder="0" class="w-10rem" />
                        </div>
                        <div class="flex flex-col gap-1">
                            <label class="text-sm font-semibold text-700">Stock initial</label>
                            <input pInputText type="number" [(ngModel)]="newVarianteStock" placeholder="0" class="w-8rem" />
                        </div>
                    </div>

                    <button pButton label="Ajouter cette variante" icon="pi pi-plus"
                            (click)="addVariante()" [loading]="savingVariante"></button>
                </div>

                <div *ngIf="!varianteProduit?.attributs || varianteProduit.attributs.length === 0"
                     class="text-400 text-sm surface-50 border-round p-3">
                    <i class="pi pi-info-circle mr-2"></i>
                    Ce produit n'a pas d'attributs de variantes. Modifiez le modele pour en ajouter.
                </div>
            </div>
        </ng-template>

        <ng-template pTemplate="footer">
            <button pButton label="Fermer" icon="pi pi-times" [text]="true" (click)="varianteDialog = false"></button>
        </ng-template>
    </p-dialog>
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
.table-card { background:var(--card); border-radius:var(--radius); border:1px solid var(--border); box-shadow:var(--shadow); overflow:hidden; }
::ng-deep .custom-table .p-datatable-thead > tr > th { background:var(--border-100) !important; color:var(--text-600) !important; font-size:0.75rem !important; font-weight:600 !important; text-transform:uppercase !important; letter-spacing:0.05em !important; padding:0.875rem 1rem !important; border-bottom:1px solid var(--border) !important; border-right:none !important; border-top:none !important; border-left:none !important; }
::ng-deep .custom-table .p-datatable-tbody > tr { background:#fff !important; color:var(--text-900) !important; transition:background 0.15s; }
::ng-deep .custom-table .p-datatable-tbody > tr:hover { background:#fefce8 !important; }
::ng-deep .custom-table .p-datatable-tbody > tr > td { padding:1rem !important; border-bottom:1px solid var(--border-100) !important; border-right:none !important; border-left:none !important; border-top:none !important; }
::ng-deep .custom-table .p-paginator { background:var(--border-100) !important; border-top:1px solid var(--border) !important; padding:0.75rem 1.5rem !important; border-bottom:none !important; border-left:none !important; border-right:none !important; }
::ng-deep .custom-table .p-paginator .p-paginator-pages .p-paginator-page { color:var(--text-600) !important; border-radius:0.375rem; font-weight:500; }
::ng-deep .custom-table .p-paginator .p-paginator-pages .p-paginator-page.p-highlight { background:var(--primary) !important; color:#fff !important; }
.mp-promo-tag { display:inline-flex; align-items:center; gap:0.3rem; background:#fef3c7; color:#b45309; font-size:0.7rem; font-weight:700; padding:0.15rem 0.6rem; border-radius:10px; border:1px solid #fcd34d; }
::ng-deep .p-button:not(.p-button-text):not(.p-button-outlined):not(.p-button-link) { background:var(--primary) !important; border-color:var(--primary) !important; color:#fff !important; }
::ng-deep .p-button:not(.p-button-text):not(.p-button-outlined):not(.p-button-link):enabled:hover { background:var(--primary-dark) !important; border-color:var(--primary-dark) !important; }
    `]
})
export class MesProduits implements OnInit {
    protected environment = environment;

    produits: any[] = [];
    loading = true;
    categorieTree: CategorieNode[] = [];

    // Dialog 1 : Modele produit
    produitDialog = false;
    editMode = false;
    submitted = false;
    saving = false;
    currentProduit: any = {};
    currentCategorieIds: string[] = [];
    selectedCategorieIds: string[] = [];
    currentAttributs: Array<{ nom: string; valeursStr: string }> = [];
    selectedImages: File[] = [];
    newImagePreviews: string[] = [];
    imagesToDelete: string[] = [];

    deviseOptions = [
        { label: 'AR — Ariary Malgache', value: 'AR' },
        { label: 'DT — Dinar Tunisien', value: 'DT' },
        { label: 'EUR — Euro', value: 'EUR' },
        { label: 'USD — Dollar US', value: 'USD' },
        { label: 'MAD — Dirham Marocain', value: 'MAD' },
        { label: 'DZD — Dinar Algérien', value: 'DZD' }
    ];

    // Dialog 2 : Variantes
    varianteDialog = false;
    varianteProduit: any = null;
    savingVariante = false;
    newVarianteSelection: { [key: string]: string } = {};
    newVarianteRef = '';
    newVariantePrix: number | null = null;
    newVarianteDevise = 'AR';
    newVarianteStock = 0;

    myActivePromos: any[] = [];

    constructor(
        private produitService: ProduitService,
        private categorieService: CategorieService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private promotionService: PromotionService
    ) {}

    ngOnInit() {
        this.loadProduits();
        this.loadCategorieTree();
        this.promotionService.getMyPromotions().subscribe({
            next: (promos) => {
                const now = new Date();
                this.myActivePromos = promos.filter(p =>
                    p.actif && new Date(p.date_debut) <= now && new Date(p.date_fin) >= now
                );
            },
            error: () => {}
        });
    }

    loadProduits() {
        this.loading = true;
        this.produitService.getMyProducts().subscribe({
            next: (data) => { this.produits = data; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    loadCategorieTree() {
        this.categorieService.getCategorieTree().subscribe({
            next: (data) => { this.categorieTree = data; },
            error: (err) => console.error(err)
        });
    }

    // ---- Dialog 1 : Modele produit ----

    openNew() {
        this.currentProduit = {};
        this.currentCategorieIds = [];
        this.selectedCategorieIds = [];
        this.currentAttributs = [];
        this.resetImageState();
        this.submitted = false;
        this.editMode = false;
        this.produitDialog = true;
    }

    editProduit(produit: any) {
        this.currentProduit = { ...produit, images: produit.images ? [...produit.images] : [] };
        this.currentCategorieIds = (produit.id_categorie || []).map((c: any) =>
            typeof c === 'object' ? (c._id || c.id)?.toString() : c?.toString()
        );
        this.selectedCategorieIds = [...this.currentCategorieIds];
        this.currentAttributs = (produit.attributs || []).map((a: any) => ({
            nom: a.nom,
            valeursStr: (a.valeurs || []).join(', ')
        }));
        this.resetImageState();
        this.submitted = false;
        this.editMode = true;
        this.produitDialog = true;
    }

    hideDialog() {
        this.produitDialog = false;
        this.submitted = false;
    }

    addAttribut() {
        this.currentAttributs.push({ nom: '', valeursStr: '' });
    }

    removeAttribut(index: number) {
        this.currentAttributs.splice(index, 1);
    }

    onCategoriesChange(ids: string[]) { this.selectedCategorieIds = ids; }

    onImagesSelected(event: any) {
        const files: File[] = Array.from(event.currentFiles || event.files || []);
        for (const file of files) {
            if (this.selectedImages.length + (this.currentProduit.images?.length || 0) >= 10) break;
            this.selectedImages.push(file);
            this.newImagePreviews.push(URL.createObjectURL(file));
        }
    }

    removeNewImage(index: number) {
        URL.revokeObjectURL(this.newImagePreviews[index]);
        this.selectedImages.splice(index, 1);
        this.newImagePreviews.splice(index, 1);
    }

    removeExistingImage(img: any) {
        this.imagesToDelete.push(img._id);
        this.currentProduit.images = this.currentProduit.images.filter((i: any) => i._id !== img._id);
    }

    private resetImageState() {
        this.newImagePreviews.forEach(url => URL.revokeObjectURL(url));
        this.selectedImages = [];
        this.newImagePreviews = [];
        this.imagesToDelete = [];
    }

    saveProduit() {
        this.submitted = true;
        if (!this.currentProduit.nom_produit) return;

        this.saving = true;
        const formData = new FormData();
        formData.append('nom_produit', this.currentProduit.nom_produit);
        if (this.currentProduit.description) formData.append('description', this.currentProduit.description);
        formData.append('id_categorie', JSON.stringify(this.selectedCategorieIds));

        // Convertir attributs (valeursStr → valeurs array)
        const attributs = this.currentAttributs
            .filter(a => a.nom.trim())
            .map(a => ({
                nom: a.nom.trim(),
                valeurs: a.valeursStr.split(',').map(v => v.trim()).filter(Boolean)
            }));
        formData.append('attributs', JSON.stringify(attributs));

        for (const file of this.selectedImages) {
            formData.append('images', file, file.name);
        }

        const op = this.editMode
            ? this.produitService.updateProduct(this.currentProduit._id, formData)
            : this.produitService.createProduct(formData);

        op.subscribe({
            next: () => {
                if (this.editMode && this.imagesToDelete.length > 0) {
                    Promise.all(
                        this.imagesToDelete.map(id =>
                            this.produitService.deleteProductImage(this.currentProduit._id, id).toPromise().catch(() => null)
                        )
                    ).then(() => this.onSaveSuccess());
                } else {
                    this.onSaveSuccess();
                }
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Operation echouee', life: 3000 });
                this.saving = false;
            }
        });
    }

    private onSaveSuccess() {
        const msg = this.editMode ? 'Produit modifie' : 'Produit cree';
        this.messageService.add({ severity: 'success', summary: 'Succes', detail: msg, life: 3000 });
        this.produitDialog = false;
        this.saving = false;
        this.resetImageState();
        this.loadProduits();
    }

    confirmDelete(produit: any) {
        this.confirmationService.confirm({
            message: `Supprimer "${produit.nom_produit}" et toutes ses variantes ?`,
            header: 'Confirmer la suppression',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Supprimer',
            rejectLabel: 'Annuler',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.produitService.deleteProduct(produit._id).subscribe({
                    next: () => {
                        this.produits = this.produits.filter(p => p._id !== produit._id);
                        this.messageService.add({ severity: 'success', summary: 'Succes', detail: 'Produit supprime', life: 3000 });
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppression echouee', life: 3000 });
                    }
                });
            }
        });
    }

    // ---- Dialog 2 : Variantes ----

    openVariantes(produit: any) {
        this.varianteProduit = produit;
        this.newVarianteSelection = {};
        this.newVarianteRef = '';
        this.newVariantePrix = null;
        this.newVarianteDevise = 'AR';
        this.newVarianteStock = 0;
        this.varianteDialog = true;
    }

    addVariante() {
        if (!this.varianteProduit) return;
        const attrs = this.varianteProduit.attributs || [];
        const combinaison = attrs.map((a: any) => ({
            attribut: a.nom,
            valeur: this.newVarianteSelection[a.nom] || ''
        }));

        this.savingVariante = true;
        this.produitService.addVariante(this.varianteProduit._id, {
            combinaison,
            reference: this.newVarianteRef,
            stock: this.newVarianteStock || 0,
            prix_hors_taxe: this.newVariantePrix,
            devise: this.newVarianteDevise || 'AR'
        }).subscribe({
            next: (res) => {
                // Mettre a jour le produit local
                this.varianteProduit = res.produit;
                const idx = this.produits.findIndex(p => p._id === res.produit._id);
                if (idx > -1) this.produits[idx] = res.produit;
                this.newVarianteSelection = {};
                this.newVarianteRef = '';
                this.newVariantePrix = null;
                this.newVarianteDevise = 'AR';
                this.newVarianteStock = 0;
                this.savingVariante = false;
                this.messageService.add({ severity: 'success', summary: 'Succes', detail: 'Variante ajoutee', life: 3000 });
            },
            error: () => {
                this.savingVariante = false;
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Ajout echoue', life: 3000 });
            }
        });
    }

    deleteVariante(variante: any) {
        if (!this.varianteProduit) return;
        this.produitService.deleteVariante(this.varianteProduit._id, variante._id).subscribe({
            next: (res) => {
                this.varianteProduit = res.produit;
                const idx = this.produits.findIndex(p => p._id === res.produit._id);
                if (idx > -1) this.produits[idx] = res.produit;
                this.messageService.add({ severity: 'success', summary: 'Succes', detail: 'Variante supprimee', life: 3000 });
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppression echouee', life: 3000 });
            }
        });
    }

    // ---- Helpers ----

    getPrixActuel(variante: any): number {
        if (!variante.historique_prix || variante.historique_prix.length === 0) return 0;
        const sorted = [...variante.historique_prix].sort(
            (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        return sorted[0].prix_hors_taxe;
    }

    getDeviseActuel(variante: any): string {
        if (!variante.historique_prix || variante.historique_prix.length === 0) return 'DT';
        const sorted = [...variante.historique_prix].sort(
            (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        return sorted[0].devise || 'AR';
    }

    getPromoForProduit(produitId: string): any | null {
        return this.myActivePromos.find(promo =>
            promo.produits && promo.produits.some((p: any) => (p._id || p) === produitId)
        ) || null;
    }

    getCategorieLabel(cats: any[]): string {
        if (!cats || cats.length === 0) return '-';
        return cats.map((c: any) => typeof c === 'object' ? c.nom || '' : '').filter(Boolean).join(' > ') || '-';
    }

    getAttributsLabel(attributs: any[]): string {
        if (!attributs || attributs.length === 0) return '-';
        return attributs.map((a: any) => a.nom).filter(Boolean).join(', ');
    }
}
