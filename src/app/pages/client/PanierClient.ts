// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { ProduitService } from '../service/produit.service';

// // ── INTERFACES BASÉES SUR L'API ──
// export interface PanierItem {
//   _id: string;
//   id_acheteur: string;
//   id_boutique: string;
//   id_produit: {
//     _id: string;
//     nom_produit: string;
//     description: string;
//     images: { filename: string; url: string; _id: string }[];
//     variantes: any[];
//   };
//   nom_produit: string;
//   taille: string;
//   quantite: number;
//   prix_unitaire: number;
//   total: number;
// }



// @Component({
//   selector: 'app-panier-client',
//   standalone: true,
//   imports: [CommonModule, FormsModule],

//   template: `

//   <div class="panier-page">

//     <!-- ── HEADER ── -->
//     <div class="page-header">
//       <div class="page-title-block">
//         <div class="page-title">Panier Client</div>
//         <div class="page-subtitle">
//           <ng-container *ngIf="!isLoading && !hasError">
//             {{ itemCount }} article{{ itemCount > 1 ? 's' : '' }} dans le panier
//           </ng-container>
//           <ng-container *ngIf="isLoading">Chargement…</ng-container>
//           <ng-container *ngIf="hasError">Erreur de chargement</ng-container>
//         </div>
//       </div>
//     </div>

//     <!-- ── CARD ── -->
//     <div class="card">

//       <!-- Toolbar -->
//       <div class="table-toolbar">
//         <div class="search-wrap">
//           <i class="pi pi-search"></i>
//           <input
//             class="search-input"
//             type="text"
//             placeholder="Rechercher un article…"
//             [(ngModel)]="searchQuery"
//           />
//         </div>
//         <button class="btn-refresh" (click)="loadPanier()" title="Actualiser">
//           <i class="pi pi-refresh" [class.spinning]="isLoading"></i>
//         </button>
//       </div>

//       <!-- ── LOADING STATE ── -->
//       <div class="loading-state" *ngIf="isLoading">
//         <div class="spinner"></div>
//         <p>Chargement du panier…</p>
//       </div>

//       <!-- ── ERROR STATE ── -->
//       <div class="error-state" *ngIf="hasError && !isLoading">
//         <i class="pi pi-exclamation-triangle"></i>
//         <p>Impossible de charger le panier</p>
//         <button class="btn-retry" (click)="loadPanier()">
//           <i class="pi pi-refresh"></i> Réessayer
//         </button>
//       </div>

//       <!-- ── TABLE ── -->
//       <div class="table-wrap" *ngIf="!isLoading && !hasError">
//         <table>
//           <thead>
//             <tr>
//               <th>Produit</th>
//               <th class="th-center">Taille</th>
//               <th class="th-center">Quantité</th>
//               <th class="th-right">Prix unit.</th>
//               <th class="th-right">Total</th>
//               <th class="th-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr
//               *ngFor="let item of filteredItems; trackBy: trackById"
//               class="table-row"
//               [class.removing]="removingIds.has(item._id)"
//             >
//               <!-- Produit -->
//               <td>
//                 <div class="product-cell">
//                   <div class="product-thumb">
//                     <img
//                       *ngIf="getProductImage(item)"
//                       [src]="getProductImage(item)"
//                       [alt]="item.nom_produit"
//                       class="product-img"
//                     />
//                     <span *ngIf="!getProductImage(item)" class="product-emoji">🛍️</span>
//                   </div>
//                   <div>
//                     <div class="product-name">{{ item.nom_produit }}</div>
//                     <div class="product-ref">ID: {{ item._id.slice(-6).toUpperCase() }}</div>
//                   </div>
//                 </div>
//               </td>

//               <!-- Taille -->
//               <td class="td-center">
//                 <span class="badge-taille">{{ item.taille }}</span>
//               </td>

//               <!-- Quantité -->
//               <td class="td-center">
//                 <span class="qty-value">{{ item.quantite }}</span>
//               </td>

//               <!-- Prix unitaire -->
//               <td>
//                 <div class="price">
//                   {{ formatPrice(item.prix_unitaire) }}
//                   <span class="price-unit">HT / unité</span>
//                 </div>
//               </td>

//               <!-- Total ligne -->
//               <td>
//                 <div class="price">{{ formatPrice(item.total) }}</div>
//               </td>

//               <!-- Actions -->
//               <td>
//                 <div class="actions">
//                   <button
//                     class="action-btn danger"
//                     title="Supprimer"
//                     (click)="removeItem(item._id)"
//                     [disabled]="removingIds.has(item._id)"
//                   >
//                     <i class="pi" [class.pi-trash]="!removingIds.has(item._id)" [class.pi-spin]="removingIds.has(item._id)" [class.pi-spinner]="removingIds.has(item._id)"></i>
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         <!-- Empty state -->
//         <div class="empty-state" *ngIf="filteredItems.length === 0 && items.length > 0">
//           <i class="pi pi-search"></i>
//           <p>Aucun article trouvé pour "{{ searchQuery }}"</p>
//         </div>

//         <div class="empty-state" *ngIf="items.length === 0">
//           <i class="pi pi-shopping-cart"></i>
//           <p>Votre panier est vide</p>
//         </div>
//       </div>

//       <!-- ── FOOTER TOTAL ── -->
//       <div class="table-footer" *ngIf="!isLoading && !hasError && items.length > 0">
//         <div class="footer-info">
//           <span class="footer-dot"></span>
//           {{ itemCount }} article{{ itemCount > 1 ? 's' : '' }}
//         </div>

//         <div class="footer-total">
//           <div class="total-item">
//             <span class="total-label">Sous-total HT</span>
//             <span class="total-value">{{ formatPrice(subtotalHT) }}</span>
//           </div>
//           <div class="total-item">
//             <span class="total-label">TVA (20%)</span>
//             <span class="total-value">{{ formatPrice(tva) }}</span>
//           </div>
//           <div class="total-item">
//             <span class="total-label">Total TTC</span>
//             <span class="total-value highlight">{{ formatPrice(totalTTC) }}</span>
//           </div>
//           <button class="btn-checkout">
//             <i class="pi pi-arrow-right"></i>
//             Valider la commande
//           </button>
//         </div>
//       </div>

//     </div>
//   </div>


//   <style>
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

//   ::ng-deep {
//     body,
//     .layout-wrapper,
//     .layout-main,
//     .layout-main-container,
//     .layout-content {
//       background: #0a1118 !important;
//       color: rgba(255, 255, 255, 0.8) !important;
//     }

//     .layout-topbar {
//       background: rgba(10, 17, 24, 0.95) !important;
//       backdrop-filter: blur(20px) !important;
//       border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
//       box-shadow: none !important;
//     }

//     .layout-topbar .layout-topbar-logo span,
//     .layout-topbar .topbar-menu li a,
//     .layout-topbar .topbar-menu li button {
//       color: rgba(255, 255, 255, 0.8) !important;
//     }
//   }

//   @keyframes fadeIn {
//     from { opacity: 0; transform: translateY(14px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   @keyframes pulse {
//     0%, 100% { opacity: 1; transform: scale(1); }
//     50%       { opacity: 0.6; transform: scale(0.85); }
//   }

//   @keyframes spin {
//     from { transform: rotate(0deg); }
//     to   { transform: rotate(360deg); }
//   }

//   @keyframes fadeOut {
//     from { opacity: 1; transform: scaleY(1); }
//     to   { opacity: 0; transform: scaleY(0); max-height: 0; }
//   }

//   .panier-page {
//     font-family: 'DM Sans', sans-serif;
//     padding: 2rem;
//     min-height: 100vh;
//     background: #0a1118;
//     animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
//   }

//   /* HEADER */
//   .page-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     flex-wrap: wrap;
//     gap: 1rem;
//     margin-bottom: 1.5rem;
//   }

//   .page-title {
//     font-family: 'Syne', sans-serif;
//     font-size: 0.75rem;
//     font-weight: 800;
//     letter-spacing: 2.5px;
//     text-transform: uppercase;
//     color: rgba(255, 255, 255, 0.85);
//   }

//   .page-subtitle {
//     font-size: 0.7rem;
//     font-weight: 500;
//     color: rgba(255, 255, 255, 0.3);
//     margin-top: 3px;
//   }

//   /* CARD */
//   .card {
//     background: rgba(15, 22, 30, 0.95);
//     backdrop-filter: blur(20px) saturate(160%);
//     border: 1px solid rgba(255, 255, 255, 0.06);
//     border-radius: 16px;
//     overflow: hidden;
//     position: relative;
//   }

//   .card::before {
//     content: '';
//     position: absolute;
//     top: 0; left: 10%; right: 10%;
//     height: 1px;
//     background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
//     pointer-events: none;
//   }

//   /* TOOLBAR */
//   .table-toolbar {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     padding: 1rem 1.25rem;
//     border-bottom: 1px solid rgba(255, 255, 255, 0.06);
//     flex-wrap: wrap;
//   }

//   .search-wrap {
//     position: relative;
//     flex: 1;
//     min-width: 180px;
//   }

//   .search-wrap i {
//     position: absolute;
//     left: 11px;
//     top: 50%;
//     transform: translateY(-50%);
//     font-size: 0.78rem;
//     color: rgba(255, 255, 255, 0.25);
//     pointer-events: none;
//   }

//   .search-input {
//     width: 100%;
//     background: rgba(255, 255, 255, 0.04);
//     border: 1px solid rgba(255, 255, 255, 0.08);
//     border-radius: 9px;
//     padding: 8px 12px 8px 32px;
//     color: rgba(255, 255, 255, 0.8);
//     font-family: 'DM Sans', sans-serif;
//     font-size: 0.82rem;
//     outline: none;
//     transition: border-color 0.18s;
//   }

//   .search-input::placeholder { color: rgba(255, 255, 255, 0.2); }
//   .search-input:focus        { border-color: rgba(255, 255, 255, 0.18); }

//   .btn-refresh {
//     width: 36px;
//     height: 36px;
//     border-radius: 9px;
//     border: 1px solid rgba(255, 255, 255, 0.08);
//     background: rgba(255, 255, 255, 0.04);
//     color: rgba(255, 255, 255, 0.4);
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 0.85rem;
//     transition: all 0.15s;
//     flex-shrink: 0;
//   }

//   .btn-refresh:hover {
//     background: rgba(255, 255, 255, 0.1);
//     color: rgba(255, 255, 255, 0.8);
//   }

//   .spinning { animation: spin 1s linear infinite; }

//   /* LOADING */
//   .loading-state {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 3.5rem 1rem;
//     gap: 14px;
//     color: rgba(255, 255, 255, 0.3);
//   }

//   .spinner {
//     width: 32px;
//     height: 32px;
//     border: 2px solid rgba(255, 255, 255, 0.08);
//     border-top-color: rgba(255, 255, 255, 0.4);
//     border-radius: 50%;
//     animation: spin 0.8s linear infinite;
//   }

//   .loading-state p, .error-state p {
//     font-size: 0.82rem;
//     font-weight: 500;
//     margin: 0;
//   }

//   /* ERROR */
//   .error-state {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 3.5rem 1rem;
//     gap: 12px;
//     color: rgba(248, 113, 113, 0.7);
//   }

//   .error-state i { font-size: 2rem; }

//   .btn-retry {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     padding: 8px 16px;
//     border-radius: 8px;
//     border: 1px solid rgba(248, 113, 113, 0.25);
//     background: rgba(239, 68, 68, 0.1);
//     color: #f87171;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 0.8rem;
//     font-weight: 600;
//     cursor: pointer;
//     transition: all 0.15s;
//     margin-top: 4px;
//   }

//   .btn-retry:hover {
//     background: rgba(239, 68, 68, 0.18);
//   }

//   /* TABLE */
//   .table-wrap {
//     overflow-x: auto;
//     scrollbar-width: thin;
//     scrollbar-color: rgba(255,255,255,0.08) transparent;
//   }

//   .table-wrap::-webkit-scrollbar       { height: 4px; }
//   .table-wrap::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

//   table { width: 100%; border-collapse: collapse; }

//   thead th {
//     padding: 11px 16px;
//     font-size: 0.62rem;
//     font-weight: 800;
//     letter-spacing: 1.5px;
//     text-transform: uppercase;
//     color: rgba(255, 255, 255, 0.25);
//     text-align: left;
//     border-bottom: 1px solid rgba(255, 255, 255, 0.06);
//     background: rgba(255, 255, 255, 0.01);
//     white-space: nowrap;
//   }

//   thead th.th-center { text-align: center; }
//   thead th.th-right  { text-align: right; }

//   .table-row {
//     transition: background 0.15s ease, opacity 0.3s ease;
//   }

//   .table-row:hover { background: rgba(255, 255, 255, 0.04); }

//   .table-row.removing { opacity: 0.4; pointer-events: none; }

//   .table-row td {
//     padding: 13px 16px;
//     font-size: 0.84rem;
//     font-weight: 500;
//     color: rgba(255, 255, 255, 0.5);
//     border-bottom: 1px solid rgba(255, 255, 255, 0.04);
//     vertical-align: middle;
//   }

//   .table-row:last-child td { border-bottom: none; }

//   .td-center { text-align: center; }

//   /* PRODUCT CELL */
//   .product-cell {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//   }

//   .product-thumb {
//     width: 42px;
//     height: 42px;
//     border-radius: 9px;
//     background: rgba(255, 255, 255, 0.06);
//     border: 1px solid rgba(255, 255, 255, 0.08);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 1.1rem;
//     flex-shrink: 0;
//     overflow: hidden;
//   }

//   .product-img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }

//   .product-name {
//     font-weight: 600;
//     color: rgba(255, 255, 255, 0.85);
//     font-size: 0.85rem;
//   }

//   .product-ref {
//     font-size: 0.7rem;
//     color: rgba(255, 255, 255, 0.25);
//     margin-top: 2px;
//   }

//   /* BADGE TAILLE */
//   .badge-taille {
//     display: inline-block;
//     padding: 3px 10px;
//     border-radius: 6px;
//     background: rgba(255, 255, 255, 0.07);
//     border: 1px solid rgba(255, 255, 255, 0.1);
//     font-size: 0.72rem;
//     font-weight: 700;
//     color: rgba(255, 255, 255, 0.6);
//     letter-spacing: 0.5px;
//   }

//   /* QTY */
//   .qty-value {
//     font-weight: 700;
//     color: rgba(255, 255, 255, 0.85);
//     font-size: 0.9rem;
//   }

//   /* PRICE */
//   .price {
//     font-weight: 700;
//     color: rgba(255, 255, 255, 0.85);
//     text-align: right;
//     font-size: 0.88rem;
//   }

//   .price-unit {
//     font-weight: 400;
//     font-size: 0.72rem;
//     color: rgba(255, 255, 255, 0.3);
//     display: block;
//     margin-top: 2px;
//   }

//   /* ACTIONS */
//   .actions {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     justify-content: flex-end;
//   }

//   .action-btn {
//     width: 30px;
//     height: 30px;
//     border-radius: 8px;
//     border: 1px solid rgba(255, 255, 255, 0.07);
//     background: rgba(255, 255, 255, 0.04);
//     color: rgba(255, 255, 255, 0.4);
//     font-size: 0.78rem;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     transition: all 0.15s;
//   }

//   .action-btn:disabled { opacity: 0.4; cursor: not-allowed; }

//   .action-btn:hover:not(:disabled) {
//     background: rgba(255,255,255,0.1);
//     color: rgba(255,255,255,0.9);
//     border-color: rgba(255,255,255,0.14);
//   }

//   .action-btn.danger:hover:not(:disabled) {
//     background: rgba(239, 68, 68, 0.15);
//     color: #f87171;
//     border-color: rgba(239, 68, 68, 0.2);
//   }

//   /* EMPTY STATE */
//   .empty-state {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 3.5rem 1rem;
//     color: rgba(255, 255, 255, 0.2);
//     gap: 12px;
//   }

//   .empty-state i  { font-size: 2rem; }
//   .empty-state p  { font-size: 0.82rem; font-weight: 500; margin: 0; }

//   /* FOOTER */
//   .table-footer {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 1rem 1.25rem;
//     border-top: 1px solid rgba(255, 255, 255, 0.06);
//     background: rgba(255, 255, 255, 0.02);
//     flex-wrap: wrap;
//     gap: 1rem;
//   }

//   .footer-info {
//     display: flex;
//     align-items: center;
//     gap: 7px;
//     font-size: 0.72rem;
//     font-weight: 600;
//     color: rgba(255, 255, 255, 0.35);
//   }

//   .footer-dot {
//     width: 7px;
//     height: 7px;
//     border-radius: 50%;
//     background: #10b981;
//     box-shadow: 0 0 6px rgba(16, 185, 129, 0.7);
//     animation: pulse 2.5s infinite;
//     flex-shrink: 0;
//   }

//   .footer-total {
//     display: flex;
//     align-items: center;
//     gap: 20px;
//     flex-wrap: wrap;
//   }

//   .total-item {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-end;
//   }

//   .total-label {
//     font-size: 0.65rem;
//     font-weight: 800;
//     letter-spacing: 1.2px;
//     text-transform: uppercase;
//     color: rgba(255, 255, 255, 0.25);
//   }

//   .total-value {
//   font-family: 'DM Sans', sans-serif;
//   font-size: 0.92rem;
//   font-weight: 600;
//   color: rgba(255, 255, 255, 0.85);
//   letter-spacing: 0;
// }

//   .total-value.highlight { color: #34d399; }

//   .btn-checkout {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     padding: 10px 22px;
//     border-radius: 10px;
//     border: none;
//     background: rgba(255, 255, 255, 0.9);
//     color: #0a1118;
//     font-family: 'DM Sans', sans-serif;
//     font-size: 0.83rem;
//     font-weight: 700;
//     cursor: pointer;
//     transition: all 0.18s ease;
//     letter-spacing: 0.2px;
//   }

//   .btn-checkout i { font-size: 0.8rem; }

//   .btn-checkout:hover {
//     background: #fff;
//     transform: translateY(-1px);
//     box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
//   }
//   </style>
//   `,
// })
// export class PanierClient implements OnInit {
//   searchQuery = '';

//   items: PanierItem[] = [];
//   isLoading = false;
//   hasError = false;
//   removingIds = new Set<string>();

//   // 🔧 Remplacez par votre URL de base d'images
//   private baseImageUrl = 'http://localhost:5000';

//   constructor(private panierService: ProduitService) {}

//   ngOnInit(): void {
//     this.loadPanier();
//   }

//   /* ── CHARGEMENT API ── */

//   loadPanier(): void {
//     this.isLoading = true;
//     this.hasError = false;

//     this.panierService.getAllPanieruserByIdUser().subscribe({
//       next: (data) => {
//         this.items = data;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         console.error('Erreur chargement panier:', err);
//         this.hasError = true;
//         this.isLoading = false;
//       },
//     });
//   }

//   /* ── SUPPRESSION ── */

//   removeItem(id: string): void {
//     // this.removingIds.add(id);

//     // this.panierService.removeFromPanier(id).subscribe({
//     //   next: () => {
//     //     this.items = this.items.filter((i) => i._id !== id);
//     //     this.removingIds.delete(id);
//     //   },
//     //   error: (err) => {
//     //     console.error('Erreur suppression:', err);
//     //     this.removingIds.delete(id);
//     //     // Suppression locale en fallback si pas d'endpoint DELETE
//     //     this.items = this.items.filter((i) => i._id !== id);
//     //   },
//     // });
//   }

//   /* ── GETTERS ── */

//   get filteredItems(): PanierItem[] {
//     const q = this.searchQuery.toLowerCase().trim();
//     if (!q) return this.items;
//     return this.items.filter(
//       (item) =>
//         item.nom_produit.toLowerCase().includes(q) ||
//         item.taille.toLowerCase().includes(q) ||
//         item._id.toLowerCase().includes(q)
//     );
//   }

//   get subtotalHT(): number {
//     return this.items.reduce((s, i) => s + i.total, 0);
//   }

//   get tva(): number {
//     return this.subtotalHT * 0.2;
//   }

//   get totalTTC(): number {
//     return this.subtotalHT + this.tva;
//   }

//   get itemCount(): number {
//     return this.items.length;
//   }

//   /* ── UTILS ── */

//   getProductImage(item: PanierItem): string | null {
//     const images = item.id_produit?.images;
//     if (images && images.length > 0) {
//       return `${this.baseImageUrl}${images[0].url}`;
//     }
//     return null;
//   }

//   trackById(_: number, item: PanierItem): string {
//     return item._id;
//   }

//   formatPrice(value: number): string {
//     return (
//       value.toLocaleString('fr-FR', {
//         minimumFractionDigits: 0,
//         maximumFractionDigits: 0,
//       }) + ' Ar'
//     );
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../service/produit.service';

export interface PanierItem {
  _id: string;
  id_acheteur: string;
  id_boutique: string;
  id_produit: {
    _id: string;
    nom_produit: string;
    description: string;
    images: { filename: string; url: string; _id: string }[];
    variantes: any[];
  };
  nom_produit: string;
  taille: string;
  quantite: number;
  prix_unitaire: number;
  total: number;
}

@Component({
  selector: 'app-panier-client',
  standalone: true,
  imports: [CommonModule, FormsModule],

  template: `
  <div class="panier-page">

    <!-- ── HEADER ── -->
    <div class="page-header">
      <div class="page-title-block">
        <div class="page-title">Panier Client</div>
        <div class="page-subtitle">
          <ng-container *ngIf="!isLoading && !hasError">
            {{ itemCount }} article{{ itemCount > 1 ? 's' : '' }} dans le panier
          </ng-container>
          <ng-container *ngIf="isLoading">Chargement…</ng-container>
          <ng-container *ngIf="hasError">Erreur de chargement</ng-container>
        </div>
      </div>
    </div>

    <div class="layout-wrap">

      <!-- ── CARD PRINCIPALE ── -->
      <div class="card" [class.shrink]="selectedItem">

        <!-- Toolbar -->
        <div class="table-toolbar">
          <div class="search-wrap">
            <i class="pi pi-search"></i>
            <input
              class="search-input"
              type="text"
              placeholder="Rechercher un article…"
              [(ngModel)]="searchQuery"
            />
          </div>
          <button class="btn-refresh" (click)="loadPanier()" title="Actualiser">
            <i class="pi pi-refresh" [class.spinning]="isLoading"></i>
          </button>
        </div>

        <!-- LOADING -->
        <div class="loading-state" *ngIf="isLoading">
          <div class="spinner"></div>
          <p>Chargement du panier…</p>
        </div>

        <!-- ERROR -->
        <div class="error-state" *ngIf="hasError && !isLoading">
          <i class="pi pi-exclamation-triangle"></i>
          <p>Impossible de charger le panier</p>
          <button class="btn-retry" (click)="loadPanier()">
            <i class="pi pi-refresh"></i> Réessayer
          </button>
        </div>

        <!-- TABLE -->
        <div class="table-wrap" *ngIf="!isLoading && !hasError">
          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th class="th-center">Quantité</th>
                <th class="th-right">Prix unit.</th>
                <th class="th-right">Total</th>
                <th class="th-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                *ngFor="let item of filteredItems; trackBy: trackById"
                class="table-row"
                [class.removing]="removingIds.has(item._id)"
                [class.selected]="selectedItem?._id === item._id"
                (click)="selectItem(item)"
              >
                <!-- Produit -->
                <td>
                  <div class="product-cell">
                    <div class="product-thumb">
                      <img
                        *ngIf="getProductImage(item)"
                        [src]="getProductImage(item)"
                        [alt]="item.nom_produit"
                        class="product-img"
                      />
                      <span *ngIf="!getProductImage(item)">🛍️</span>
                    </div>
                    <div>
                      <div class="product-name">{{ item.nom_produit }}</div>
                      <div class="product-ref">ID: {{ item._id.slice(-6).toUpperCase() }}</div>
                    </div>
                  </div>
                </td>

                <!-- Quantité -->
                <td class="td-center">
                  <span class="qty-value">{{ item.quantite }}</span>
                </td>

                <!-- Prix unitaire -->
                <td>
                  <div class="price">
                    {{ formatPrice(item.prix_unitaire) }}
                    <span class="price-unit">HT / unité</span>
                  </div>
                </td>

                <!-- Total ligne -->
                <td>
                  <div class="price">{{ formatPrice(item.total) }}</div>
                </td>

                <!-- Actions -->
                <td>
                  <div class="actions">
                    <button
                      class="action-btn danger"
                      title="Supprimer"
                      (click)="removeItem(item._id); $event.stopPropagation()"
                      [disabled]="removingIds.has(item._id)"
                    >
                      <i class="pi"
                        [class.pi-trash]="!removingIds.has(item._id)"
                        [class.pi-spin]="removingIds.has(item._id)"
                        [class.pi-spinner]="removingIds.has(item._id)">
                      </i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="empty-state" *ngIf="filteredItems.length === 0 && items.length > 0">
            <i class="pi pi-search"></i>
            <p>Aucun article trouvé pour "{{ searchQuery }}"</p>
          </div>

          <div class="empty-state" *ngIf="items.length === 0">
            <i class="pi pi-shopping-cart"></i>
            <p>Votre panier est vide</p>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="table-footer" *ngIf="!isLoading && !hasError && items.length > 0">
          <div class="footer-info">
            <span class="footer-dot"></span>
            {{ itemCount }} article{{ itemCount > 1 ? 's' : '' }}
          </div>
          <div class="footer-total">
            <div class="total-item">
              <span class="total-label">Sous-total HT</span>
              <span class="total-value">{{ formatPrice(subtotalHT) }}</span>
            </div>
            <div class="total-item">
              <span class="total-label">TVA (20%)</span>
              <span class="total-value">{{ formatPrice(tva) }}</span>
            </div>
            <div class="total-item">
              <span class="total-label">Total TTC</span>
              <span class="total-value highlight">{{ formatPrice(totalTTC) }}</span>
            </div>
            <button class="btn-checkout">
              <i class="pi pi-arrow-right"></i>
              Valider la commande
            </button>
          </div>
        </div>

      </div>

      <!-- ── PANNEAU DÉTAIL ── -->
      <div class="detail-panel" *ngIf="selectedItem" [@slideIn]>

        <!-- Header panneau -->
        <div class="detail-header">
          <span class="detail-title">Détail article</span>
          <button class="detail-close" (click)="closeDetail()" title="Fermer">
            <i class="pi pi-times"></i>
          </button>
        </div>

        <!-- Image -->
        <div class="detail-image-wrap">
          <img
            *ngIf="getProductImage(selectedItem)"
            [src]="getProductImage(selectedItem)"
            [alt]="selectedItem.nom_produit"
            class="detail-img"
          />
          <div class="detail-img-placeholder" *ngIf="!getProductImage(selectedItem)">🛍️</div>
        </div>

        <!-- Nom + ID -->
        <div class="detail-section">
          <div class="detail-product-name">{{ selectedItem.nom_produit }}</div>
          <div class="detail-product-id">ID : {{ selectedItem._id.slice(-6).toUpperCase() }}</div>
        </div>

        <!-- Description -->
        <div class="detail-section" *ngIf="selectedItem.id_produit?.description">
          <div class="detail-section-label">Description</div>
          <div class="detail-section-value desc">{{ selectedItem.id_produit.description }}</div>
        </div>

        <!-- Infos principales -->
        <div class="detail-section">
          <div class="detail-section-label">Informations</div>
          <div class="detail-grid">
            <div class="detail-cell">
              <span class="cell-label">Taille</span>
              <span class="cell-value badge">{{ selectedItem.taille }}</span>
            </div>
            <div class="detail-cell">
              <span class="cell-label">Quantité</span>
              <span class="cell-value">{{ selectedItem.quantite }}</span>
            </div>
            <div class="detail-cell">
              <span class="cell-label">Prix unitaire</span>
              <span class="cell-value">{{ formatPrice(selectedItem.prix_unitaire) }}</span>
            </div>
            <div class="detail-cell">
              <span class="cell-label">Total ligne</span>
              <span class="cell-value green">{{ formatPrice(selectedItem.total) }}</span>
            </div>
          </div>
        </div>

        <!-- Variantes disponibles -->
        <div class="detail-section" *ngIf="selectedItem.id_produit?.variantes?.length">
          <div class="detail-section-label">Variantes disponibles</div>
          <div class="variantes-list">
            <div
              class="variante-row"
              *ngFor="let v of selectedItem.id_produit.variantes"
              [class.active]="isCurrentVariante(v)"
            >
              <span class="variante-label">{{ getVarianteLabel(v) }}</span>
              <span class="variante-stock">Stock : {{ v.stock }}</span>
              <span class="variante-price">{{ formatPrice(getVariantePrice(v)) }}</span>
            </div>
          </div>
        </div>

      </div>
      <!-- /detail-panel -->

    </div>
    <!-- /layout-wrap -->
  </div>


  <style>
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

  ::ng-deep {
    body, .layout-wrapper, .layout-main,
    .layout-main-container, .layout-content {
      background: #0a1118 !important;
      color: rgba(255,255,255,0.8) !important;
    }
    .layout-topbar {
      background: rgba(10,17,24,0.95) !important;
      backdrop-filter: blur(20px) !important;
      border-bottom: 1px solid rgba(255,255,255,0.06) !important;
      box-shadow: none !important;
    }
    .layout-topbar .layout-topbar-logo span,
    .layout-topbar .topbar-menu li a,
    .layout-topbar .topbar-menu li button {
      color: rgba(255,255,255,0.8) !important;
    }
  }

  @keyframes fadeIn {
    from { opacity:0; transform:translateY(14px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes pulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%     { opacity:0.6; transform:scale(0.85); }
  }
  @keyframes spin {
    from { transform:rotate(0deg); }
    to   { transform:rotate(360deg); }
  }
  @keyframes slideInRight {
    from { opacity:0; transform:translateX(24px); }
    to   { opacity:1; transform:translateX(0); }
  }

  /* ── PAGE ── */
  .panier-page {
    font-family: 'DM Sans', sans-serif;
    padding: 2rem;
    min-height: 100vh;
    background: #0a1118;
    animation: fadeIn 0.4s cubic-bezier(0.4,0,0.2,1) both;
  }

  /* ── HEADER ── */
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .page-title {
    font-family: 'Syne', sans-serif;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.85);
  }
  .page-subtitle {
    font-size: 0.7rem;
    font-weight: 500;
    color: rgba(255,255,255,0.3);
    margin-top: 3px;
  }

  /* ── LAYOUT FLEX ── */
  .layout-wrap {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  /* ── CARD ── */
  .card {
    flex: 1;
    min-width: 0;
    background: rgba(15,22,30,0.95);
    backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    transition: flex 0.3s ease;
  }
  .card::before {
    content:'';
    position:absolute;
    top:0; left:10%; right:10%;
    height:1px;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent);
    pointer-events:none;
  }

  /* ── TOOLBAR ── */
  .table-toolbar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-wrap: wrap;
  }
  .search-wrap {
    position: relative;
    flex: 1;
    min-width: 180px;
  }
  .search-wrap i {
    position:absolute; left:11px; top:50%;
    transform:translateY(-50%);
    font-size:0.78rem;
    color:rgba(255,255,255,0.25);
    pointer-events:none;
  }
  .search-input {
    width:100%;
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.08);
    border-radius:9px;
    padding:8px 12px 8px 32px;
    color:rgba(255,255,255,0.8);
    font-family:'DM Sans',sans-serif;
    font-size:0.82rem;
    outline:none;
    transition:border-color 0.18s;
  }
  .search-input::placeholder { color:rgba(255,255,255,0.2); }
  .search-input:focus { border-color:rgba(255,255,255,0.18); }

  .btn-refresh {
    width:36px; height:36px;
    border-radius:9px;
    border:1px solid rgba(255,255,255,0.08);
    background:rgba(255,255,255,0.04);
    color:rgba(255,255,255,0.4);
    cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    font-size:0.85rem;
    transition:all 0.15s;
    flex-shrink:0;
  }
  .btn-refresh:hover { background:rgba(255,255,255,0.1); color:rgba(255,255,255,0.8); }
  .spinning { animation:spin 1s linear infinite; }

  /* LOADING / ERROR */
  .loading-state, .error-state {
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    padding:3.5rem 1rem; gap:14px;
  }
  .loading-state { color:rgba(255,255,255,0.3); }
  .error-state   { color:rgba(248,113,113,0.7); }
  .loading-state p, .error-state p { font-size:0.82rem; font-weight:500; margin:0; }
  .error-state i { font-size:2rem; }

  .spinner {
    width:32px; height:32px;
    border:2px solid rgba(255,255,255,0.08);
    border-top-color:rgba(255,255,255,0.4);
    border-radius:50%;
    animation:spin 0.8s linear infinite;
  }
  .btn-retry {
    display:flex; align-items:center; gap:6px;
    padding:8px 16px;
    border-radius:8px;
    border:1px solid rgba(248,113,113,0.25);
    background:rgba(239,68,68,0.1);
    color:#f87171;
    font-family:'DM Sans',sans-serif;
    font-size:0.8rem; font-weight:600;
    cursor:pointer; transition:all 0.15s; margin-top:4px;
  }
  .btn-retry:hover { background:rgba(239,68,68,0.18); }

  /* TABLE */
  .table-wrap { overflow-x:auto; scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.08) transparent; }
  .table-wrap::-webkit-scrollbar { height:4px; }
  .table-wrap::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.08); border-radius:4px; }

  table { width:100%; border-collapse:collapse; }

  thead th {
    padding:11px 16px;
    font-size:0.62rem; font-weight:800;
    letter-spacing:1.5px; text-transform:uppercase;
    color:rgba(255,255,255,0.25);
    text-align:left;
    border-bottom:1px solid rgba(255,255,255,0.06);
    background:rgba(255,255,255,0.01);
    white-space:nowrap;
  }
  thead th.th-center { text-align:center; }
  thead th.th-right  { text-align:right; }

  .table-row {
    transition:background 0.15s ease, opacity 0.3s ease;
    cursor:pointer;
  }
  .table-row:hover { background:rgba(255,255,255,0.04); }
  .table-row.selected { background:rgba(255,255,255,0.07); }
  .table-row.removing { opacity:0.4; pointer-events:none; }

  .table-row td {
    padding:13px 16px;
    font-size:0.84rem; font-weight:500;
    color:rgba(255,255,255,0.5);
    border-bottom:1px solid rgba(255,255,255,0.04);
    vertical-align:middle;
  }
  .table-row:last-child td { border-bottom:none; }
  .td-center { text-align:center; }

  /* PRODUCT CELL */
  .product-cell { display:flex; align-items:center; gap:12px; }
  .product-thumb {
    width:42px; height:42px;
    border-radius:9px;
    background:rgba(255,255,255,0.06);
    border:1px solid rgba(255,255,255,0.08);
    display:flex; align-items:center; justify-content:center;
    font-size:1.1rem; flex-shrink:0; overflow:hidden;
  }
  .product-img { width:100%; height:100%; object-fit:cover; }
  .product-name { font-weight:600; color:rgba(255,255,255,0.85); font-size:0.85rem; }
  .product-ref  { font-size:0.7rem; color:rgba(255,255,255,0.25); margin-top:2px; }

  /* QTY */
  .qty-value { font-weight:700; color:rgba(255,255,255,0.85); font-size:0.9rem; }

  /* PRICE */
  .price { font-weight:700; color:rgba(255,255,255,0.85); text-align:right; font-size:0.88rem; }
  .price-unit { font-weight:400; font-size:0.72rem; color:rgba(255,255,255,0.3); display:block; margin-top:2px; }

  /* ACTIONS */
  .actions { display:flex; align-items:center; gap:6px; justify-content:flex-end; }
  .action-btn {
    width:30px; height:30px;
    border-radius:8px;
    border:1px solid rgba(255,255,255,0.07);
    background:rgba(255,255,255,0.04);
    color:rgba(255,255,255,0.4);
    font-size:0.78rem; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    transition:all 0.15s;
  }
  .action-btn:disabled { opacity:0.4; cursor:not-allowed; }
  .action-btn:hover:not(:disabled) { background:rgba(255,255,255,0.1); color:rgba(255,255,255,0.9); border-color:rgba(255,255,255,0.14); }
  .action-btn.danger:hover:not(:disabled) { background:rgba(239,68,68,0.15); color:#f87171; border-color:rgba(239,68,68,0.2); }

  /* EMPTY */
  .empty-state { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:3.5rem 1rem; color:rgba(255,255,255,0.2); gap:12px; }
  .empty-state i { font-size:2rem; }
  .empty-state p { font-size:0.82rem; font-weight:500; margin:0; }

  /* FOOTER */
  .table-footer {
    display:flex; align-items:center; justify-content:space-between;
    padding:1rem 1.25rem;
    border-top:1px solid rgba(255,255,255,0.06);
    background:rgba(255,255,255,0.02);
    flex-wrap:wrap; gap:1rem;
  }
  .footer-info { display:flex; align-items:center; gap:7px; font-size:0.72rem; font-weight:600; color:rgba(255,255,255,0.35); }
  .footer-dot {
    width:7px; height:7px; border-radius:50%;
    background:#10b981; box-shadow:0 0 6px rgba(16,185,129,0.7);
    animation:pulse 2.5s infinite; flex-shrink:0;
  }
  .footer-total { display:flex; align-items:center; gap:20px; flex-wrap:wrap; }
  .total-item { display:flex; flex-direction:column; align-items:flex-end; }
  .total-label { font-size:0.65rem; font-weight:800; letter-spacing:1.2px; text-transform:uppercase; color:rgba(255,255,255,0.25); }
  .total-value { font-family:'DM Sans',sans-serif; font-size:0.92rem; font-weight:600; color:rgba(255,255,255,0.85); letter-spacing:0; }
  .total-value.highlight { color:#34d399; }

  .btn-checkout {
    display:flex; align-items:center; gap:8px;
    padding:10px 22px; border-radius:10px; border:none;
    background:rgba(255,255,255,0.9); color:#0a1118;
    font-family:'DM Sans',sans-serif; font-size:0.83rem; font-weight:700;
    cursor:pointer; transition:all 0.18s ease; letter-spacing:0.2px;
  }
  .btn-checkout i { font-size:0.8rem; }
  .btn-checkout:hover { background:#fff; transform:translateY(-1px); box-shadow:0 6px 20px rgba(0,0,0,0.4); }

  /* ── DETAIL PANEL ── */
  .detail-panel {
    width: 300px;
    flex-shrink: 0;
    background: rgba(15,22,30,0.95);
    backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    overflow: hidden;
    animation: slideInRight 0.25s cubic-bezier(0.4,0,0.2,1) both;
    position: sticky;
    top: 1rem;
  }

  .detail-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.1rem 0.75rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .detail-title {
    font-family: 'Syne', sans-serif;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
  }
  .detail-close {
    width: 26px; height: 26px;
    border-radius: 7px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.35);
    font-size: 0.72rem;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s;
  }
  .detail-close:hover { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); }

  .detail-image-wrap {
    padding: 1rem 1.1rem 0.5rem;
    display: flex;
    justify-content: center;
  }
  .detail-img {
    width: 100%;
    max-height: 160px;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.07);
  }
  .detail-img-placeholder {
    width: 80px; height: 80px;
    font-size: 2.5rem;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.05);
    border-radius: 12px;
  }

  .detail-section {
    padding: 0.75rem 1.1rem;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .detail-section:last-child { border-bottom: none; }

  .detail-product-name {
    font-size: 0.9rem;
    font-weight: 700;
    color: rgba(255,255,255,0.9);
    line-height: 1.3;
  }
  .detail-product-id {
    font-size: 0.68rem;
    color: rgba(255,255,255,0.25);
    margin-top: 3px;
  }

  .detail-section-label {
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    margin-bottom: 8px;
  }
  .detail-section-value.desc {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.5);
    line-height: 1.5;
  }

  /* GRID 2 colonnes */
  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .detail-cell {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 8px;
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .cell-label {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
  }
  .cell-value {
    font-size: 0.82rem;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
  }
  .cell-value.badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 5px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    font-size: 0.75rem;
    width: fit-content;
  }
  .cell-value.green { color: #34d399; }

  /* VARIANTES */
  .variantes-list { display: flex; flex-direction: column; gap: 6px; }
  .variante-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 10px;
    border-radius: 8px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
    font-size: 0.75rem;
    gap: 6px;
  }
  .variante-row.active {
    background: rgba(52,211,153,0.08);
    border-color: rgba(52,211,153,0.2);
  }
  .variante-label { font-weight: 700; color: rgba(255,255,255,0.7); }
  .variante-stock { font-size: 0.68rem; color: rgba(255,255,255,0.3); }
  .variante-price { font-weight: 600; color: rgba(255,255,255,0.75); white-space: nowrap; }
  .variante-row.active .variante-label,
  .variante-row.active .variante-price { color: #34d399; }
  </style>
  `,
})
export class PanierClient implements OnInit {
  searchQuery = '';
  items: PanierItem[] = [];
  isLoading = false;
  hasError = false;
  removingIds = new Set<string>();
  selectedItem: PanierItem | null = null;

  private baseImageUrl = 'http://localhost:5000';

  constructor(private panierService: ProduitService) {}

  ngOnInit(): void {
    this.loadPanier();
  }

  loadPanier(): void {
    this.isLoading = true;
    this.hasError = false;
    this.selectedItem = null;

    this.panierService.getAllPanieruserByIdUser().subscribe({
      next: (data) => { this.items = data; this.isLoading = false; },
      error: (err) => { console.error('Erreur chargement panier:', err); this.hasError = true; this.isLoading = false; },
    });
  }

  removeItem(id: string): void {
    if (this.selectedItem?._id === id) this.selectedItem = null;
    // this.removingIds.add(id);
    // this.panierService.removeFromPanier(id).subscribe({
    //   next: () => { this.items = this.items.filter(i => i._id !== id); this.removingIds.delete(id); },
    //   error: (err) => { console.error(err); this.removingIds.delete(id); this.items = this.items.filter(i => i._id !== id); },
    // });
  }

  selectItem(item: PanierItem): void {
    this.selectedItem = this.selectedItem?._id === item._id ? null : item;
  }

  closeDetail(): void {
    this.selectedItem = null;
  }

  get filteredItems(): PanierItem[] {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) return this.items;
    return this.items.filter(item =>
      item.nom_produit.toLowerCase().includes(q) ||
      item.taille.toLowerCase().includes(q) ||
      item._id.toLowerCase().includes(q)
    );
  }

  get subtotalHT(): number { return this.items.reduce((s, i) => s + i.total, 0); }
  get tva(): number { return this.subtotalHT * 0.2; }
  get totalTTC(): number { return this.subtotalHT + this.tva; }
  get itemCount(): number { return this.items.length; }

  getProductImage(item: PanierItem): string | null {
    const images = item.id_produit?.images;
    return images?.length ? `${this.baseImageUrl}${images[0].url}` : null;
  }

  isCurrentVariante(variante: any): boolean {
    return variante.combinaison?.some((c: any) => c.valeur === this.selectedItem?.taille);
  }

  getVarianteLabel(variante: any): string {
    return variante.combinaison?.map((c: any) => `${c.attribut} : ${c.valeur}`).join(', ') ?? '';
  }

  getVariantePrice(variante: any): number {
    const hist = variante.historique_prix;
    return hist?.length ? hist[hist.length - 1].prix_hors_taxe : 0;
  }

  trackById(_: number, item: PanierItem): string { return item._id; }

  formatPrice(value: number): string {
    return value.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' Ar';
  }
}