import { BoutiqueService } from "@/pages/service/boutique.service";
import { CustomerService } from "@/pages/service/customer.service";
import { ProductService } from "@/pages/service/product.service";
import { CommonModule } from "@angular/common";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { DatePickerModule } from "primeng/datepicker";
import { FileUploadModule } from "primeng/fileupload";
import { FluidModule } from "primeng/fluid";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { ProgressBarModule } from "primeng/progressbar";
import { RatingModule } from "primeng/rating";
import { RippleModule } from "primeng/ripple";
import { SelectModule } from "primeng/select";
import { SliderModule } from "primeng/slider";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { TextareaModule } from "primeng/textarea";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { environment } from '@env/environment';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector:'app-validationBoutique',
    imports: [
       TableModule,
        MultiSelectModule,
        SelectModule,
        InputIconModule,
        TagModule,
        InputTextModule,
        SliderModule,
        ProgressBarModule,
        ToggleButtonModule,
        ToastModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        RatingModule,
        RippleModule,
        IconFieldModule
    ],
     template:`
    <div class="page-container">
        <div class="page-header">
            <h2 class="page-title">
                <i class="pi pi-check-circle"></i>
                Validation des boutiques
            </h2>
        </div>

        <p-toast></p-toast>

        <div class="table-card">
            <p-table
                #dt
                [value]="boutique"
                dataKey="id"
                [rows]="10"
                [paginator]="true"
                [rowHover]="true"
                styleClass="custom-table"
                [globalFilterFields]="['managerName','name','categorie','location']"
            >
                <ng-template pTemplate="caption">
                    <div class="caption-bar">
                        <button
                            pButton
                            type="button"
                            label="Effacer"
                            icon="pi pi-times"
                            class="clear-btn"
                            (click)="dt.clear()">
                        </button>
                        <div class="search-wrap">
                            <i class="pi pi-search"></i>
                            <input
                                pInputText
                                type="text"
                                class="search-input"
                                placeholder="Recherche globale..."
                                (input)="dt.filterGlobal($any($event.target).value, 'contains')" />
                        </div>
                    </div>
                </ng-template>

                <ng-template pTemplate="header">
                    <tr>
                        <th>
                            Manager
                            <input pInputText type="text" placeholder="Filtrer..."
                                (input)="dt.filter($any($event.target).value, 'managerName', 'contains')" />
                        </th>
                        <th>
                            Nom Boutique
                            <input pInputText type="text" placeholder="Filtrer..."
                                (input)="dt.filter($any($event.target).value, 'name', 'contains')" />
                        </th>
                        <th>
                            Catégorie
                            <input pInputText type="text" placeholder="Filtrer..."
                                (input)="dt.filter($any($event.target).value, 'categorie', 'contains')" />
                        </th>
                        <th>
                            Localisation
                            <input pInputText type="text" placeholder="Filtrer..."
                                (input)="dt.filter($any($event.target).value, 'location', 'contains')" />
                        </th>
                    </tr>
                </ng-template>

                <ng-template pTemplate="body" let-shop>
                    <tr class="clickable-row">
                        <td (click)="viewDetail(shop)">
                            <div class="manager-cell">
                                @if (shop.avatar) {
                                    <img [src]="shop.avatar" width="36" height="36" class="avatar-img" alt="Avatar">
                                } @else {
                                    <div class="avatar-placeholder">
                                        <i class="pi pi-user"></i>
                                    </div>
                                }
                                <span>{{ shop.managerName }}</span>
                            </div>
                        </td>
                        <td (click)="viewDetail(shop)">
                            <span class="shop-name">{{ shop.name }}</span>
                        </td>
                        <td (click)="viewDetail(shop)">
                            <span class="category-badge">{{ shop.categorie }}</span>
                        </td>
                        <td (click)="viewDetail(shop)">
                            <div class="location-cell">
                                <i class="pi pi-map-marker"></i>
                                <span>{{ shop.location }}</span>
                            </div>
                        </td>
                    </tr>
                </ng-template>

                <ng-template pTemplate="emptymessage">
                    <tr>
                        <td colspan="4" style="text-align:center; padding:3rem; color:var(--text-400);">
                            <i class="pi pi-inbox" style="font-size:2rem; display:block; margin-bottom:.75rem;"></i>
                            Aucune boutique en attente de validation
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    </div>
    `,
   styles: [`
:host {
    --primary: #f59e0b;
    --primary-dark: #d97706;
    --card: #ffffff;
    --text-900: #0f172a;
    --text-600: #475569;
    --text-400: #94a3b8;
    --border: #e2e8f0;
    --border-100: #f8fafc;
    --shadow: 0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04);
    --shadow-lg: 0 4px 8px rgba(15,23,42,0.06), 0 12px 28px rgba(15,23,42,0.08);
    --radius: 1rem;
}

.page-container { padding: 2rem; }

.page-header { margin-bottom: 2rem; }

.page-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-900);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0;
}

.page-title i {
    color: var(--primary);
    font-size: 1.5rem;
}

.table-card {
    background: var(--card);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    overflow: hidden;
}

.caption-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    background: var(--card);
    border-bottom: 1px solid var(--border);
}

.search-wrap {
    position: relative;
    flex: 1;
    max-width: 400px;
}

.search-wrap i {
    position: absolute;
    left: 0.875rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-400);
    pointer-events: none;
    font-size: 0.875rem;
}

.search-input {
    width: 100%;
    padding: 0.625rem 1rem 0.625rem 2.25rem;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    background: var(--border-100);
    color: var(--text-900);
    font-size: 0.875rem;
    transition: border-color 0.15s, box-shadow 0.15s;
}

.search-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(245,158,11,0.1);
    background: #fff;
}

.search-input::placeholder { color: var(--text-400); }

::ng-deep .clear-btn {
    background: #fff !important;
    border: 1px solid var(--border) !important;
    color: var(--text-600) !important;
    font-size: 0.875rem !important;
    padding: 0.625rem 1rem !important;
    border-radius: 0.5rem !important;
    transition: all 0.15s !important;
    white-space: nowrap;
}

::ng-deep .clear-btn:enabled:hover {
    border-color: #ef4444 !important;
    color: #ef4444 !important;
    background: #fef2f2 !important;
}

::ng-deep .custom-table .p-datatable-thead > tr > th {
    background: var(--border-100) !important;
    color: var(--text-600) !important;
    font-size: 0.75rem !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em !important;
    padding: 0.875rem 1rem !important;
    border-bottom: 1px solid var(--border) !important;
    border-right: none !important;
    border-top: none !important;
    border-left: none !important;
}

::ng-deep .custom-table .p-datatable-thead > tr > th input[pInputText] {
    width: 100%;
    padding: 0.375rem 0.625rem;
    margin-top: 0.5rem;
    border: 1px solid var(--border);
    border-radius: 0.375rem;
    background: #fff;
    color: var(--text-900);
    font-size: 0.8rem;
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0;
    transition: border-color 0.15s;
}

::ng-deep .custom-table .p-datatable-thead > tr > th input[pInputText]:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(245,158,11,0.1);
}

::ng-deep .custom-table .p-datatable-thead > tr > th input[pInputText]::placeholder {
    color: var(--text-400);
    font-style: normal;
}

::ng-deep .custom-table .p-datatable-tbody > tr {
    background: #fff !important;
    color: var(--text-900) !important;
    transition: background 0.15s;
}

.clickable-row { cursor: pointer; }

::ng-deep .custom-table .p-datatable-tbody > tr:hover {
    background: #fefce8 !important;
}

::ng-deep .custom-table .p-datatable-tbody > tr > td {
    padding: 1rem !important;
    border-bottom: 1px solid var(--border-100) !important;
    border-right: none !important;
    border-left: none !important;
    border-top: none !important;
}

::ng-deep .custom-table .p-paginator {
    background: var(--border-100) !important;
    border-top: 1px solid var(--border) !important;
    padding: 0.75rem 1.5rem !important;
    border-bottom: none !important;
    border-left: none !important;
    border-right: none !important;
}

::ng-deep .custom-table .p-paginator .p-paginator-pages .p-paginator-page {
    color: var(--text-600) !important;
    border-radius: 0.375rem;
    font-weight: 500;
    min-width: 2.25rem;
    height: 2.25rem;
    margin: 0 0.125rem;
    transition: background 0.15s;
}

::ng-deep .custom-table .p-paginator .p-paginator-pages .p-paginator-page:hover {
    background: var(--border) !important;
}

::ng-deep .custom-table .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
    background: var(--primary) !important;
    color: #fff !important;
}

.manager-cell {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.avatar-img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--border);
}

.avatar-placeholder {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #1e3a5f;
    border: 2px solid var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    font-size: 1rem;
    flex-shrink: 0;
}

.shop-name { font-weight: 600; color: var(--text-900); }

.category-badge {
    display: inline-block;
    padding: 0.25rem 0.625rem;
    background: #eff6ff;
    color: #1d4ed8;
    border: 1px solid #bfdbfe;
    border-radius: 9999px;
    font-weight: 500;
    font-size: 0.8rem;
}

.location-cell {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-600);
}

.location-cell i { color: var(--primary); font-size: 0.875rem; }

@media (max-width: 768px) {
    .page-container { padding: 1rem; }
    .page-title { font-size: 1.375rem; }
    .caption-bar { flex-direction: column; align-items: stretch; }
    .search-wrap { max-width: 100%; }
}
        `],
        providers: [ConfirmationService, MessageService, CustomerService, ProductService]
})
export class ValidationBoutique{
    boutique : any[] = [];

     @ViewChild('filter') filter!: ElementRef;

    constructor(
        private boutiqueService:BoutiqueService,
        private router:Router
    ) {}
    baseUrl = environment.apiUrl;

    
    approveShop(shop: any) {
        // Logique de validation
        console.log('Boutique validée:', shop);
    }

    rejectShop(shop: any) {
        // Logique de refus
        console.log('Boutique refusée:', shop);
    }
    loadBoutique()
    {
        this.boutiqueService.getAllBoutiquePending().subscribe({

            next: (data: any[]) => {
                    this.boutique = data.map((shop: any) => ({
                    id: shop._id,
                    name: shop.nom_boutique,
                    categorie: shop.id_categorie?.nom || 'Non défini',
                    location: shop.location || 'Non défini',
                    rating: shop.rating || 0,
                
                    managerId: shop.manager_id?._id || null,   
                    
                    
                    managerName: shop.manager_id 
                        ? `${shop.manager_id.nom_client || ''} ${shop.manager_id.prenom_client || ''}`.trim() || 'Non assigné'
                        : 'Non assigné',

                    numero_telephone:shop.manager_id
                        ?`${shop.manager_id.numero_telephone}`:'',
                    
                    avatar: shop.manager_id?.avatar?.length
                        ? `${this.baseUrl}${shop.manager_id.avatar[0].url}`
                        : null,

                
                    
                }));


                console.log('Boutiques chargées:', this.boutique);
            },
            error: (err) => {
                console.error('Erreur:', err);
            }

        });
    }

    viewDetail(shop:any)
    {
        console.log(shop);
        this.router.navigate(['/admin/home/viewDetailDemandeBoutique', shop.managerId],{
            state:{ shopData:shop }
        });
    }

     ngOnInit() {
        this.loadBoutique();
    }
}