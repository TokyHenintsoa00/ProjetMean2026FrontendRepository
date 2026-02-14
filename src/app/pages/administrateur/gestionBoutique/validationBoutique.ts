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
    <div class="card">
    <div class="table-header">
        <h2 class="table-title">
            <i class="pi pi-filter"></i>
            Liste des Clients - Filtrage Avancé
        </h2>
        <p class="table-subtitle">Gérez et filtrez vos clients efficacement</p>
    </div>

    <p-toast></p-toast>

    <p-table
        #dt
        [value]="boutique"
        dataKey="id"
        [rows]="10"
        [paginator]="true"
        [rowHover]="true"
        [showGridlines]="true"
        styleClass="custom-table"
        [globalFilterFields]="['managerName','name','categorie','location']"
    >
        <!-- 🔎 RECHERCHE GLOBALE -->
        <ng-template pTemplate="caption">
            <div class="table-caption">
                <button 
                    pButton 
                    type="button" 
                    label="Effacer"
                    icon="pi pi-times"
                    class="clear-btn"
                    (click)="dt.clear()">
                </button>

                <span class="search-field p-input-icon-left">
                    <i class="pi pi-search"></i>
                    <input 
                        pInputText
                        type="text"
                        class="search-input"
                        placeholder="Recherche globale..."
                        (input)="dt.filterGlobal($any($event.target).value, 'contains')" />
                </span>
            </div>
        </ng-template>

        <!-- HEADER AVEC FILTRES MANUELS -->
        <ng-template pTemplate="header">
            <tr>
                <th>
                    Manager
                    <input 
                        pInputText
                        type="text"
                        placeholder="Filtrer..."
                        (input)="dt.filter($any($event.target).value, 'managerName', 'contains')"
                        style="width:100%; margin-top:5px;" />
                </th>

                <th>
                    Nom Boutique
                    <input 
                        pInputText
                        type="text"
                        placeholder="Filtrer..."
                        (input)="dt.filter($any($event.target).value, 'name', 'contains')"
                        style="width:100%; margin-top:5px;" />
                </th>

                <th>
                    Catégorie
                    <input 
                        pInputText
                        type="text"
                        placeholder="Filtrer..."
                        (input)="dt.filter($any($event.target).value, 'categorie', 'contains')"
                        style="width:100%; margin-top:5px;" />
                </th>

                <th>
                    Localisation
                    <input 
                        pInputText
                        type="text"
                        placeholder="Filtrer..."
                        (input)="dt.filter($any($event.target).value, 'location', 'contains')"
                        style="width:100%; margin-top:5px;" />
                </th>

                
                <th style="width: 150px; text-align: center;">Actions</th>
            </tr>
        </ng-template>

        <!-- BODY -->
        <ng-template pTemplate="body" let-shop>
            <tr class="clickable-row">
                <td (click)="viewDetail(shop)">
                    <div class="manager-cell">
                        <img *ngIf="shop.avatar"
                            [src]="shop.avatar"
                            width="40"
                            height="40"
                            class="avatar-img"
                            alt="Avatar">
                        <div *ngIf="!shop.avatar" class="avatar-placeholder">
                            <i class="pi pi-user"></i>
                        </div>
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

                

                <td style="text-align: center;">
                    <button 
                        pButton 
                        type="button"
                        icon="pi pi-check"
                        class="p-button-rounded p-button-success p-button-text"
                        (click)="approveShop(shop)"
                        pTooltip="Valider"
                        tooltipPosition="top"
                        style="margin-right: 5px;">
                    </button>
                    <button 
                        pButton 
                        type="button"
                        icon="pi pi-times"
                        class="p-button-rounded p-button-danger p-button-text"
                        (click)="rejectShop(shop)"
                        pTooltip="Refuser"
                        tooltipPosition="top">
                    </button>
                </td>
            </tr>
        </ng-template>
    </p-table>
</div>
    `,
   styles: [`

    /* ============================================
   VARIABLES DU THÈME - TURQUOISE/TEAL
   ============================================ */
:host {
    --primary-color: #10b981;
    --primary-light: #34d399;
    --primary-dark: #059669;
    --primary-darker: #047857;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
    --info-color: #14b8a6;
    
    --bg-primary: #ffffff;
    --bg-secondary: #f9fafb;
    --bg-hover: #f0fdfa;
    --bg-input: #f8fafc;
    
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
    --text-light: #9ca3af;
    
    --border-color: #e5e7eb;
    --border-color-light: #f3f4f6;
    
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* ============================================
   CARD PRINCIPALE
   ============================================ */
.card {
    background: var(--bg-primary);
    border-radius: 1.5rem;
    box-shadow: var(--shadow-xl);
    padding: 2.5rem;
    transition: all 0.3s ease;
    animation: fadeInUp 0.5s ease;
    border: 1px solid rgba(16, 185, 129, 0.08);
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ============================================
   EN-TÊTE DU TABLEAU
   ============================================ */
.table-header {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid var(--border-color-light);
    position: relative;
}

.table-header::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 120px;
    height: 2px;
    background: linear-gradient(90deg, var(--primary-color), transparent);
}

.table-title {
    font-size: 2rem;
    font-weight: 800;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.table-title i {
    color: var(--primary-color);
    -webkit-text-fill-color: var(--primary-color);
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.85; }
}

.table-subtitle {
    color: var(--text-secondary);
    font-size: 1rem;
    margin: 0;
    padding-left: 2.25rem;
    font-weight: 500;
}

/* ============================================
   CAPTION DU TABLEAU - ZONE DE RECHERCHE
   ============================================ */
.table-caption {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.25rem;
    padding: 1.5rem 2rem;
    background: linear-gradient(135deg, #f0fdfa 0%, #d1fae5 100%);
    border-radius: 1rem;
    margin-bottom: 1.5rem;
    border: 2px solid rgba(16, 185, 129, 0.15);
    box-shadow: var(--shadow-lg);
    position: relative;
    overflow: hidden;
}

.table-caption::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-color), var(--info-color), var(--primary-color));
    background-size: 200% 100%;
    animation: gradientSlide 3s ease infinite;
}

@keyframes gradientSlide {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

/* ============================================
   BOUTON EFFACER - DESIGN AMÉLIORÉ
   ============================================ */
::ng-deep .clear-btn {
    position: relative;
    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%) !important;
    border: 2px solid var(--danger-color) !important;
    color: var(--danger-color) !important;
    font-weight: 700 !important;
    padding: 0.75rem 1.75rem !important;
    border-radius: 0.75rem !important;
    font-size: 0.95rem !important;
    letter-spacing: 0.025em;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    box-shadow: 0 4px 6px rgba(239, 68, 68, 0.15) !important;
    overflow: visible !important;
}

::ng-deep .clear-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: var(--danger-color);
    transform: translate(-50%, -50%);
    transition: width 0.4s ease, height 0.4s ease;
    z-index: 0;
}

::ng-deep .clear-btn:enabled:hover {
    background: var(--danger-color) !important;
    color: white !important;
    transform: translateY(-3px) scale(1.05) !important;
    box-shadow: 0 8px 16px rgba(239, 68, 68, 0.3) !important;
    border-color: #dc2626 !important;
}

::ng-deep .clear-btn:enabled:hover::before {
    width: 300px;
    height: 300px;
}

::ng-deep .clear-btn:enabled:active {
    transform: translateY(-1px) scale(1.02) !important;
    box-shadow: 0 4px 8px rgba(239, 68, 68, 0.25) !important;
}

::ng-deep .clear-btn .p-button-label,
::ng-deep .clear-btn .p-button-icon {
    position: relative;
    z-index: 1;
}

::ng-deep .clear-btn:enabled:hover .p-button-icon {
    transform: rotate(90deg);
    transition: transform 0.3s ease;
}

::ng-deep .clear-btn .p-button-icon-left {
    margin-right: 0.5rem;
}

/* ============================================
   CHAMP DE RECHERCHE - DESIGN MODERNE
   ============================================ */
.search-field {
    position: relative;
    flex: 1;
    max-width: 500px;
    min-width: 280px;
}

.search-field .pi-search {
    position: absolute;
    left: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--primary-color);
    font-size: 1.1rem;
    z-index: 2;
    transition: all 0.3s ease;
    pointer-events: none;
}

.search-input {
    width: 100%;
    padding: 0.875rem 1.25rem 0.875rem 3.25rem;
    border: 2px solid transparent;
    border-radius: 0.875rem;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    position: relative;
}

.search-input:hover {
    border-color: rgba(16, 185, 129, 0.3);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
}

.search-input:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15),
                0 4px 16px rgba(16, 185, 129, 0.2);
    transform: translateY(-1px);
}

.search-field:has(.search-input:focus) .pi-search {
    color: var(--primary-dark);
    transform: translateY(-50%) scale(1.1);
}

.search-input::placeholder {
    color: var(--text-light);
    font-weight: 400;
    transition: color 0.3s ease;
}

.search-input:focus::placeholder {
    color: transparent;
}

/* Effet de brillance sur le champ de recherche */
.search-field::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
    );
    transition: left 0.5s ease;
    pointer-events: none;
    border-radius: 0.875rem;
}

.search-field:hover::after {
    left: 100%;
}

/* ============================================
   EN-TÊTES DE COLONNES
   ============================================ */
::ng-deep .custom-table .p-datatable-thead > tr > th {
    background: linear-gradient(to bottom, #f0fdfa, #d1fae5) !important;
    color: var(--text-primary) !important;
    border-bottom: 3px solid var(--primary-color) !important;
    padding: 1rem !important;
    font-weight: 700;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-top: 1px solid var(--border-color-light) !important;
    border-left: none !important;
    border-right: 1px solid var(--border-color-light) !important;
    position: relative;
}

::ng-deep .custom-table .p-datatable-thead > tr > th:first-child {
    border-left: 1px solid var(--border-color-light) !important;
    border-top-left-radius: 0.75rem;
}

::ng-deep .custom-table .p-datatable-thead > tr > th:last-child {
    border-top-right-radius: 0.75rem;
}

::ng-deep .custom-table .p-datatable-thead > tr > th::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-color), var(--info-color));
    opacity: 0;
    transition: opacity 0.3s ease;
}

::ng-deep .custom-table .p-datatable-thead > tr > th:hover::after {
    opacity: 1;
}

/* Inputs de filtrage dans les headers */
::ng-deep .custom-table .p-datatable-thead > tr > th input[pInputText] {
    width: 100%;
    padding: 0.625rem 0.875rem;
    margin-top: 0.625rem;
    border: 2px solid var(--border-color);
    border-radius: 0.625rem;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

::ng-deep .custom-table .p-datatable-thead > tr > th input[pInputText]:hover {
    border-color: rgba(16, 185, 129, 0.4);
    box-shadow: 0 2px 6px rgba(16, 185, 129, 0.1);
}

::ng-deep .custom-table .p-datatable-thead > tr > th input[pInputText]:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15),
                0 2px 8px rgba(16, 185, 129, 0.15);
    background: var(--bg-primary);
    transform: scale(1.02);
}

::ng-deep .custom-table .p-datatable-thead > tr > th input[pInputText]::placeholder {
    color: var(--text-light);
    font-weight: 400;
    font-style: italic;
}

/* ============================================
   CORPS DU TABLEAU
   ============================================ */
::ng-deep .custom-table .p-datatable-tbody > tr {
    background: var(--bg-primary) !important;
    color: var(--text-primary) !important;
    transition: all 0.2s ease;
    border-left: 3px solid transparent;
}

.clickable-row {
    cursor: pointer;
}

::ng-deep .custom-table .p-datatable-tbody > tr:hover {
    background: linear-gradient(to right, #ecfdf5, var(--bg-primary)) !important;
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);
    border-left-color: var(--primary-color);
}

::ng-deep .custom-table .p-datatable-tbody > tr > td {
    padding: 1.25rem 1rem !important;
    border-bottom: 1px solid var(--border-color-light) !important;
    border-right: 1px solid var(--border-color-light) !important;
    border-left: none !important;
    transition: background 0.2s ease;
}

::ng-deep .custom-table .p-datatable-tbody > tr > td:first-child {
    border-left: 1px solid var(--border-color-light) !important;
}

/* ============================================
   STYLES DES CELLULES
   ============================================ */
.manager-cell {
    display: flex;
    align-items: center;
    gap: 10px;
}

.avatar-img {
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--border-color-light);
    transition: all 0.3s ease;
}

.avatar-img:hover {
    border-color: var(--primary-color);
    transform: scale(1.1);
}

.avatar-placeholder {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
}

.shop-name {
    font-weight: 600;
    color: var(--text-primary);
}

.category-badge {
    display: inline-block;
    padding: 0.375rem 0.875rem;
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
    color: #1e40af;
    border-radius: 9999px;
    font-weight: 600;
    font-size: 0.875rem;
}

.location-cell {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
}

.location-cell i {
    color: var(--primary-color);
}

/* ============================================
   BOUTON VOIR LE PROFIL
   ============================================ */
::ng-deep .view-btn {
    transition: all 0.3s ease !important;
}

::ng-deep .view-btn:enabled:hover {
    background: var(--primary-color) !important;
    color: white !important;
    transform: scale(1.15);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3) !important;
}

/* ============================================
   PAGINATION
   ============================================ */
::ng-deep .custom-table .p-paginator {
    background: linear-gradient(to bottom, #f0fdfa, #d1fae5) !important;
    color: var(--text-primary) !important;
    border-top: 2px solid var(--primary-color) !important;
    border-bottom: 1px solid var(--border-color-light) !important;
    border-left: 1px solid var(--border-color-light) !important;
    border-right: 1px solid var(--border-color-light) !important;
    padding: 1rem 1.5rem !important;
    border-radius: 0 0 1rem 1rem;
}

::ng-deep .custom-table .p-paginator .p-paginator-pages .p-paginator-page {
    color: var(--text-primary) !important;
    border-radius: 0.625rem;
    transition: all 0.2s ease;
    font-weight: 600;
    min-width: 2.75rem;
    height: 2.75rem;
    margin: 0 0.25rem;
}

::ng-deep .custom-table .p-paginator .p-paginator-pages .p-paginator-page:hover {
    background: var(--bg-hover) !important;
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
}

::ng-deep .custom-table .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark)) !important;
    color: white !important;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    transform: scale(1.1);
}

::ng-deep .custom-table .p-paginator .p-paginator-first,
::ng-deep .custom-table .p-paginator .p-paginator-prev,
::ng-deep .custom-table .p-paginator .p-paginator-next,
::ng-deep .custom-table .p-paginator .p-paginator-last {
    color: var(--text-primary) !important;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
}

::ng-deep .custom-table .p-paginator .p-paginator-first:hover,
::ng-deep .custom-table .p-paginator .p-paginator-prev:hover,
::ng-deep .custom-table .p-paginator .p-paginator-next:hover,
::ng-deep .custom-table .p-paginator .p-paginator-last:hover {
    background: var(--bg-hover) !important;
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */
@media (max-width: 768px) {
    .card {
        padding: 1.5rem;
        border-radius: 1.25rem;
    }

    .table-header {
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
    }

    .table-title {
        font-size: 1.5rem;
    }

    .table-subtitle {
        font-size: 0.875rem;
    }

    .table-caption {
        flex-direction: column;
        align-items: stretch;
        padding: 1.25rem;
        gap: 1rem;
    }

    .search-field {
        max-width: 100%;
        min-width: 100%;
    }

    ::ng-deep .clear-btn {
        width: 100%;
        justify-content: center;
    }

    ::ng-deep .custom-table .p-datatable-thead > tr > th,
    ::ng-deep .custom-table .p-datatable-tbody > tr > td {
        padding: 0.875rem 0.625rem !important;
    }
}

@media (max-width: 480px) {
    .card {
        padding: 1rem;
        border-radius: 1rem;
    }

    .table-title {
        font-size: 1.25rem;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }

    .table-caption {
        padding: 1rem;
    }

    .search-input {
        padding: 0.75rem 1rem 0.75rem 2.75rem;
        font-size: 0.875rem;
    }

    ::ng-deep .clear-btn {
        padding: 0.625rem 1.25rem !important;
        font-size: 0.875rem !important;
    }
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
    baseUrl = "http://localhost:5000";

    
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
        console.log("detail log");
        this.router.navigate(['/admin/home/viewDetailDemandeBoutique', shop.managerId],{
            state:{ shopData:shop }
        });
    }

     ngOnInit() {
        this.loadBoutique();
    }
}