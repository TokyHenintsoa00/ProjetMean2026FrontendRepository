// // promotion-boutique.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule, DecimalPipe, SlicePipe } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ProductService } from '@/pages/service/product.service';
// import { ProduitService } from '@/pages/service/produit.service';

// /* ── Types ── */
// export interface PrixHistorique {
//   prix_hors_taxe: number;
//   prix_ttc: number | null;
//   _id: string;
//   created_at: string;
// }

// export interface Variante {
//   _id: string;
//   combinaison: { attribut: string; valeur: string; _id: string }[];
//   stock: number;
//   is_default: boolean;
//   reference: string;
//   historique_prix: PrixHistorique[];
// }

// export interface Product {
//   _id: string;
//   id_boutique: string;
//   nom_produit: string;
//   description: string;
//   images: { filename: string; url: string; size: number; mimetype: string; _id: string }[];
//   id_categorie: { _id: string; nom: string; parent: string | null }[];
//   variantes: Variante[];
//   created_at: string;
//   updated_at: string;
// }

// export interface PromoEntry {
//   discount: number;   // 0–100
//   prixPromo: number;  // calculé
//   debut: string;
//   fin: string;
//   active: boolean;
// }
// @Component({
//   selector: 'app-promotion-boutique',
//   standalone: true,
//   imports: [CommonModule, FormsModule, DecimalPipe, SlicePipe],
//   template: `
//   <!-- promotion-boutique.component.html -->
// <div class="promo-page">

//   <!-- ── HEADER ── -->
//   <div class="page-header">
//     <div>
//       <span class="page-tag">Gestion</span>
//       <h1 class="page-title">Promotions Boutique</h1>
//       <p class="page-subtitle">Définissez des remises directement par variante</p>
//     </div>
//     <div class="page-header-right">
//       <button class="btn-secondary" (click)="loadProducts()">
//         <i class="pi pi-refresh"></i> Actualiser
//       </button>
//       <button class="btn-primary" (click)="applyAll()" [disabled]="selectedIds.length === 0">
//         <i class="pi pi-send"></i> Enregistrer ({{ selectedIds.length }})
//       </button>
//     </div>
//   </div>

//   <!-- ── STATS ── -->
//   <div class="stats-row">
//     <div class="stat-card">
//       <div class="stat-icon green"><i class="pi pi-tag"></i></div>
//       <div class="stat-info">
//         <span class="stat-value">{{ totalActivePromos }}</span>
//         <span class="stat-label">En promo</span>
//       </div>
//     </div>
//     <div class="stat-card">
//       <div class="stat-icon blue"><i class="pi pi-box"></i></div>
//       <div class="stat-info">
//         <span class="stat-value">{{ products.length }}</span>
//         <span class="stat-label">Produits</span>
//       </div>
//     </div>
//     <div class="stat-card">
//       <div class="stat-icon amber"><i class="pi pi-percentage"></i></div>
//       <div class="stat-info">
//         <span class="stat-value">{{ avgDiscount }}%</span>
//         <span class="stat-label">Remise moy.</span>
//       </div>
//     </div>
//     <div class="stat-card">
//       <div class="stat-icon rose"><i class="pi pi-database"></i></div>
//       <div class="stat-info">
//         <span class="stat-value">{{ totalStock }}</span>
//         <span class="stat-label">Stock total</span>
//       </div>
//     </div>
//   </div>

//   <!-- ── TABLE CARD ── -->
//   <div class="table-card">

//     <!-- Toolbar -->
//     <div class="table-toolbar">
//       <div class="toolbar-left">
//         <div class="search-box">
//           <i class="pi pi-search"></i>
//           <input type="text" placeholder="Rechercher…"
//                  [(ngModel)]="searchTerm" (input)="filterProducts()"
//                  class="search-input" />
//         </div>
//         <select class="filter-select" [(ngModel)]="categoryFilter" (change)="filterProducts()">
//           <option value="">Toutes catégories</option>
//           <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
//         </select>
//         <select class="filter-select" [(ngModel)]="promoFilter" (change)="filterProducts()">
//           <option value="">Tous statuts</option>
//           <option value="active">Promo active</option>
//           <option value="none">Sans promo</option>
//         </select>
//       </div>
//       <span class="results-count">{{ filteredProducts.length }} produit(s)</span>
//     </div>

//     <!-- Loading -->
//     <div class="loading-state" *ngIf="isLoading">
//       <div class="spinner"></div>
//       <span>Chargement…</span>
//     </div>

//     <!-- Empty -->
//     <div class="empty-state" *ngIf="!isLoading && filteredProducts.length === 0">
//       <div class="empty-icon"><i class="pi pi-inbox"></i></div>
//       <p class="empty-title">Aucun produit trouvé</p>
//     </div>

//     <!-- ── TABLE ── -->
//     <div class="table-scroll" *ngIf="!isLoading && filteredProducts.length > 0">
//       <table class="promo-table">
//         <thead>
//           <tr>
//             <th style="width:40px">
//               <input type="checkbox" class="custom-check"
//                      [checked]="allSelected" (change)="toggleAll($event)" />
//             </th>
//             <th style="width:60px">Image</th>
//             <th>Produit</th>
//             <th style="width:110px">Catégorie</th>
//             <th style="width:90px; text-align:center">Variante</th>
//             <th style="width:100px; text-align:right">Prix HT</th>
//             <th style="width:110px; text-align:center">Remise %</th>
//             <th style="width:110px; text-align:right">Prix promo</th>
//             <th style="width:130px; text-align:center">Début</th>
//             <th style="width:130px; text-align:center">Fin</th>
//             <th style="width:80px; text-align:center">Actif</th>
//             <th style="width:80px; text-align:center">Actions</th>
//           </tr>
//         </thead>
//         <tbody>

//           <!-- Boucle produits → puis variantes, avec rowspan sur les premières colonnes -->
//           <ng-container *ngFor="let product of filteredProducts; let pi = index">
//             <tr *ngFor="let v of product.variantes; let vi = index"
//                 class="product-row"
//                 [class.row-selected]="isSelected(product._id)"
//                 [class.row-promo-active]="getPromo(product._id, v._id)?.active"
//                 [class.first-variant]="vi === 0"
//                 [style.animation-delay]="(pi * product.variantes.length + vi) * 30 + 'ms'">

//               <!-- Checkbox — seulement sur la 1ère variante -->
//               <td class="td-rowspan" [attr.rowspan]="vi === 0 ? product.variantes.length : null"
//                   *ngIf="vi === 0" style="vertical-align:middle; text-align:center">
//                 <input type="checkbox" class="custom-check"
//                        [checked]="isSelected(product._id)"
//                        (change)="toggleSelect(product._id)" />
//               </td>

//               <!-- Image — seulement sur la 1ère variante -->
//               <td class="td-rowspan td-img" [attr.rowspan]="vi === 0 ? product.variantes.length : null"
//                   *ngIf="vi === 0" style="vertical-align:middle">
//                 <div class="product-img-wrap">
//                   <img *ngIf="product.images?.length"
//                        [src]="apiBase + product.images[0].url"
//                        [alt]="product.nom_produit"
//                        class="product-img"
//                        (error)="onImgError($event)" />
//                   <div *ngIf="!product.images?.length" class="product-img-placeholder">
//                     <i class="pi pi-image"></i>
//                   </div>
//                   <span class="img-badge" *ngIf="hasActivePromo(product)">PROMO</span>
//                 </div>
//               </td>

//               <!-- Nom produit — seulement sur la 1ère variante -->
//               <td class="td-rowspan" [attr.rowspan]="vi === 0 ? product.variantes.length : null"
//                   *ngIf="vi === 0">
//                 <div class="product-name-cell">
//                   <span class="product-name">{{ product.nom_produit }}</span>
//                   <span class="product-desc" *ngIf="product.description">{{ product.description }}</span>
//                 </div>
//               </td>

//               <!-- Catégorie — seulement sur la 1ère variante -->
//               <td class="td-rowspan" [attr.rowspan]="vi === 0 ? product.variantes.length : null"
//                   *ngIf="vi === 0" style="vertical-align:middle">
//                 <span class="badge-cat" *ngFor="let cat of product.id_categorie">{{ cat.nom }}</span>
//               </td>

//               <!-- Variante chip -->
//               <td style="text-align:center; vertical-align:middle">
//                 <span class="variant-pill"
//                       [class.pill-active]="getPromo(product._id, v._id)?.active">
//                   {{ v.combinaison[0]?.valeur ?? 'Défaut' }}
//                   <small>× {{ v.stock }}</small>
//                 </span>
//               </td>

//               <!-- Prix HT -->
//               <td style="text-align:right; vertical-align:middle">
//                 <span class="price-base">{{ lastPrix(v) | number:'1.0-0' }} Ar</span>
//               </td>

//               <!-- Remise % — input direct inline -->
//               <td style="text-align:center; vertical-align:middle">
//                 <div class="inline-discount">
//                   <input type="number" class="discount-input" min="0" max="100"
//                          [ngModel]="getPromo(product._id, v._id)?.discount ?? 0"
//                          (ngModelChange)="onDiscountChange(product._id, v._id, $event, lastPrix(v))"
//                          placeholder="0" />
//                   <span class="discount-unit">%</span>
//                 </div>
//               </td>

//               <!-- Prix promo -->
//               <td style="text-align:right; vertical-align:middle">
//                 <span class="price-promo" *ngIf="(getPromo(product._id, v._id)?.discount ?? 0) > 0">
//                   {{ getPromo(product._id, v._id)!.prixPromo | number:'1.0-0' }} Ar
//                 </span>
//                 <span class="price-none" *ngIf="!(getPromo(product._id, v._id)?.discount)">—</span>
//               </td>

//               <!-- Date début -->
//               <td style="text-align:center; vertical-align:middle">
//                 <input type="date" class="date-input"
//                        [ngModel]="getPromo(product._id, v._id)?.debut ?? ''"
//                        (ngModelChange)="setPromoField(product._id, v._id, 'debut', $event)" />
//               </td>

//               <!-- Date fin -->
//               <td style="text-align:center; vertical-align:middle">
//                 <input type="date" class="date-input"
//                        [ngModel]="getPromo(product._id, v._id)?.fin ?? ''"
//                        (ngModelChange)="setPromoField(product._id, v._id, 'fin', $event)" />
//               </td>

//               <!-- Toggle actif -->
//               <td style="text-align:center; vertical-align:middle">
//                 <label class="toggle-wrap">
//                   <input type="checkbox" class="toggle-input"
//                          [ngModel]="getPromo(product._id, v._id)?.active ?? false"
//                          (ngModelChange)="setPromoField(product._id, v._id, 'active', $event)" />
//                   <span class="toggle-slider"></span>
//                 </label>
//               </td>

//               <!-- Actions — seulement sur la 1ère variante -->
//               <td class="td-rowspan" [attr.rowspan]="vi === 0 ? product.variantes.length : null"
//                   *ngIf="vi === 0" style="vertical-align:middle; text-align:center">
//                 <div class="action-group">
//                   <button class="action-btn btn-save" (click)="saveProduct(product)" title="Enregistrer">
//                     <i class="pi pi-save"></i>
//                   </button>
//                   <button class="action-btn btn-reset" (click)="resetProduct(product)" title="Réinitialiser">
//                     <i class="pi pi-undo"></i>
//                   </button>
//                 </div>
//               </td>

//             </tr>

//             <!-- Séparateur entre produits -->
//             <tr class="product-separator" *ngIf="pi < filteredProducts.length - 1 && product.variantes.length">
//               <td [attr.colspan]="12" class="separator-cell"></td>
//             </tr>

//           </ng-container>
//         </tbody>
//       </table>
//     </div>

//     <!-- Footer -->
//     <div class="table-footer" *ngIf="filteredProducts.length > 0">
//       <span class="footer-info">
//         <strong>{{ selectedIds.length }}</strong> sélectionné(s) ·
//         <strong>{{ filteredProducts.length }}</strong> produit(s) ·
//         <strong>{{ totalActivePromos }}</strong> variante(s) en promo
//       </span>
//       <button class="btn-apply-all" (click)="applyAll()" [disabled]="selectedIds.length === 0">
//         <i class="pi pi-send"></i> Enregistrer la sélection
//       </button>
//     </div>

//   </div>
// </div>

// <style>
// /* promotion-boutique.component.scss */
// @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

// /* ─── TOKENS ─── */
// :host {
//   --bg-base:        0a1118;
//   --bg-surface:     rgba(255,255,255,0.03);
//   --bg-elevated:    rgba(255,255,255,0.055);
//   --border:         rgba(255,255,255,0.07);
//   --border-soft:    rgba(255,255,255,0.035);
//   --text-primary:   rgba(255,255,255,0.88);
//   --text-secondary: rgba(255,255,255,0.45);
//   --text-muted:     rgba(255,255,255,0.22);
//   --green:          #10b981;
//   --green-bg:       rgba(16,185,129,0.1);
//   --green-border:   rgba(16,185,129,0.25);
//   --blue:           #3b82f6;
//   --amber:          #f59e0b;
//   --rose:           #f43f5e;
//   --font:           'DM Sans', sans-serif;
//   --font-display:   'Syne', sans-serif;
//   font-family: var(--font);
//   display: block;
// }

// /* ─── PAGE ─── */
// .promo-page {
//   min-height: 100vh;
//   background: 0a1118;
//   padding: 88px 2rem 3rem;
//   color: var(--text-primary);
//   animation: fadeUp 0.4s cubic-bezier(0.4,0,0.2,1) both;
// }

// @keyframes fadeUp {
//   from { opacity:0; transform:translateY(14px); }
//   to   { opacity:1; transform:translateY(0); }
// }

// /* ─── HEADER ─── */
// .page-header {
//   display: flex;
//   align-items: flex-end;
//   justify-content: space-between;
//   margin-bottom: 1.75rem;
//   gap: 1rem;
//   flex-wrap: wrap;
// }

// .page-tag {
//   display: inline-block;
//   font-size: 0.6rem;
//   font-weight: 800;
//   letter-spacing: 2px;
//   text-transform: uppercase;
//   color: var(--green);
//   background: var(--green-bg);
//   border: 1px solid var(--green-border);
//   padding: 3px 10px;
//   border-radius: 20px;
//   margin-bottom: 8px;
// }

// .page-title {
//   font-family: var(--font-display);
//   font-size: 1.85rem;
//   font-weight: 800;
//   color: #fff;
//   margin: 0 0 4px;
//   letter-spacing: -0.5px;
// }

// .page-subtitle {
//   font-size: 0.82rem;
//   color: var(--text-secondary);
//   margin: 0;
// }

// .page-header-right { display: flex; gap: 10px; }

// /* ─── BUTTONS ─── */
// .btn-primary {
//   display: inline-flex; align-items: center; gap: 7px;
//   padding: 10px 20px; border-radius: 30px; border: none;
//   background: linear-gradient(135deg, var(--green), #059669);
//   color: #fff; font-family: var(--font); font-size: 0.84rem;
//   font-weight: 700; cursor: pointer;
//   box-shadow: 0 4px 16px rgba(16,185,129,0.28);
//   transition: all 0.2s;

//   &:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(16,185,129,0.4); }
//   &:disabled { opacity: 0.35; cursor: not-allowed; }
//   i { font-size: 0.78rem; }
// }

// .btn-secondary {
//   display: inline-flex; align-items: center; gap: 7px;
//   padding: 10px 18px; border-radius: 30px;
//   border: 1px solid var(--border); background: var(--bg-surface);
//   color: var(--text-secondary); font-family: var(--font);
//   font-size: 0.84rem; font-weight: 600; cursor: pointer; transition: all 0.2s;

//   &:hover { background: var(--bg-elevated); color: var(--text-primary); border-color: rgba(255,255,255,0.14); }
//   i { font-size: 0.78rem; }
// }

// /* ─── STATS ─── */
// .stats-row {
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 1rem;
//   margin-bottom: 1.75rem;

//   @media (max-width: 900px) { grid-template-columns: repeat(2,1fr); }
//   @media (max-width: 480px) { grid-template-columns: 1fr; }
// }

// .stat-card {
//   display: flex; align-items: center; gap: 14px;
//   padding: 18px 20px;
//   background: var(--bg-surface);
//   border: 1px solid var(--border);
//   border-radius: 14px;
//   backdrop-filter: blur(10px);
//   transition: border-color 0.2s, transform 0.2s;

//   &:hover { border-color: rgba(255,255,255,0.12); transform: translateY(-1px); }
// }

// .stat-icon {
//   width: 40px; height: 40px; border-radius: 11px;
//   display: flex; align-items: center; justify-content: center;
//   font-size: 1rem; flex-shrink: 0;

//   &.green  { background: rgba(16,185,129,0.12); color: var(--green); }
//   &.blue   { background: rgba(59,130,246,0.12);  color: var(--blue); }
//   &.amber  { background: rgba(245,158,11,0.12);  color: var(--amber); }
//   &.rose   { background: rgba(244,63,94,0.12);   color: var(--rose); }
// }

// .stat-value {
//   display: block; font-family: var(--font-display);
//   font-size: 1.3rem; font-weight: 800; color: #fff; line-height: 1; margin-bottom: 3px;
// }

// .stat-label {
//   font-size: 0.66rem; color: var(--text-secondary);
//   font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;
// }

// /* ─── TABLE CARD ─── */
// .table-card {
//   background: var(--bg-surface);
//   border: 1px solid var(--border);
//   border-radius: 18px;
//   overflow: hidden;
// }

// /* ─── TOOLBAR ─── */
// .table-toolbar {
//   display: flex; align-items: center;
//   justify-content: space-between;
//   padding: 14px 18px;
//   border-bottom: 1px solid var(--border);
//   gap: 1rem; flex-wrap: wrap;
//   background: rgba(255,255,255,0.015);
// }

// .toolbar-left { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

// .search-box {
//   display: flex; align-items: center; gap: 8px;
//   background: var(--bg-elevated);
//   border: 1px solid var(--border);
//   border-radius: 10px; padding: 7px 14px; transition: border-color 0.2s;

//   i { color: var(--text-muted); font-size: 0.76rem; }
//   &:focus-within { border-color: var(--green-border); i { color: var(--green); } }
// }

// .search-input {
//   background: transparent; border: none; outline: none;
//   color: var(--text-primary); font-family: var(--font);
//   font-size: 0.82rem; width: 160px;
//   &::placeholder { color: var(--text-muted); }
// }

// .filter-select {
//   background: var(--bg-elevated);
//   border: 1px solid var(--border); border-radius: 10px;
//   padding: 7px 12px; color: var(--text-secondary);
//   font-family: var(--font); font-size: 0.82rem;
//   outline: none; cursor: pointer; transition: border-color 0.2s;
//   &:focus { border-color: var(--green-border); }
//   option { background: #1a2330; color: #e2e8f0; }
// }

// .results-count {
//   font-size: 0.76rem; color: var(--text-muted); font-weight: 500;
// }

// /* ─── LOADING / EMPTY ─── */
// .loading-state {
//   display: flex; flex-direction: column; align-items: center;
//   justify-content: center; padding: 4rem 2rem; gap: 14px;
//   color: var(--text-secondary); font-size: 0.86rem;
// }

// .spinner {
//   width: 32px; height: 32px;
//   border: 2.5px solid var(--green-bg);
//   border-top-color: var(--green);
//   border-radius: 50%;
//   animation: spin 0.75s linear infinite;
// }

// @keyframes spin { to { transform: rotate(360deg); } }

// .empty-state {
//   display: flex; flex-direction: column; align-items: center;
//   padding: 4rem 2rem; gap: 8px; text-align: center;
// }

// .empty-icon {
//   width: 56px; height: 56px; border-radius: 16px;
//   background: var(--bg-elevated); border: 1px solid var(--border);
//   display: flex; align-items: center; justify-content: center; margin-bottom: 8px;
//   i { font-size: 1.3rem; color: var(--text-muted); }
// }

// .empty-title { font-weight: 700; font-size: 0.95rem; color: var(--text-secondary); margin: 0; }

// /* ─── TABLE ─── */
// .table-scroll { overflow-x: auto; }

// .promo-table {
//   width: 100%;
//   border-collapse: collapse;

//   thead tr {
//     background: rgba(255,255,255,0.025);
//     border-bottom: 1px solid var(--border);
//   }

//   th {
//     padding: 11px 14px;
//     font-size: 0.63rem; font-weight: 700;
//     text-transform: uppercase; letter-spacing: 1px;
//     color: var(--text-muted); white-space: nowrap;
//     text-align: left;
//   }

//   td {
//     padding: 10px 14px;
//     vertical-align: middle;
//     color: var(--text-secondary);
//     border-bottom: 1px solid var(--border-soft);
//   }

//   /* Ligne produit */
//   .product-row {
//     transition: background 0.15s;
//     animation: rowIn 0.3s cubic-bezier(0.4,0,0.2,1) both;

//     &:hover { background: rgba(255,255,255,0.022); }

//     &.row-selected { background: rgba(16,185,129,0.04); }

//     &.row-promo-active td { background: rgba(16,185,129,0.025); }

//     /* Ligne de départ d'un produit : bordure top un peu plus visible */
//     &.first-variant td { border-top: 1px solid rgba(255,255,255,0.07); }
//   }

//   /* Séparateur entre groupes de produits */
//   .product-separator .separator-cell {
//     padding: 0;
//     height: 6px;
//     background: rgba(255,255,255,0.012);
//     border-top: 1px solid var(--border);
//     border-bottom: 1px solid var(--border);
//   }

//   /* Cellules rowspan : pas de border-bottom */
//   .td-rowspan {
//     border-bottom: none !important;
//     border-right: 1px solid var(--border-soft);
//   }
// }

// @keyframes rowIn {
//   from { opacity: 0; transform: translateX(-6px); }
//   to   { opacity: 1; transform: translateX(0); }
// }

// /* ─── CHECKBOX ─── */
// .custom-check {
//   width: 15px; height: 15px;
//   accent-color: var(--green); cursor: pointer;
// }

// /* ─── IMAGE ─── */
// .product-img-wrap {
//   position: relative; width: 46px; height: 46px;
// }

// .product-img {
//   width: 46px; height: 46px; object-fit: cover;
//   border-radius: 9px; border: 1px solid var(--border);
// }

// .product-img-placeholder {
//   width: 46px; height: 46px; border-radius: 9px;
//   background: var(--bg-elevated); border: 1px solid var(--border);
//   display: flex; align-items: center; justify-content: center;
//   i { color: var(--text-muted); font-size: 1rem; }
// }

// .img-badge {
//   position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%);
//   background: var(--green); color: #fff;
//   font-size: 0.45rem; font-weight: 800; letter-spacing: 0.5px;
//   padding: 2px 5px; border-radius: 4px; white-space: nowrap;
// }

// /* ─── PRODUIT NOM ─── */
// .product-name-cell { display: flex; flex-direction: column; gap: 2px; }

// .product-name {
//   font-weight: 700; font-size: 0.85rem; color: var(--text-primary); line-height: 1.3;
// }

// .product-desc {
//   font-size: 0.71rem; color: var(--text-muted); line-height: 1.3;
//   display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;
// }

// /* ─── BADGE CATÉGORIE ─── */
// .badge-cat {
//   display: inline-block; padding: 3px 8px; border-radius: 20px;
//   background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2);
//   color: #93c5fd; font-size: 0.66rem; font-weight: 600;
//   white-space: nowrap; margin: 2px 2px 2px 0;
// }

// /* ─── VARIANTE PILL ─── */
// .variant-pill {
//   display: inline-flex; flex-direction: column; align-items: center;
//   padding: 4px 10px; border-radius: 8px;
//   background: var(--bg-elevated); border: 1px solid var(--border);
//   font-size: 0.78rem; font-weight: 800; color: var(--text-primary);
//   font-family: var(--font-display); letter-spacing: 0.3px; transition: all 0.15s;

//   small {
//     font-size: 0.6rem; font-weight: 500;
//     color: var(--text-muted); font-family: var(--font);
//     letter-spacing: 0;
//   }

//   &.pill-active {
//     background: rgba(16,185,129,0.08);
//     border-color: rgba(16,185,129,0.3);
//     color: var(--green);

//     small { color: rgba(16,185,129,0.6); }
//   }
// }

// /* ─── PRIX ─── */
// .price-base { font-size: 0.82rem; font-weight: 600; color: var(--text-secondary); }

// .price-promo { font-size: 0.85rem; font-weight: 700; color: var(--green); }

// .price-none { color: var(--text-muted); font-size: 0.82rem; }

// /* ─── DISCOUNT INPUT INLINE ─── */
// .inline-discount {
//   display: inline-flex; align-items: center; gap: 4px;
//   background: var(--bg-base); border: 1px solid var(--border);
//   border-radius: 8px; padding: 5px 9px;
//   transition: border-color 0.2s;
//   width: fit-content; margin: 0 auto;

//   &:focus-within { border-color: var(--green-border); }
// }

// .discount-input {
//   background: transparent; border: none; outline: none;
//   color: var(--text-primary); font-family: var(--font);
//   font-size: 0.88rem; font-weight: 700;
//   width: 36px; text-align: right;

//   &::-webkit-outer-spin-button,
//   &::-webkit-inner-spin-button { -webkit-appearance: none; }
// }

// .discount-unit { color: var(--text-muted); font-size: 0.76rem; font-weight: 600; }

// /* ─── DATE INPUT ─── */
// .date-input {
//   background: var(--bg-base); border: 1px solid var(--border);
//   border-radius: 8px; padding: 5px 7px;
//   color: var(--text-secondary); font-family: var(--font);
//   font-size: 0.73rem; outline: none; cursor: pointer;
//   width: 118px; transition: border-color 0.2s;

//   &:focus { border-color: var(--green-border); color: var(--text-primary); }
//   &::-webkit-calendar-picker-indicator { filter: invert(0.5); cursor: pointer; }
// }

// /* ─── TOGGLE ─── */
// .toggle-wrap { display: inline-flex; align-items: center; cursor: pointer; }

// .toggle-input { display: none; }

// .toggle-slider {
//   position: relative; width: 34px; height: 18px;
//   background: rgba(255,255,255,0.08); border: 1px solid var(--border);
//   border-radius: 20px; transition: all 0.25s; flex-shrink: 0;

//   &::after {
//     content: ''; position: absolute; top: 2px; left: 2px;
//     width: 12px; height: 12px; border-radius: 50%;
//     background: rgba(255,255,255,0.3); transition: all 0.25s;
//   }
// }

// .toggle-input:checked + .toggle-slider {
//   background: rgba(16,185,129,0.2); border-color: var(--green);
//   &::after { transform: translateX(16px); background: var(--green); }
// }

// /* ─── ACTION BUTTONS ─── */
// .action-group { display: flex; gap: 6px; justify-content: center; }

// .action-btn {
//   width: 30px; height: 30px; border-radius: 8px;
//   border: 1px solid var(--border); background: var(--bg-elevated);
//   display: flex; align-items: center; justify-content: center;
//   cursor: pointer; transition: all 0.18s;
//   i { font-size: 0.76rem; }

//   &.btn-save {
//     color: var(--green);
//     &:hover { background: var(--green-bg); border-color: var(--green-border); transform: scale(1.08); }
//   }

//   &.btn-reset {
//     color: var(--text-muted);
//     &:hover { background: rgba(245,158,11,0.08); border-color: rgba(245,158,11,0.3); color: var(--amber); }
//   }
// }

// /* ─── FOOTER ─── */
// .table-footer {
//   display: flex; align-items: center; justify-content: space-between;
//   padding: 12px 18px; border-top: 1px solid var(--border);
//   background: rgba(255,255,255,0.015); flex-wrap: wrap; gap: 10px;
// }

// .footer-info {
//   font-size: 0.76rem; color: var(--text-muted);
//   strong { color: var(--text-secondary); }
// }

// .btn-apply-all {
//   display: inline-flex; align-items: center; gap: 7px;
//   padding: 8px 18px; border-radius: 20px;
//   border: 1px solid var(--green-border); background: var(--green-bg);
//   color: var(--green); font-family: var(--font); font-size: 0.8rem;
//   font-weight: 700; cursor: pointer; transition: all 0.2s;

//   &:hover:not(:disabled) { background: rgba(16,185,129,0.15); box-shadow: 0 0 14px rgba(16,185,129,0.2); }
//   &:disabled { opacity: 0.35; cursor: not-allowed; }
//   i { font-size: 0.76rem; }
// }
// </style>

// `
// })

// export class promotionBoutique implements OnInit {

  
//   /* ─── Data ─── */
//   products:         Product[] = [];
//   filteredProducts: Product[] = [];
//   categories:       string[]  = [];
//   selectedIds:      string[]  = [];

//   /* ─── UI ─── */
//   isLoading      = false;
//   searchTerm     = '';
//   categoryFilter = '';
//   promoFilter    = '';

//   readonly apiBase = 'http://localhost:5000';

//   // productId → varianteId → PromoEntry
//   promos = new Map<string, Map<string, PromoEntry>>();

//   /* ─── Stats ─── */

//   get totalActivePromos(): number {
//     let n = 0;
//     this.promos.forEach(vm => vm.forEach(p => { if (p.active) n++; }));
//     return n;
//   }

//   get avgDiscount(): number {
//     const vals: number[] = [];
//     this.promos.forEach(vm => vm.forEach(p => { if (p.discount > 0) vals.push(p.discount); }));
//     return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
//   }

//   get totalStock(): number {
//     return this.products.reduce((s, p) =>
//       s + p.variantes.reduce((sv, v) => sv + v.stock, 0), 0);
//   }

//   get allSelected(): boolean {
//     return this.filteredProducts.length > 0
//       && this.filteredProducts.every(p => this.selectedIds.includes(p._id));
//   }

//   constructor(private produitService: ProduitService) {}

//   ngOnInit() { this.loadProducts(); }

//   /* ─────────────── CHARGEMENT ─────────────── */

//   loadProducts(): void {
//     this.isLoading = true;
//     this.produitService.getMyProducts().subscribe({
//       next: (data: Product[]) => {
//         this.products = data;
//         this.initAllPromos();
//         this.buildCategoryList();
//         this.filteredProducts = [...this.products];
//         this.isLoading = false;
//       },
//       error: err => { console.error(err); this.isLoading = false; }
//     });
//   }

//   private initAllPromos(): void {
//     this.products.forEach(p => {
//       if (this.promos.has(p._id)) return;
//       const vm = new Map<string, PromoEntry>();
//       p.variantes.forEach(v => vm.set(v._id, this.emptyPromo(this.lastPrix(v))));
//       this.promos.set(p._id, vm);
//     });
//   }

//   private buildCategoryList(): void {
//     const seen = new Set<string>();
//     this.products.forEach(p =>
//       p.id_categorie.forEach(c => {
//         if (!seen.has(c.nom)) { seen.add(c.nom); this.categories.push(c.nom); }
//       })
//     );
//   }

//   /* ─────────────── FILTRES ─────────────── */

//   filterProducts(): void {
//     const q = this.searchTerm.toLowerCase();
//     this.filteredProducts = this.products.filter(p => {
//       const okSearch = !q || p.nom_produit.toLowerCase().includes(q);
//       const okCat    = !this.categoryFilter || p.id_categorie.some(c => c.nom === this.categoryFilter);
//       const okPromo  = !this.promoFilter
//         || (this.promoFilter === 'active' && this.hasActivePromo(p))
//         || (this.promoFilter === 'none'   && !this.hasActivePromo(p));
//       return okSearch && okCat && okPromo;
//     });
//   }

//   /* ─────────────── SÉLECTION ─────────────── */

//   isSelected(id: string)   { return this.selectedIds.includes(id); }

//   toggleSelect(id: string) {
//     this.isSelected(id)
//       ? (this.selectedIds = this.selectedIds.filter(x => x !== id))
//       : this.selectedIds.push(id);
//   }

//   toggleAll(e: Event) {
//     const checked = (e.target as HTMLInputElement).checked;
//     this.selectedIds = checked ? this.filteredProducts.map(p => p._id) : [];
//   }

//   /* ─────────────── PROMO ─────────────── */

//   getPromo(productId: string, varId: string): PromoEntry | undefined {
//     return this.promos.get(productId)?.get(varId);
//   }

//   onDiscountChange(productId: string, varId: string, discount: number, basePrix: number) {
//     const entry = this.getOrCreate(productId, varId, basePrix);
//     entry.discount  = Math.min(100, Math.max(0, discount || 0));
//     entry.prixPromo = +(basePrix - basePrix * entry.discount / 100).toFixed(0);
//   }

//   setPromoField(productId: string, varId: string, field: keyof PromoEntry, value: any) {
//     const v = this.products.find(p => p._id === productId)?.variantes.find(vv => vv._id === varId);
//     const entry = this.getOrCreate(productId, varId, v ? this.lastPrix(v) : 0);
//     (entry as any)[field] = value;
//   }

//   /* ─────────────── STATUT ─────────────── */

//   hasActivePromo(product: Product): boolean {
//     const vm = this.promos.get(product._id);
//     return !!vm && Array.from(vm.values()).some(p => p.active);
//   }

//   activeVariantsCount(product: Product): number {
//     const vm = this.promos.get(product._id);
//     return vm ? Array.from(vm.values()).filter(p => p.active).length : 0;
//   }

//   /* ─────────────── SAVE / RESET ─────────────── */

//   /**
//    * Envoie UNIQUEMENT les variantes avec une promo réelle
//    * (discount > 0 OU active = true)
//    */
// saveProduct(product: Product): void {
//     const varMap = this.promos.get(product._id);
//     if (!varMap) return;

//     const variantesEnPromo = product.variantes
//       .filter(v => {
//         const p = varMap.get(v._id);
//         return p && (p.discount > 0 || p.active) && p.debut && p.fin;
//       })
//       .map(v => {
//         const p = varMap.get(v._id)!;
//         return {
//           attribut:             v.combinaison[0]?.attribut ?? 'Défaut',
//           valeur:               v.combinaison[0]?.valeur   ?? 'Défaut',
//           prix_unitaire:        this.lastPrix(v),
//           remise:               p.discount,
//           date_debut_promotion: p.debut,
//           date_fin_promotion:   p.fin,
//         };
//       });

//     if (!variantesEnPromo.length) {
//       console.warn(`⚠️ Aucune promo à enregistrer pour "${product.nom_produit}"`);
//       return;
//     }

//     this.produitService.savePromotion({
//       id_produit: product._id,
//       variantes:  variantesEnPromo,
//     }).subscribe({
//       next: (res) => console.log('✅ Promotion enregistrée :', res),
//       error: (err) => console.error('❌ Erreur :', err),
//     });
//   }

//   resetProduct(product: Product): void {
//     const varMap = this.promos.get(product._id);
//     if (!varMap) return;
//     product.variantes.forEach(v => varMap.set(v._id, this.emptyPromo(this.lastPrix(v))));
//   }

//   applyAll(): void {
//     this.products
//       .filter(p => this.selectedIds.includes(p._id))
//       .forEach(p => this.saveProduct(p));
//   }

//   /* ─────────────── UTILITAIRES ─────────────── */

//   lastPrix(v: Variante): number {
//     return v.historique_prix?.at(-1)?.prix_hors_taxe ?? 0;
//   }

//   private emptyPromo(basePrix: number): PromoEntry {
//     return { discount: 0, prixPromo: basePrix, debut: '', fin: '', active: false };
//   }

//   private getOrCreate(productId: string, varId: string, basePrix: number): PromoEntry {
//     let vm = this.promos.get(productId);
//     if (!vm) { vm = new Map(); this.promos.set(productId, vm); }
//     let entry = vm.get(varId);
//     if (!entry) { entry = this.emptyPromo(basePrix); vm.set(varId, entry); }
//     return entry;
//   }

//   onImgError(e: Event) { (e.target as HTMLImageElement).style.display = 'none'; }
// }


// promotion-boutique.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '@/pages/service/product.service';
import { ProduitService } from '@/pages/service/produit.service';

/* ── Types ── */
export interface PrixHistorique {
  prix_hors_taxe: number;
  prix_ttc: number | null;
  _id: string;
  created_at: string;
}

export interface Variante {
  _id: string;
  combinaison: { attribut: string; valeur: string; _id: string }[];
  stock: number;
  is_default: boolean;
  reference: string;
  historique_prix: PrixHistorique[];
}

export interface Product {
  _id: string;
  id_boutique: string;
  nom_produit: string;
  description: string;
  images: { filename: string; url: string; size: number; mimetype: string; _id: string }[];
  id_categorie: { _id: string; nom: string; parent: string | null }[];
  variantes: Variante[];
  created_at: string;
  updated_at: string;
}

export interface PromoEntry {
  discount: number;   // 0–100
  prixPromo: number;  // calculé
  debut: string;
  fin: string;
  active: boolean;
}
@Component({
  selector: 'app-promotion-boutique',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, SlicePipe],
  template: `
  <!-- promotion-boutique.component.html -->
<div class="promo-page">

  <!-- ── HEADER ── -->
  <div class="page-header">
    <div>
      <span class="page-tag">Gestion</span>
      <h1 class="page-title">Promotions Boutique</h1>
      <p class="page-subtitle">Définissez des remises directement par variante</p>
    </div>
    <div class="page-header-right">
      <button class="btn-secondary" (click)="loadProducts()">
        <i class="pi pi-refresh"></i> Actualiser
      </button>
      <button class="btn-primary" (click)="applyAll()" [disabled]="selectedIds.length === 0">
        <i class="pi pi-send"></i> Enregistrer ({{ selectedIds.length }})
      </button>
    </div>
  </div>

  <!-- ── STATS ── -->
  <div class="stats-row">
    <div class="stat-card">
      <div class="stat-icon green"><i class="pi pi-tag"></i></div>
      <div class="stat-info">
        <span class="stat-value">{{ totalActivePromos }}</span>
        <span class="stat-label">En promo</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon blue"><i class="pi pi-box"></i></div>
      <div class="stat-info">
        <span class="stat-value">{{ products.length }}</span>
        <span class="stat-label">Produits</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon amber"><i class="pi pi-percentage"></i></div>
      <div class="stat-info">
        <span class="stat-value">{{ avgDiscount }}%</span>
        <span class="stat-label">Remise moy.</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon rose"><i class="pi pi-database"></i></div>
      <div class="stat-info">
        <span class="stat-value">{{ totalStock }}</span>
        <span class="stat-label">Stock total</span>
      </div>
    </div>
  </div>

  <!-- ── TABLE CARD ── -->
  <div class="table-card">

    <!-- Toolbar -->
    <div class="table-toolbar">
      <div class="toolbar-left">
        <div class="search-box">
          <i class="pi pi-search"></i>
          <input type="text" placeholder="Rechercher…"
                 [(ngModel)]="searchTerm" (input)="filterProducts()"
                 class="search-input" />
        </div>
        <select class="filter-select" [(ngModel)]="categoryFilter" (change)="filterProducts()">
          <option value="">Toutes catégories</option>
          <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
        </select>
        <select class="filter-select" [(ngModel)]="promoFilter" (change)="filterProducts()">
          <option value="">Tous statuts</option>
          <option value="active">Promo active</option>
          <option value="none">Sans promo</option>
        </select>
      </div>
      <span class="results-count">{{ filteredProducts.length }} produit(s)</span>
    </div>

    <!-- Loading -->
    <div class="loading-state" *ngIf="isLoading">
      <div class="spinner"></div>
      <span>Chargement…</span>
    </div>

    <!-- Empty -->
    <div class="empty-state" *ngIf="!isLoading && filteredProducts.length === 0">
      <div class="empty-icon"><i class="pi pi-inbox"></i></div>
      <p class="empty-title">Aucun produit trouvé</p>
    </div>

    <!-- ── TABLE ── -->
    <div class="table-scroll" *ngIf="!isLoading && filteredProducts.length > 0">
      <table class="promo-table">
        <thead>
          <tr>
            <th style="width:40px">
              <input type="checkbox" class="custom-check"
                     [checked]="allSelected" (change)="toggleAll($event)" />
            </th>
            <th style="width:60px">Image</th>
            <th>Produit</th>
            <th style="width:110px">Catégorie</th>
            <th style="width:90px; text-align:center">Variante</th>
            <th style="width:100px; text-align:right">Prix HT</th>
            <th style="width:110px; text-align:center">Remise %</th>
            <th style="width:110px; text-align:right">Prix promo</th>
            <th style="width:130px; text-align:center">Début</th>
            <th style="width:130px; text-align:center">Fin</th>
            <th style="width:80px; text-align:center">Actif</th>
            <th style="width:80px; text-align:center">Actions</th>
          </tr>
        </thead>
        <tbody>

          <ng-container *ngFor="let product of filteredProducts; let pi = index">
            <tr *ngFor="let v of product.variantes; let vi = index"
                class="product-row"
                [class.row-selected]="isSelected(product._id)"
                [class.row-promo-active]="getPromo(product._id, v._id)?.active"
                [class.first-variant]="vi === 0"
                [style.animation-delay]="(pi * product.variantes.length + vi) * 30 + 'ms'">

              <td class="td-rowspan" [attr.rowspan]="vi === 0 ? product.variantes.length : null"
                  *ngIf="vi === 0" style="vertical-align:middle; text-align:center">
                <input type="checkbox" class="custom-check"
                       [checked]="isSelected(product._id)"
                       (change)="toggleSelect(product._id)" />
              </td>

              <td class="td-rowspan td-img" [attr.rowspan]="vi === 0 ? product.variantes.length : null"
                  *ngIf="vi === 0" style="vertical-align:middle">
                <div class="product-img-wrap">
                  <img *ngIf="product.images?.length"
                       [src]="apiBase + product.images[0].url"
                       [alt]="product.nom_produit"
                       class="product-img"
                       (error)="onImgError($event)" />
                  <div *ngIf="!product.images?.length" class="product-img-placeholder">
                    <i class="pi pi-image"></i>
                  </div>
                  <span class="img-badge" *ngIf="hasActivePromo(product)">PROMO</span>
                </div>
              </td>

              <td class="td-rowspan" [attr.rowspan]="vi === 0 ? product.variantes.length : null"
                  *ngIf="vi === 0">
                <div class="product-name-cell">
                  <span class="product-name">{{ product.nom_produit }}</span>
                  <span class="product-desc" *ngIf="product.description">{{ product.description }}</span>
                </div>
              </td>

              <td class="td-rowspan" [attr.rowspan]="vi === 0 ? product.variantes.length : null"
                  *ngIf="vi === 0" style="vertical-align:middle">
                <span class="badge-cat" *ngFor="let cat of product.id_categorie">{{ cat.nom }}</span>
              </td>

              <td style="text-align:center; vertical-align:middle">
                <span class="variant-pill"
                      [class.pill-active]="getPromo(product._id, v._id)?.active">
                  {{ v.combinaison[0]?.valeur ?? 'Défaut' }}
                  <small>× {{ v.stock }}</small>
                </span>
              </td>

              <td style="text-align:right; vertical-align:middle">
                <span class="price-base">{{ lastPrix(v) | number:'1.0-0' }} Ar</span>
              </td>

              <!-- Remise % — input amélioré -->
              <td style="text-align:center; vertical-align:middle">
                <div class="inline-discount"
                     [class.has-value]="(getPromo(product._id, v._id)?.discount ?? 0) > 0">
                  <button class="discount-step" (click)="stepDiscount(product._id, v._id, -5, lastPrix(v))">−</button>
                  <input type="number" class="discount-input" min="0" max="100"
                         [ngModel]="getPromo(product._id, v._id)?.discount ?? 0"
                         (ngModelChange)="onDiscountChange(product._id, v._id, $event, lastPrix(v))"
                         placeholder="0" />
                  <button class="discount-step" (click)="stepDiscount(product._id, v._id, +5, lastPrix(v))">+</button>
                </div>
              </td>

              <td style="text-align:right; vertical-align:middle">
                <span class="price-promo" *ngIf="(getPromo(product._id, v._id)?.discount ?? 0) > 0">
                  {{ getPromo(product._id, v._id)!.prixPromo | number:'1.0-0' }} Ar
                </span>
                <span class="price-none" *ngIf="!(getPromo(product._id, v._id)?.discount)">—</span>
              </td>

              <td style="text-align:center; vertical-align:middle">
                <input type="date" class="date-input"
                       [ngModel]="getPromo(product._id, v._id)?.debut ?? ''"
                       (ngModelChange)="setPromoField(product._id, v._id, 'debut', $event)" />
              </td>

              <td style="text-align:center; vertical-align:middle">
                <input type="date" class="date-input"
                       [ngModel]="getPromo(product._id, v._id)?.fin ?? ''"
                       (ngModelChange)="setPromoField(product._id, v._id, 'fin', $event)" />
              </td>

              <td style="text-align:center; vertical-align:middle">
                <label class="toggle-wrap">
                  <input type="checkbox" class="toggle-input"
                         [ngModel]="getPromo(product._id, v._id)?.active ?? false"
                         (ngModelChange)="setPromoField(product._id, v._id, 'active', $event)" />
                  <span class="toggle-slider"></span>
                </label>
              </td>

              <td class="td-rowspan" [attr.rowspan]="vi === 0 ? product.variantes.length : null"
                  *ngIf="vi === 0" style="vertical-align:middle; text-align:center">
                <div class="action-group">
                  <button class="action-btn btn-save" (click)="saveProduct(product)" title="Enregistrer">
                    <i class="pi pi-save"></i>
                  </button>
                  <button class="action-btn btn-reset" (click)="resetProduct(product)" title="Réinitialiser">
                    <i class="pi pi-undo"></i>
                  </button>
                </div>
              </td>

            </tr>

            <tr class="product-separator" *ngIf="pi < filteredProducts.length - 1 && product.variantes.length">
              <td [attr.colspan]="12" class="separator-cell"></td>
            </tr>

          </ng-container>
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div class="table-footer" *ngIf="filteredProducts.length > 0">
      <span class="footer-info">
        <strong>{{ selectedIds.length }}</strong> sélectionné(s) ·
        <strong>{{ filteredProducts.length }}</strong> produit(s) ·
        <strong>{{ totalActivePromos }}</strong> variante(s) en promo
      </span>
      <button class="btn-apply-all" (click)="applyAll()" [disabled]="selectedIds.length === 0">
        <i class="pi pi-send"></i> Enregistrer la sélection
      </button>
    </div>

  </div>
</div>

<style>
/* promotion-boutique.component.scss */
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

/* ─── TOKENS ─── */
:host {
  --bg-base:        #0a1118;
  --bg-surface:     rgba(255,255,255,0.03);
  --bg-elevated:    rgba(255,255,255,0.055);
  --border:         rgba(255,255,255,0.07);
  --border-soft:    rgba(255,255,255,0.035);
  --text-primary:   rgba(255,255,255,0.88);
  --text-secondary: rgba(255,255,255,0.45);
  --text-muted:     rgba(255,255,255,0.22);
  --green:          #10b981;
  --green-bg:       rgba(16,185,129,0.1);
  --green-border:   rgba(16,185,129,0.25);
  --blue:           #3b82f6;
  --amber:          #f59e0b;
  --rose:           #f43f5e;
  --font:           'DM Sans', sans-serif;
  --font-display:   'Syne', sans-serif;
  font-family: var(--font);
  display: block;
}

/* ─── PAGE ─── */
.promo-page {
  min-height: 100vh;
  background: 0a1118;
  padding: 88px 2rem 3rem;
  color: var(--text-primary);
  animation: fadeUp 0.4s cubic-bezier(0.4,0,0.2,1) both;
}

@keyframes fadeUp {
  from { opacity:0; transform:translateY(14px); }
  to   { opacity:1; transform:translateY(0); }
}

/* ─── HEADER ─── */
.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 1.75rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.page-tag {
  display: inline-block;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--green);
  background: var(--green-bg);
  border: 1px solid var(--green-border);
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 8px;
}

.page-title {
  font-family: var(--font-display);
  font-size: 1.85rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 4px;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 0.82rem;
  color: var(--text-secondary);
  margin: 0;
}

.page-header-right { display: flex; gap: 10px; }

/* ─── BUTTONS ─── */
.btn-primary {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 10px 20px; border-radius: 30px; border: none;
  background: linear-gradient(135deg, var(--green), #059669);
  color: #fff; font-family: var(--font); font-size: 0.84rem;
  font-weight: 700; cursor: pointer;
  box-shadow: 0 4px 16px rgba(16,185,129,0.28);
  transition: all 0.2s;

  &:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(16,185,129,0.4); }
  &:disabled { opacity: 0.35; cursor: not-allowed; }
  i { font-size: 0.78rem; }
}

.btn-secondary {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 10px 18px; border-radius: 30px;
  border: 1px solid var(--border); background: var(--bg-surface);
  color: var(--text-secondary); font-family: var(--font);
  font-size: 0.84rem; font-weight: 600; cursor: pointer; transition: all 0.2s;

  &:hover { background: var(--bg-elevated); color: var(--text-primary); border-color: rgba(255,255,255,0.14); }
  i { font-size: 0.78rem; }
}

/* ─── STATS ─── */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.75rem;

  @media (max-width: 900px) { grid-template-columns: repeat(2,1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
}

.stat-card {
  display: flex; align-items: center; gap: 14px;
  padding: 18px 20px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  backdrop-filter: blur(10px);
  transition: border-color 0.2s, transform 0.2s;

  &:hover { border-color: rgba(255,255,255,0.12); transform: translateY(-1px); }
}

.stat-icon {
  width: 40px; height: 40px; border-radius: 11px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem; flex-shrink: 0;

  &.green  { background: rgba(16,185,129,0.12); color: var(--green); }
  &.blue   { background: rgba(59,130,246,0.12);  color: var(--blue); }
  &.amber  { background: rgba(245,158,11,0.12);  color: var(--amber); }
  &.rose   { background: rgba(244,63,94,0.12);   color: var(--rose); }
}

.stat-value {
  display: block; font-family: var(--font-display);
  font-size: 1.3rem; font-weight: 800; color: #fff; line-height: 1; margin-bottom: 3px;
}

.stat-label {
  font-size: 0.66rem; color: var(--text-secondary);
  font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;
}

/* ─── TABLE CARD ─── */
.table-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
}

/* ─── TOOLBAR ─── */
.table-toolbar {
  display: flex; align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
  gap: 1rem; flex-wrap: wrap;
  background: rgba(255,255,255,0.015);
}

.toolbar-left { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

.search-box {
  display: flex; align-items: center; gap: 8px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 10px; padding: 7px 14px; transition: border-color 0.2s;

  i { color: var(--text-muted); font-size: 0.76rem; }
  &:focus-within { border-color: var(--green-border); i { color: var(--green); } }
}

.search-input {
  background: transparent; border: none; outline: none;
  color: var(--text-primary); font-family: var(--font);
  font-size: 0.82rem; width: 160px;
  &::placeholder { color: var(--text-muted); }
}

.filter-select {
  background: var(--bg-elevated);
  border: 1px solid var(--border); border-radius: 10px;
  padding: 7px 12px; color: var(--text-secondary);
  font-family: var(--font); font-size: 0.82rem;
  outline: none; cursor: pointer; transition: border-color 0.2s;
  &:focus { border-color: var(--green-border); }
  option { background: #1a2330; color: #e2e8f0; }
}

.results-count {
  font-size: 0.76rem; color: var(--text-muted); font-weight: 500;
}

/* ─── LOADING / EMPTY ─── */
.loading-state {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 4rem 2rem; gap: 14px;
  color: var(--text-secondary); font-size: 0.86rem;
}

.spinner {
  width: 32px; height: 32px;
  border: 2.5px solid var(--green-bg);
  border-top-color: var(--green);
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.empty-state {
  display: flex; flex-direction: column; align-items: center;
  padding: 4rem 2rem; gap: 8px; text-align: center;
}

.empty-icon {
  width: 56px; height: 56px; border-radius: 16px;
  background: var(--bg-elevated); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center; margin-bottom: 8px;
  i { font-size: 1.3rem; color: var(--text-muted); }
}

.empty-title { font-weight: 700; font-size: 0.95rem; color: var(--text-secondary); margin: 0; }

/* ─── TABLE ─── */
.table-scroll { overflow-x: auto; }

.promo-table {
  width: 100%;
  border-collapse: collapse;

  thead tr {
    background: rgba(255,255,255,0.025);
    border-bottom: 1px solid var(--border);
  }

  th {
    padding: 11px 14px;
    font-size: 0.63rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 1px;
    color: var(--text-muted); white-space: nowrap;
    text-align: left;
  }

  td {
    padding: 10px 14px;
    vertical-align: middle;
    color: var(--text-secondary);
    border-bottom: 1px solid var(--border-soft);
  }

  .product-row {
    transition: background 0.15s;
    animation: rowIn 0.3s cubic-bezier(0.4,0,0.2,1) both;

    &:hover { background: rgba(255,255,255,0.022); }
    &.row-selected { background: rgba(16,185,129,0.04); }
    &.row-promo-active td { background: rgba(16,185,129,0.025); }
    &.first-variant td { border-top: 1px solid rgba(255,255,255,0.07); }
  }

  .product-separator .separator-cell {
    padding: 0;
    height: 6px;
    background: rgba(255,255,255,0.012);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .td-rowspan {
    border-bottom: none !important;
    border-right: 1px solid var(--border-soft);
  }
}

@keyframes rowIn {
  from { opacity: 0; transform: translateX(-6px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* ─── CHECKBOX ─── */
.custom-check {
  width: 15px; height: 15px;
  accent-color: var(--green); cursor: pointer;
}

/* ─── IMAGE ─── */
.product-img-wrap { position: relative; width: 46px; height: 46px; }

.product-img {
  width: 46px; height: 46px; object-fit: cover;
  border-radius: 9px; border: 1px solid var(--border);
}

.product-img-placeholder {
  width: 46px; height: 46px; border-radius: 9px;
  background: var(--bg-elevated); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  i { color: var(--text-muted); font-size: 1rem; }
}

.img-badge {
  position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%);
  background: var(--green); color: #fff;
  font-size: 0.45rem; font-weight: 800; letter-spacing: 0.5px;
  padding: 2px 5px; border-radius: 4px; white-space: nowrap;
}

/* ─── PRODUIT NOM ─── */
.product-name-cell { display: flex; flex-direction: column; gap: 2px; }

.product-name {
  font-weight: 700; font-size: 0.85rem; color: var(--text-primary); line-height: 1.3;
}

.product-desc {
  font-size: 0.71rem; color: var(--text-muted); line-height: 1.3;
  display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;
}

/* ─── BADGE CATÉGORIE ─── */
.badge-cat {
  display: inline-block; padding: 3px 8px; border-radius: 20px;
  background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2);
  color: #93c5fd; font-size: 0.66rem; font-weight: 600;
  white-space: nowrap; margin: 2px 2px 2px 0;
}

/* ─── VARIANTE PILL ─── */
.variant-pill {
  display: inline-flex; flex-direction: column; align-items: center;
  padding: 4px 10px; border-radius: 8px;
  background: var(--bg-elevated); border: 1px solid var(--border);
  font-size: 0.78rem; font-weight: 800; color: var(--text-primary);
  font-family: var(--font-display); letter-spacing: 0.3px; transition: all 0.15s;

  small {
    font-size: 0.6rem; font-weight: 500;
    color: var(--text-muted); font-family: var(--font); letter-spacing: 0;
  }

  &.pill-active {
    background: rgba(16,185,129,0.08);
    border-color: rgba(16,185,129,0.3);
    color: var(--green);
    small { color: rgba(16,185,129,0.6); }
  }
}

/* ─── PRIX ─── */
.price-base { font-size: 0.82rem; font-weight: 600; color: var(--text-secondary); }
.price-promo { font-size: 0.85rem; font-weight: 700; color: var(--green); }
.price-none { color: var(--text-muted); font-size: 0.82rem; }

/* ─── DISCOUNT INPUT ─── */
.inline-discount {
  display: inline-flex;
  align-items: center;
  gap: 0;
  background: var(--bg-base);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.2s;
  width: fit-content;
  margin: 0 auto;

  &:focus-within { border-color: var(--green-border); }

  &.has-value {
    border-color: var(--green-border);
    background: rgba(16,185,129,0.05);

    .discount-input { color: var(--green); font-weight: 800; }
    .discount-unit  { color: var(--green); opacity: 0.7; }
  }
}

.discount-step {
  width: 24px;
  height: 32px;
  background: rgba(255,255,255,0.04);
  border: none;
  border-right: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:last-child {
    border-right: none;
    border-left: 1px solid var(--border);
  }

  &:hover {
    background: var(--green-bg);
    color: var(--green);
  }

  &:active { background: rgba(16,185,129,0.18); }
}

.discount-input {
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-family: var(--font);
  font-size: 0.88rem;
  font-weight: 700;
  width: 34px;
  text-align: center;
  padding: 0 2px;
  transition: color 0.2s;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  -moz-appearance: textfield;
  appearance: textfield;
}

.discount-unit {
  color: var(--text-muted);
  font-size: 0.72rem;
  font-weight: 600;
  padding-right: 6px;
  transition: color 0.2s;
}

/* ─── DATE INPUT ─── */
.date-input {
  background: var(--bg-base); border: 1px solid var(--border);
  border-radius: 8px; padding: 5px 7px;
  color: var(--text-secondary); font-family: var(--font);
  font-size: 0.73rem; outline: none; cursor: pointer;
  width: 118px; transition: border-color 0.2s;

  &:focus { border-color: var(--green-border); color: var(--text-primary); }
  &::-webkit-calendar-picker-indicator { filter: invert(0.5); cursor: pointer; }
}

/* ─── TOGGLE ─── */
.toggle-wrap { display: inline-flex; align-items: center; cursor: pointer; }
.toggle-input { display: none; }

.toggle-slider {
  position: relative; width: 34px; height: 18px;
  background: rgba(255,255,255,0.08); border: 1px solid var(--border);
  border-radius: 20px; transition: all 0.25s; flex-shrink: 0;

  &::after {
    content: ''; position: absolute; top: 2px; left: 2px;
    width: 12px; height: 12px; border-radius: 50%;
    background: rgba(255,255,255,0.3); transition: all 0.25s;
  }
}

.toggle-input:checked + .toggle-slider {
  background: rgba(16,185,129,0.2); border-color: var(--green);
  &::after { transform: translateX(16px); background: var(--green); }
}

/* ─── ACTION BUTTONS ─── */
.action-group { display: flex; gap: 6px; justify-content: center; }

.action-btn {
  width: 30px; height: 30px; border-radius: 8px;
  border: 1px solid var(--border); background: var(--bg-elevated);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.18s;
  i { font-size: 0.76rem; }

  &.btn-save {
    color: var(--green);
    &:hover { background: var(--green-bg); border-color: var(--green-border); transform: scale(1.08); }
  }

  &.btn-reset {
    color: var(--text-muted);
    &:hover { background: rgba(245,158,11,0.08); border-color: rgba(245,158,11,0.3); color: var(--amber); }
  }
}

/* ─── FOOTER ─── */
.table-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 18px; border-top: 1px solid var(--border);
  background: rgba(255,255,255,0.015); flex-wrap: wrap; gap: 10px;
}

.footer-info {
  font-size: 0.76rem; color: var(--text-muted);
  strong { color: var(--text-secondary); }
}

.btn-apply-all {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 8px 18px; border-radius: 20px;
  border: 1px solid var(--green-border); background: var(--green-bg);
  color: var(--green); font-family: var(--font); font-size: 0.8rem;
  font-weight: 700; cursor: pointer; transition: all 0.2s;

  &:hover:not(:disabled) { background: rgba(16,185,129,0.15); box-shadow: 0 0 14px rgba(16,185,129,0.2); }
  &:disabled { opacity: 0.35; cursor: not-allowed; }
  i { font-size: 0.76rem; }
}
</style>

`
})

export class promotionBoutique implements OnInit {

  /* ─── Data ─── */
  products:         Product[] = [];
  filteredProducts: Product[] = [];
  categories:       string[]  = [];
  selectedIds:      string[]  = [];

  /* ─── UI ─── */
  isLoading      = false;
  searchTerm     = '';
  categoryFilter = '';
  promoFilter    = '';

  readonly apiBase = 'http://localhost:5000';

  promos = new Map<string, Map<string, PromoEntry>>();

  get totalActivePromos(): number {
    let n = 0;
    this.promos.forEach(vm => vm.forEach(p => { if (p.active) n++; }));
    return n;
  }

  get avgDiscount(): number {
    const vals: number[] = [];
    this.promos.forEach(vm => vm.forEach(p => { if (p.discount > 0) vals.push(p.discount); }));
    return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
  }

  get totalStock(): number {
    return this.products.reduce((s, p) =>
      s + p.variantes.reduce((sv, v) => sv + v.stock, 0), 0);
  }

  get allSelected(): boolean {
    return this.filteredProducts.length > 0
      && this.filteredProducts.every(p => this.selectedIds.includes(p._id));
  }

  constructor(private produitService: ProduitService) {}

  ngOnInit() { this.loadProducts(); }

  loadProducts(): void {
    this.isLoading = true;
    this.produitService.getMyProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.initAllPromos();
        this.buildCategoryList();
        this.filteredProducts = [...this.products];
        this.isLoading = false;
      },
      error: err => { console.error(err); this.isLoading = false; }
    });
  }

  private initAllPromos(): void {
    this.products.forEach(p => {
      if (this.promos.has(p._id)) return;
      const vm = new Map<string, PromoEntry>();
      p.variantes.forEach(v => vm.set(v._id, this.emptyPromo(this.lastPrix(v))));
      this.promos.set(p._id, vm);
    });
  }

  private buildCategoryList(): void {
    const seen = new Set<string>();
    this.products.forEach(p =>
      p.id_categorie.forEach(c => {
        if (!seen.has(c.nom)) { seen.add(c.nom); this.categories.push(c.nom); }
      })
    );
  }

  filterProducts(): void {
    const q = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(p => {
      const okSearch = !q || p.nom_produit.toLowerCase().includes(q);
      const okCat    = !this.categoryFilter || p.id_categorie.some(c => c.nom === this.categoryFilter);
      const okPromo  = !this.promoFilter
        || (this.promoFilter === 'active' && this.hasActivePromo(p))
        || (this.promoFilter === 'none'   && !this.hasActivePromo(p));
      return okSearch && okCat && okPromo;
    });
  }

  isSelected(id: string)   { return this.selectedIds.includes(id); }

  toggleSelect(id: string) {
    this.isSelected(id)
      ? (this.selectedIds = this.selectedIds.filter(x => x !== id))
      : this.selectedIds.push(id);
  }

  toggleAll(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    this.selectedIds = checked ? this.filteredProducts.map(p => p._id) : [];
  }

  getPromo(productId: string, varId: string): PromoEntry | undefined {
    return this.promos.get(productId)?.get(varId);
  }

  onDiscountChange(productId: string, varId: string, discount: number, basePrix: number) {
    const entry = this.getOrCreate(productId, varId, basePrix);
    entry.discount  = Math.min(100, Math.max(0, discount || 0));
    entry.prixPromo = +(basePrix - basePrix * entry.discount / 100).toFixed(0);
  }

  stepDiscount(productId: string, varId: string, step: number, basePrix: number) {
    const current = this.getPromo(productId, varId)?.discount ?? 0;
    this.onDiscountChange(productId, varId, current + step, basePrix);
  }

  setPromoField(productId: string, varId: string, field: keyof PromoEntry, value: any) {
    const v = this.products.find(p => p._id === productId)?.variantes.find(vv => vv._id === varId);
    const entry = this.getOrCreate(productId, varId, v ? this.lastPrix(v) : 0);
    (entry as any)[field] = value;
  }

  hasActivePromo(product: Product): boolean {
    const vm = this.promos.get(product._id);
    return !!vm && Array.from(vm.values()).some(p => p.active);
  }

  activeVariantsCount(product: Product): number {
    const vm = this.promos.get(product._id);
    return vm ? Array.from(vm.values()).filter(p => p.active).length : 0;
  }

  saveProduct(product: Product): void {
    const varMap = this.promos.get(product._id);
    if (!varMap) return;

    const variantesEnPromo = product.variantes
      .filter(v => {
        const p = varMap.get(v._id);
        return p && (p.discount > 0 || p.active) && p.debut && p.fin;
      })
      .map(v => {
        const p = varMap.get(v._id)!;
        return {
          attribut:             v.combinaison[0]?.attribut ?? 'Défaut',
          valeur:               v.combinaison[0]?.valeur   ?? 'Défaut',
          prix_unitaire:        this.lastPrix(v),
          remise:               p.discount,
          date_debut_promotion: p.debut,
          date_fin_promotion:   p.fin,
        };
      });

    if (!variantesEnPromo.length) {
      console.warn(`⚠️ Aucune promo à enregistrer pour "${product.nom_produit}"`);
      return;
    }

    this.produitService.savePromotion({
      id_produit: product._id,
      variantes:  variantesEnPromo,
    }).subscribe({
      next: (res) => console.log('✅ Promotion enregistrée :', res),
      error: (err) => console.error('❌ Erreur :', err),
    });
  }

  resetProduct(product: Product): void {
    const varMap = this.promos.get(product._id);
    if (!varMap) return;
    product.variantes.forEach(v => varMap.set(v._id, this.emptyPromo(this.lastPrix(v))));
  }

  applyAll(): void {
    this.products
      .filter(p => this.selectedIds.includes(p._id))
      .forEach(p => this.saveProduct(p));
  }

  lastPrix(v: Variante): number {
    return v.historique_prix?.at(-1)?.prix_hors_taxe ?? 0;
  }

  private emptyPromo(basePrix: number): PromoEntry {
    return { discount: 0, prixPromo: basePrix, debut: '', fin: '', active: false };
  }

  private getOrCreate(productId: string, varId: string, basePrix: number): PromoEntry {
    let vm = this.promos.get(productId);
    if (!vm) { vm = new Map(); this.promos.set(productId, vm); }
    let entry = vm.get(varId);
    if (!entry) { entry = this.emptyPromo(basePrix); vm.set(varId, entry); }
    return entry;
  }

  onImgError(e: Event) { (e.target as HTMLImageElement).style.display = 'none'; }
}