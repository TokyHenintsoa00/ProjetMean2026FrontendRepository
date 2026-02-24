import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { PromotionService } from '@/pages/service/promotion.service';
import { CartService } from '@/pages/service/cart.service';

@Component({
    selector: 'app-promotions-client',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, ButtonModule, ToastModule, TagModule, InputNumberModule],
    providers: [MessageService],
    template: `
<p-toast></p-toast>

<!-- ===== HERO BANNER ===== -->
<div class="promo-hero">
    <div class="promo-hero-inner">
        <div class="promo-hero-left">
            <div class="promo-hero-tag">Offres limitées</div>
            <h1 class="promo-hero-title">Ventes Flash &amp; Promotions</h1>
            <p class="promo-hero-sub">Profitez des meilleures réductions de nos boutiques partenaires</p>
        </div>
        <div class="promo-hero-icon">
            <i class="pi pi-percentage"></i>
        </div>
    </div>
</div>

<!-- ===== LOADING ===== -->
@if (loading) {
    <div class="promo-loading">
        <i class="pi pi-spin pi-spinner"></i>
        <span>Chargement des promotions...</span>
    </div>
}

<!-- ===== EMPTY ===== -->
@if (!loading && promotions.length === 0) {
    <div class="promo-empty">
        <div class="promo-empty-icon"><i class="pi pi-tag"></i></div>
        <h2>Aucune promotion en cours</h2>
        <p>Revenez bientôt pour découvrir nos offres exclusives.</p>
        <a routerLink="/client/catalogue" class="promo-cta-btn">
            <i class="pi pi-th-large"></i> Voir le catalogue
        </a>
    </div>
}

<!-- ===== PROMOTIONS LIST ===== -->
@if (!loading && promotions.length > 0) {
    <div class="promo-list">
        @for (promo of promotions; track promo._id) {
            <section class="promo-section">

                <!-- Section header -->
                <div class="promo-sec-hdr">
                    <div class="promo-sec-hdr-left">
                        <div class="promo-discount-pill" [class.promo-pill-pct]="promo.type_reduction === 'pourcentage'" [class.promo-pill-fix]="promo.type_reduction === 'montant_fixe'">
                            @if (promo.type_reduction === 'pourcentage') {
                                -{{ promo.valeur_reduction }}%
                            } @else {
                                -{{ promo.valeur_reduction }} DT
                            }
                        </div>
                        <div>
                            <h2 class="promo-sec-title">{{ promo.nom }}</h2>
                            @if (promo.description) {
                                <p class="promo-sec-desc">{{ promo.description }}</p>
                            }
                        </div>
                    </div>
                    <div class="promo-sec-hdr-right">
                        <div class="promo-countdown">
                            <i class="pi pi-clock"></i>
                            <span>Expire le {{ promo.date_fin | date:'dd MMM yyyy' }}</span>
                        </div>
                    </div>
                </div>

                <!-- Products grid -->
                @if (promo.produits && promo.produits.length > 0) {
                    <div class="promo-products-grid">
                        @for (produit of promo.produits; track produit._id) {
                            <div class="pcard">
                                <!-- Promo ribbon -->
                                <div class="pcard-ribbon">
                                    @if (promo.type_reduction === 'pourcentage') {
                                        -{{ promo.valeur_reduction }}%
                                    } @else {
                                        -{{ promo.valeur_reduction }} DT
                                    }
                                </div>

                                <!-- Image -->
                                <div class="pcard-img">
                                    @if (produit.images && produit.images.length > 0) {
                                        <img [src]="'http://localhost:5000' + produit.images[0].url"
                                             [alt]="produit.nom_produit" />
                                    } @else {
                                        <div class="pcard-no-img">
                                            <i class="pi pi-image"></i>
                                        </div>
                                    }
                                </div>

                                <!-- Body -->
                                <div class="pcard-body">
                                    <h4 class="pcard-name">{{ produit.nom_produit }}</h4>

                                    @if (getLowestPrice(produit) !== null) {
                                        <div class="pcard-price-row">
                                            <span class="pcard-original">{{ getLowestPrice(produit) | number:'1.2-2' }} {{ getDevise(produit) }}</span>
                                            <span class="pcard-discounted">{{ applyDiscount(getLowestPrice(produit)!, promo) | number:'1.2-2' }} {{ getDevise(produit) }}</span>
                                        </div>
                                        <div class="pcard-savings">
                                            Économie : {{ getLowestPrice(produit)! - applyDiscount(getLowestPrice(produit)!, promo) | number:'1.2-2' }} {{ getDevise(produit) }}
                                        </div>
                                    } @else {
                                        <div class="pcard-no-price">Prix non défini</div>
                                    }

                                    <button class="pcard-btn" (click)="addToCart(produit, promo)"
                                            [disabled]="getLowestStock(produit) === 0">
                                        @if (getLowestStock(produit) === 0) {
                                            <i class="pi pi-times-circle"></i> Rupture de stock
                                        } @else {
                                            <i class="pi pi-shopping-cart"></i> Ajouter au panier
                                        }
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                } @else {
                    <div class="promo-no-products">
                        <i class="pi pi-info-circle"></i>
                        Cette promotion est valable sur l'ensemble des produits de la boutique.
                        <a routerLink="/client/catalogue" class="promo-link">Voir le catalogue</a>
                    </div>
                }
            </section>
        }
    </div>
}

<style>
/* ── Hero ── */
.promo-hero {
    background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
    border-radius: 16px; margin-bottom: 1.75rem;
    overflow: hidden;
}
.promo-hero-inner {
    display: flex; align-items: center; justify-content: space-between;
    padding: 2rem 2.5rem; gap: 1rem;
}
.promo-hero-tag {
    display: inline-block; background: #f59e0b; color: #0f172a;
    font-size: 0.72rem; font-weight: 800; text-transform: uppercase;
    letter-spacing: 0.08em; padding: 0.2rem 0.75rem;
    border-radius: 20px; margin-bottom: 0.6rem;
}
.promo-hero-title {
    margin: 0 0 0.4rem; font-size: 1.8rem; font-weight: 900;
    color: white; line-height: 1.2;
}
.promo-hero-sub { margin: 0; font-size: 0.9rem; color: rgba(255,255,255,0.65); }
.promo-hero-icon {
    font-size: 4rem; color: rgba(245,158,11,0.25); flex-shrink: 0;
    display: flex; align-items: center;
}

/* ── Loading / Empty ── */
.promo-loading {
    display: flex; align-items: center; justify-content: center;
    gap: 0.75rem; padding: 4rem; color: #64748b;
}
.promo-loading .pi { font-size: 1.5rem; color: #f59e0b; }
.promo-empty {
    text-align: center; padding: 3rem 2rem;
    background: white; border-radius: 16px;
    border: 1px solid #e2e8f0;
}
.promo-empty-icon {
    width: 72px; height: 72px; border-radius: 50%;
    background: #fef3c7; margin: 0 auto 1.25rem;
    display: flex; align-items: center; justify-content: center;
    font-size: 2rem; color: #f59e0b;
}
.promo-empty h2 { margin: 0 0 0.4rem; color: #0f172a; }
.promo-empty p { margin: 0 0 1.25rem; color: #64748b; font-size: 0.875rem; }
.promo-cta-btn {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: #f59e0b; color: #1a1a1a; text-decoration: none;
    padding: 0.65rem 1.5rem; border-radius: 8px;
    font-weight: 700; font-size: 0.875rem;
    transition: background 0.15s;
}
.promo-cta-btn:hover { background: #d97706; }

/* ── Promotions list ── */
.promo-list { display: flex; flex-direction: column; gap: 2rem; }

/* ── Section ── */
.promo-section {
    background: white; border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
    overflow: hidden;
}
.promo-sec-hdr {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 1.5rem; border-bottom: 1px solid #f1f5f9;
    background: #fafbfc; flex-wrap: wrap; gap: 0.75rem;
}
.promo-sec-hdr-left { display: flex; align-items: center; gap: 1rem; }
.promo-discount-pill {
    min-width: 60px; height: 60px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.85rem; font-weight: 900; text-align: center;
    line-height: 1.2; flex-shrink: 0;
}
.promo-pill-pct { background: #fef3c7; color: #b45309; }
.promo-pill-fix { background: #dcfce7; color: #15803d; }
.promo-sec-title { margin: 0 0 0.15rem; font-size: 1.1rem; font-weight: 800; color: #0f172a; }
.promo-sec-desc { margin: 0; font-size: 0.82rem; color: #64748b; }
.promo-countdown {
    display: flex; align-items: center; gap: 0.4rem;
    font-size: 0.82rem; color: #ef4444; font-weight: 600;
    background: #fef2f2; padding: 0.35rem 0.85rem;
    border-radius: 20px; border: 1px solid #fecaca;
}

/* ── Products grid ── */
.promo-products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem; padding: 1.25rem 1.5rem;
}

/* ── Product card ── */
.pcard {
    border-radius: 10px; border: 1px solid #e2e8f0;
    overflow: hidden; position: relative;
    display: flex; flex-direction: column;
    transition: box-shadow 0.2s, transform 0.2s;
    background: #fafbfc;
}
.pcard:hover {
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
    transform: translateY(-2px);
}
.pcard-ribbon {
    position: absolute; top: 10px; left: -1px;
    background: #ef4444; color: white;
    font-size: 0.7rem; font-weight: 800;
    padding: 0.2rem 0.65rem 0.2rem 0.5rem;
    border-radius: 0 20px 20px 0;
    z-index: 1; box-shadow: 0 2px 4px rgba(239,68,68,0.3);
}
.pcard-img {
    height: 190px; overflow: hidden;
    background: white; border-bottom: 1px solid #f1f5f9;
}
.pcard-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.pcard:hover .pcard-img img { transform: scale(1.04); }
.pcard-no-img {
    height: 100%; display: flex; align-items: center;
    justify-content: center; font-size: 2.5rem; color: #cbd5e1;
}
.pcard-body { padding: 0.85rem; display: flex; flex-direction: column; flex: 1; }
.pcard-name {
    margin: 0 0 0.5rem; font-size: 0.87rem; font-weight: 600;
    color: #1e293b; line-height: 1.4;
    display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden;
}
.pcard-price-row { display: flex; flex-direction: column; gap: 0.1rem; margin-bottom: 0.25rem; }
.pcard-original { font-size: 0.8rem; color: #94a3b8; text-decoration: line-through; }
.pcard-discounted { font-size: 1.3rem; font-weight: 900; color: #b45309; }
.pcard-savings {
    font-size: 0.72rem; color: #16a34a; font-weight: 600;
    background: #f0fdf4; padding: 0.15rem 0.5rem;
    border-radius: 4px; margin-bottom: 0.75rem;
    display: inline-block;
}
.pcard-no-price { font-size: 0.78rem; color: #94a3b8; margin-bottom: 0.75rem; }
.pcard-btn {
    margin-top: auto;
    display: flex; align-items: center; justify-content: center; gap: 0.45rem;
    background: #f59e0b; color: #1a1a1a; border: none;
    border-radius: 8px; padding: 0.55rem 0.75rem;
    font-size: 0.8rem; font-weight: 700; cursor: pointer;
    transition: background 0.15s;
}
.pcard-btn:hover:not(:disabled) { background: #d97706; }
.pcard-btn:disabled { background: #e2e8f0; color: #94a3b8; cursor: not-allowed; }

/* ── No products ── */
.promo-no-products {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 1.25rem 1.5rem; font-size: 0.85rem; color: #64748b;
    background: #f8fafc; border-top: 1px solid #f1f5f9;
}
.promo-link {
    color: #0369a1; font-weight: 600; text-decoration: none;
    margin-left: 0.25rem;
}
.promo-link:hover { text-decoration: underline; }

@media (max-width: 768px) {
    .promo-hero-inner { padding: 1.5rem; }
    .promo-hero-title { font-size: 1.3rem; }
    .promo-hero-icon { display: none; }
    .promo-products-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 0.75rem; padding: 1rem; }
    .promo-sec-hdr { padding: 1rem; }
}
</style>
    `
})
export class PromotionsClient implements OnInit {
    promotions: any[] = [];
    loading = true;

    constructor(
        private promotionService: PromotionService,
        private cartService: CartService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.promotionService.getActivePromotions().subscribe({
            next: (data) => {
                // Only keep promotions that have products
                this.promotions = data;
                this.loading = false;
            },
            error: () => { this.loading = false; }
        });
    }

    getDevise(produit: any): string {
        for (const v of produit?.variantes || []) {
            if (v.historique_prix && v.historique_prix.length > 0) {
                return v.historique_prix[v.historique_prix.length - 1].devise || 'DT';
            }
        }
        return 'DT';
    }

    applyDiscount(basePrix: number, promo: any): number {
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

    getLowestStock(produit: any): number {
        if (!produit.variantes || produit.variantes.length === 0) return 0;
        return produit.variantes.reduce((max: number, v: any) => Math.max(max, v.stock || 0), 0);
    }

    addToCart(produit: any, promo: any) {
        const variante = produit.variantes?.find((v: any) => v.stock > 0) || produit.variantes?.[0];
        if (!variante) return;

        const basePrix = this.getVariantePrice(variante);
        if (!basePrix) {
            this.messageService.add({ severity: 'warn', summary: 'Prix non défini', detail: 'Ce produit n\'a pas de prix', life: 3000 });
            return;
        }

        const prixPromo = this.applyDiscount(basePrix, promo);

        this.cartService.addToCart({
            produit_id: produit._id,
            variante_id: variante._id,
            boutique_id: produit.id_boutique?._id || produit.id_boutique,
            boutique_nom: produit.id_boutique?.nom_boutique || 'Boutique',
            nom_produit: produit.nom_produit,
            combinaison_label: variante.combinaison?.length > 0
                ? variante.combinaison.map((c: any) => `${c.attribut}: ${c.valeur}`).join(', ')
                : 'Standard',
            prix_unitaire: prixPromo,
            devise: this.getDevise(produit),
            quantite: 1,
            image_url: produit.images?.[0]?.url || '',
            stock_disponible: variante.stock
        });

        this.messageService.add({
            severity: 'success',
            summary: 'Ajouté au panier',
            detail: `${produit.nom_produit} — ${prixPromo.toFixed(2)} ${this.getDevise(produit)} (promo)`,
            life: 3000
        });
    }

    private getVariantePrice(v: any): number | null {
        if (!v.historique_prix || v.historique_prix.length === 0) return null;
        const last = v.historique_prix[v.historique_prix.length - 1];
        return last.prix_ttc || last.prix_hors_taxe;
    }
}
