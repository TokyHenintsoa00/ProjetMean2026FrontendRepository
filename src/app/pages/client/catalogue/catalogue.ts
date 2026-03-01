import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProduitService } from '@/pages/service/produit.service';
import { CartService, CartItem } from '@/pages/service/cart.service';
import { PromotionService } from '@/pages/service/promotion.service';
import { environment } from '@env/environment';

@Component({
    selector: 'app-catalogue',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule, DialogModule, TagModule, InputNumberModule, ToastModule],
    providers: [MessageService],
    template: `
<p-toast></p-toast>

<!-- ===== SEARCH HERO BAR ===== -->
<div class="cat-search-bar">
    <div class="cat-search-inner">
        <i class="pi pi-search cat-search-icon"></i>
        <input class="cat-search-input" type="text"
               placeholder="Rechercher un produit..."
               [(ngModel)]="searchTerm"
               (input)="filterProducts()" />
        @if (searchTerm) {
            <button class="cat-search-clear" (click)="searchTerm=''; filterProducts()">
                <i class="pi pi-times"></i>
            </button>
        }
    </div>
</div>

<!-- ===== MAIN LAYOUT ===== -->
<div class="cat-layout">

    <!-- ── LEFT SIDEBAR ── -->
    <aside class="cat-sidebar">

        <!-- Sort -->
        <div class="cat-sidebar-card">
            <div class="cat-sidebar-title">
                <i class="pi pi-filter"></i> Trier par
            </div>
            <div class="cat-sort-list">
                @for (opt of sortOptions; track opt.value) {
                    <div class="cat-sort-item"
                         [class.cat-sort-active]="getSortValue() === opt.value"
                         (click)="selectSort(opt.value)">
                        <span class="cat-sort-dot"></span>
                        {{ opt.label }}
                    </div>
                }
            </div>
        </div>

        <!-- Results -->
        <div class="cat-sidebar-card" style="margin-top:1rem;">
            <div class="cat-sidebar-title">
                <i class="pi pi-info-circle"></i> Résultats
            </div>
            <p class="cat-result-count">
                <strong>{{ filteredProducts.length }}</strong> produit(s)
                @if (searchTerm) { <span class="cat-search-tag">« {{ searchTerm }} »</span> }
            </p>
        </div>
    </aside>

    <!-- ── PRODUCT GRID ── -->
    <div class="cat-main">
        @if (filteredProducts.length === 0) {
            <div class="cat-empty">
                <i class="pi pi-search cat-empty-icon"></i>
                <h3>Aucun produit trouvé</h3>
                <p>Essayez de modifier votre recherche ou supprimer les filtres.</p>
                <button pButton label="Voir tous les produits" icon="pi pi-refresh"
                        [outlined]="true" (click)="resetFilters()"></button>
            </div>
        } @else {
            <div class="cat-grid">
                @for (produit of filteredProducts; track produit._id) {
                    <div class="pcard" (click)="openDetail(produit)">
                        <!-- Image -->
                        <div class="pcard-img">
                            @if (produit.images && produit.images.length > 0) {
                                <img [src]="environment.apiUrl + produit.images[0].url"
                                     [alt]="produit.nom_produit" />
                            } @else {
                                <div class="pcard-no-img">
                                    <i class="pi pi-image"></i>
                                </div>
                            }
                        </div>

                        <!-- Body -->
                        <div class="pcard-body">
                            <!-- Promo badge -->
                            @if (getPromoForProduct(produit); as promo) {
                                <div class="pcard-promo-badge">
                                    @if (promo.type_reduction === 'pourcentage') {
                                        -{{ promo.valeur_reduction }}%
                                    } @else {
                                        -{{ promo.valeur_reduction }} {{ getDevise(produit) }}
                                    }
                                </div>
                            }
                            <h4 class="pcard-name">{{ produit.nom_produit }}</h4>
                            <p class="pcard-boutique">
                                <i class="pi pi-shop"></i>
                                {{ produit.id_boutique?.nom_boutique || 'Boutique' }}
                            </p>

                            @if (getLowestPrice(produit) !== null) {
                                @if (getPromoForProduct(produit); as promo) {
                                    <div class="pcard-price">
                                        <span class="pcard-price-original">{{ getLowestPrice(produit) | number:'1.2-2' }} {{ getDevise(produit) }}</span>
                                        <span class="pcard-price-val">{{ getDiscountedPrice(produit, getLowestPrice(produit)!, promo) | number:'1.2-2' }}</span>
                                        <span class="pcard-price-cur">{{ getDevise(produit) }}</span>
                                    </div>
                                } @else {
                                    <div class="pcard-price">
                                        <span class="pcard-price-val">{{ getLowestPrice(produit) | number:'1.2-2' }}</span>
                                        <span class="pcard-price-cur">{{ getDevise(produit) }}</span>
                                    </div>
                                }
                            } @else {
                                <div class="pcard-no-price">Prix non défini</div>
                            }

                            <button class="pcard-btn" (click)="openDetail(produit); $event.stopPropagation()">
                                <i class="pi pi-shopping-cart"></i>
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                }
            </div>
        }
    </div>
</div>

<!-- ===== PRODUCT DETAIL DIALOG ===== -->
<p-dialog [(visible)]="detailVisible" [modal]="true"
          [style]="{width:'780px', 'max-width':'95vw'}"
          [closable]="true" [draggable]="false">
    <ng-template pTemplate="header">
        <span class="dialog-header-title">{{ selectedProduct?.nom_produit }}</span>
    </ng-template>

    @if (selectedProduct) {
        <div class="detail-layout">
            <!-- Left: Images -->
            <div class="detail-gallery">
                <div class="detail-main-img">
                    @if (selectedProduct.images && selectedProduct.images.length > 0) {
                        <img [src]="environment.apiUrl + selectedProduct.images[selectedImageIndex].url"
                             [alt]="selectedProduct.nom_produit" />
                    } @else {
                        <div class="detail-no-img"><i class="pi pi-image"></i></div>
                    }
                </div>
                @if (selectedProduct.images && selectedProduct.images.length > 1) {
                    <div class="detail-thumbs">
                        @for (img of selectedProduct.images; track img._id; let i = $index) {
                            <img [src]="environment.apiUrl + img.url"
                                 class="detail-thumb"
                                 [class.detail-thumb-active]="i === selectedImageIndex"
                                 (click)="selectedImageIndex = i" />
                        }
                    </div>
                }
            </div>

            <!-- Right: Info -->
            <div class="detail-info">
                <div class="detail-boutique-line">
                    <i class="pi pi-shop"></i>
                    {{ selectedProduct.id_boutique?.nom_boutique }}
                </div>

                @if (selectedProduct.description) {
                    <p class="detail-desc">{{ selectedProduct.description }}</p>
                }

                <!-- Variantes -->
                @if (selectedProduct.variantes && selectedProduct.variantes.length > 0) {
                    <div class="detail-section">
                        <div class="detail-label">Variante</div>
                        <div class="detail-chips">
                            @for (opt of varianteOptions; track opt.value) {
                                <div class="detail-chip"
                                     [class.detail-chip-active]="selectedVarianteId === opt.value"
                                     (click)="selectedVarianteId = opt.value; onVarianteChange()">
                                    {{ opt.label }}
                                </div>
                            }
                        </div>
                    </div>
                }

                <!-- Price & Stock -->
                @if (getPromoForProduct(selectedProduct); as promo) {
                    <div class="detail-promo-strip">
                        <span class="detail-promo-badge">
                            <i class="pi pi-percentage"></i>
                            {{ promo.nom }} —
                            {{ promo.type_reduction === 'pourcentage' ? ('-' + promo.valeur_reduction + '%') : ('-' + promo.valeur_reduction + ' ' + getSelectedDevise()) }}
                        </span>
                        <span class="detail-promo-expiry">expire le {{ promo.date_fin | date:'dd/MM/yyyy' }}</span>
                    </div>
                    <div class="detail-price-row">
                        <div class="detail-price-group">
                            <span class="detail-price-original">{{ getSelectedVariantePrice() | number:'1.2-2' }} {{ getSelectedDevise() }}</span>
                            <span class="detail-price">{{ getDiscountedPrice(selectedProduct, getSelectedVariantePrice(), promo) | number:'1.2-2' }} {{ getSelectedDevise() }}</span>
                        </div>
                        @if (getSelectedVarianteStock() > 0) {
                            <span class="detail-in-stock"><i class="pi pi-check-circle"></i> En stock ({{ getSelectedVarianteStock() }})</span>
                        } @else {
                            <span class="detail-out-stock"><i class="pi pi-times-circle"></i> Rupture de stock</span>
                        }
                    </div>
                } @else {
                    <div class="detail-price-row">
                        <span class="detail-price">{{ getSelectedVariantePrice() | number:'1.2-2' }} {{ getSelectedDevise() }}</span>
                        @if (getSelectedVarianteStock() > 0) {
                            <span class="detail-in-stock"><i class="pi pi-check-circle"></i> En stock ({{ getSelectedVarianteStock() }})</span>
                        } @else {
                            <span class="detail-out-stock"><i class="pi pi-times-circle"></i> Rupture de stock</span>
                        }
                    </div>
                }

                <!-- Quantity -->
                <div class="detail-section">
                    <div class="detail-label">Quantité</div>
                    <p-inputNumber [(ngModel)]="detailQuantity"
                                   [min]="1" [max]="getSelectedVarianteStock()"
                                   [showButtons]="true" buttonLayout="horizontal"
                                   incrementButtonIcon="pi pi-plus"
                                   decrementButtonIcon="pi pi-minus"
                                   styleClass="detail-qty-input"></p-inputNumber>
                </div>

                <!-- CTA -->
                <button class="detail-add-btn"
                        [disabled]="getSelectedVarianteStock() === 0"
                        (click)="addToCartFromDetail()">
                    <i class="pi pi-shopping-cart"></i>
                    Ajouter au panier
                </button>
            </div>
        </div>
    }
</p-dialog>

<style>
/* ── Search bar ── */
.cat-search-bar {
    background: #0f172a;
    padding: 0.75rem 0;
    margin: -1.5rem -1.5rem 1.25rem;
}
.cat-search-inner {
    max-width: 700px; margin: 0 auto;
    position: relative; padding: 0 1.5rem;
    display: flex; align-items: center;
}
.cat-search-icon {
    position: absolute; left: 2.2rem;
    color: #94a3b8; font-size: 1rem; z-index: 1;
}
.cat-search-input {
    width: 100%; padding: 0.7rem 2.5rem 0.7rem 2.8rem;
    border: 2px solid #334155; border-radius: 8px;
    background: #1e293b; color: white;
    font-size: 0.95rem; outline: none; transition: border-color 0.2s;
}
.cat-search-input::placeholder { color: #64748b; }
.cat-search-input:focus { border-color: #f59e0b; }
.cat-search-clear {
    position: absolute; right: 2.2rem;
    background: none; border: none; cursor: pointer;
    color: #64748b; font-size: 0.85rem; padding: 0.25rem;
}
.cat-search-clear:hover { color: white; }

/* ── Layout ── */
.cat-layout { display: flex; gap: 1.25rem; align-items: flex-start; }

/* ── Sidebar ── */
.cat-sidebar { width: 220px; flex-shrink: 0; position: sticky; top: 140px; }
.cat-sidebar-card {
    background: white; border-radius: 12px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    overflow: hidden;
}
.cat-sidebar-title {
    padding: 0.75rem 1rem;
    font-size: 0.82rem; font-weight: 700; letter-spacing: 0.05em;
    text-transform: uppercase; color: #475569;
    background: #f8fafc; border-bottom: 1px solid #e2e8f0;
    display: flex; align-items: center; gap: 0.4rem;
}

.cat-sort-list { padding: 0.5rem 0; }
.cat-sort-item {
    display: flex; align-items: center; gap: 0.6rem;
    padding: 0.55rem 1rem; font-size: 0.875rem;
    color: #475569; cursor: pointer; transition: background 0.15s;
}
.cat-sort-item:hover { background: #f1f5f9; }
.cat-sort-active { color: #0f172a; font-weight: 600; background: #f0f9ff !important; }
.cat-sort-dot {
    width: 8px; height: 8px; border-radius: 50%;
    border: 2px solid #cbd5e1; flex-shrink: 0; transition: all 0.15s;
}
.cat-sort-active .cat-sort-dot { background: #f59e0b; border-color: #f59e0b; }
.cat-result-count { margin: 0; padding: 0.75rem 1rem; font-size: 0.875rem; color: #64748b; }
.cat-search-tag {
    display: inline-block; margin-left: 0.3rem;
    background: #fef3c7; color: #92400e;
    padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.78rem;
}


/* ── Main / Grid ── */
.cat-main { flex: 1; min-width: 0; }
.cat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 1rem;
}

/* ── Product Card ── */
.pcard {
    background: white; border-radius: 10px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    cursor: pointer; overflow: hidden;
    transition: box-shadow 0.2s, transform 0.2s;
    display: flex; flex-direction: column;
}
.pcard:hover {
    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
    transform: translateY(-2px);
}
.pcard-img {
    height: 200px; overflow: hidden;
    background: #f8fafc; border-bottom: 1px solid #f1f5f9;
}
.pcard-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.pcard:hover .pcard-img img { transform: scale(1.04); }
.pcard-no-img {
    height: 100%; display: flex; align-items: center;
    justify-content: center; font-size: 3rem; color: #cbd5e1;
}
.pcard-body { padding: 0.9rem; display: flex; flex-direction: column; flex: 1; }
.pcard-name {
    margin: 0 0 0.3rem; font-size: 0.92rem; font-weight: 600;
    color: #1e293b; line-height: 1.4;
    display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden;
}
.pcard-boutique {
    font-size: 0.78rem; color: #0369a1; margin: 0 0 0.5rem;
    display: flex; align-items: center; gap: 0.3rem;
}
.pcard-price {
    display: flex; align-items: baseline; gap: 0.25rem; margin-bottom: 0.75rem;
}
.pcard-price-val { font-size: 1.3rem; font-weight: 800; color: #b45309; }
.pcard-price-cur { font-size: 0.85rem; font-weight: 600; color: #b45309; }
.pcard-promo-badge {
    display: inline-block; margin-bottom: 0.4rem;
    background: #ef4444; color: white;
    font-size: 0.7rem; font-weight: 700;
    padding: 0.15rem 0.5rem; border-radius: 4px;
}
.pcard-price-original {
    font-size: 0.82rem; color: #94a3b8;
    text-decoration: line-through; margin-right: 0.15rem;
}
.pcard-no-price { font-size: 0.8rem; color: #94a3b8; margin-bottom: 0.75rem; }
.pcard-btn {
    margin-top: auto;
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    background: #f59e0b; color: #1a1a1a; border: none;
    border-radius: 8px; padding: 0.55rem 0.75rem;
    font-size: 0.82rem; font-weight: 700; cursor: pointer;
    transition: background 0.15s;
}
.pcard-btn:hover { background: #d97706; }

/* ── Empty state ── */
.cat-empty {
    text-align: center; padding: 4rem 2rem;
    background: white; border-radius: 12px;
    border: 1px solid #e2e8f0; color: #64748b;
}
.cat-empty-icon { font-size: 3rem; display: block; margin-bottom: 1rem; color: #cbd5e1; }
.cat-empty h3 { margin: 0 0 0.5rem; color: #1e293b; }

/* ── Detail dialog ── */
.dialog-header-title { font-size: 1.05rem; font-weight: 700; color: #1e293b; }
.detail-layout { display: flex; gap: 1.5rem; }
.detail-gallery { width: 300px; flex-shrink: 0; }
.detail-main-img {
    height: 260px; border-radius: 10px; overflow: hidden;
    background: #f8fafc; border: 1px solid #e2e8f0; margin-bottom: 0.6rem;
}
.detail-main-img img { width: 100%; height: 100%; object-fit: cover; }
.detail-no-img {
    height: 100%; display: flex; align-items: center;
    justify-content: center; font-size: 3rem; color: #cbd5e1;
}
.detail-thumbs { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.detail-thumb {
    width: 56px; height: 56px; border-radius: 6px;
    object-fit: cover; border: 2px solid #e2e8f0;
    cursor: pointer; transition: border-color 0.15s;
}
.detail-thumb-active { border-color: #f59e0b; }
.detail-info { flex: 1; min-width: 0; }
.detail-boutique-line {
    display: flex; align-items: center; gap: 0.35rem;
    color: #0369a1; font-size: 0.85rem; font-weight: 500; margin-bottom: 0.5rem;
}
.detail-desc { font-size: 0.875rem; color: #475569; margin: 0 0 0.75rem; line-height: 1.6; }
.detail-section { margin-bottom: 1rem; }
.detail-label { font-size: 0.78rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.05em; color: #64748b; margin-bottom: 0.5rem; }
.detail-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.detail-chip {
    padding: 0.35rem 0.85rem; border-radius: 6px;
    border: 2px solid #e2e8f0; background: white;
    font-size: 0.82rem; font-weight: 500;
    cursor: pointer; color: #475569; transition: all 0.15s;
}
.detail-chip:hover { border-color: #f59e0b; color: #1e293b; }
.detail-chip-active { border-color: #f59e0b; background: #fffbeb; color: #92400e; font-weight: 700; }
.detail-promo-strip {
    display: flex; align-items: center; justify-content: space-between;
    background: #fffbeb; border: 1px solid #fcd34d;
    border-radius: 8px; padding: 0.45rem 0.85rem;
    margin-bottom: 0.6rem; flex-wrap: wrap; gap: 0.4rem;
}
.detail-promo-badge {
    display: flex; align-items: center; gap: 0.35rem;
    font-size: 0.82rem; font-weight: 700; color: #b45309;
}
.detail-promo-expiry { font-size: 0.75rem; color: #ef4444; }
.detail-price-group { display: flex; flex-direction: column; gap: 0.1rem; }
.detail-price-original { font-size: 0.9rem; color: #94a3b8; text-decoration: line-through; }
.detail-price-row {
    display: flex; align-items: center; gap: 1rem;
    margin-bottom: 1rem;
}
.detail-price { font-size: 1.8rem; font-weight: 800; color: #b45309; }
.detail-in-stock {
    display: flex; align-items: center; gap: 0.3rem;
    font-size: 0.82rem; color: #16a34a; font-weight: 600;
}
.detail-out-stock {
    display: flex; align-items: center; gap: 0.3rem;
    font-size: 0.82rem; color: #dc2626; font-weight: 600;
}
.detail-add-btn {
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    width: 100%; padding: 0.85rem; margin-top: 0.5rem;
    background: #f59e0b; color: #1a1a1a; border: none;
    border-radius: 8px; font-size: 1rem; font-weight: 700;
    cursor: pointer; transition: background 0.15s;
}
.detail-add-btn:hover:not(:disabled) { background: #d97706; }
.detail-add-btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* Responsive */
@media (max-width: 900px) {
    .cat-sidebar { display: none; }
    .cat-search-bar { margin: -1rem -1rem 1rem; }
}
@media (max-width: 600px) {
    .detail-layout { flex-direction: column; }
    .detail-gallery { width: 100%; }
}
</style>
    `
})
export class Catalogue implements OnInit {
    protected environment = environment;
    products: any[] = [];
    filteredProducts: any[] = [];
    searchTerm = '';
    selectedSort: any = null;
    sortOptions = [
        { label: 'Plus récent', value: 'recent' },
        { label: 'Nom A → Z', value: 'nom_asc' },
        { label: 'Nom Z → A', value: 'nom_desc' },
        { label: 'Prix croissant', value: 'prix_asc' },
        { label: 'Prix décroissant', value: 'prix_desc' }
    ];

    activePromotions: any[] = [];

    detailVisible = false;
    selectedProduct: any = null;
    selectedImageIndex = 0;
    selectedVarianteId: string = '';
    varianteOptions: any[] = [];
    detailQuantity = 1;

    constructor(
        private produitService: ProduitService,
        private cartService: CartService,
        private messageService: MessageService,
        private promotionService: PromotionService
    ) {}

    ngOnInit() {
        this.loadProducts();
        this.promotionService.getActivePromotions().subscribe({
            next: (data) => { this.activePromotions = data; },
            error: () => {}
        });
    }

    loadProducts() {
        this.produitService.getPublicProducts().subscribe({
            next: (data) => {
                this.products = data;
                this.filterProducts();
            },
            error: (err) => console.error(err)
        });
    }

    resetFilters() {
        this.searchTerm = '';
        this.selectedSort = null;
        this.filterProducts();
    }

    getSortValue(): string {
        if (!this.selectedSort) return '';
        return typeof this.selectedSort === 'object' ? this.selectedSort.value : this.selectedSort;
    }

    selectSort(value: string) {
        this.selectedSort = this.selectedSort && this.getSortValue() === value ? null : value;
        this.filterProducts();
    }

    filterProducts() {
        let result = [...this.products];

        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            result = result.filter(p => p.nom_produit.toLowerCase().includes(term));
        }

        const sort = this.getSortValue();
        if (sort === 'nom_asc') result.sort((a, b) => a.nom_produit.localeCompare(b.nom_produit));
        if (sort === 'nom_desc') result.sort((a, b) => b.nom_produit.localeCompare(a.nom_produit));
        if (sort === 'prix_asc') result.sort((a, b) => (this.getLowestPrice(a) || 0) - (this.getLowestPrice(b) || 0));
        if (sort === 'prix_desc') result.sort((a, b) => (this.getLowestPrice(b) || 0) - (this.getLowestPrice(a) || 0));

        this.filteredProducts = result;
    }

    getDevise(produit: any): string {
        for (const v of produit?.variantes || []) {
            if (v.historique_prix && v.historique_prix.length > 0) {
                return v.historique_prix[v.historique_prix.length - 1].devise || 'DT';
            }
        }
        return 'DT';
    }

    getSelectedDevise(): string {
        const v = this.getSelectedVariante();
        if (!v || !v.historique_prix || v.historique_prix.length === 0) return 'DT';
        return v.historique_prix[v.historique_prix.length - 1].devise || 'DT';
    }

    getPromoForProduct(produit: any): any | null {
        return this.activePromotions.find(promo =>
            promo.produits && promo.produits.some((p: any) => (p._id || p) === produit._id)
        ) || null;
    }

    getDiscountedPrice(produit: any, basePrix: number, promo: any): number {
        if (!promo) return basePrix;
        if (promo.type_reduction === 'pourcentage') {
            return Math.max(0, basePrix * (1 - promo.valeur_reduction / 100));
        }
        return Math.max(0, basePrix - promo.valeur_reduction);
    }

    getLowestPrice(produit: any): number | null {
        if (!produit.variantes || produit.variantes.length === 0) return null;
        let lowest: number | null = null;
        for (const v of produit.variantes) {
            if (v.historique_prix && v.historique_prix.length > 0) {
                const last = v.historique_prix[v.historique_prix.length - 1];
                const prix = last.prix_ttc || last.prix_hors_taxe;
                if (lowest === null || prix < lowest) lowest = prix;
            }
        }
        return lowest;
    }

    openDetail(produit: any) {
        this.selectedProduct = produit;
        this.selectedImageIndex = 0;
        this.detailQuantity = 1;
        this.varianteOptions = (produit.variantes || []).map((v: any) => ({
            label: v.combinaison && v.combinaison.length > 0
                ? v.combinaison.map((c: any) => `${c.attribut}: ${c.valeur}`).join(', ')
                : 'Standard',
            value: v._id
        }));
        this.selectedVarianteId = this.varianteOptions.length > 0 ? this.varianteOptions[0].value : '';
        this.detailVisible = true;
    }

    onVarianteChange() { this.detailQuantity = 1; }

    getSelectedVariante(): any {
        if (!this.selectedProduct) return null;
        return this.selectedProduct.variantes?.find((v: any) => v._id === this.selectedVarianteId) || null;
    }

    getSelectedVariantePrice(): number {
        const v = this.getSelectedVariante();
        if (!v || !v.historique_prix || v.historique_prix.length === 0) return 0;
        const last = v.historique_prix[v.historique_prix.length - 1];
        return last.prix_ttc || last.prix_hors_taxe;
    }

    getSelectedVarianteStock(): number {
        const v = this.getSelectedVariante();
        return v ? v.stock : 0;
    }

    addToCartFromDetail() {
        const p = this.selectedProduct;
        const v = this.getSelectedVariante();
        if (!p || !v) return;
        const prix = this.getSelectedVariantePrice();
        this.cartService.addToCart({
            produit_id: p._id,
            variante_id: v._id,
            boutique_id: p.id_boutique?._id || p.id_boutique,
            boutique_nom: p.id_boutique?.nom_boutique || 'Boutique',
            nom_produit: p.nom_produit,
            combinaison_label: v.combinaison?.length > 0
                ? v.combinaison.map((c: any) => `${c.attribut}: ${c.valeur}`).join(', ')
                : 'Standard',
            prix_unitaire: prix,
            devise: this.getSelectedDevise(),
            quantite: this.detailQuantity,
            image_url: p.images?.[0]?.url || '',
            stock_disponible: v.stock
        });
        this.messageService.add({ severity: 'success', summary: 'Ajouté', detail: `${p.nom_produit} ajouté au panier` });
        this.detailVisible = false;
    }
}
