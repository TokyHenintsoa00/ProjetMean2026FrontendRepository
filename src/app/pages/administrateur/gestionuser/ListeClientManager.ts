// import { BoutiqueService } from "@/pages/service/boutique.service";
// import { Customer, CustomerService, Representative } from "@/pages/service/customer.service";
// import { Product, ProductService } from "@/pages/service/product.service";
// import { UserService } from "@/pages/service/user.service";
// import { CommonModule } from "@angular/common";
// import { Component, ElementRef, ViewChild } from "@angular/core";
// import { FormsModule } from "@angular/forms";
// import { Router } from "@angular/router";
// import { ConfirmationService, MessageService } from "primeng/api";
// import { ButtonModule } from "primeng/button";


// import { IconFieldModule } from "primeng/iconfield";
// import { InputIconModule } from "primeng/inputicon";
// import { InputTextModule } from "primeng/inputtext";
// import { MultiSelectModule } from "primeng/multiselect";
// import { ProgressBarModule } from "primeng/progressbar";
// import { RatingModule } from "primeng/rating";
// import { RippleModule } from "primeng/ripple";
// import { SelectModule } from "primeng/select";
// import { SliderModule } from "primeng/slider";
// import { Table, TableModule } from "primeng/table";
// import { TagModule } from "primeng/tag";
// import { TextareaModule } from "primeng/textarea";
// import { ToastModule } from "primeng/toast";
// import { ToggleButtonModule } from "primeng/togglebutton";
// import { ObjectUtils } from "primeng/utils";

// interface expandedRows {
//     [key: string]: boolean;
// }

// @Component({
//     selector: 'app-listeBoutique',
//     imports: [
//         TableModule,
//         MultiSelectModule,
//         SelectModule,
//         InputIconModule,
//         TagModule,
//         InputTextModule,
//         SliderModule,
//         ProgressBarModule,
//         ToggleButtonModule,
//         ToastModule,
//         CommonModule,
//         FormsModule,
//         ButtonModule,
//         RatingModule,
//         RippleModule,
//         IconFieldModule
//     ],
//     template:`
//     <div class="page-container">
//     <div class="page-header">
//         <h2 class="page-title">
//             <i class="pi pi-users"></i>
//             Liste des clients & managers
//         </h2>
//     </div>

//     <p-toast></p-toast>

//     <div class="table-card">
//         <p-table
//             #dt
//             [value]="user"
//             dataKey="id"
//             [rows]="10"
//             [paginator]="true"
//             [rowHover]="true"
//             styleClass="custom-table"
//             [globalFilterFields]="['nom_user','prenom_user','email_user','role','numero_tel']"
//         >
//             <ng-template pTemplate="caption">
//                 <div class="caption-bar">
//                     <button
//                         pButton
//                         type="button"
//                         label="Effacer"
//                         icon="pi pi-times"
//                         class="clear-btn"
//                         (click)="dt.clear()">
//                     </button>
//                     <div class="search-wrap">
//                         <i class="pi pi-search"></i>
//                         <input
//                             pInputText
//                             type="text"
//                             class="search-input"
//                             placeholder="Recherche globale..."
//                             (input)="dt.filterGlobal($any($event.target).value, 'contains')" />
//                     </div>
//                 </div>
//             </ng-template>

//             <ng-template pTemplate="header">
//                 <tr>
//                     <th>
//                         Avatar & Nom
//                         <input pInputText type="text" placeholder="Filtrer..."
//                             (input)="dt.filter($any($event.target).value, 'nom_user', 'contains')" />
//                     </th>
//                     <th>
//                         Prénom
//                         <input pInputText type="text" placeholder="Filtrer..."
//                             (input)="dt.filter($any($event.target).value, 'prenom_user', 'contains')" />
//                     </th>
//                     <th>
//                         Email
//                         <input pInputText type="text" placeholder="Filtrer..."
//                             (input)="dt.filter($any($event.target).value, 'email_user', 'contains')" />
//                     </th>
//                     <th>
//                         Rôle
//                         <input pInputText type="text" placeholder="Filtrer..."
//                             (input)="dt.filter($any($event.target).value, 'role', 'contains')" />
//                     </th>
//                     <th>
//                         Téléphone
//                         <input pInputText type="text" placeholder="Filtrer..."
//                             (input)="dt.filter($any($event.target).value, 'numero_tel', 'contains')" />
//                     </th>
//                     <th style="width:80px; text-align:center;">Actions</th>
//                 </tr>
//             </ng-template>

//             <ng-template pTemplate="body" let-u>
//                 <tr class="clickable-row">
//                     <td>
//                         <div class="manager-cell">
//                             @if (u.avatar) {
//                                 <img [src]="u.avatar" width="36" height="36" class="avatar-img" alt="Avatar">
//                             } @else {
//                                 <div class="avatar-placeholder">
//                                     <i class="pi pi-user"></i>
//                                 </div>
//                             }
//                             <span>{{ u.nom_user }}</span>
//                         </div>
//                     </td>
//                     <td>{{ u.prenom_user }}</td>
//                     <td>{{ u.email_user }}</td>
//                     <td>
//                         <span class="category-badge">{{ u.role ?? 'Non défini' }}</span>
//                     </td>
//                     <td>
//                         <div class="location-cell">
//                             <i class="pi pi-phone"></i>
//                             <span>{{ u.numero_tel }}</span>
//                         </div>
//                     </td>
//                     <td style="text-align:center;">
//                         <button
//                             pButton
//                             type="button"
//                             icon="pi pi-trash"
//                             class="p-button-rounded p-button-text delete-btn"
//                             (click)="confirmDelete(u)"
//                             pTooltip="Supprimer l'utilisateur"
//                             tooltipPosition="top">
//                         </button>
//                     </td>

//                     <!-- Modale de confirmation -->
//                     @if (showConfirm) {
//                         <div class="confirm-overlay" (click)="cancelDelete()">
//                             <div class="confirm-modal" (click)="$event.stopPropagation()">
//                                 <div class="confirm-icon">
//                                     <i class="pi pi-exclamation-triangle"></i>
//                                 </div>
//                                 <h3 class="confirm-title">Supprimer l'utilisateur</h3>
//                                 <p class="confirm-message">
//                                     Êtes-vous sûr de vouloir supprimer<br>
//                                     <strong>{{ userToDelete?.nom_user }} {{ userToDelete?.prenom_user }}</strong> ?<br>
//                                     <span class="confirm-warning">Cette action est irréversible.</span>
//                                 </p>
//                                 <div class="confirm-actions">
//                                     <button class="btn-cancel" (click)="cancelDelete()">
//                                         <i class="pi pi-times"></i> Annuler
//                                     </button>
//                                     <button class="btn-delete" (click)="confirmDeleteAction()">
//                                         <i class="pi pi-trash"></i> Supprimer
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     }
//                 </tr>
//             </ng-template>

//             <ng-template pTemplate="emptymessage">
//                 <tr>
//                     <td colspan="6" style="text-align:center; padding:3rem; color:var(--text-400);">
//                         <i class="pi pi-users" style="font-size:2rem; display:block; margin-bottom:.75rem;"></i>
//                         Aucun utilisateur trouvé
//                     </td>
//                 </tr>
//             </ng-template>
//         </p-table>
//     </div>
// </div>
//     `,
//    styles: [`
// :host {
//     --primary: #f59e0b;
//     --primary-dark: #d97706;
//     --card: #ffffff;
//     --text-900: #0f172a;
//     --text-600: #475569;
//     --text-400: #94a3b8;
//     --border: #e2e8f0;
//     --border-100: #f8fafc;
//     --shadow: 0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04);
//     --shadow-lg: 0 4px 8px rgba(15,23,42,0.06), 0 12px 28px rgba(15,23,42,0.08);
//     --radius: 1rem;
// }

// .page-container { padding: 2rem; }

// .page-header { margin-bottom: 2rem; }

// .page-title {
//     font-size: 1.75rem;
//     font-weight: 700;
//     color: var(--text-900);
//     display: flex;
//     align-items: center;
//     gap: 0.75rem;
//     margin: 0;
// }

// .page-title i {
//     color: var(--primary);
//     font-size: 1.5rem;
// }

// .table-card {
//     background: var(--card);
//     border-radius: var(--radius);
//     border: 1px solid var(--border);
//     box-shadow: var(--shadow);
//     overflow: hidden;
// }

// .caption-bar {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     padding: 1.25rem 1.5rem;
//     background: var(--card);
//     border-bottom: 1px solid var(--border);
// }

// .search-wrap {
//     position: relative;
//     flex: 1;
//     max-width: 400px;
// }

// .search-wrap i {
//     position: absolute;
//     left: 0.875rem;
//     top: 50%;
//     transform: translateY(-50%);
//     color: var(--text-400);
//     pointer-events: none;
//     font-size: 0.875rem;
// }

// .search-input {
//     width: 100%;
//     padding: 0.625rem 1rem 0.625rem 2.25rem;
//     border: 1px solid var(--border);
//     border-radius: 0.5rem;
//     background: var(--border-100);
//     color: var(--text-900);
//     font-size: 0.875rem;
//     transition: border-color 0.15s, box-shadow 0.15s;
// }

// .search-input:focus {
//     outline: none;
//     border-color: var(--primary);
//     box-shadow: 0 0 0 3px rgba(245,158,11,0.1);
//     background: #fff;
// }

// .search-input::placeholder { color: var(--text-400); }

// ::ng-deep .clear-btn {
//     background: #fff !important;
//     border: 1px solid var(--border) !important;
//     color: var(--text-600) !important;
//     font-size: 0.875rem !important;
//     padding: 0.625rem 1rem !important;
//     border-radius: 0.5rem !important;
//     transition: all 0.15s !important;
//     white-space: nowrap;
// }

// ::ng-deep .clear-btn:enabled:hover {
//     border-color: #ef4444 !important;
//     color: #ef4444 !important;
//     background: #fef2f2 !important;
// }

// ::ng-deep .custom-table .p-datatable-thead > tr > th {
//     background: var(--border-100) !important;
//     color: var(--text-600) !important;
//     font-size: 0.75rem !important;
//     font-weight: 600 !important;
//     text-transform: uppercase !important;
//     letter-spacing: 0.05em !important;
//     padding: 0.875rem 1rem !important;
//     border-bottom: 1px solid var(--border) !important;
//     border-right: none !important;
//     border-top: none !important;
//     border-left: none !important;
// }

// ::ng-deep .custom-table .p-datatable-thead > tr > th input[pInputText] {
//     width: 100%;
//     padding: 0.375rem 0.625rem;
//     margin-top: 0.5rem;
//     border: 1px solid var(--border);
//     border-radius: 0.375rem;
//     background: #fff;
//     color: var(--text-900);
//     font-size: 0.8rem;
//     font-weight: 400;
//     text-transform: none;
//     letter-spacing: 0;
//     transition: border-color 0.15s;
// }

// ::ng-deep .custom-table .p-datatable-thead > tr > th input[pInputText]:focus {
//     outline: none;
//     border-color: var(--primary);
//     box-shadow: 0 0 0 2px rgba(245,158,11,0.1);
// }

// ::ng-deep .custom-table .p-datatable-thead > tr > th input[pInputText]::placeholder {
//     color: var(--text-400);
//     font-style: normal;
// }

// ::ng-deep .custom-table .p-datatable-tbody > tr {
//     background: #fff !important;
//     color: var(--text-900) !important;
//     transition: background 0.15s;
// }

// .clickable-row { cursor: pointer; }

// ::ng-deep .custom-table .p-datatable-tbody > tr:hover {
//     background: #fefce8 !important;
// }

// ::ng-deep .custom-table .p-datatable-tbody > tr > td {
//     padding: 1rem !important;
//     border-bottom: 1px solid var(--border-100) !important;
//     border-right: none !important;
//     border-left: none !important;
//     border-top: none !important;
// }

// ::ng-deep .custom-table .p-paginator {
//     background: var(--border-100) !important;
//     border-top: 1px solid var(--border) !important;
//     padding: 0.75rem 1.5rem !important;
//     border-bottom: none !important;
//     border-left: none !important;
//     border-right: none !important;
// }

// ::ng-deep .custom-table .p-paginator .p-paginator-pages .p-paginator-page {
//     color: var(--text-600) !important;
//     border-radius: 0.375rem;
//     font-weight: 500;
//     min-width: 2.25rem;
//     height: 2.25rem;
//     margin: 0 0.125rem;
//     transition: background 0.15s;
// }

// ::ng-deep .custom-table .p-paginator .p-paginator-pages .p-paginator-page:hover {
//     background: var(--border) !important;
// }

// ::ng-deep .custom-table .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
//     background: var(--primary) !important;
//     color: #fff !important;
// }

// .manager-cell {
//     display: flex;
//     align-items: center;
//     gap: 0.75rem;
// }

// .avatar-img {
//     width: 36px;
//     height: 36px;
//     border-radius: 50%;
//     object-fit: cover;
//     border: 2px solid var(--border);
// }

// .avatar-placeholder {
//     width: 36px;
//     height: 36px;
//     border-radius: 50%;
//     background: #1e3a5f;
//     border: 2px solid var(--primary);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: var(--primary);
//     font-size: 1rem;
//     flex-shrink: 0;
// }

// .shop-name { font-weight: 600; color: var(--text-900); }

// .category-badge {
//     display: inline-block;
//     padding: 0.25rem 0.625rem;
//     background: #eff6ff;
//     color: #1d4ed8;
//     border: 1px solid #bfdbfe;
//     border-radius: 9999px;
//     font-weight: 500;
//     font-size: 0.8rem;
// }

// .location-cell {
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//     color: var(--text-600);
// }

// .location-cell i { color: var(--primary); font-size: 0.875rem; }

// ::ng-deep .view-btn:enabled:hover {
//     background: var(--primary) !important;
//     color: #fff !important;
//     border-color: var(--primary) !important;
// }

// @media (max-width: 768px) {
//     .page-container { padding: 1rem; }
//     .page-title { font-size: 1.375rem; }
//     .caption-bar { flex-direction: column; align-items: stretch; }
//     .search-wrap { max-width: 100%; }
// }



// ::ng-deep .delete-btn:enabled:hover {
//     background: #fef2f2 !important;
//     color: #ef4444 !important;
//     border-color: #ef4444 !important;
// }

// /* Overlay */
// .confirm-overlay {
//     position: fixed;
//     inset: 0;
//     background: rgba(15, 23, 42, 0.45);
//     backdrop-filter: blur(4px);
//     z-index: 9999;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     animation: fadeIn 0.2s ease;
// }

// @keyframes fadeIn {
//     from { opacity: 0; }
//     to   { opacity: 1; }
// }

// /* Modale */
// .confirm-modal {
//     background: #fff;
//     border-radius: var(--radius);
//     box-shadow: var(--shadow-lg);
//     padding: 2rem;
//     width: 100%;
//     max-width: 420px;
//     text-align: center;
//     animation: slideUp 0.25s ease;
//     border: 1px solid var(--border);
// }

// @keyframes slideUp {
//     from { opacity: 0; transform: translateY(20px); }
//     to   { opacity: 1; transform: translateY(0); }
// }

// .confirm-icon {
//     width: 56px;
//     height: 56px;
//     border-radius: 50%;
//     background: #fef2f2;
//     border: 2px solid #fecaca;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 0 auto 1.25rem;
// }

// .confirm-icon i {
//     font-size: 1.5rem;
//     color: #ef4444;
// }

// .confirm-title {
//     font-size: 1.125rem;
//     font-weight: 700;
//     color: var(--text-900);
//     margin: 0 0 0.75rem;
// }

// .confirm-message {
//     font-size: 0.9rem;
//     color: var(--text-600);
//     line-height: 1.6;
//     margin: 0 0 1.5rem;
// }

// .confirm-warning {
//     font-size: 0.8rem;
//     color: #ef4444;
//     font-weight: 500;
// }

// .confirm-actions {
//     display: flex;
//     gap: 0.75rem;
//     justify-content: center;
// }

// .btn-cancel {
//     padding: 0.625rem 1.25rem;
//     border: 1px solid var(--border);
//     border-radius: 0.5rem;
//     background: #fff;
//     color: var(--text-600);
//     font-size: 0.875rem;
//     font-weight: 500;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 0.4rem;
//     transition: all 0.15s;
// }

// .btn-cancel:hover {
//     border-color: var(--text-400);
//     background: var(--border-100);
// }

// .btn-delete {
//     padding: 0.625rem 1.25rem;
//     border: 1px solid #ef4444;
//     border-radius: 0.5rem;
//     background: #ef4444;
//     color: #fff;
//     font-size: 0.875rem;
//     font-weight: 600;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 0.4rem;
//     transition: all 0.15s;
// }

// .btn-delete:hover {
//     background: #dc2626;
//     border-color: #dc2626;
// }

//         `],
//     providers: [ConfirmationService, MessageService, CustomerService, ProductService]
// })

// export class ListeClientManager{
//     user:any[]=[];

//      @ViewChild('filter') filter!: ElementRef;
//     messageService: any;

//     constructor(
//         private userService:UserService,
//         private router:Router
//     ) {}
//     baseUrl = "http://localhost:5000";



//     userToDelete: any = null;
// showConfirm: boolean = false;

// confirmDelete(u: any) {
//     this.userToDelete = u;
//     this.showConfirm = true;
// }

// cancelDelete() {
//     this.userToDelete = null;
//     this.showConfirm = false;
// }

// confirmDeleteAction() {
//     if (!this.userToDelete) return;
//     this.userService.deleteUser(this.userToDelete._id).subscribe({
//         next: () => {
//             this.user = this.user.filter((x: any) => x._id !== this.userToDelete._id);
//             this.messageService.add({
//                 severity: 'success',
//                 summary: 'Supprimé',
//                 detail: `${this.userToDelete.nom_user} a été supprimé`
//             });
//             this.cancelDelete();
//         },
//         error: () => {
//             this.messageService.add({
//                 severity: 'error',
//                 summary: 'Erreur',
//                 detail: 'Impossible de supprimer l\'utilisateur'
//             });
//             this.cancelDelete();
//         }
//     });
// }

//    loadUser() {
//         this.userService.getManagerAndClient().subscribe({
//             next: (res: any) => {
//                 const data = res.data; // ← extraire le tableau
//                 this.user = data.map((shop: any) => ({
//                     id: shop._id,
//                     nom_user: shop.nom_client,
//                     prenom_user: shop.prenom_client,
//                     email_user: shop.email,
//                     role: shop.role?.nom_role,
//                     numero_tel: shop.numero_telephone,
//                     avatar: shop.avatar?.length
//                         ? `${this.baseUrl}${shop.avatar[0].url}`
//                         : null,
//                     date_creation: shop.created_at
//                 }));
//                 console.log('Users chargés:', this.user);


//                 console.log('Boutiques chargées:', this.user);
//             },
//             error: (err) => {
//                 console.error('Erreur:', err);
//             }
//         });
//     }

//     ngOnInit() {
//         this.loadUser();
//     }

    
//     viewProfile(shop: any) {
//         console.log(shop);
        
//         // Navigation vers la page de profil avec l'ID du manager
//         this.router.navigate(['/admin/home/infoPlusBoutique', shop.managerId], {
//             state: { shopData: shop }
//         });
//     }
// }

import { CustomerService } from "@/pages/service/customer.service";
import { ProductService } from "@/pages/service/product.service";
import { UserService } from "@/pages/service/user.service";
import { CommonModule } from "@angular/common";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { RippleModule } from "primeng/ripple";
import { SelectModule } from "primeng/select";
import { Table, TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";

@Component({
    selector: 'app-listeBoutique',
    imports: [
        TableModule,
        MultiSelectModule,
        SelectModule,
        InputIconModule,
        TagModule,
        InputTextModule,
        ToastModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        IconFieldModule
    ],
    template: `
<div class="page-container">
    <div class="page-header">
        <h2 class="page-title">
            <i class="pi pi-users"></i>
            Liste des clients & managers
        </h2>
    </div>

    <p-toast></p-toast>

    <!-- ✅ Modale HORS du tableau -->
    @if (showConfirm) {
        <div class="confirm-overlay" (click)="cancelDelete()">
            <div class="confirm-modal" (click)="$event.stopPropagation()">
                <div class="confirm-icon">
                    <i class="pi pi-exclamation-triangle"></i>
                </div>
                <h3 class="confirm-title">Supprimer l'utilisateur</h3>
                <p class="confirm-message">
                    Êtes-vous sûr de vouloir supprimer<br>
                    <strong>{{ userToDelete?.nom_user }} {{ userToDelete?.prenom_user }}</strong> ?<br>
                    <span class="confirm-warning">Cette action est irréversible.</span>
                </p>
                <div class="confirm-actions">
                    <button class="btn-cancel" (click)="cancelDelete()">
                        <i class="pi pi-times"></i> Annuler
                    </button>
                    <button class="btn-delete" (click)="confirmDeleteAction()">
                        <i class="pi pi-trash"></i> Supprimer
                    </button>
                </div>
            </div>
        </div>
    }

    <div class="table-card">
        <p-table
            #dt
            [value]="user"
            dataKey="id"
            [rows]="10"
            [paginator]="true"
            [rowHover]="true"
            styleClass="custom-table"
            [globalFilterFields]="['nom_user','prenom_user','email_user','role','numero_tel']"
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
                        Avatar & Nom
                        <input pInputText type="text" placeholder="Filtrer..."
                            (input)="dt.filter($any($event.target).value, 'nom_user', 'contains')" />
                    </th>
                    <th>
                        Prénom
                        <input pInputText type="text" placeholder="Filtrer..."
                            (input)="dt.filter($any($event.target).value, 'prenom_user', 'contains')" />
                    </th>
                    <th>
                        Email
                        <input pInputText type="text" placeholder="Filtrer..."
                            (input)="dt.filter($any($event.target).value, 'email_user', 'contains')" />
                    </th>
                    <th>
                        Rôle
                        <input pInputText type="text" placeholder="Filtrer..."
                            (input)="dt.filter($any($event.target).value, 'role', 'contains')" />
                    </th>
                    <th>
                        Téléphone
                        <input pInputText type="text" placeholder="Filtrer..."
                            (input)="dt.filter($any($event.target).value, 'numero_tel', 'contains')" />
                    </th>
                    <th style="width:80px; text-align:center;">Actions</th>
                </tr>
            </ng-template>

            <ng-template pTemplate="body" let-u>
                <tr class="clickable-row">
                    <td>
                        <div class="manager-cell">
                            @if (u.avatar) {
                                <img [src]="u.avatar" width="36" height="36" class="avatar-img" alt="Avatar">
                            } @else {
                                <div class="avatar-placeholder">
                                    <i class="pi pi-user"></i>
                                </div>
                            }
                            <span>{{ u.nom_user }}</span>
                        </div>
                    </td>
                    <td>{{ u.prenom_user }}</td>
                    <td>{{ u.email_user }}</td>
                    <td>
                        <span class="category-badge">{{ u.role ?? 'Non défini' }}</span>
                    </td>
                    <td>
                        <div class="location-cell">
                            <i class="pi pi-phone"></i>
                            <span>{{ u.numero_tel }}</span>
                        </div>
                    </td>
                    <td style="text-align:center;">
                        <button
                            pButton
                            type="button"
                            icon="pi pi-trash"
                            class="p-button-rounded p-button-text delete-btn"
                            (click)="confirmDelete(u)"
                            pTooltip="Supprimer l'utilisateur"
                            tooltipPosition="top">
                        </button>
                    </td>
                </tr>
            </ng-template>

            <ng-template pTemplate="emptymessage">
                <tr>
                    <td colspan="6" style="text-align:center; padding:3rem; color:var(--text-400);">
                        <i class="pi pi-users" style="font-size:2rem; display:block; margin-bottom:.75rem;"></i>
                        Aucun utilisateur trouvé
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
.page-title i { color: var(--primary); font-size: 1.5rem; }

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
::ng-deep .custom-table .p-datatable-tbody > tr:hover { background: #fefce8 !important; }
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
::ng-deep .custom-table .p-paginator .p-paginator-pages .p-paginator-page:hover { background: var(--border) !important; }
::ng-deep .custom-table .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
    background: var(--primary) !important;
    color: #fff !important;
}

.manager-cell { display: flex; align-items: center; gap: 0.75rem; }
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

.location-cell { display: flex; align-items: center; gap: 0.5rem; color: var(--text-600); }
.location-cell i { color: var(--primary); font-size: 0.875rem; }

::ng-deep .delete-btn:enabled:hover {
    background: #fef2f2 !important;
    color: #ef4444 !important;
    border-color: #ef4444 !important;
}

@media (max-width: 768px) {
    .page-container { padding: 1rem; }
    .page-title { font-size: 1.375rem; }
    .caption-bar { flex-direction: column; align-items: stretch; }
    .search-wrap { max-width: 100%; }
}

/* Modale */
.confirm-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.45);
    backdrop-filter: blur(4px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s ease;
}
@keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
}
.confirm-modal {
    background: #fff;
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    padding: 2rem;
    width: 100%;
    max-width: 420px;
    text-align: center;
    animation: slideUp 0.25s ease;
    border: 1px solid var(--border);
}
@keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}
.confirm-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #fef2f2;
    border: 2px solid #fecaca;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.25rem;
}
.confirm-icon i { font-size: 1.5rem; color: #ef4444; }
.confirm-title { font-size: 1.125rem; font-weight: 700; color: var(--text-900); margin: 0 0 0.75rem; }
.confirm-message { font-size: 0.9rem; color: var(--text-600); line-height: 1.6; margin: 0 0 1.5rem; }
.confirm-warning { font-size: 0.8rem; color: #ef4444; font-weight: 500; }
.confirm-actions { display: flex; gap: 0.75rem; justify-content: center; }
.btn-cancel {
    padding: 0.625rem 1.25rem;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    background: #fff;
    color: var(--text-600);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    transition: all 0.15s;
}
.btn-cancel:hover { border-color: var(--text-400); background: var(--border-100); }
.btn-delete {
    padding: 0.625rem 1.25rem;
    border: 1px solid #ef4444;
    border-radius: 0.5rem;
    background: #ef4444;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    transition: all 0.15s;
}
.btn-delete:hover { background: #dc2626; border-color: #dc2626; }
    `],
    providers: [MessageService, CustomerService, ProductService]
})
export class ListeClientManager {
    user: any[] = [];

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private userService: UserService,
        private messageService: MessageService, // ✅ Injecté correctement
        private router: Router
    ) {}

    baseUrl = "http://localhost:5000";

    userToDelete: any = null;
    showConfirm: boolean = false;

    confirmDelete(u: any) {
        this.userToDelete = u;
        this.showConfirm = true;
    }

    cancelDelete() {
        this.userToDelete = null;
        this.showConfirm = false;
    }

    confirmDeleteAction() {
        if (!this.userToDelete) return;
        this.userService.deleteUser(this.userToDelete._id).subscribe({
            next: () => {
                this.user = this.user.filter((x: any) => x._id !== this.userToDelete._id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Supprimé',
                    detail: `${this.userToDelete.nom_user} a été supprimé`
                });
                this.cancelDelete();
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: "Impossible de supprimer l'utilisateur"
                });
                this.cancelDelete();
            }
        });
    }

    loadUser() {
        this.userService.getManagerAndClient().subscribe({
            next: (res: any) => {
                const data = res.data;
                this.user = data.map((shop: any) => ({
                    id: shop._id,
                    _id: shop._id, // ✅ Gardé pour le filtre après suppression
                    nom_user: shop.nom_client,
                    prenom_user: shop.prenom_client,
                    email_user: shop.email,
                    role: shop.role?.nom_role,
                    numero_tel: shop.numero_telephone,
                    avatar: shop.avatar?.length
                        ? `${this.baseUrl}${shop.avatar[0].url}`
                        : null,
                    date_creation: shop.created_at
                }));
            },
            error: (err) => {
                console.error('Erreur:', err);
            }
        });
    }

    ngOnInit() {
        this.loadUser();
    }

    viewProfile(shop: any) {
        this.router.navigate(['/admin/home/infoPlusBoutique', shop.managerId], {
            state: { shopData: shop }
        });
    }
}