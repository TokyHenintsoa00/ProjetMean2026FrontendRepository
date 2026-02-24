



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






import { Component, OnInit } from "@angular/core";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BoutiqueService } from "../service/boutique.service";

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

            <div class="modal-rating">
              <span *ngFor="let s of [1,2,3,4,5]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" [attr.fill]="s <= selectedProduct.rating ? '#fbbf24' : '#e2e8f0'" [attr.stroke]="s <= selectedProduct.rating ? '#fbbf24' : '#e2e8f0'" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </span>
              <span class="rating-val">{{ selectedProduct.rating }}/5</span>
            </div>

            <div class="modal-price-row">
              <span class="modal-price">{{ selectedProduct.prix | number }} Ar</span>
              <span class="stock-badge" [class.in-stock]="selectedProduct.stock > 0">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline *ngIf="selectedProduct.stock > 0" points="20 6 9 17 4 12"></polyline>
                  <line *ngIf="selectedProduct.stock === 0" x1="18" y1="6" x2="6" y2="18"></line>
                  <line *ngIf="selectedProduct.stock === 0" x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                {{ selectedProduct.stock > 0 ? selectedProduct.stock + ' en stock' : 'Rupture de stock' }}
              </span>
            </div>

            <div *ngIf="selectedProduct.tailles?.length" class="size-section">
              <label class="field-label">Taille</label>
              <div class="size-options">
                <button 
                  *ngFor="let t of selectedProduct.tailles"
                  class="size-btn"
                  [class.selected]="selectedSize === t"
                  (click)="selectedSize = t">
                  {{ t }}
                </button>
              </div>
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
              <span class="total-price">{{ selectedProduct.prix * qty | number }} Ar</span>
            </div>

            <div class="modal-actions">
              <button class="btn-order" [disabled]="selectedProduct.stock === 0" (click)="commander()">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                Commander maintenant
              </button>
              <button class="btn-cart" [disabled]="selectedProduct.stock === 0">
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
      Commande passée avec succès !
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
export class VisiteBoutique implements OnInit {

    boutique: any = null;
    baseUrl = 'http://localhost:5000';

    products = [
        { id: 1, nom: 'Polo Ralph Lauren Slim', categorie: 'Hauts', prix: 185000, rating: 4.8, stock: 12, badge: 'Nouveau', tailles: ['XS','S','M','L','XL'], image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400', description: 'Polo classique coupe slim, disponible en plusieurs coloris. Tissu piqué 100% coton.' },
        { id: 2, nom: 'Jean Straight Fit', categorie: 'Bas', prix: 220000, rating: 4.5, stock: 8, badge: null, tailles: ['38','40','42','44'], image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', description: 'Jean coupe droite, denim premium stretch. Confort optimal toute la journée.' },
        { id: 3, nom: 'Sneakers Classic White', categorie: 'Chaussures', prix: 310000, rating: 4.9, stock: 5, badge: 'Bestseller', tailles: ['39','40','41','42','43','44'], image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', description: 'Sneakers iconiques cuir blanc, semelle confort. L\'essentiel du vestiaire moderne.' },
        { id: 4, nom: 'Blazer Oversize', categorie: 'Vestes', prix: 420000, rating: 4.7, stock: 0, badge: 'Soldes', tailles: ['S','M','L'], image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e09?w=400', description: 'Blazer oversize tendance, coupe déstructurée. Parfait pour un look business casual.' },
        { id: 5, nom: 'Ceinture Cuir Tressé', categorie: 'Accessoires', prix: 75000, rating: 4.3, stock: 20, badge: null, tailles: [], image: 'https://images.unsplash.com/photo-1624222247344-550fb60fe8ff?w=400', description: 'Ceinture cuir véritable tressé, boucle dorée. Finitions soignées.' },
        { id: 6, nom: 'T-Shirt Logo Brodé', categorie: 'Hauts', prix: 95000, rating: 4.6, stock: 15, badge: null, tailles: ['XS','S','M','L','XL','XXL'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', description: 'T-shirt coton premium, logo brodé sur la poitrine. Coupe regular fit.' },
    ];

    categories = ['Tous', 'Hauts', 'Bas', 'Chaussures', 'Vestes', 'Accessoires'];
    selectedCategory = 'Tous';
    selectedProduct: any = null;
    selectedSize: string = '';
    qty: number = 1;
    showToast = false;

    get filteredProducts() {
        if (this.selectedCategory === 'Tous') return this.products;
        return this.products.filter(p => p.categorie === this.selectedCategory);
    }

    constructor(
        private route: ActivatedRoute, 
        private boutiqueService: BoutiqueService,
        private router:Router
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.boutiqueService.getBoutiqueById(id).subscribe({
                next: (data: any) => { this.boutique = data; },
                error: (err) => console.error('Erreur :', err)
            });
        }
    }

    openModal(product: any) {
        this.selectedProduct = product;
        this.qty = 1;
        this.selectedSize = product.tailles?.[0] || '';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.selectedProduct = null;
        document.body.style.overflow = '';
    }

    decQty() {
        if (this.qty > 1) this.qty--;
    }

    incQty() {
        if (this.selectedProduct && this.qty < this.selectedProduct.stock) this.qty++;
    }

    commander() {
        console.log('Commande :', {
            produit: this.selectedProduct.nom,
            taille: this.selectedSize,
            quantite: this.qty,
            total: this.selectedProduct.prix * this.qty
        });
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

    goHome()
    {
         this.router.navigate(['/visiteBoutique']);
    }
}



















