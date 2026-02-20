import { Component, OnInit } from "@angular/core";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BoutiqueService } from "../service/boutique.service";
import { ProduitService } from "../service/produit.service";
import { MessageService } from "primeng/api";
@Component({
    selector: 'app-visite-boutique-client',
    standalone: true,
    imports: [RouterModule, CommonModule, FormsModule],
    providers: [MessageService],
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
              (click)="onCategorySelect(cat)">
              {{ cat }}
            </button>
          </div>

          <div *ngIf="filteredProducts.length === 0" class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            <p>Aucun produit disponible</p>
          </div>

          <div class="products-grid">
            <div 
              *ngFor="let product of filteredProducts" 
              class="product-card"
              (click)="openModal(product)">
              <div class="product-img-wrapper">
                <img 
                  [src]="getProduitImage(product)" 
                  [alt]="product.nom_produit" 
                  class="product-img" 
                  (error)="onImageError($event)" />
                <div class="product-overlay">
                  <button class="quick-view-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    Commander
                  </button>
                </div>
                <!-- Badge rupture si stock de la taille filtrée = 0 -->
                <span class="product-badge" *ngIf="getStockPourCarte(product) === 0">Rupture</span>
              </div>
              <div class="product-info">
                <h3 class="product-name">{{ product.nom_produit }}</h3>
                <div class="product-footer">
                  <!-- Prix de la taille filtrée ou première variante -->
                  <span class="product-price">{{ getPrixPourCarte(product) | number }} Ar</span>
                  <!-- Stock de la taille filtrée ou total -->
                  <span class="stock-info" [class.out]="getStockPourCarte(product) === 0">
                    {{ getStockPourCarte(product) > 0 ? getStockPourCarte(product) + ' en stock' : 'Épuisé' }}
                  </span>
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
            <img [src]="getProduitImage(selectedProduct)" [alt]="selectedProduct.nom_produit" (error)="onImageError($event)" />
            <span class="modal-badge" *ngIf="currentStock === 0">Épuisé</span>
          </div>

          <div class="modal-info-side">
            <h2 class="modal-product-name">{{ selectedProduct.nom_produit }}</h2>
            <p class="modal-desc">{{ selectedProduct.description }}</p>

            <!-- TAILLES -->
            <div *ngIf="getTailles(selectedProduct).length" class="size-section">
              <label class="field-label">Taille</label>
              <div class="size-options">
                <button 
                  *ngFor="let t of getTailles(selectedProduct)"
                  class="size-btn"
                  [class.selected]="selectedSize === t"
                  [class.out-of-stock]="getVarianteStock(selectedProduct, t) === 0"
                  (click)="onSizeSelect(t)">
                  {{ t }}
                </button>
              </div>
            </div>

            <!-- PRIX & STOCK selon variante -->
            <div class="modal-price-row">
              <span class="modal-price">{{ currentPrix | number }} Ar</span>
              <span class="stock-badge" [class.in-stock]="currentStock > 0">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline *ngIf="currentStock > 0" points="20 6 9 17 4 12"></polyline>
                  <line *ngIf="currentStock === 0" x1="18" y1="6" x2="6" y2="18"></line>
                  <line *ngIf="currentStock === 0" x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                {{ currentStock > 0 ? currentStock + ' en stock' : 'Rupture de stock' }}
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
              <span class="total-price">{{ currentPrix * qty | number }} Ar</span>
            </div>

            <div class="modal-actions">
              <button class="btn-order" [disabled]="currentStock === 0" (click)="commander()">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                Commander maintenant
              </button>
              <button class="btn-cart" [disabled]="currentStock === 0" (click)="ajoutPanier()">
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

    <!-- Panier -->
    <div class="toast" [class.show]="showPanier">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      Ajout dans le panier
    </div>

    
    <!-- MODAL CONNEXION REQUISE -->
<div class="modal-backdrop" *ngIf="showLoginModal" (click)="closeLoginModal()">
  <div class="login-modal" (click)="$event.stopPropagation()">

    <div class="login-modal-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
        fill="none" stroke="#1e2832" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </div>

    <h2 class="login-modal-title">Connexion requise</h2>
    <p class="login-modal-desc">
      Vous devez être connecté pour ajouter un produit à votre panier.
    </p>

    <div class="login-modal-actions">
      <button class="btn-login-go" (click)="allerConnexion()">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
          <polyline points="10 17 15 12 10 7"></polyline>
          <line x1="15" y1="12" x2="3" y2="12"></line>
        </svg>
        Se connecter
      </button>
      <button class="btn-login-cancel" (click)="closeLoginModal()">
        Annuler
      </button>
    </div>

  </div>
</div>


    `,
    styles: [`
      * { box-sizing: border-box; }
      .page-container { min-height: 100vh; background: #f8fafc; }

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

      .main-content { max-width: 960px; margin: 0 auto; padding: 2rem; display: flex; flex-direction: column; gap: 2.5rem; }
      .section-title { display: flex; align-items: center; gap: 10px; font-size: 1.15rem; font-weight: 700; color: #1a202c; margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 2px solid #e2e8f0; }
      .section-title svg { color: #64748b; }

      .photos-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
      .photo-item { position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 4/3; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
      .photo-main { grid-column: span 2; aspect-ratio: 16/9; }
      .photo-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
      .photo-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.2)); opacity: 0; transition: opacity 0.3s ease; }
      .photo-item:hover img { transform: scale(1.05); }
      .photo-item:hover .photo-overlay { opacity: 1; }

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

      .filter-bar { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 1.5rem; }
      .filter-btn { padding: 8px 18px; border-radius: 30px; border: 2px solid #e2e8f0; background: white; color: #64748b; font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; }
      .filter-btn:hover { border-color: #1e2832; color: #1e2832; }
      .filter-btn.active { background: #1e2832; color: white; border-color: #1e2832; }

      .empty-state { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 3rem; color: #94a3b8; font-weight: 500; }

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
      .product-name { font-size: 1rem; font-weight: 700; color: #1a202c; margin: 4px 0 10px; }
      .product-footer { display: flex; justify-content: space-between; align-items: center; }
      .product-price { font-size: 1.05rem; font-weight: 800; color: #1e2832; }
      .stock-info { font-size: 0.78rem; font-weight: 600; color: #10b981; }
      .stock-info.out { color: #ef4444; }

      .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(4px); animation: fadeIn 0.2s ease; }
      .modal { background: white; border-radius: 24px; max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative; animation: slideUp 0.3s ease; box-shadow: 0 24px 60px rgba(0,0,0,0.3); }
      .modal-close { position: absolute; top: 16px; right: 16px; z-index: 10; background: #f1f5f9; border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; color: #374151; }
      .modal-close:hover { background: #e2e8f0; }
      .modal-body { display: grid; grid-template-columns: 1fr 1fr; }
      .modal-img-side { position: relative; background: #f8fafc; border-radius: 24px 0 0 24px; overflow: hidden; min-height: 400px; display: flex; align-items: center; justify-content: center; }
      .modal-img-side img { width: 100%; height: 100%; object-fit: cover; }
      .modal-badge { position: absolute; top: 16px; left: 16px; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
      .modal-info-side { padding: 2rem; display: flex; flex-direction: column; gap: 1rem; }
      .modal-product-name { font-size: 1.6rem; font-weight: 800; color: #1a202c; margin: 0; line-height: 1.2; }
      .modal-desc { color: #64748b; font-size: 0.9rem; line-height: 1.6; margin: 0; }
      .modal-price-row { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
      .modal-price { font-size: 1.6rem; font-weight: 800; color: #1e2832; }
      .stock-badge { display: flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; background: #fef2f2; color: #ef4444; }
      .stock-badge.in-stock { background: #f0fdf4; color: #10b981; }
      .field-label { font-size: 0.85rem; font-weight: 700; color: #374151; display: block; margin-bottom: 8px; }
      .size-section, .qty-section { display: flex; flex-direction: column; }
      .size-options { display: flex; gap: 8px; flex-wrap: wrap; }
      .size-btn { min-width: 44px; height: 44px; padding: 0 10px; border-radius: 10px; border: 2px solid #e2e8f0; background: white; font-weight: 700; cursor: pointer; transition: all 0.2s; font-size: 0.85rem; }
      .size-btn:hover:not(.out-of-stock) { border-color: #1e2832; }
      .size-btn.selected { background: #1e2832; color: white; border-color: #1e2832; }
      .size-btn.out-of-stock { opacity: 0.4; cursor: not-allowed; text-decoration: line-through; }
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

      .toast { position: fixed; bottom: -80px; left: 50%; transform: translateX(-50%); background: #1e2832; color: white; padding: 14px 28px; border-radius: 50px; font-weight: 600; font-size: 0.9rem; box-shadow: 0 8px 24px rgba(0,0,0,0.3); z-index: 2000; transition: bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; gap: 10px; white-space: nowrap; }
      .toast.show { bottom: 30px; }

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

      .login-modal {
  background: white;
  border-radius: 24px;
  padding: 2.5rem 2rem;
  max-width: 380px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  text-align: center;
  box-shadow: 0 24px 60px rgba(0,0,0,0.3);
  animation: slideUp 0.3s ease;
}

.login-modal-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-modal-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1a202c;
  margin: 0;
}

.login-modal-desc {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

.login-modal-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 0.5rem;
}

.btn-login-go {
  background: linear-gradient(135deg, #1e2832, #2a3642);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s;
  box-shadow: 0 6px 20px rgba(30,40,50,0.4);
  width: 100%;
}

.btn-login-go:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(30,40,50,0.5);
}

.btn-login-cancel {
  background: white;
  color: #64748b;
  border: 2px solid #e2e8f0;
  padding: 12px;
  border-radius: 14px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}

.btn-login-cancel:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

    `]
})
export class VisiteBoutiqueClient implements OnInit {

    boutique: any = null;
    baseUrl = 'http://localhost:5000';

    produits: any[] = [];
    categories: string[] = ['Tous'];
    selectedCategory: string = 'Tous';

    selectedProduct: any = null;
    selectedSize: string = '';
    currentPrix: number = 0;
    currentStock: number = 0;
    qty: number = 1;
    showToast = false;
    showPanier = false; 
    showErrorToast = false;
    showLoginModal = false;
    // ─── FILTRE ────────────────────────────────────────────────────────────────
    // Un produit est affiché si "Tous" ou s'il possède une variante pour la taille choisie
    get filteredProducts(): any[] {
        if (this.selectedCategory === 'Tous') return this.produits;
        return this.produits.filter(p =>
            p.variantes?.some((v: any) =>
                v.combinaison?.some((c: any) => c.valeur === this.selectedCategory)
            )
        );
    }

    constructor(
        private route: ActivatedRoute,
        private boutiqueService: BoutiqueService,
        private router: Router,
        private produitService: ProduitService,
        private messageService:MessageService
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.boutiqueService.getBoutiqueById(id).subscribe({
                next: (data: any) => { this.boutique = data; },
                error: (err) => console.error('Erreur boutique :', err)
            });

            this.produitService.getProduitByIdBoutique(id).subscribe({
                next: (data: any) => {
                    this.produits = data;
                    this.buildCategories();
                },
                error: (err) => console.error('Erreur produits :', err)
            });
        }
    }

    /** Construit les filtres depuis les valeurs d'attribut "Taille" */
    buildCategories(): void {
        const tailles = new Set<string>();
        this.produits.forEach(p => {
            p.attributs?.forEach((a: any) => {
                if (a.nom === 'Taille') {
                    a.valeurs?.forEach((v: string) => tailles.add(v));
                }
            });
        });
        this.categories = ['Tous', ...Array.from(tailles)];
    }

    /** Appelé quand on clique sur un filtre */
    onCategorySelect(cat: string): void {
        this.selectedCategory = cat;
        // Pas besoin de rien d'autre : filteredProducts et getPrixPourCarte/getStockPourCarte
        // sont recalculés automatiquement via le getter et les appels dans le template
    }

    // ─── CARTE PRODUIT : prix/stock selon le filtre actif ──────────────────────

    /**
     * Si une taille est filtrée → stock de cette variante précise
     * Si "Tous" → stock total de toutes les variantes
     */
    getStockPourCarte(produit: any): number {
        if (this.selectedCategory !== 'Tous') {
            return this.getVarianteStock(produit, this.selectedCategory);
        }
        return produit?.variantes?.reduce((sum: number, v: any) => sum + (v.stock ?? 0), 0) ?? 0;
    }

    /**
     * Si une taille est filtrée → prix de cette variante précise
     * Si "Tous" → prix de la première variante
     */
    getPrixPourCarte(produit: any): number {
        if (this.selectedCategory !== 'Tous') {
            return this.getPrixVariante(produit, this.selectedCategory);
        }
        return this.getPrixDefaut(produit);
    }

    // ─── HELPERS GÉNÉRIQUES ────────────────────────────────────────────────────

    getProduitImage(produit: any): string {
        if (produit?.images?.length) {
            return this.baseUrl + produit.images[0].url;
        }
        return 'https://placehold.co/400x400?text=No+Image';
    }

    getTailles(produit: any): string[] {
        const attr = produit?.attributs?.find((a: any) => a.nom === 'Taille');
        return attr?.valeurs ?? [];
    }

    getVariante(produit: any, taille: string): any {
        return produit?.variantes?.find((v: any) =>
            v.combinaison?.some((c: any) => c.valeur === taille)
        );
    }

    getVarianteStock(produit: any, taille: string): number {
        return this.getVariante(produit, taille)?.stock ?? 0;
    }

    getPrixDefaut(produit: any): number {
        const variante = produit?.variantes?.[0];
        const hist = variante?.historique_prix;
        return hist?.length ? hist[hist.length - 1].prix_hors_taxe : 0;
    }

    getPrixVariante(produit: any, taille: string): number {
    const variante = this.getVariante(produit, taille);
    console.log('variante trouvée pour', taille, ':', variante); // DEBUG
    const hist = variante?.historique_prix;
    return hist?.length ? hist[hist.length - 1].prix_hors_taxe : 0;
  }

    // ─── MODAL ─────────────────────────────────────────────────────────────────

    openModal(product: any): void {
        this.selectedProduct = product;
        const tailles = this.getTailles(product);

        // Pré-sélectionner la taille filtrée si elle existe, sinon la première en stock
        if (this.selectedCategory !== 'Tous' && tailles.includes(this.selectedCategory)) {
            this.selectedSize = this.selectedCategory;
        } else {
            this.selectedSize = tailles.find(t => this.getVarianteStock(product, t) > 0) ?? tailles[0] ?? '';
        }

        this.currentPrix = this.getPrixVariante(product, this.selectedSize);
        this.currentStock = this.getVarianteStock(product, this.selectedSize);
        this.qty = 1;
        document.body.style.overflow = 'hidden';
    }

    onSizeSelect(taille: string): void {
    this.selectedSize = taille;
    this.currentPrix = this.getPrixVariante(this.selectedProduct, taille);
    this.currentStock = this.getVarianteStock(this.selectedProduct, taille);
    this.qty = 1;
    console.log('Taille:', taille, '| Prix:', this.currentPrix, '| Stock:', this.currentStock);
}

    closeModal(): void {
        this.selectedProduct = null;
        document.body.style.overflow = '';
    }

    decQty(): void {
        if (this.qty > 1) this.qty--;
    }

    incQty(): void {
        if (this.qty < this.currentStock) this.qty++;
    }
    
    commander(): void {
        console.log('Commande :', {
            id_boutique : this.route.snapshot.paramMap.get('id'),
            produit: this.selectedProduct.nom_produit,
            taille: this.selectedSize,
            
            quantite: this.qty,
            prix_unitaire: this.currentPrix,
            total: this.currentPrix * this.qty
        });
        this.closeModal();
        this.showToast = true;
        setTimeout(() => this.showToast = false, 3000);
    }

    // ajoutPanier():void{
    //   console.log('Panier :', {
    //         id_boutique : this.route.snapshot.paramMap.get('id'),
    //         produit: this.selectedProduct.nom_produit,
    //         id_produit:this.selectedProduct._id,
    //         image: this.selectedProduct.images?.[0]?.url ?? null,
    //         taille: this.selectedSize,
    //         quantite: this.qty,
    //         prix_unitaire: this.currentPrix,
    //         total: this.currentPrix * this.qty
    //     });
    // }

    
    ajoutPanier(): void {
  const ajoutPanier = {
    id_boutique: this.route.snapshot.paramMap.get('id') ?? '',
    id_produit:this.selectedProduct._id,
    nom_produit: this.selectedProduct.nom_produit,
    taille: this.selectedSize,
    quantite: this.qty,
    prix_unitaire: this.currentPrix,
    total: this.currentPrix * this.qty
  };

  this.produitService.addPanier(ajoutPanier).subscribe({
    next: (res) => {
      console.log("susscess insert panier");
      
      this.closeModal();
      this.showPanier = true;
      setTimeout(() => this.showPanier = false, 3000);
    },
    error: (err) => {
      console.log(err);
      
      if (err.status === 401 || err.status === 403) {
        this.closeModal();
        this.showLoginModal = true; // ✅ Affiche le modal Angular
      } else {
        console.error(err);
      }
    }
  });
}

closeLoginModal(): void {
  this.showLoginModal = false;
}

allerConnexion(): void {
  this.showLoginModal = false;
  this.router.navigate(['/logIn']);
}


    getImageUrl(url: string, type: 'logo' | 'photo'): string {
        if (!url) return '';
        let corrected = url;
        if (type === 'logo') corrected = url.replace('/uploads/logoboutique/', '/uploads/logo/');
        if (type === 'photo') corrected = url.replace('/uploads/photoBoutique/', '/uploads/boutique/');
        return this.baseUrl + corrected;
    }

    onImageError(event: any): void {
        event.target.src = 'https://placehold.co/400x400?text=No+Image';
    }

    goHome(): void {
        this.router.navigate(['/visiteBoutique']);
    }
}