import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { BoutiqueService } from '@/pages/service/boutique.service';
import { CategorieService } from '@/pages/service/categorie.service';
import { environment } from '@env/environment';

@Component({
    selector: 'app-public-home',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TagModule],
    template: `

<!-- ===== NAVBAR ===== -->
<nav class="ph-nav">
    <div class="ph-nav-inner">
        <div class="ph-nav-brand">
            <i class="pi pi-shopping-bag"></i>
            <span>m1p13mean-Toky-Zo</span>
        </div>
        <div class="ph-nav-links">
            <a (click)="scrollTo('boutiques-section')">Boutiques</a>
            <a (click)="scrollTo('features-section')">Pourquoi nous ?</a>
        </div>
        <div class="ph-nav-auth">
            <button pButton label="Se connecter" (click)="goToLogin()"
                    class="ph-btn-outline p-button-sm"></button>
            <button pButton label="S'inscrire" (click)="goToSignup()"
                    class="ph-btn-primary p-button-sm"></button>
        </div>
    </div>
</nav>

<!-- ===== HERO ===== -->
<section class="ph-hero">
    <div class="ph-hero-content">
        <div class="ph-hero-badge">
            <i class="pi pi-star-fill"></i>
            <span>{{ boutiques.length }} boutiques disponibles</span>
        </div>
        <h1 class="ph-hero-title">
            Découvrez les meilleures<br>
            <span class="ph-hero-accent">boutiques</span> de votre région
        </h1>
        <p class="ph-hero-sub">
            Parcourez m1p13mean-Toky-Zo en ligne, trouvez vos boutiques favorites<br>
            et faites vos achats en toute simplicité.
        </p>
        <div class="ph-hero-search">
            <i class="pi pi-search ph-search-ico"></i>
            <input class="ph-search-input" type="text"
                   placeholder="Rechercher une boutique..."
                   [(ngModel)]="searchTerm"
                   (input)="applyFilters()"
                   (keydown.enter)="scrollTo('boutiques-section')" />
        </div>
        <div class="ph-hero-cta">
            <button pButton label="Voir le catalogue" icon="pi pi-th-large"
                    class="ph-cta-primary" (click)="goToLogin()"></button>
            <button pButton label="Ouvrir une boutique" icon="pi pi-plus"
                    class="ph-cta-ghost" (click)="goToDemande()"></button>
        </div>
        <!-- Stats -->
        <div class="ph-hero-stats">
            <div class="ph-stat">
                <span class="ph-stat-num">{{ boutiques.length }}</span>
                <span class="ph-stat-label">Boutiques</span>
            </div>
            <div class="ph-stat-sep"></div>
            <div class="ph-stat">
                <span class="ph-stat-num">{{ categories.length }}</span>
                <span class="ph-stat-label">Catégories</span>
            </div>
            <div class="ph-stat-sep"></div>
            <div class="ph-stat">
                <span class="ph-stat-num">100%</span>
                <span class="ph-stat-label">Sécurisé</span>
            </div>
        </div>
    </div>
</section>

<!-- ===== BOUTIQUES SECTION ===== -->
<section id="boutiques-section" class="ph-boutiques-section">
    <div class="ph-section-inner">

        <!-- Header -->
        <div class="ph-section-hdr">
            <div>
                <h2 class="ph-section-title">Nos Boutiques</h2>
                <p class="ph-section-sub">{{ filteredBoutiques.length }} boutique(s) disponible(s)</p>
            </div>
            <button pButton label="Se connecter pour acheter" icon="pi pi-lock"
                    class="ph-btn-amber p-button-sm" (click)="goToLogin()"></button>
        </div>

        <!-- Category chips -->
        @if (categories.length > 0) {
            <div class="ph-cat-chips">
                <div class="ph-cat-chip" [class.ph-cat-active]="selectedCatId === null"
                     (click)="setCategorie(null)">
                    <i class="pi pi-th-large"></i> Toutes
                </div>
                @for (cat of categories; track cat._id) {
                    <div class="ph-cat-chip" [class.ph-cat-active]="selectedCatId === cat._id"
                         (click)="setCategorie(cat._id)">
                        {{ cat.nom }}
                    </div>
                }
            </div>
        }

        <!-- Grid -->
        @if (loading) {
            <div class="ph-loading">
                <i class="pi pi-spin pi-spinner"></i>
                <p>Chargement des boutiques...</p>
            </div>
        }

        @if (!loading && filteredBoutiques.length === 0) {
            <div class="ph-empty">
                <i class="pi pi-shop"></i>
                <p>Aucune boutique trouvée</p>
            </div>
        }

        <div class="ph-boutiques-grid">
            @for (b of filteredBoutiques; track b._id) {
                <div class="ph-boutique-card" (click)="visitBoutique(b._id)">

                    <!-- Cover band -->
                    <div class="ph-card-cover">
                        @if (getBoutiqueLogoUrl(b)) {
                            <img [src]="getBoutiqueLogoUrl(b)!" [alt]="b.nom_boutique" class="ph-card-logo-img" />
                        } @else {
                            <div class="ph-card-logo-placeholder">
                                <i class="pi pi-shop"></i>
                            </div>
                        }
                    </div>

                    <!-- Body -->
                    <div class="ph-card-body">
                        <h4 class="ph-card-name">{{ b.nom_boutique }}</h4>
                        @if (b.description_boutique) {
                            <p class="ph-card-desc">
                                {{ b.description_boutique | slice:0:90 }}{{ (b.description_boutique?.length||0) > 90 ? '...' : '' }}
                            </p>
                        }

                        <!-- Categories -->
                        @if (b.id_categorie?.length > 0) {
                            <div class="ph-card-cats">
                                @for (cat of b.id_categorie | slice:0:2; track $index) {
                                    <span class="ph-card-cat-tag">{{ $any(cat).nom || cat }}</span>
                                }
                                @if ((b.id_categorie?.length || 0) > 2) {
                                    <span class="ph-card-cat-more">+{{ b.id_categorie.length - 2 }}</span>
                                }
                            </div>
                        }
                    </div>

                    <!-- Footer -->
                    <div class="ph-card-footer">
                        <button pButton label="Visiter" icon="pi pi-external-link"
                                class="ph-card-visit-btn p-button-sm p-button-outlined"
                                (click)="visitBoutique(b._id); $event.stopPropagation()"></button>
                        <button pButton label="Catalogue" icon="pi pi-shopping-cart"
                                class="ph-card-buy-btn p-button-sm"
                                (click)="goToLogin(); $event.stopPropagation()"></button>
                    </div>
                </div>
            }
        </div>
    </div>
</section>

<!-- ===== FEATURES SECTION ===== -->
<section id="features-section" class="ph-features-section">
    <div class="ph-section-inner">
        <h2 class="ph-features-title">Pourquoi choisir m1p13mean-Toky-Zo ?</h2>
        <div class="ph-features-grid">
            <div class="ph-feature-card">
                <div class="ph-feature-icon"><i class="pi pi-shield"></i></div>
                <h4>Paiement sécurisé</h4>
                <p>Vos transactions sont protégées et vos données restent confidentielles.</p>
            </div>
            <div class="ph-feature-card">
                <div class="ph-feature-icon"><i class="pi pi-truck"></i></div>
                <h4>Livraison rapide</h4>
                <p>Recevez vos commandes directement chez vous ou retirez en boutique.</p>
            </div>
            <div class="ph-feature-card">
                <div class="ph-feature-icon"><i class="pi pi-percentage"></i></div>
                <h4>Promotions exclusives</h4>
                <p>Profitez d'offres et réductions proposées directement par les boutiques.</p>
            </div>
            <div class="ph-feature-card">
                <div class="ph-feature-icon"><i class="pi pi-star"></i></div>
                <h4>Boutiques de qualité</h4>
                <p>Chaque boutique est validée par notre équipe avant d'intégrer le mall.</p>
            </div>
        </div>
    </div>
</section>

<!-- ===== CTA BAND ===== -->
<section class="ph-cta-band">
    <div class="ph-section-inner ph-cta-inner">
        <div>
            <h2>Prêt à faire vos achats ?</h2>
            <p>Créez un compte gratuitement et accédez à l'ensemble du catalogue.</p>
        </div>
        <div class="ph-cta-band-btns">
            <button pButton label="Créer un compte" icon="pi pi-user-plus"
                    class="ph-cta-primary" (click)="goToSignup()"></button>
            <button pButton label="Se connecter" icon="pi pi-sign-in"
                    class="ph-cta-ghost" (click)="goToLogin()"></button>
        </div>
    </div>
</section>

<!-- ===== FOOTER ===== -->
<footer class="ph-footer">
    <div class="ph-footer-inner">
        <div class="ph-footer-brand">
            <i class="pi pi-shopping-bag"></i>
            <span>m1p13mean-Toky-Zo</span>
        </div>
        <p class="ph-footer-copy">&copy; 2026 m1p13mean-Toky-Zo — Tous droits réservés</p>
        <div class="ph-footer-links">
            <a (click)="goToLogin()">Se connecter</a>
            <a (click)="goToSignup()">S'inscrire</a>
            <a (click)="goToDemande()">Ouvrir une boutique</a>
        </div>
    </div>
</footer>

<style>
/* ── Base ── */
* { box-sizing: border-box; }
:host { display: block; min-height: 100vh; background: #f0f2f5; font-family: inherit; }

/* ── Navbar ── */
.ph-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    background: #0f172a;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    height: 64px;
}
.ph-nav-inner {
    max-width: 1400px; margin: 0 auto;
    padding: 0 1.5rem; height: 100%;
    display: flex; align-items: center; gap: 2rem;
}
.ph-nav-brand {
    display: flex; align-items: center; gap: 0.4rem;
    font-size: 1.2rem; color: white; white-space: nowrap; flex-shrink: 0;
    cursor: pointer;
}
.ph-nav-brand i { color: #f59e0b; font-size: 1.4rem; }
.ph-nav-brand strong { color: #f59e0b; }
.ph-nav-links { display: flex; gap: 1.5rem; flex: 1; }
.ph-nav-links a {
    color: rgba(255,255,255,0.7); font-size: 0.9rem; font-weight: 500;
    cursor: pointer; text-decoration: none; transition: color 0.15s; white-space: nowrap;
}
.ph-nav-links a:hover { color: white; }
.ph-nav-auth { display: flex; gap: 0.5rem; margin-left: auto; }
.ph-btn-outline { border-color: rgba(255,255,255,0.4) !important; color: white !important; background: transparent !important; }
.ph-btn-outline:hover { border-color: white !important; background: rgba(255,255,255,0.08) !important; }
.ph-btn-primary { background: #f59e0b !important; border-color: #f59e0b !important; color: #1a1a1a !important; font-weight: 700 !important; }
.ph-btn-primary:hover { background: #d97706 !important; border-color: #d97706 !important; }

/* ── Hero ── */
.ph-hero {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
    min-height: calc(100vh - 64px);
    display: flex; align-items: center; justify-content: center;
    text-align: center; padding: 5rem 1.5rem 4rem;
    margin-top: 64px;
    position: relative; overflow: hidden;
}
.ph-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245,158,11,0.08) 0%, transparent 70%);
    pointer-events: none;
}
.ph-hero-content { max-width: 740px; width: 100%; position: relative; z-index: 1; }

.ph-hero-badge {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: rgba(245,158,11,0.15); color: #fbbf24;
    border: 1px solid rgba(245,158,11,0.3);
    border-radius: 50px; padding: 0.3rem 1rem;
    font-size: 0.82rem; font-weight: 600;
    margin-bottom: 1.5rem;
}
.ph-hero-badge .pi { font-size: 0.75rem; }

.ph-hero-title {
    font-size: 3rem; font-weight: 800; color: white;
    line-height: 1.2; margin: 0 0 1.2rem;
}
.ph-hero-accent { color: #f59e0b; }

.ph-hero-sub {
    font-size: 1.05rem; color: rgba(255,255,255,0.6);
    line-height: 1.6; margin: 0 0 2rem;
}

.ph-hero-search {
    position: relative; max-width: 480px; margin: 0 auto 2rem;
}
.ph-search-ico {
    position: absolute; left: 1.1rem; top: 50%;
    transform: translateY(-50%);
    color: #94a3b8; font-size: 1rem; pointer-events: none;
}
.ph-search-input {
    width: 100%; height: 52px;
    background: rgba(255,255,255,0.06);
    border: 1.5px solid rgba(255,255,255,0.15);
    border-radius: 50px; color: white;
    font-size: 0.95rem; padding: 0 1.25rem 0 2.9rem;
    outline: none; transition: border-color 0.2s;
}
.ph-search-input::placeholder { color: rgba(255,255,255,0.35); }
.ph-search-input:focus { border-color: #f59e0b; }

.ph-hero-cta { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2.5rem; }
.ph-cta-primary {
    background: #f59e0b !important; border-color: #f59e0b !important;
    color: #1a1a1a !important; font-weight: 800 !important;
    padding: 0.75rem 2rem !important; font-size: 0.95rem !important;
    border-radius: 8px !important;
    box-shadow: 0 4px 16px rgba(245,158,11,0.35) !important;
}
.ph-cta-primary:hover { background: #d97706 !important; border-color: #d97706 !important; }
.ph-cta-ghost {
    background: transparent !important;
    border: 2px solid rgba(255,255,255,0.25) !important;
    color: white !important; font-weight: 600 !important;
    padding: 0.75rem 2rem !important; font-size: 0.95rem !important;
    border-radius: 8px !important;
}
.ph-cta-ghost:hover { border-color: rgba(255,255,255,0.6) !important; background: rgba(255,255,255,0.06) !important; }

.ph-hero-stats {
    display: inline-flex; align-items: center; gap: 1.5rem;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 50px; padding: 0.75rem 2rem;
}
.ph-stat { display: flex; flex-direction: column; align-items: center; }
.ph-stat-num { font-size: 1.6rem; font-weight: 800; color: #f59e0b; line-height: 1; }
.ph-stat-label { font-size: 0.72rem; color: rgba(255,255,255,0.5); margin-top: 0.1rem; }
.ph-stat-sep { width: 1px; height: 36px; background: rgba(255,255,255,0.15); }

/* ── Boutiques Section ── */
.ph-boutiques-section {
    background: #f0f2f5;
    padding: 4rem 1.5rem;
}
.ph-section-inner { max-width: 1400px; margin: 0 auto; }

.ph-section-hdr {
    display: flex; align-items: flex-start; justify-content: space-between;
    flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;
}
.ph-section-title {
    font-size: 1.75rem; font-weight: 800; color: #0f172a;
    margin: 0 0 0.2rem;
}
.ph-section-sub { color: #64748b; margin: 0; font-size: 0.9rem; }
.ph-btn-amber {
    background: #f59e0b !important; border-color: #f59e0b !important;
    color: #1a1a1a !important; font-weight: 700 !important;
}
.ph-btn-amber:hover { background: #d97706 !important; }

/* Category chips */
.ph-cat-chips { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.75rem; }
.ph-cat-chip {
    padding: 0.4rem 1rem; border-radius: 50px;
    border: 1.5px solid #e2e8f0; background: white;
    color: #475569; font-size: 0.83rem; font-weight: 500;
    cursor: pointer; transition: all 0.15s;
    display: flex; align-items: center; gap: 0.3rem;
}
.ph-cat-chip:hover { border-color: #f59e0b; color: #92400e; }
.ph-cat-active {
    border-color: #f59e0b; background: #f59e0b;
    color: #1a1a1a; font-weight: 700;
}

/* Loading / Empty */
.ph-loading, .ph-empty {
    text-align: center; padding: 4rem 2rem;
    color: #94a3b8;
}
.ph-loading i, .ph-empty i { font-size: 3rem; display: block; margin-bottom: 1rem; }
.ph-loading p, .ph-empty p { font-size: 1rem; }

/* Boutiques grid */
.ph-boutiques-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
}
@media (max-width: 1100px) { .ph-boutiques-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px)  { .ph-boutiques-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px)  { .ph-boutiques-grid { grid-template-columns: 1fr; } }

.ph-boutique-card {
    background: white; border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    cursor: pointer; overflow: hidden;
    display: flex; flex-direction: column;
    transition: transform 0.2s, box-shadow 0.2s;
}
.ph-boutique-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.12);
}

.ph-card-cover {
    height: 90px;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
}
.ph-card-logo-img {
    width: 64px; height: 64px;
    border-radius: 12px; object-fit: cover;
    border: 3px solid rgba(245,158,11,0.6);
}
.ph-card-logo-placeholder {
    width: 64px; height: 64px; border-radius: 12px;
    background: rgba(245,158,11,0.15);
    border: 3px solid rgba(245,158,11,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem; color: #f59e0b;
}

.ph-card-body { padding: 1rem 1rem 0.5rem; flex: 1; }
.ph-card-name {
    font-size: 0.98rem; font-weight: 700;
    color: #0f172a; margin: 0 0 0.35rem;
}
.ph-card-desc {
    font-size: 0.8rem; color: #64748b;
    line-height: 1.45; margin: 0 0 0.6rem;
}

.ph-card-cats { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.ph-card-cat-tag {
    background: #fef3c7; color: #92400e;
    font-size: 0.7rem; font-weight: 600;
    padding: 0.15rem 0.55rem; border-radius: 50px;
}
.ph-card-cat-more {
    background: #f1f5f9; color: #64748b;
    font-size: 0.7rem; font-weight: 600;
    padding: 0.15rem 0.55rem; border-radius: 50px;
}

.ph-card-footer {
    display: flex; gap: 0.5rem;
    padding: 0.75rem 1rem 1rem;
}
.ph-card-visit-btn {
    flex: 1;
    border-color: #e2e8f0 !important;
    color: #475569 !important;
    justify-content: center;
}
.ph-card-visit-btn:hover { border-color: #0f172a !important; color: #0f172a !important; }
.ph-card-buy-btn {
    flex: 1;
    background: #0f172a !important; border-color: #0f172a !important;
    color: white !important; font-weight: 700 !important;
    justify-content: center;
}
.ph-card-buy-btn:hover { background: #1e293b !important; }

/* ── Features ── */
.ph-features-section {
    background: #0f172a;
    padding: 4rem 1.5rem;
}
.ph-features-title {
    font-size: 1.75rem; font-weight: 800; color: white;
    text-align: center; margin: 0 0 2.5rem;
}
.ph-features-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;
}
@media (max-width: 900px) { .ph-features-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .ph-features-grid { grid-template-columns: 1fr; } }

.ph-feature-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px; padding: 1.75rem 1.25rem;
    text-align: center;
    transition: background 0.2s;
}
.ph-feature-card:hover { background: rgba(255,255,255,0.07); }
.ph-feature-icon {
    width: 56px; height: 56px; border-radius: 14px;
    background: rgba(245,158,11,0.15);
    border: 1.5px solid rgba(245,158,11,0.3);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1rem; font-size: 1.4rem; color: #f59e0b;
}
.ph-feature-card h4 {
    font-size: 1rem; font-weight: 700; color: white;
    margin: 0 0 0.5rem;
}
.ph-feature-card p {
    font-size: 0.84rem; color: rgba(255,255,255,0.5);
    line-height: 1.5; margin: 0;
}

/* ── CTA Band ── */
.ph-cta-band {
    background: linear-gradient(135deg, #92400e, #b45309, #d97706);
    padding: 3rem 1.5rem;
}
.ph-cta-inner {
    display: flex; align-items: center;
    justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;
}
.ph-cta-band h2 {
    font-size: 1.5rem; font-weight: 800;
    color: white; margin: 0 0 0.3rem;
}
.ph-cta-band p { color: rgba(255,255,255,0.75); margin: 0; font-size: 0.95rem; }
.ph-cta-band-btns { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.ph-cta-band .ph-cta-primary {
    background: white !important; border-color: white !important;
    color: #92400e !important;
    box-shadow: 0 4px 14px rgba(0,0,0,0.2) !important;
}
.ph-cta-band .ph-cta-primary:hover { background: #fef3c7 !important; }
.ph-cta-band .ph-cta-ghost {
    border-color: rgba(255,255,255,0.5) !important;
}

/* ── Footer ── */
.ph-footer { background: #0f172a; padding: 2rem 1.5rem; }
.ph-footer-inner {
    max-width: 1400px; margin: 0 auto;
    display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
    text-align: center;
}
.ph-footer-brand {
    display: flex; align-items: center; gap: 0.4rem;
    font-size: 1.15rem; color: white;
}
.ph-footer-brand i { color: #f59e0b; }
.ph-footer-brand strong { color: #f59e0b; }
.ph-footer-copy { color: rgba(255,255,255,0.35); font-size: 0.8rem; margin: 0; }
.ph-footer-links { display: flex; gap: 1.5rem; }
.ph-footer-links a {
    cursor: pointer; color: rgba(255,255,255,0.5);
    font-size: 0.85rem; transition: color 0.15s;
}
.ph-footer-links a:hover { color: #f59e0b; }

/* ── Responsive nav ── */
@media (max-width: 768px) {
    .ph-nav-links { display: none; }
    .ph-hero-title { font-size: 2rem; }
    .ph-hero-sub { font-size: 0.95rem; }
    .ph-cta-inner { flex-direction: column; }
}
</style>
    `
})
export class PublicHome implements OnInit {

    boutiques: any[] = [];
    filteredBoutiques: any[] = [];
    categories: any[] = [];
    searchTerm = '';
    selectedCatId: string | null = null;
    loading = true;

    constructor(
        private boutiqueService: BoutiqueService,
        private categorieService: CategorieService,
        public router: Router
    ) {}

    ngOnInit() {
        this.loadBoutiques();
        this.loadCategories();
    }

    loadBoutiques() {
        this.loading = true;
        this.boutiqueService.getAllActiveBoutique().subscribe({
            next: (data) => {
                this.boutiques = data;
                this.filteredBoutiques = data;
                this.loading = false;
            },
            error: () => { this.loading = false; }
        });
    }

    loadCategories() {
        this.categorieService.getAllCategorie().subscribe({
            next: (data) => { this.categories = data; },
            error: () => {}
        });
    }

    applyFilters() {
        let result = [...this.boutiques];

        const term = this.searchTerm.toLowerCase().trim();
        if (term) {
            result = result.filter(b =>
                b.nom_boutique?.toLowerCase().includes(term) ||
                b.description_boutique?.toLowerCase().includes(term)
            );
        }

        if (this.selectedCatId) {
            result = result.filter(b =>
                b.id_categorie?.some((cat: any) => {
                    const id = typeof cat === 'string' ? cat : cat._id;
                    return id === this.selectedCatId;
                })
            );
        }

        this.filteredBoutiques = result;
    }

    setCategorie(id: string | null) {
        this.selectedCatId = id;
        this.applyFilters();
    }

    getBoutiqueLogoUrl(b: any): string | null {
        return b.logo?.length > 0 ? environment.apiUrl + b.logo[0].url : null;
    }

    visitBoutique(id: string) { this.router.navigate(['/visiteBoutique', id]); }
    goToLogin()   { this.router.navigate(['/logIn']); }
    goToSignup()  { this.router.navigate(['/signUp']); }
    goToDemande() { this.router.navigate(['/demandeBoutiqueClient']); }
    scrollTo(id: string) {
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
}
