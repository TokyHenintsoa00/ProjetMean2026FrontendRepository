// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// export interface PanierItem {
//   id: number;
//   icon: string;
//   name: string;
//   ref: string;
//   qty: number;
//   price: number;
//   status: 'disponible' | 'rupture' | 'commande';
// }

// type FilterType = 'all' | 'disponible' | 'rupture' | 'commande';

// @Component({
//   selector: 'app-panier-client',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   template:`

//   <div class="panier-page">

//   <!-- ── HEADER ── -->
//   <div class="page-header">
//     <div class="page-title-block">
//       <div class="page-title">Panier Client</div>
//       <div class="page-subtitle">{{ itemCount }} article{{ itemCount > 1 ? 's' : '' }} dans le panier</div>
//     </div>
//     <button class="btn-add" (click)="addItem()">
//       <i class="pi pi-plus"></i>
//       Ajouter un article
//     </button>
//   </div>

//   <!-- ── CARD ── -->
//   <div class="card">

//     <!-- Toolbar -->
//     <div class="table-toolbar">
//       <div class="search-wrap">
//         <i class="pi pi-search"></i>
//         <input
//           class="search-input"
//           type="text"
//           placeholder="Rechercher un article…"
//           [(ngModel)]="searchQuery"
//         />
//       </div>


//     </div>

//     <!-- Table -->
//     <div class="table-wrap">
//       <table>
//         <thead>
//           <tr>
//             <th>Produit</th>
//             <th class="th-center">Quantité</th>
//             <th class="th-right">Prix unit.</th>
//             <th class="th-right">Total</th>
//             <th class="th-right">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr
//             *ngFor="let item of filteredItems; trackBy: trackById"
//             class="table-row"
//           >
//             <!-- Produit -->
//             <td>
//               <div class="product-cell">
//                 <div class="product-thumb">{{ item.icon }}</div>
//                 <div>
//                   <div class="product-name">{{ item.name }}</div>
//                   <div class="product-ref">{{ item.ref }}</div>
//                 </div>
//               </div>
//             </td>

//             <!-- Quantité -->
//             <td class="td-center">
//               <span class="qty-value">{{ item.qty }}</span>
//             </td>

//             <!-- Prix unitaire -->
//             <td>
//               <div class="price">
//                 {{ formatPrice(item.price) }}
//                 <span class="price-unit">HT / unité</span>
//               </div>
//             </td>

//             <!-- Total ligne -->
//             <td>
//               <div class="price">{{ formatPrice(item.price * item.qty) }}</div>
//             </td>

//             <!-- Actions -->
//             <td>
//               <div class="actions">
//                 <button class="action-btn danger" title="Supprimer" (click)="removeItem(item.id)">
//                   <i class="pi pi-trash"></i>
//                 </button>
//               </div>
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       <!-- Empty state -->
//       <div class="empty-state" *ngIf="filteredItems.length === 0">
//         <i class="pi pi-shopping-cart"></i>
//         <p>Aucun article trouvé</p>
//       </div>
//     </div>

//     <!-- Footer total -->
//     <div class="table-footer">
//       <div class="footer-info">
//         <span class="footer-dot"></span>
//         {{ itemCount }} article{{ itemCount > 1 ? 's' : '' }}
//       </div>

//       <div class="footer-total">
//         <div class="total-item">
//           <span class="total-label">Sous-total HT</span>
//           <span class="total-value">{{ formatPrice(subtotalHT) }}</span>
//         </div>
//         <div class="total-item">
//           <span class="total-label">TVA (20%)</span>
//           <span class="total-value">{{ formatPrice(tva) }}</span>
//         </div>
//         <div class="total-item">
//           <span class="total-label">Total TTC</span>
//           <span class="total-value highlight">{{ formatPrice(totalTTC) }}</span>
//         </div>
//         <button class="btn-checkout">
//           <i class="pi pi-arrow-right"></i>
//           Valider la commande
//         </button>
//       </div>
//     </div>

//   </div>
// </div>


// <style>
// @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

// // ── OVERRIDE SAKAI LAYOUT BACKGROUND ──
// // Ces règles neutralisent le fond blanc natif de Sakai/PrimeNG
// ::ng-deep {
//   body,
//   .layout-wrapper,
//   .layout-main,
//   .layout-main-container,
//   .layout-content {
//     background: #0a1118 !important;
//     color: rgba(255, 255, 255, 0.8) !important;
//   }

//   // Topbar sombre
//   .layout-topbar {
//     background: rgba(10, 17, 24, 0.95) !important;
//     backdrop-filter: blur(20px) !important;
//     border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
//     box-shadow: none !important;
//   }

//   .layout-topbar .layout-topbar-logo span,
//   .layout-topbar .topbar-menu li a,
//   .layout-topbar .topbar-menu li button {
//     color: rgba(255, 255, 255, 0.8) !important;
//   }
// }

// // ── VARIABLES ──
// $font-body:    'DM Sans', sans-serif;
// $font-display: 'Syne', sans-serif;
// $border:       rgba(255, 255, 255, 0.06);
// $text-muted:   rgba(255, 255, 255, 0.3);
// $text-dim:     rgba(255, 255, 255, 0.5);
// $text-base:    rgba(255, 255, 255, 0.85);

// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(14px); }
//   to   { opacity: 1; transform: translateY(0); }
// }

// @keyframes pulse {
//   0%, 100% { opacity: 1; transform: scale(1); }
//   50%       { opacity: 0.6; transform: scale(0.85); }
// }

// // ── PAGE ──
// .panier-page {
//   font-family: $font-body;
//   padding: 2rem;
//   min-height: 100vh;
//   background: #0a1118;
//   animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
// }

// // ── HEADER ──
// .page-header {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   flex-wrap: wrap;
//   gap: 1rem;
//   margin-bottom: 1.5rem;
// }

// .page-title {
//   font-family: $font-display;
//   font-size: 0.75rem;
//   font-weight: 800;
//   letter-spacing: 2.5px;
//   text-transform: uppercase;
//   color: $text-base;
// }

// .page-subtitle {
//   font-size: 0.7rem;
//   font-weight: 500;
//   color: $text-muted;
//   margin-top: 3px;
//   letter-spacing: 0.3px;
// }

// .btn-add {
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   padding: 9px 18px;
//   border-radius: 10px;
//   border: 1px solid rgba(255, 255, 255, 0.1);
//   background: rgba(255, 255, 255, 0.07);
//   color: $text-base;
//   font-family: $font-body;
//   font-size: 0.82rem;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.18s ease;
//   letter-spacing: 0.2px;

//   i { font-size: 0.8rem; opacity: 0.8; }

//   &:hover {
//     background: rgba(255, 255, 255, 0.12);
//     color: #fff;
//     border-color: rgba(255, 255, 255, 0.18);
//   }
// }

// // ── CARD ──
// .card {
//   background: rgba(15, 22, 30, 0.95);
//   backdrop-filter: blur(20px) saturate(160%);
//   -webkit-backdrop-filter: blur(20px) saturate(160%);
//   border: 1px solid $border;
//   border-radius: 16px;
//   overflow: hidden;
//   position: relative;

//   &::before {
//     content: '';
//     position: absolute;
//     top: 0; left: 10%; right: 10%;
//     height: 1px;
//     background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
//     pointer-events: none;
//   }
// }

// // ── TOOLBAR ──
// .table-toolbar {
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   padding: 1rem 1.25rem;
//   border-bottom: 1px solid $border;
//   flex-wrap: wrap;
// }

// .search-wrap {
//   position: relative;
//   flex: 1;
//   min-width: 180px;

//   i {
//     position: absolute;
//     left: 11px;
//     top: 50%;
//     transform: translateY(-50%);
//     font-size: 0.78rem;
//     color: rgba(255, 255, 255, 0.25);
//     pointer-events: none;
//   }
// }

// .search-input {
//   width: 100%;
//   background: rgba(255, 255, 255, 0.04);
//   border: 1px solid rgba(255, 255, 255, 0.08);
//   border-radius: 9px;
//   padding: 8px 12px 8px 32px;
//   color: rgba(255, 255, 255, 0.8);
//   font-family: $font-body;
//   font-size: 0.82rem;
//   outline: none;
//   transition: border-color 0.18s;

//   &::placeholder { color: rgba(255, 255, 255, 0.2); }
//   &:focus        { border-color: rgba(255, 255, 255, 0.18); }
// }

// .filter-badge {
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   padding: 7px 13px;
//   border-radius: 8px;
//   border: 1px solid rgba(255, 255, 255, 0.07);
//   background: rgba(255, 255, 255, 0.03);
//   font-size: 0.75rem;
//   font-weight: 600;
//   color: rgba(255, 255, 255, 0.4);
//   cursor: pointer;
//   transition: all 0.15s;
//   white-space: nowrap;
//   font-family: $font-body;

//   &:hover {
//     background: rgba(255, 255, 255, 0.07);
//     color: rgba(255, 255, 255, 0.7);
//   }

//   &.active {
//     background: rgba(255, 255, 255, 0.1);
//     color: rgba(255, 255, 255, 0.9);
//     border-color: rgba(255, 255, 255, 0.14);
//   }
// }

// // ── TABLE ──
// .table-wrap {
//   overflow-x: auto;
//   scrollbar-width: thin;
//   scrollbar-color: rgba(255,255,255,0.08) transparent;

//   &::-webkit-scrollbar       { height: 4px; }
//   &::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
// }

// table {
//   width: 100%;
//   border-collapse: collapse;
// }

// thead th {
//   padding: 11px 16px;
//   font-size: 0.62rem;
//   font-weight: 800;
//   letter-spacing: 1.5px;
//   text-transform: uppercase;
//   color: rgba(255, 255, 255, 0.25);
//   text-align: left;
//   border-bottom: 1px solid $border;
//   background: rgba(255, 255, 255, 0.01);
//   white-space: nowrap;

//   &.th-center { text-align: center; }
//   &.th-right  { text-align: right; }
// }

// .table-row {
//   transition: background 0.15s ease;

//   &:hover { background: rgba(255, 255, 255, 0.04); }

//   td {
//     padding: 13px 16px;
//     font-size: 0.84rem;
//     font-weight: 500;
//     color: $text-dim;
//     border-bottom: 1px solid rgba(255, 255, 255, 0.04);
//     vertical-align: middle;
//   }

//   &:last-child td { border-bottom: none; }
// }

// .td-center { text-align: center; }

// // ── PRODUCT CELL ──
// .product-cell {
//   display: flex;
//   align-items: center;
//   gap: 12px;
// }

// .product-thumb {
//   width: 38px;
//   height: 38px;
//   border-radius: 9px;
//   background: rgba(255, 255, 255, 0.06);
//   border: 1px solid rgba(255, 255, 255, 0.08);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1.1rem;
//   flex-shrink: 0;
// }

// .product-name {
//   font-weight: 600;
//   color: $text-base;
//   font-size: 0.85rem;
// }

// .product-ref {
//   font-size: 0.7rem;
//   color: rgba(255, 255, 255, 0.25);
//   margin-top: 2px;
// }

// // ── QTY INPUT ──
// .qty-input {
//   width: 64px;
//   background: rgba(255, 255, 255, 0.05);
//   border: 1px solid rgba(255, 255, 255, 0.1);
//   border-radius: 8px;
//   padding: 6px 10px;
//   color: rgba(255, 255, 255, 0.85);
//   font-family: $font-body;
//   font-size: 0.85rem;
//   font-weight: 600;
//   text-align: center;
//   outline: none;
//   transition: border-color 0.18s, background 0.18s;

//   &:focus {
//     border-color: rgba(255, 255, 255, 0.25);
//     background: rgba(255, 255, 255, 0.08);
//   }

//   // Masquer les flèches navigateur
//   &::-webkit-outer-spin-button,
//   &::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
//   -moz-appearance: textfield;
// }

// // ── PRICE ──
// .price {
//   font-weight: 700;
//   color: $text-base;
//   text-align: right;
//   font-size: 0.88rem;
// }

// .price-unit {
//   font-weight: 400;
//   font-size: 0.72rem;
//   color: $text-muted;
//   display: block;
//   margin-top: 2px;
// }

// // ── STATUS ──
// .status {
//   display: inline-flex;
//   align-items: center;
//   gap: 5px;
//   padding: 4px 10px;
//   border-radius: 6px;
//   font-size: 0.72rem;
//   font-weight: 600;
//   letter-spacing: 0.3px;
//   white-space: nowrap;

//   &.status-disponible {
//     background: rgba(16, 185, 129, 0.12);
//     color: #34d399;
//     .status-dot { background: #10b981; box-shadow: 0 0 5px rgba(16,185,129,0.7); animation: pulse 2.5s infinite; }
//   }

//   &.status-rupture {
//     background: rgba(239, 68, 68, 0.12);
//     color: #f87171;
//     .status-dot { background: #ef4444; }
//   }

//   &.status-commande {
//     background: rgba(245, 158, 11, 0.12);
//     color: #fbbf24;
//     .status-dot { background: #f59e0b; }
//   }
// }

// .status-dot {
//   width: 6px;
//   height: 6px;
//   border-radius: 50%;
//   flex-shrink: 0;
// }

// // ── ACTIONS ──
// .actions {
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   justify-content: flex-end;
// }

// .action-btn {
//   width: 30px;
//   height: 30px;
//   border-radius: 8px;
//   border: 1px solid rgba(255, 255, 255, 0.07);
//   background: rgba(255, 255, 255, 0.04);
//   color: rgba(255, 255, 255, 0.4);
//   font-size: 0.78rem;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.15s;

//   &:hover { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.9); border-color: rgba(255,255,255,0.14); }

//   &.danger:hover {
//     background: rgba(239, 68, 68, 0.15);
//     color: #f87171;
//     border-color: rgba(239, 68, 68, 0.2);
//   }
// }

// // ── EMPTY STATE ──
// .empty-state {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 3.5rem 1rem;
//   color: rgba(255, 255, 255, 0.2);
//   gap: 12px;

//   i  { font-size: 2rem; }
//   p  { font-size: 0.82rem; font-weight: 500; }
// }

// // ── FOOTER ──
// .table-footer {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 1rem 1.25rem;
//   border-top: 1px solid $border;
//   background: rgba(255, 255, 255, 0.02);
//   flex-wrap: wrap;
//   gap: 1rem;
// }

// .footer-info {
//   display: flex;
//   align-items: center;
//   gap: 7px;
//   font-size: 0.72rem;
//   font-weight: 600;
//   color: rgba(255, 255, 255, 0.35);
//   letter-spacing: 0.2px;
// }

// .footer-dot {
//   width: 7px;
//   height: 7px;
//   border-radius: 50%;
//   background: #10b981;
//   box-shadow: 0 0 6px rgba(16, 185, 129, 0.7);
//   animation: pulse 2.5s infinite;
//   flex-shrink: 0;
// }

// .footer-total {
//   display: flex;
//   align-items: center;
//   gap: 20px;
//   flex-wrap: wrap;
// }

// .total-item {
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;
// }

// .total-label {
//   font-size: 0.65rem;
//   font-weight: 800;
//   letter-spacing: 1.2px;
//   text-transform: uppercase;
//   color: rgba(255, 255, 255, 0.25);
// }

// .total-value {
//   font-family: $font-display;
//   font-size: 1.1rem;
//   font-weight: 800;
//   color: $text-base;
//   letter-spacing: 0.5px;

//   &.highlight { color: #34d399; }
// }

// .btn-checkout {
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   padding: 10px 22px;
//   border-radius: 10px;
//   border: none;
//   background: rgba(255, 255, 255, 0.9);
//   color: #0a1118;
//   font-family: $font-body;
//   font-size: 0.83rem;
//   font-weight: 700;
//   cursor: pointer;
//   transition: all 0.18s ease;
//   letter-spacing: 0.2px;

//   i { font-size: 0.8rem; }

//   &:hover {
//     background: #fff;
//     transform: translateY(-1px);
//     box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
//   }
// }

// </style>

// `
// })
// export class PanierClient implements OnInit {

//   searchQuery = '';
//   currentFilter: FilterType = 'all';

//   filters: { key: FilterType; label: string; icon: string }[] = [
//     { key: 'all',        label: 'Tous',          icon: 'pi pi-list' },
//     { key: 'disponible', label: 'Disponible',     icon: 'pi pi-check-circle' },
//     { key: 'rupture',    label: 'Rupture',        icon: 'pi pi-times-circle' },
//     { key: 'commande',   label: 'En commande',    icon: 'pi pi-clock' },
//   ];

//   items: PanierItem[] = [
//     { id: 1, icon: '💻', name: 'MacBook Pro 14"',               ref: 'REF-MBP14-2024', qty: 1, price: 2199, status: 'disponible' },
//     { id: 2, icon: '🖱️', name: 'Souris Logitech MX Master 3',   ref: 'REF-LOG-MX3',   qty: 2, price: 109,  status: 'disponible' },
//     { id: 3, icon: '🎧', name: 'Sony WH-1000XM5',               ref: 'REF-SONY-XM5',  qty: 1, price: 349,  status: 'commande'   },
//     { id: 4, icon: '⌨️', name: 'Clavier Mécanique Keychron K8', ref: 'REF-KEY-K8',    qty: 3, price: 89,   status: 'disponible' },
//     { id: 5, icon: '🖥️', name: 'Moniteur LG UltraWide 34"',     ref: 'REF-LG-UW34',   qty: 1, price: 699,  status: 'rupture'    },
//   ];

//   private sampleProducts: Omit<PanierItem, 'id' | 'qty'>[] = [
//     { icon: '📱', name: 'iPhone 15 Pro',         ref: 'REF-APL-IP15P', price: 1199, status: 'disponible' },
//     { icon: '🖨️', name: 'Imprimante HP LaserJet', ref: 'REF-HP-LJ',    price: 249,  status: 'commande'   },
//     { icon: '📷', name: 'Canon EOS R50',          ref: 'REF-CAN-R50',  price: 879,  status: 'disponible' },
//     { icon: '🔌', name: 'Hub USB-C 7 ports',      ref: 'REF-USB-7P',   price: 59,   status: 'disponible' },
//   ];

//   private nextId = 6;

//   ngOnInit(): void {}

//   /* ── GETTERS ── */

//   get filteredItems(): PanierItem[] {
//     const q = this.searchQuery.toLowerCase();
//     return this.items.filter(item => {
//       const matchFilter = this.currentFilter === 'all' || item.status === this.currentFilter;
//       const matchSearch = !q || item.name.toLowerCase().includes(q) || item.ref.toLowerCase().includes(q);
//       return matchFilter && matchSearch;
//     });
//   }

//   get subtotalHT(): number {
//     return this.items.reduce((s, i) => s + i.price * i.qty, 0);
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

//   /* ── ACTIONS ── */

//   setFilter(filter: FilterType): void {
//     this.currentFilter = filter;
//   }

//   changeQty(item: PanierItem, delta: number): void {
//     item.qty = Math.max(1, item.qty + delta);
//   }

//   removeItem(id: number): void {
//     this.items = this.items.filter(i => i.id !== id);
//   }

//   addItem(): void {
//     const sample = this.sampleProducts[Math.floor(Math.random() * this.sampleProducts.length)];
//     this.items.push({ ...sample, id: this.nextId++, qty: 1 });
//     this.currentFilter = 'all';
//   }

//   /* ── UTILS ── */

//   trackById(_: number, item: PanierItem): number {
//     return item.id;
//   }

//   formatPrice(value: number): string {
//     return value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
//   }

  
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProduitService } from '../service/produit.service';

// ── INTERFACES BASÉES SUR L'API ──
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

    <!-- ── CARD ── -->
    <div class="card">

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

      <!-- ── LOADING STATE ── -->
      <div class="loading-state" *ngIf="isLoading">
        <div class="spinner"></div>
        <p>Chargement du panier…</p>
      </div>

      <!-- ── ERROR STATE ── -->
      <div class="error-state" *ngIf="hasError && !isLoading">
        <i class="pi pi-exclamation-triangle"></i>
        <p>Impossible de charger le panier</p>
        <button class="btn-retry" (click)="loadPanier()">
          <i class="pi pi-refresh"></i> Réessayer
        </button>
      </div>

      <!-- ── TABLE ── -->
      <div class="table-wrap" *ngIf="!isLoading && !hasError">
        <table>
          <thead>
            <tr>
              <th>Produit</th>
              <th class="th-center">Taille</th>
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
                    <span *ngIf="!getProductImage(item)" class="product-emoji">🛍️</span>
                  </div>
                  <div>
                    <div class="product-name">{{ item.nom_produit }}</div>
                    <div class="product-ref">ID: {{ item._id.slice(-6).toUpperCase() }}</div>
                  </div>
                </div>
              </td>

              <!-- Taille -->
              <td class="td-center">
                <span class="badge-taille">{{ item.taille }}</span>
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
                    (click)="removeItem(item._id)"
                    [disabled]="removingIds.has(item._id)"
                  >
                    <i class="pi" [class.pi-trash]="!removingIds.has(item._id)" [class.pi-spin]="removingIds.has(item._id)" [class.pi-spinner]="removingIds.has(item._id)"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty state -->
        <div class="empty-state" *ngIf="filteredItems.length === 0 && items.length > 0">
          <i class="pi pi-search"></i>
          <p>Aucun article trouvé pour "{{ searchQuery }}"</p>
        </div>

        <div class="empty-state" *ngIf="items.length === 0">
          <i class="pi pi-shopping-cart"></i>
          <p>Votre panier est vide</p>
        </div>
      </div>

      <!-- ── FOOTER TOTAL ── -->
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
  </div>


  <style>
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

  ::ng-deep {
    body,
    .layout-wrapper,
    .layout-main,
    .layout-main-container,
    .layout-content {
      background: #0a1118 !important;
      color: rgba(255, 255, 255, 0.8) !important;
    }

    .layout-topbar {
      background: rgba(10, 17, 24, 0.95) !important;
      backdrop-filter: blur(20px) !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
      box-shadow: none !important;
    }

    .layout-topbar .layout-topbar-logo span,
    .layout-topbar .topbar-menu li a,
    .layout-topbar .topbar-menu li button {
      color: rgba(255, 255, 255, 0.8) !important;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.6; transform: scale(0.85); }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes fadeOut {
    from { opacity: 1; transform: scaleY(1); }
    to   { opacity: 0; transform: scaleY(0); max-height: 0; }
  }

  .panier-page {
    font-family: 'DM Sans', sans-serif;
    padding: 2rem;
    min-height: 100vh;
    background: #0a1118;
    animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
  }

  /* HEADER */
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
    color: rgba(255, 255, 255, 0.85);
  }

  .page-subtitle {
    font-size: 0.7rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.3);
    margin-top: 3px;
  }

  /* CARD */
  .card {
    background: rgba(15, 22, 30, 0.95);
    backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    overflow: hidden;
    position: relative;
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    pointer-events: none;
  }

  /* TOOLBAR */
  .table-toolbar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    flex-wrap: wrap;
  }

  .search-wrap {
    position: relative;
    flex: 1;
    min-width: 180px;
  }

  .search-wrap i {
    position: absolute;
    left: 11px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.25);
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 9px;
    padding: 8px 12px 8px 32px;
    color: rgba(255, 255, 255, 0.8);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    outline: none;
    transition: border-color 0.18s;
  }

  .search-input::placeholder { color: rgba(255, 255, 255, 0.2); }
  .search-input:focus        { border-color: rgba(255, 255, 255, 0.18); }

  .btn-refresh {
    width: 36px;
    height: 36px;
    border-radius: 9px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    transition: all 0.15s;
    flex-shrink: 0;
  }

  .btn-refresh:hover {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.8);
  }

  .spinning { animation: spin 1s linear infinite; }

  /* LOADING */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3.5rem 1rem;
    gap: 14px;
    color: rgba(255, 255, 255, 0.3);
  }

  .spinner {
    width: 32px;
    height: 32px;
    border: 2px solid rgba(255, 255, 255, 0.08);
    border-top-color: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .loading-state p, .error-state p {
    font-size: 0.82rem;
    font-weight: 500;
    margin: 0;
  }

  /* ERROR */
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3.5rem 1rem;
    gap: 12px;
    color: rgba(248, 113, 113, 0.7);
  }

  .error-state i { font-size: 2rem; }

  .btn-retry {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid rgba(248, 113, 113, 0.25);
    background: rgba(239, 68, 68, 0.1);
    color: #f87171;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
    margin-top: 4px;
  }

  .btn-retry:hover {
    background: rgba(239, 68, 68, 0.18);
  }

  /* TABLE */
  .table-wrap {
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.08) transparent;
  }

  .table-wrap::-webkit-scrollbar       { height: 4px; }
  .table-wrap::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

  table { width: 100%; border-collapse: collapse; }

  thead th {
    padding: 11px 16px;
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.25);
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.01);
    white-space: nowrap;
  }

  thead th.th-center { text-align: center; }
  thead th.th-right  { text-align: right; }

  .table-row {
    transition: background 0.15s ease, opacity 0.3s ease;
  }

  .table-row:hover { background: rgba(255, 255, 255, 0.04); }

  .table-row.removing { opacity: 0.4; pointer-events: none; }

  .table-row td {
    padding: 13px 16px;
    font-size: 0.84rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    vertical-align: middle;
  }

  .table-row:last-child td { border-bottom: none; }

  .td-center { text-align: center; }

  /* PRODUCT CELL */
  .product-cell {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .product-thumb {
    width: 42px;
    height: 42px;
    border-radius: 9px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
    overflow: hidden;
  }

  .product-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .product-name {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.85rem;
  }

  .product-ref {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.25);
    margin-top: 2px;
  }

  /* BADGE TAILLE */
  .badge-taille {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.72rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 0.5px;
  }

  /* QTY */
  .qty-value {
    font-weight: 700;
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.9rem;
  }

  /* PRICE */
  .price {
    font-weight: 700;
    color: rgba(255, 255, 255, 0.85);
    text-align: right;
    font-size: 0.88rem;
  }

  .price-unit {
    font-weight: 400;
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.3);
    display: block;
    margin-top: 2px;
  }

  /* ACTIONS */
  .actions {
    display: flex;
    align-items: center;
    gap: 6px;
    justify-content: flex-end;
  }

  .action-btn {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    background: rgba(255, 255, 255, 0.04);
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.78rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
  }

  .action-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .action-btn:hover:not(:disabled) {
    background: rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.9);
    border-color: rgba(255,255,255,0.14);
  }

  .action-btn.danger:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
    border-color: rgba(239, 68, 68, 0.2);
  }

  /* EMPTY STATE */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3.5rem 1rem;
    color: rgba(255, 255, 255, 0.2);
    gap: 12px;
  }

  .empty-state i  { font-size: 2rem; }
  .empty-state p  { font-size: 0.82rem; font-weight: 500; margin: 0; }

  /* FOOTER */
  .table-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.02);
    flex-wrap: wrap;
    gap: 1rem;
  }

  .footer-info {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 0.72rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.35);
  }

  .footer-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 6px rgba(16, 185, 129, 0.7);
    animation: pulse 2.5s infinite;
    flex-shrink: 0;
  }

  .footer-total {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .total-item {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .total-label {
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.25);
  }

  .total-value {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0;
}

  .total-value.highlight { color: #34d399; }

  .btn-checkout {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 22px;
    border-radius: 10px;
    border: none;
    background: rgba(255, 255, 255, 0.9);
    color: #0a1118;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.83rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s ease;
    letter-spacing: 0.2px;
  }

  .btn-checkout i { font-size: 0.8rem; }

  .btn-checkout:hover {
    background: #fff;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }
  </style>
  `,
})
export class PanierClient implements OnInit {
  searchQuery = '';

  items: PanierItem[] = [];
  isLoading = false;
  hasError = false;
  removingIds = new Set<string>();

  // 🔧 Remplacez par votre URL de base d'images
  private baseImageUrl = 'http://localhost:5000';

  constructor(private panierService: ProduitService) {}

  ngOnInit(): void {
    this.loadPanier();
  }

  /* ── CHARGEMENT API ── */

  loadPanier(): void {
    this.isLoading = true;
    this.hasError = false;

    this.panierService.getAllPanieruserByIdUser().subscribe({
      next: (data) => {
        this.items = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement panier:', err);
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  /* ── SUPPRESSION ── */

  removeItem(id: string): void {
    // this.removingIds.add(id);

    // this.panierService.removeFromPanier(id).subscribe({
    //   next: () => {
    //     this.items = this.items.filter((i) => i._id !== id);
    //     this.removingIds.delete(id);
    //   },
    //   error: (err) => {
    //     console.error('Erreur suppression:', err);
    //     this.removingIds.delete(id);
    //     // Suppression locale en fallback si pas d'endpoint DELETE
    //     this.items = this.items.filter((i) => i._id !== id);
    //   },
    // });
  }

  /* ── GETTERS ── */

  get filteredItems(): PanierItem[] {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) return this.items;
    return this.items.filter(
      (item) =>
        item.nom_produit.toLowerCase().includes(q) ||
        item.taille.toLowerCase().includes(q) ||
        item._id.toLowerCase().includes(q)
    );
  }

  get subtotalHT(): number {
    return this.items.reduce((s, i) => s + i.total, 0);
  }

  get tva(): number {
    return this.subtotalHT * 0.2;
  }

  get totalTTC(): number {
    return this.subtotalHT + this.tva;
  }

  get itemCount(): number {
    return this.items.length;
  }

  /* ── UTILS ── */

  getProductImage(item: PanierItem): string | null {
    const images = item.id_produit?.images;
    if (images && images.length > 0) {
      return `${this.baseImageUrl}${images[0].url}`;
    }
    return null;
  }

  trackById(_: number, item: PanierItem): string {
    return item._id;
  }

  formatPrice(value: number): string {
    return (
      value.toLocaleString('fr-FR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }) + ' Ar'
    );
  }
}