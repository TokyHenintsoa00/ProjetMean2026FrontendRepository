



// import { Component, OnInit } from "@angular/core";
// import { RouterModule, ActivatedRoute } from "@angular/router";
// import { CommonModule } from "@angular/common";
// import { BoutiqueService } from "../service/boutique.service";

// @Component({
//     selector: 'app-visite-boutique',
//     standalone: true,
//     imports: [RouterModule, CommonModule],
//     template: `
//     <div *ngIf="boutique" class="page-container">

//       <!-- HEADER BOUTIQUE -->
//       <div class="boutique-header">
//         <div class="header-bg"></div>
//         <div class="header-content">
//           <div class="logo-wrapper">
//             <img 
//               *ngIf="boutique.logo?.length"
//               [src]="getImageUrl(boutique.logo[0].url, 'logo')" 
//               [alt]="boutique.nom_boutique"
//               class="boutique-logo"
//               (error)="onImageError($event)"
//             />
//             <div class="no-logo" *ngIf="!boutique.logo?.length">
//               {{ boutique.nom_boutique?.charAt(0) }}
//             </div>
//           </div>

//           <div class="boutique-info">
//             <div class="boutique-top">
//               <h1 class="boutique-name">{{ boutique.nom_boutique }}</h1>
//               <span class="status-badge" [class]="'status-' + boutique.status?.nom_status">
//                 {{ boutique.status?.nom_status }}
//               </span>
//             </div>
//             <p class="boutique-desc">{{ boutique.description_boutique }}</p>
//             <div class="boutique-meta">
//               <span class="meta-item">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                   <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
//                   <circle cx="12" cy="10" r="3"></circle>
//                 </svg>
//                 {{ boutique.location }}
//               </span>
//               <span class="meta-item">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                   <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
//                   <line x1="16" y1="2" x2="16" y2="6"></line>
//                   <line x1="8" y1="2" x2="8" y2="6"></line>
//                   <line x1="3" y1="10" x2="21" y2="10"></line>
//                 </svg>
//                 {{ boutique.id_categorie?.nom }}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div class="main-content">

//         <!-- PHOTOS BOUTIQUE -->
//         <section class="section">
//           <h2 class="section-title">
//             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//               <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
//               <circle cx="8.5" cy="8.5" r="1.5"></circle>
//               <polyline points="21 15 16 10 5 21"></polyline>
//             </svg>
//             Photos de la boutique
//           </h2>
//           <div class="photos-grid">
//             <div 
//               *ngFor="let photo of boutique.photo_boutique; let i = index" 
//               class="photo-item"
//               [class.photo-main]="i === 0"
//             >
//               <img 
//                 [src]="getImageUrl(photo.url, 'photo')" 
//                 [alt]="photo.filename"
//                 (error)="onImageError($event)"
//               />
//               <div class="photo-overlay"></div>
//             </div>
//           </div>
//         </section>

//         <!-- HORAIRES -->
//         <section class="section">
//           <h2 class="section-title">
//             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//               <circle cx="12" cy="12" r="10"></circle>
//               <polyline points="12 6 12 12 16 14"></polyline>
//             </svg>
//             Horaires d'ouverture
//           </h2>
//           <div class="horaires-grid">
//             <div 
//               *ngFor="let h of boutique.horaires"
//               class="horaire-card"
//               [class.ferme]="h.est_ferme"
//             >
//               <span class="jour">{{ h.jour }}</span>
//               <span class="heures" *ngIf="!h.est_ferme">{{ h.ouverture }} – {{ h.fermeture }}</span>
//               <span class="heures ferme-text" *ngIf="h.est_ferme">Fermé</span>
//               <span class="dot" [class.dot-open]="!h.est_ferme" [class.dot-closed]="h.est_ferme"></span>
//             </div>
//           </div>
//         </section>

//       </div>
//     </div>

//     <!-- LOADING -->
//     <div *ngIf="!boutique" class="loading-screen">
//       <div class="spinner"></div>
//       <p>Chargement de la boutique...</p>
//     </div>
//     `,
//     styles: [`
//       .page-container {
//         min-height: 100vh;
//         background: #f8fafc;
//         font-family: inherit;
//       }

//       /* HEADER */
//       .boutique-header {
//         position: relative;
//         background: #1e2832;
//         padding: 3rem 2rem 2rem;
//         overflow: hidden;
//       }

//       .header-bg {
//         position: absolute;
//         inset: 0;
//         background: linear-gradient(135deg, #1e2832 0%, #2a3642 100%);
//         opacity: 0.95;
//       }

//       .header-content {
//         position: relative;
//         max-width: 900px;
//         margin: 0 auto;
//         display: flex;
//         align-items: center;
//         gap: 2rem;
//       }

//       .logo-wrapper {
//         flex-shrink: 0;
//         width: 110px;
//         height: 110px;
//         border-radius: 20px;
//         background: white;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         overflow: hidden;
//         box-shadow: 0 8px 24px rgba(0,0,0,0.3);
//         border: 3px solid rgba(255,255,255,0.15);
//       }

//       .boutique-logo {
//         width: 100%;
//         height: 100%;
//         object-fit: contain;
//         padding: 8px;
//       }

//       .no-logo {
//         font-size: 2.5rem;
//         font-weight: 800;
//         color: #1e2832;
//       }

//       .boutique-info { flex: 1; }

//       .boutique-top {
//         display: flex;
//         align-items: center;
//         gap: 1rem;
//         margin-bottom: 0.5rem;
//         flex-wrap: wrap;
//       }

//       .boutique-name {
//         font-size: 2rem;
//         font-weight: 800;
//         color: white;
//         margin: 0;
//       }

//       .status-badge {
//         padding: 5px 14px;
//         border-radius: 30px;
//         font-size: 12px;
//         font-weight: 700;
//         text-transform: uppercase;
//         letter-spacing: 0.5px;
//       }

//       .status-active {
//         background: linear-gradient(135deg, #10b981, #059669);
//         color: white;
//       }

//       .status-pending {
//         background: linear-gradient(135deg, #f59e0b, #d97706);
//         color: white;
//       }

//       .status-suspend {
//         background: linear-gradient(135deg, #ef4444, #dc2626);
//         color: white;
//       }

//       .boutique-desc {
//         color: rgba(255,255,255,0.7);
//         margin: 0.5rem 0;
//         font-size: 0.95rem;
//         line-height: 1.6;
//       }

//       .boutique-meta {
//         display: flex;
//         gap: 1.5rem;
//         flex-wrap: wrap;
//         margin-top: 0.75rem;
//       }

//       .meta-item {
//         display: flex;
//         align-items: center;
//         gap: 6px;
//         color: rgba(255,255,255,0.6);
//         font-size: 0.85rem;
//         font-weight: 500;
//       }

//       /* MAIN */
//       .main-content {
//         max-width: 900px;
//         margin: 0 auto;
//         padding: 2rem;
//         display: flex;
//         flex-direction: column;
//         gap: 2.5rem;
//       }

//       .section {}

//       .section-title {
//         display: flex;
//         align-items: center;
//         gap: 10px;
//         font-size: 1.2rem;
//         font-weight: 700;
//         color: #1a202c;
//         margin-bottom: 1.25rem;
//         padding-bottom: 0.75rem;
//         border-bottom: 2px solid #e2e8f0;
//       }

//       /* PHOTOS GRID */
//       .photos-grid {
//         display: grid;
//         grid-template-columns: repeat(3, 1fr);
//         grid-template-rows: auto;
//         gap: 12px;
//       }

//       .photo-item {
//         position: relative;
//         border-radius: 16px;
//         overflow: hidden;
//         aspect-ratio: 4/3;
//         cursor: pointer;
//         box-shadow: 0 4px 12px rgba(0,0,0,0.1);
//       }

//       .photo-main {
//         grid-column: span 2;
//         aspect-ratio: 16/9;
//       }

//       .photo-item img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//         transition: transform 0.4s ease;
//       }

//       .photo-overlay {
//         position: absolute;
//         inset: 0;
//         background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.2));
//         opacity: 0;
//         transition: opacity 0.3s ease;
//       }

//       .photo-item:hover img { transform: scale(1.05); }
//       .photo-item:hover .photo-overlay { opacity: 1; }

//       /* HORAIRES */
//       .horaires-grid {
//         display: grid;
//         grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
//         gap: 12px;
//       }

//       .horaire-card {
//         background: white;
//         border-radius: 14px;
//         padding: 1rem 1.25rem;
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         box-shadow: 0 2px 8px rgba(0,0,0,0.06);
//         border: 1px solid #e2e8f0;
//         transition: transform 0.2s ease;
//       }

//       .horaire-card:hover { transform: translateY(-2px); }

//       .horaire-card.ferme {
//         background: #fef2f2;
//         border-color: #fecaca;
//       }

//       .jour {
//         font-weight: 700;
//         font-size: 0.9rem;
//         color: #1a202c;
//         min-width: 80px;
//       }

//       .heures {
//         font-size: 0.85rem;
//         color: #10b981;
//         font-weight: 600;
//       }

//       .heures.ferme-text { color: #ef4444; }

//       .dot {
//         width: 8px;
//         height: 8px;
//         border-radius: 50%;
//         flex-shrink: 0;
//       }

//       .dot-open { background: #10b981; box-shadow: 0 0 6px rgba(16,185,129,0.5); }
//       .dot-closed { background: #ef4444; }

//       /* LOADING */
//       .loading-screen {
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         justify-content: center;
//         min-height: 100vh;
//         gap: 1rem;
//         color: #64748b;
//       }

//       .spinner {
//         width: 40px;
//         height: 40px;
//         border: 3px solid #e2e8f0;
//         border-top-color: #1e2832;
//         border-radius: 50%;
//         animation: spin 0.8s linear infinite;
//       }

//       @keyframes spin { to { transform: rotate(360deg); } }

//       @media (max-width: 640px) {
//         .header-content { flex-direction: column; text-align: center; }
//         .boutique-meta { justify-content: center; }
//         .boutique-top { justify-content: center; }
//         .photos-grid { grid-template-columns: 1fr; }
//         .photo-main { grid-column: span 1; }
//         .main-content { padding: 1rem; }
//       }
//     `]
// })
// export class VisiteBoutique implements OnInit {

//     boutique: any = null;
//     baseUrl = 'http://localhost:5000';

//     constructor(
//         private route: ActivatedRoute,
//         private boutiqueService: BoutiqueService
//     ) {}

//     ngOnInit(): void {
//         const id = this.route.snapshot.paramMap.get('id');
//         if (id) {
//             this.boutiqueService.getBoutiqueById(id).subscribe({
//                 next: (data: any) => {
//                     console.log('Boutique reçue :', data);
//                     this.boutique = data;
//                 },
//                 error: (err) => console.error('Erreur :', err)
//             });
//         }
//     }

//     getImageUrl(url: string, type: 'logo' | 'photo'): string {
//         if (!url) return '';
//         // Correction des chemins comme dans le carousel
//         let corrected = url;
//         if (type === 'logo') {
//             corrected = url.replace('/uploads/logoboutique/', '/uploads/logo/');
//         }
//         if (type === 'photo') {
//             corrected = url.replace('/uploads/photoBoutique/', '/uploads/boutique/');
//         }
//         return this.baseUrl + corrected;
//     }

//     onImageError(event: any) {
//         event.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22200%22 height=%22200%22/%3E%3Ctext fill=%22%23999%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2224%22%3ENo Image%3C/text%3E%3C/svg%3E';
//     }
// }






import { Component, OnInit, OnDestroy } from "@angular/core";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BoutiqueService } from "../service/boutique.service";
import { ProduitService } from "../service/produit.service";
import { CartService, CartItem } from "../service/cart.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-visite-boutique',
    standalone: true,
    imports: [RouterModule, CommonModule, FormsModule],
    template: `

    

    <div *ngIf="boutique" class="page-container">

      <!-- HEADER -->
      <div class="boutique-header">
        <div class="header-content">
          <div class="logo-wrapper">
            <img 
              *ngIf="boutique.logo?.length"
              [src]="getImageUrl(boutique.logo[0].url, 'logo')" 
              [alt]="boutique.nom_boutique"
              class="boutique-logo"
              (error)="onImageError($event)"
            />
            <div class="no-logo" *ngIf="!boutique.logo?.length">
              {{ boutique.nom_boutique?.charAt(0) }}
            </div>
          </div>
          <div class="boutique-info">
            <div class="boutique-top">
              <h1 class="boutique-name">{{ boutique.nom_boutique }}</h1>
              <span class="status-badge status-active">Active</span>
            </div>
            <p class="boutique-desc">{{ boutique.description_boutique }}</p>
            <div class="boutique-meta">
              <span class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                {{ boutique.location }}
              </span>
              <span class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                {{ boutique.id_categorie?.nom }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="main-content">

        <!-- PHOTOS -->
        <section class="section">
          <h2 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            Photos de la boutique
          </h2>
          <div class="photos-grid">
            <div *ngFor="let photo of boutique.photo_boutique; let i = index"
              class="photo-item" [class.photo-main]="i === 0">
              <img [src]="getImageUrl(photo.url, 'photo')" [alt]="photo.filename" (error)="onImageError($event)" />
              <div class="photo-overlay"></div>
            </div>
          </div>
        </section>

        <!-- HORAIRES -->
        <section class="section">
          <h2 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            Horaires d'ouverture
          </h2>
          <div class="horaires-grid">
            <div *ngFor="let h of boutique.horaires" class="horaire-card" [class.ferme]="h.est_ferme">
              <span class="jour">{{ h.jour }}</span>
              <span class="heures" *ngIf="!h.est_ferme">{{ h.ouverture }} – {{ h.fermeture }}</span>
              <span class="heures ferme-text" *ngIf="h.est_ferme">Fermé</span>
              <span class="dot" [class.dot-open]="!h.est_ferme" [class.dot-closed]="h.est_ferme"></span>
            </div>
          </div>
        </section>

        <!-- PRODUITS -->
        <section class="section">
          <h2 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            Nos produits
          </h2>

          <div class="filter-bar">
            <button 
              *ngFor="let cat of categories" 
              class="filter-btn"
              [class.active]="selectedCategory === cat"
              (click)="selectedCategory = cat">
              {{ cat }}
            </button>
          </div>

          <div class="products-grid">
            <div 
              *ngFor="let product of filteredProducts" 
              class="product-card"
              (click)="openModal(product)">
              <div class="product-img-wrapper">
                <img [src]="product.image" [alt]="product.nom" class="product-img" (error)="onImageError($event)" />
                <div class="product-overlay">
                  <button class="quick-view-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    Commander
                  </button>
                </div>
                <span class="product-badge" *ngIf="product.badge">{{ product.badge }}</span>
              </div>
              <div class="product-info">
                <span class="product-category">{{ product.categorie }}</span>
                <h3 class="product-name">{{ product.nom }}</h3>
                <div class="product-footer">
                  <span class="product-price">{{ product.prix | number }} Ar</span>
                  <div class="product-rating">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    <span class="rating-val">{{ product.rating }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>

    <!-- LOADING -->
    <div *ngIf="!boutique" class="loading-screen">
      <div class="spinner"></div>
      <p>Chargement de la boutique...</p>
    </div>

    <!-- MODAL COMMANDE -->
    <div class="modal-backdrop" *ngIf="selectedProduct" (click)="closeModal()">
      <div class="modal" (click)="$event.stopPropagation()">
        <button class="modal-close" (click)="closeModal()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div class="modal-body">
          <div class="modal-img-side">
            <img [src]="selectedProduct.image" [alt]="selectedProduct.nom" (error)="onImageError($event)" />
            <span class="modal-badge" *ngIf="selectedProduct.badge">{{ selectedProduct.badge }}</span>
          </div>

          <div class="modal-info-side">
            <span class="modal-cat">{{ selectedProduct.categorie }}</span>
            <h2 class="modal-product-name">{{ selectedProduct.nom }}</h2>
            <p class="modal-desc">{{ selectedProduct.description }}</p>

            <!-- Sélection de variante -->
            <div *ngIf="varianteOptions.length > 0" class="variante-section">
              <label class="field-label">Choisir une variante</label>
              <div class="variante-chips">
                <button
                  *ngFor="let opt of varianteOptions"
                  class="variante-chip"
                  [class.selected]="selectedVarianteId === opt.value"
                  (click)="selectVariante(opt.value)">
                  {{ opt.label }}
                </button>
              </div>
            </div>

            <div class="modal-price-row">
              <span class="modal-price">{{ getSelectedPrix() | number }} Ar</span>
              <span class="stock-badge" [class.in-stock]="getSelectedStock() > 0">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline *ngIf="getSelectedStock() > 0" points="20 6 9 17 4 12"></polyline>
                  <line *ngIf="getSelectedStock() === 0" x1="18" y1="6" x2="6" y2="18"></line>
                  <line *ngIf="getSelectedStock() === 0" x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                {{ getSelectedStock() > 0 ? getSelectedStock() + ' en stock' : 'Rupture de stock' }}
              </span>
            </div>

            <div class="qty-section">
              <label class="field-label">Quantité</label>
              <div class="qty-control">
                <button class="qty-btn" (click)="decQty()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <span class="qty-val">{{ qty }}</span>
                <button class="qty-btn" (click)="incQty()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
            </div>

            <div class="modal-total">
              <span>Total</span>
              <span class="total-price">{{ getSelectedPrix() * qty | number }} Ar</span>
            </div>

            <div class="modal-actions">
              <button class="btn-order" [disabled]="getSelectedStock() === 0" (click)="commander()">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                Commander maintenant
              </button>
              <button class="btn-cart" [disabled]="getSelectedStock() === 0" (click)="ajouterAuPanier()">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TOAST -->
    <div class="toast" [class.show]="showToast">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      Ajouté au panier !
    </div>

    <!-- BOUTON PANIER FIXE -->
    <button class="cart-fab" (click)="toggleCart()">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
      <span class="cart-fab-badge" *ngIf="cartCount > 0">{{ cartCount }}</span>
    </button>

    <!-- BACKDROP CART -->
    <div class="cart-backdrop" *ngIf="cartOpen" (click)="cartOpen = false"></div>

    <!-- CART DRAWER -->
    <div class="cart-drawer" [class.open]="cartOpen">
      <!-- Header -->
      <div class="cart-drawer-header">
        <div class="cart-drawer-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          Mon Panier
          <span class="cart-count-badge" *ngIf="cartCount > 0">{{ cartCount }}</span>
        </div>
        <button class="cart-close-btn" (click)="cartOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <!-- Contenu : vide -->
      <div *ngIf="cartItems.length === 0" class="cart-empty">
        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        <p class="cart-empty-title">Votre panier est vide</p>
        <p class="cart-empty-sub">Ajoutez des produits pour commencer</p>
      </div>

      <!-- Contenu : articles -->
      <div *ngIf="cartItems.length > 0" class="cart-items-list">
        <div *ngFor="let item of cartItems" class="cart-item">
          <!-- Image -->
          <div class="cart-item-img">
            <img *ngIf="item.image_url"
                 [src]="'http://localhost:5000' + item.image_url"
                 [alt]="item.nom_produit"
                 (error)="onImageError($event)" />
            <div *ngIf="!item.image_url" class="cart-item-img-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </div>
          </div>
          <!-- Info -->
          <div class="cart-item-info">
            <p class="cart-item-name">{{ item.nom_produit }}</p>
            <p class="cart-item-variant">{{ item.combinaison_label }}</p>
            <p class="cart-item-boutique">{{ item.boutique_nom }}</p>
            <!-- Contrôles quantité -->
            <div class="cart-item-controls">
              <div class="cart-qty-control">
                <button class="cart-qty-btn" (click)="decreaseQty(item)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <span class="cart-qty-val">{{ item.quantite }}</span>
                <button class="cart-qty-btn" (click)="increaseQty(item)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              <span class="cart-item-price">{{ item.prix_unitaire * item.quantite | number }} Ar</span>
            </div>
          </div>
          <!-- Supprimer -->
          <button class="cart-remove-btn" (click)="removeItem(item)" title="Retirer">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>
          </button>
        </div>
      </div>

      <!-- Footer total + actions -->
      <div *ngIf="cartItems.length > 0" class="cart-drawer-footer">
        <div class="cart-total-row">
          <span class="cart-total-label">Total</span>
          <span class="cart-total-amount">{{ cartTotal | number }} Ar</span>
        </div>
        <button class="cart-action-primary" (click)="goToPanier()">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
          Voir mon panier & commander
        </button>
        <button class="cart-action-secondary" (click)="clearCart()">
          Vider le panier
        </button>
      </div>
    </div>
    `,
    styles: [`
      * { box-sizing: border-box; }
      .page-container { min-height: 100vh; background: #f8fafc; }

      /* HEADER */
      .boutique-header { background: linear-gradient(135deg, #1e2832 0%, #2a3642 100%); padding: 3rem 2rem 2rem; }
      .header-content { max-width: 960px; margin: 0 auto; display: flex; align-items: center; gap: 2rem; }
      .logo-wrapper { flex-shrink: 0; width: 110px; height: 110px; border-radius: 20px; background: white; display: flex; align-items: center; justify-content: center; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.3); border: 3px solid rgba(255,255,255,0.15); }
      .boutique-logo { width: 100%; height: 100%; object-fit: contain; padding: 8px; }
      .no-logo { font-size: 2.5rem; font-weight: 800; color: #1e2832; }
      .boutique-info { flex: 1; }
      .boutique-top { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; flex-wrap: wrap; }
      .boutique-name { font-size: 2rem; font-weight: 800; color: white; margin: 0; }
      .status-badge { padding: 5px 14px; border-radius: 30px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
      .status-active { background: linear-gradient(135deg, #10b981, #059669); color: white; }
      .boutique-desc { color: rgba(255,255,255,0.7); margin: 0.5rem 0; font-size: 0.95rem; line-height: 1.6; }
      .boutique-meta { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 0.75rem; }
      .meta-item { display: flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.6); font-size: 0.85rem; font-weight: 500; }
      .meta-item svg { flex-shrink: 0; }

      /* MAIN */
      .main-content { max-width: 960px; margin: 0 auto; padding: 2rem; display: flex; flex-direction: column; gap: 2.5rem; }
      .section-title { display: flex; align-items: center; gap: 10px; font-size: 1.15rem; font-weight: 700; color: #1a202c; margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 2px solid #e2e8f0; }
      .section-title svg { color: #64748b; }

      /* PHOTOS */
      .photos-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
      .photo-item { position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 4/3; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
      .photo-main { grid-column: span 2; aspect-ratio: 16/9; }
      .photo-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
      .photo-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.2)); opacity: 0; transition: opacity 0.3s ease; }
      .photo-item:hover img { transform: scale(1.05); }
      .photo-item:hover .photo-overlay { opacity: 1; }

      /* HORAIRES */
      .horaires-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
      .horaire-card { background: white; border-radius: 14px; padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; transition: transform 0.2s; }
      .horaire-card:hover { transform: translateY(-2px); }
      .horaire-card.ferme { background: #fef2f2; border-color: #fecaca; }
      .jour { font-weight: 700; font-size: 0.9rem; color: #1a202c; min-width: 80px; }
      .heures { font-size: 0.85rem; color: #10b981; font-weight: 600; }
      .heures.ferme-text { color: #ef4444; }
      .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
      .dot-open { background: #10b981; box-shadow: 0 0 6px rgba(16,185,129,0.5); }
      .dot-closed { background: #ef4444; }

      /* FILTRES */
      .filter-bar { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 1.5rem; }
      .filter-btn { padding: 8px 18px; border-radius: 30px; border: 2px solid #e2e8f0; background: white; color: #64748b; font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; }
      .filter-btn:hover { border-color: #1e2832; color: #1e2832; }
      .filter-btn.active { background: #1e2832; color: white; border-color: #1e2832; }

      /* PRODUITS */
      .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
      .product-card { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.07); border: 1px solid #f1f5f9; cursor: pointer; transition: all 0.3s ease; }
      .product-card:hover { transform: translateY(-8px); box-shadow: 0 12px 30px rgba(0,0,0,0.12); }
      .product-img-wrapper { position: relative; aspect-ratio: 1; overflow: hidden; background: #f8fafc; }
      .product-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
      .product-card:hover .product-img { transform: scale(1.08); }
      .product-overlay { position: absolute; inset: 0; background: rgba(30,40,50,0.65); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; }
      .product-card:hover .product-overlay { opacity: 1; }
      .quick-view-btn { background: white; color: #1e2832; border: none; padding: 10px 20px; border-radius: 30px; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 8px; transform: translateY(10px); transition: transform 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
      .product-card:hover .quick-view-btn { transform: translateY(0); }
      .product-badge { position: absolute; top: 12px; left: 12px; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
      .product-info { padding: 1rem 1.25rem; }
      .product-category { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
      .product-name { font-size: 1rem; font-weight: 700; color: #1a202c; margin: 4px 0 10px; }
      .product-footer { display: flex; justify-content: space-between; align-items: center; }
      .product-price { font-size: 1.05rem; font-weight: 800; color: #1e2832; }
      .product-rating { display: flex; align-items: center; gap: 4px; }
      .rating-val { font-size: 0.8rem; font-weight: 700; color: #64748b; }

      /* MODAL */
      .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(4px); animation: fadeIn 0.2s ease; }
      .modal { background: white; border-radius: 24px; max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative; animation: slideUp 0.3s ease; box-shadow: 0 24px 60px rgba(0,0,0,0.3); }
      .modal-close { position: absolute; top: 16px; right: 16px; z-index: 10; background: #f1f5f9; border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; color: #374151; }
      .modal-close:hover { background: #e2e8f0; }
      .modal-body { display: grid; grid-template-columns: 1fr 1fr; }
      .modal-img-side { position: relative; background: #f8fafc; border-radius: 24px 0 0 24px; overflow: hidden; min-height: 400px; display: flex; align-items: center; justify-content: center; }
      .modal-img-side img { width: 100%; height: 100%; object-fit: cover; }
      .modal-badge { position: absolute; top: 16px; left: 16px; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
      .modal-info-side { padding: 2rem; display: flex; flex-direction: column; gap: 1rem; }
      .modal-cat { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
      .modal-product-name { font-size: 1.6rem; font-weight: 800; color: #1a202c; margin: 0; line-height: 1.2; }
      .modal-desc { color: #64748b; font-size: 0.9rem; line-height: 1.6; margin: 0; }
      .modal-rating { display: flex; align-items: center; gap: 3px; }
      .modal-price-row { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
      .modal-price { font-size: 1.6rem; font-weight: 800; color: #1e2832; }
      .stock-badge { display: flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; background: #fef2f2; color: #ef4444; }
      .stock-badge.in-stock { background: #f0fdf4; color: #10b981; }
      .field-label { font-size: 0.85rem; font-weight: 700; color: #374151; display: block; margin-bottom: 8px; }
      .size-section, .qty-section { display: flex; flex-direction: column; }
      .size-options { display: flex; gap: 8px; flex-wrap: wrap; }
      .size-btn { width: 44px; height: 44px; border-radius: 10px; border: 2px solid #e2e8f0; background: white; font-weight: 700; cursor: pointer; transition: all 0.2s; font-size: 0.85rem; }
      .size-btn:hover { border-color: #1e2832; }
      .size-btn.selected { background: #1e2832; color: white; border-color: #1e2832; }
      .qty-control { display: flex; align-items: center; border: 2px solid #e2e8f0; border-radius: 12px; overflow: hidden; width: fit-content; }
      .qty-btn { width: 44px; height: 44px; border: none; background: #f8fafc; cursor: pointer; transition: background 0.2s; display: flex; align-items: center; justify-content: center; color: #374151; }
      .qty-btn:hover { background: #e2e8f0; }
      .qty-val { width: 50px; text-align: center; font-weight: 800; font-size: 1rem; color: #1a202c; }
      .modal-total { display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border-radius: 12px; padding: 1rem 1.25rem; }
      .modal-total span:first-child { font-weight: 600; color: #64748b; }
      .total-price { font-size: 1.4rem; font-weight: 800; color: #1e2832; }
      .modal-actions { display: flex; flex-direction: column; gap: 10px; margin-top: auto; }
      .btn-order { background: linear-gradient(135deg, #1e2832, #2a3642); color: white; border: none; padding: 14px; border-radius: 14px; font-weight: 700; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s; box-shadow: 0 6px 20px rgba(30,40,50,0.4); }
      .btn-order:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(30,40,50,0.5); }
      .btn-order:disabled { opacity: 0.5; cursor: not-allowed; }
      .btn-cart { background: white; color: #1e2832; border: 2px solid #1e2832; padding: 12px; border-radius: 14px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px; }
      .btn-cart:hover:not(:disabled) { background: #f8fafc; }
      .btn-cart:disabled { opacity: 0.5; cursor: not-allowed; }

      /* TOAST */
      .toast { position: fixed; bottom: -80px; left: 50%; transform: translateX(-50%); background: #1e2832; color: white; padding: 14px 28px; border-radius: 50px; font-weight: 600; font-size: 0.9rem; box-shadow: 0 8px 24px rgba(0,0,0,0.3); z-index: 2000; transition: bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; gap: 10px; white-space: nowrap; }
      .toast.show { bottom: 30px; }

      /* CART FAB */
      .cart-fab { position: fixed; bottom: 32px; right: 32px; z-index: 900; width: 58px; height: 58px; border-radius: 50%; background: linear-gradient(135deg, #1e2832, #2a3642); color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 24px rgba(30,40,50,0.45); transition: transform 0.2s, box-shadow 0.2s; }
      .cart-fab:hover { transform: scale(1.08); box-shadow: 0 10px 30px rgba(30,40,50,0.55); }
      .cart-fab-badge { position: absolute; top: -4px; right: -4px; background: #ef4444; color: white; font-size: 11px; font-weight: 800; min-width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; }

      /* CART BACKDROP */
      .cart-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 1100; backdrop-filter: blur(2px); animation: fadeIn 0.2s ease; }

      /* CART DRAWER */
      .cart-drawer { position: fixed; top: 0; right: 0; height: 100vh; width: 400px; max-width: 95vw; background: white; z-index: 1200; display: flex; flex-direction: column; box-shadow: -8px 0 32px rgba(0,0,0,0.15); transform: translateX(100%); transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
      .cart-drawer.open { transform: translateX(0); }

      .cart-drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; border-bottom: 1px solid #e2e8f0; flex-shrink: 0; }
      .cart-drawer-title { display: flex; align-items: center; gap: 10px; font-size: 1.1rem; font-weight: 800; color: #1a202c; }
      .cart-count-badge { background: #1e2832; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
      .cart-close-btn { background: #f1f5f9; border: none; border-radius: 50%; width: 34px; height: 34px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #374151; transition: background 0.2s; }
      .cart-close-btn:hover { background: #e2e8f0; }

      .cart-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 2rem; }
      .cart-empty-title { font-size: 1.1rem; font-weight: 700; color: #374151; margin: 0; }
      .cart-empty-sub { font-size: 0.875rem; color: #94a3b8; margin: 0; }

      .cart-items-list { flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 1rem; }
      .cart-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px; background: #f8fafc; border-radius: 14px; border: 1px solid #e2e8f0; }
      .cart-item-img { width: 64px; height: 64px; border-radius: 10px; overflow: hidden; background: #e2e8f0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
      .cart-item-img img { width: 100%; height: 100%; object-fit: cover; }
      .cart-item-img-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
      .cart-item-info { flex: 1; min-width: 0; }
      .cart-item-name { font-size: 0.9rem; font-weight: 700; color: #1a202c; margin: 0 0 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .cart-item-variant { font-size: 0.78rem; color: #6366f1; font-weight: 600; margin: 0 0 2px; }
      .cart-item-boutique { font-size: 0.75rem; color: #94a3b8; margin: 0 0 8px; }
      .cart-item-controls { display: flex; align-items: center; justify-content: space-between; }
      .cart-qty-control { display: flex; align-items: center; border: 1.5px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
      .cart-qty-btn { width: 28px; height: 28px; border: none; background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s; color: #374151; }
      .cart-qty-btn:hover { background: #f1f5f9; }
      .cart-qty-val { width: 30px; text-align: center; font-weight: 700; font-size: 0.85rem; color: #1a202c; }
      .cart-item-price { font-size: 0.92rem; font-weight: 800; color: #1e2832; }
      .cart-remove-btn { background: none; border: none; cursor: pointer; color: #ef4444; padding: 4px; border-radius: 6px; transition: background 0.15s; flex-shrink: 0; align-self: flex-start; }
      .cart-remove-btn:hover { background: #fef2f2; }

      .cart-drawer-footer { padding: 1.25rem 1.5rem; border-top: 1px solid #e2e8f0; flex-shrink: 0; display: flex; flex-direction: column; gap: 10px; }
      .cart-total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
      .cart-total-label { font-size: 0.95rem; font-weight: 600; color: #64748b; }
      .cart-total-amount { font-size: 1.4rem; font-weight: 800; color: #1e2832; }
      .cart-action-primary { background: linear-gradient(135deg, #1e2832, #2a3642); color: white; border: none; padding: 14px; border-radius: 14px; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; box-shadow: 0 4px 14px rgba(30,40,50,0.35); }
      .cart-action-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(30,40,50,0.45); }
      .cart-action-secondary { background: none; border: 1.5px solid #e2e8f0; color: #94a3b8; padding: 10px; border-radius: 12px; font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; }
      .cart-action-secondary:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }

      /* VARIANTE CHIPS */
      .variante-section { display: flex; flex-direction: column; }
      .variante-chips { display: flex; gap: 8px; flex-wrap: wrap; }
      .variante-chip { padding: 6px 14px; border-radius: 10px; border: 2px solid #e2e8f0; background: white; font-weight: 600; font-size: 0.82rem; cursor: pointer; transition: all 0.2s; color: #374151; }
      .variante-chip:hover { border-color: #1e2832; color: #1e2832; }
      .variante-chip.selected { background: #1e2832; color: white; border-color: #1e2832; }

      /* LOADING */
      .loading-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; gap: 1rem; color: #64748b; }
      .spinner { width: 40px; height: 40px; border: 3px solid #e2e8f0; border-top-color: #1e2832; border-radius: 50%; animation: spin 0.8s linear infinite; }

      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

      @media (max-width: 640px) {
        .header-content { flex-direction: column; text-align: center; }
        .boutique-meta { justify-content: center; }
        .boutique-top { justify-content: center; }
        .photos-grid { grid-template-columns: 1fr; }
        .photo-main { grid-column: span 1; }
        .modal-body { grid-template-columns: 1fr; }
        .modal-img-side { border-radius: 24px 24px 0 0; min-height: 250px; }
        .main-content { padding: 1rem; }
      }
    `]
})
export class VisiteBoutique implements OnInit, OnDestroy {

    boutique: any = null;
    baseUrl = 'http://localhost:5000';

    products: any[] = [];

    categories: string[] = ['Tous'];
    selectedCategory = 'Tous';
    selectedProduct: any = null;
    varianteOptions: { label: string; value: string }[] = [];
    selectedVarianteId = '';
    qty: number = 1;
    showToast = false;

    // Panier
    cartOpen = false;
    cartItems: CartItem[] = [];
    cartTotal = 0;
    cartCount = 0;
    private cartSub!: Subscription;

    get filteredProducts() {
        if (this.selectedCategory === 'Tous') return this.products;
        return this.products.filter(p => p.categorie === this.selectedCategory);
    }

    constructor(
        private route: ActivatedRoute,
        private boutiqueService: BoutiqueService,
        private produitService: ProduitService,
        private cartService: CartService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.cartSub = this.cartService.cart$.subscribe(items => {
            this.cartItems = items;
            this.cartCount = this.cartService.getCartCount();
            this.cartTotal = this.cartService.getTotal();
        });

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.boutiqueService.getBoutiqueById(id).subscribe({
                next: (data: any) => { this.boutique = data; },
                error: (err) => console.error('Erreur :', err)
            });
            this.produitService.getProductsByBoutique(id).subscribe({
                next: (data: any[]) => {
                    this.products = data.map(p => {
                        const totalStock = (p.variantes || []).reduce((s: number, v: any) => s + (v.stock || 0), 0);
                        // Prix affiché = prix minimum parmi toutes les variantes
                        let minPrix = 0;
                        for (const v of (p.variantes || [])) {
                            if (v.historique_prix?.length > 0) {
                                const last = v.historique_prix[v.historique_prix.length - 1];
                                const prix = last.prix_ttc || last.prix_hors_taxe;
                                if (!minPrix || prix < minPrix) minPrix = prix;
                            }
                        }
                        return {
                            _id: p._id,
                            nom: p.nom_produit,
                            categorie: p.id_categorie?.[0]?.nom || p.id_categorie?.[0]?.nom_categorie || 'Produit',
                            prix: minPrix,
                            rating: 4.5,
                            stock: totalStock,
                            badge: totalStock === 0 ? 'Rupture' : null,
                            image: p.images?.[0] ? this.baseUrl + p.images[0].url : 'https://placehold.co/400x400?text=No+Image',
                            description: p.description || '',
                            _raw: p
                        };
                    });
                    const cats = new Set(this.products.map(p => p.categorie));
                    this.categories = ['Tous', ...Array.from(cats)];
                },
                error: (err) => console.error('Erreur produits :', err)
            });
        }
    }

    openModal(product: any) {
        this.selectedProduct = product;
        this.qty = 1;
        // Construire les options variante depuis _raw
        const variantes = product._raw?.variantes || [];
        this.varianteOptions = variantes.map((v: any) => ({
            label: v.combinaison && v.combinaison.length > 0
                ? v.combinaison.map((c: any) => `${c.attribut}: ${c.valeur}`).join(', ')
                : 'Standard',
            value: v._id
        }));
        this.selectedVarianteId = this.varianteOptions.length > 0 ? this.varianteOptions[0].value : '';
        document.body.style.overflow = 'hidden';
    }

    selectVariante(id: string) {
        this.selectedVarianteId = id;
        this.qty = 1;
    }

    getSelectedVariante(): any {
        if (!this.selectedProduct?._raw) return null;
        return (this.selectedProduct._raw.variantes || []).find((v: any) => v._id === this.selectedVarianteId) || null;
    }

    getSelectedPrix(): number {
        const v = this.getSelectedVariante();
        if (!v || !v.historique_prix || v.historique_prix.length === 0) return this.selectedProduct?.prix || 0;
        const last = v.historique_prix[v.historique_prix.length - 1];
        return last.prix_ttc || last.prix_hors_taxe;
    }

    getSelectedStock(): number {
        const v = this.getSelectedVariante();
        return v ? v.stock : 0;
    }

    closeModal() {
        this.selectedProduct = null;
        document.body.style.overflow = '';
    }

    decQty() {
        if (this.qty > 1) this.qty--;
    }

    incQty() {
        if (this.qty < this.getSelectedStock()) this.qty++;
    }

    private buildCartItem() {
        const p = this.selectedProduct;
        if (!p?._raw) return null;
        const raw = p._raw;
        const variante = this.getSelectedVariante();
        if (!variante) return null;
        return {
            produit_id: raw._id,
            variante_id: variante._id,
            boutique_id: raw.id_boutique?._id || raw.id_boutique,
            boutique_nom: this.boutique?.nom_boutique || 'Boutique',
            nom_produit: raw.nom_produit,
            combinaison_label: variante.combinaison?.length > 0
                ? variante.combinaison.map((c: any) => `${c.attribut}: ${c.valeur}`).join(', ')
                : 'Standard',
            prix_unitaire: this.getSelectedPrix(),
            devise: variante.historique_prix?.length > 0 ? (variante.historique_prix[variante.historique_prix.length - 1].devise || 'DT') : 'DT',
            quantite: this.qty,
            image_url: raw.images?.[0]?.url || '',
            stock_disponible: variante.stock
        };
    }

    ajouterAuPanier() {
        const item = this.buildCartItem();
        if (!item) return;
        this.cartService.addToCart(item);
        this.closeModal();
        this.showToast = true;
        setTimeout(() => this.showToast = false, 3000);
    }

    commander() {
        const item = this.buildCartItem();
        if (!item) return;
        this.cartService.addToCart(item);
        this.closeModal();
        this.showToast = true;
        setTimeout(() => this.showToast = false, 3000);
    }

    getImageUrl(url: string, type: 'logo' | 'photo'): string {
        if (!url) return '';
        let corrected = url;
        if (type === 'logo') corrected = url.replace('/uploads/logoboutique/', '/uploads/logo/');
        if (type === 'photo') corrected = url.replace('/uploads/photoBoutique/', '/uploads/boutique/');
        return this.baseUrl + corrected;
    }

    onImageError(event: any) {
        event.target.src = 'https://placehold.co/400x400?text=No+Image';
    }

    ngOnDestroy(): void {
        this.cartSub?.unsubscribe();
    }

    // ---- Panier ----

    toggleCart() {
        this.cartOpen = !this.cartOpen;
    }

    removeItem(item: CartItem) {
        this.cartService.removeFromCart(item.produit_id, item.variante_id);
    }

    increaseQty(item: CartItem) {
        this.cartService.updateQuantity(item.produit_id, item.variante_id, item.quantite + 1);
    }

    decreaseQty(item: CartItem) {
        if (item.quantite <= 1) {
            this.cartService.removeFromCart(item.produit_id, item.variante_id);
        } else {
            this.cartService.updateQuantity(item.produit_id, item.variante_id, item.quantite - 1);
        }
    }

    clearCart() {
        this.cartService.clearCart();
    }

    goToPanier() {
        this.cartOpen = false;
        this.router.navigate(['/client/panier']);
    }

    goHome() {
        this.router.navigate(['/visiteBoutique']);
    }
}



















