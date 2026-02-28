import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { CartService } from '@/pages/service/cart.service';
import { AuthService } from '@/pages/service/auth.service';
import { PromotionService } from '@/pages/service/promotion.service';

@Component({
    selector: 'app-layout-client',
    standalone: true,
    imports: [CommonModule, RouterModule, ButtonModule, BadgeModule, MenuModule],
    template: `
    <div class="cl-root">

        <!-- ===== TOP BAND ===== -->
        <header class="cl-header">
            <div class="cl-header-inner">

                <!-- Logo -->
                <a routerLink="/client/accueil" class="cl-logo">
                    <i class="pi pi-shopping-bag cl-logo-icon"></i>
                    <span class="cl-logo-text">Centre<strong>Mall</strong></span>
                </a>

                <!-- Nav links -->
                <nav class="cl-nav">
                    <a routerLink="/client/accueil" routerLinkActive="cl-nav-active" class="cl-nav-link">
                        <i class="pi pi-home"></i>
                        <span>Accueil</span>
                    </a>
                    <a routerLink="/client/catalogue" routerLinkActive="cl-nav-active" class="cl-nav-link">
                        <i class="pi pi-th-large"></i>
                        <span>Catalogue</span>
                    </a>
                    <a routerLink="/client/promotions" routerLinkActive="cl-nav-active" class="cl-nav-link cl-nav-promo">
                        <i class="pi pi-percentage"></i>
                        <span>Promotions</span>
                    </a>
                    <a routerLink="/client/mes-commandes" routerLinkActive="cl-nav-active" class="cl-nav-link">
                        <i class="pi pi-list"></i>
                        <span>Mes Commandes</span>
                    </a>
                </nav>

                <!-- Right actions -->
                <div class="cl-actions">
                    <!-- Cart -->
                    <a routerLink="/client/panier" class="cl-cart">
                        <div class="cl-cart-wrap">
                            <i class="pi pi-shopping-cart cl-cart-icon"></i>
                            @if (cartCount > 0) {
                                <span class="cl-cart-badge">{{ cartCount }}</span>
                            }
                        </div>
                        <span class="cl-cart-label">Panier</span>
                    </a>

                    <!-- Profile -->
                    <button class="cl-profile-btn" (click)="profileMenu.toggle($event)">
                        <div class="cl-avatar">
                            <i class="pi pi-user"></i>
                        </div>
                        <div class="cl-profile-info">
                            <span class="cl-profile-greeting">Bonjour</span>
                            <span class="cl-profile-sub">Mon compte <i class="pi pi-angle-down"></i></span>
                        </div>
                    </button>
                    <p-menu #profileMenu [model]="profileItems" [popup]="true"></p-menu>
                </div>
            </div>
        </header>

        <!-- ===== SUB-NAV BAR ===== -->
        <div class="cl-subnav">
            <div class="cl-subnav-inner">
                <a routerLink="/client/accueil" routerLinkActive="cl-subnav-active" class="cl-subnav-link">
                    <i class="pi pi-home"></i> Accueil
                </a>
                <a routerLink="/client/catalogue" routerLinkActive="cl-subnav-active" class="cl-subnav-link">
                    <i class="pi pi-th-large"></i> Catalogue
                </a>
                <a routerLink="/client/promotions" routerLinkActive="cl-subnav-active" class="cl-subnav-link cl-subnav-promo">
                    <i class="pi pi-percentage"></i> Promotions
                    @if (promoCount > 0) { <span class="cl-subnav-badge cl-subnav-promo-badge">{{ promoCount }}</span> }
                </a>
                <a routerLink="/client/panier" routerLinkActive="cl-subnav-active" class="cl-subnav-link">
                    <i class="pi pi-shopping-cart"></i> Mon panier
                    @if (cartCount > 0) { <span class="cl-subnav-badge">{{ cartCount }}</span> }
                </a>
                <a routerLink="/client/mes-commandes" routerLinkActive="cl-subnav-active" class="cl-subnav-link">
                    <i class="pi pi-list"></i> Mes commandes
                </a>
            </div>
        </div>

        <!-- ===== PAGE CONTENT ===== -->
        <main class="cl-content">
            <router-outlet></router-outlet>
        </main>

        <!-- ===== FOOTER ===== -->
        <footer class="cl-footer">
            <div class="cl-footer-inner">
                <span class="cl-footer-brand"><i class="pi pi-shopping-bag"></i> CentreMall</span>
                <span class="cl-footer-copy">&copy; 2026 — Tous droits réservés</span>
                <span class="cl-footer-made">Made by <strong>Ramanalinarivo Toky Henintsoa</strong> &amp; <strong>Rakotohasimbola Zo</strong></span>
            </div>
        </footer>
    </div>

    <style>
    /* ── Root ── */
    .cl-root { min-height: 100vh; background: #f0f2f5; display: flex; flex-direction: column; }

    /* ── Header ── */
    .cl-header {
        background: #0f172a;
        position: sticky; top: 0; z-index: 200;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    }
    .cl-header-inner {
        max-width: 1400px; margin: 0 auto;
        display: flex; align-items: center;
        padding: 0 1.5rem; height: 64px; gap: 1.5rem;
    }

    /* Logo */
    .cl-logo {
        display: flex; align-items: center; gap: 0.5rem;
        text-decoration: none; flex-shrink: 0;
    }
    .cl-logo-icon { color: #f59e0b; font-size: 1.5rem; }
    .cl-logo-text { font-size: 1.2rem; color: white; letter-spacing: -0.01em; }
    .cl-logo-text strong { color: #f59e0b; }

    /* Nav */
    .cl-nav { display: flex; gap: 0.25rem; flex: 1; }
    .cl-nav-link {
        display: flex; align-items: center; gap: 0.4rem;
        color: rgba(255,255,255,0.75); text-decoration: none;
        font-size: 0.9rem; font-weight: 500;
        padding: 0.4rem 0.8rem; border-radius: 4px;
        border: 1.5px solid transparent;
        transition: all 0.15s;
    }
    .cl-nav-link:hover { color: white; border-color: rgba(255,255,255,0.5); }
    .cl-nav-active { color: white !important; border-color: white !important; }
    .cl-nav-promo { color: #fbbf24 !important; }
    .cl-nav-promo:hover { border-color: #fbbf24 !important; }
    .cl-nav-promo.cl-nav-active { border-color: #fbbf24 !important; color: #fbbf24 !important; }

    /* Right actions */
    .cl-actions { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }

    /* Cart */
    .cl-cart {
        display: flex; flex-direction: column; align-items: center;
        gap: 0.1rem; text-decoration: none;
        padding: 0.3rem 0.6rem; border-radius: 4px;
        border: 1.5px solid transparent;
        transition: border-color 0.15s;
    }
    .cl-cart:hover { border-color: rgba(255,255,255,0.5); }
    .cl-cart-wrap { position: relative; display: inline-flex; }
    .cl-cart-icon { color: rgba(255,255,255,0.8); font-size: 1.4rem; }
    .cl-cart-badge {
        position: absolute; top: -6px; right: -10px;
        background: #f59e0b; color: #0f172a;
        font-size: 0.7rem; font-weight: 800;
        min-width: 18px; height: 18px;
        border-radius: 10px; display: flex;
        align-items: center; justify-content: center;
        padding: 0 4px;
    }
    .cl-cart-label { color: rgba(255,255,255,0.8); font-size: 0.72rem; }

    /* Profile button */
    .cl-profile-btn {
        display: flex; align-items: center; gap: 0.6rem;
        background: none; border: 1.5px solid transparent;
        border-radius: 4px; padding: 0.3rem 0.6rem;
        cursor: pointer; transition: border-color 0.15s;
    }
    .cl-profile-btn:hover { border-color: rgba(255,255,255,0.5); }
    .cl-avatar {
        width: 34px; height: 34px; border-radius: 50%;
        background: #1e3a5f; border: 2px solid #f59e0b;
        display: flex; align-items: center; justify-content: center;
        color: #f59e0b; font-size: 0.9rem;
    }
    .cl-profile-info { display: flex; flex-direction: column; align-items: flex-start; }
    .cl-profile-greeting { font-size: 0.7rem; color: rgba(255,255,255,0.6); line-height: 1; }
    .cl-profile-sub { font-size: 0.82rem; color: white; font-weight: 600; line-height: 1.4; }
    .cl-profile-sub .pi { font-size: 0.7rem; }

    /* ── Sub-nav ── */
    .cl-subnav {
        background: #1e293b;
        border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .cl-subnav-inner {
        max-width: 1400px; margin: 0 auto;
        padding: 0 1.5rem;
        display: flex; gap: 0; overflow-x: auto;
    }
    .cl-subnav-link {
        display: flex; align-items: center; gap: 0.4rem;
        color: rgba(255,255,255,0.65); font-size: 0.82rem; font-weight: 500;
        text-decoration: none; padding: 0.6rem 1rem;
        border-bottom: 2px solid transparent;
        white-space: nowrap; transition: all 0.15s;
    }
    .cl-subnav-link:hover { color: white; border-bottom-color: rgba(255,255,255,0.4); }
    .cl-subnav-active { color: #f59e0b !important; border-bottom-color: #f59e0b !important; }
    .cl-subnav-promo { color: #fbbf24 !important; }
    .cl-subnav-promo-badge { background: #ef4444 !important; color: white !important; }
    .cl-subnav-badge {
        background: #f59e0b; color: #0f172a;
        font-size: 0.65rem; font-weight: 800;
        padding: 0 5px; border-radius: 8px; min-width: 16px;
        text-align: center; line-height: 16px;
    }

    /* ── Content ── */
    .cl-content { flex: 1; padding: 1.5rem; max-width: 1400px; margin: 0 auto; width: 100%; }

    /* ── Footer ── */
    .cl-footer { background: #0f172a; margin-top: auto; }
    .cl-footer-inner {
        max-width: 1400px; margin: 0 auto;
        padding: 1rem 1.5rem;
        display: flex; justify-content: space-between; align-items: center;
        flex-wrap: wrap; gap: 0.5rem;
    }
    .cl-footer-brand { color: #f59e0b; font-weight: 700; font-size: 0.95rem; }
    .cl-footer-brand .pi { margin-right: 0.3rem; }
    .cl-footer-copy { color: rgba(255,255,255,0.4); font-size: 0.78rem; }

    /* ── Responsive ── */
    @media (max-width: 768px) {
        .cl-header-inner { padding: 0 1rem; height: 56px; }
        .cl-nav { display: none; }
        .cl-profile-info { display: none; }
        .cl-content { padding: 1rem; }
    }
    </style>
    `
})
export class AppLayoutClient {
    cartCount = 0;
    promoCount = 0;
    profileItems: MenuItem[] = [];

    constructor(
        private cartService: CartService,
        private authService: AuthService,
        private router: Router,
        private promotionService: PromotionService
    ) {
        this.profileItems = [
            { label: 'Accueil', icon: 'pi pi-home', command: () => this.router.navigate(['/client/accueil']) },
            { label: 'Catalogue', icon: 'pi pi-th-large', command: () => this.router.navigate(['/client/catalogue']) },
            { label: 'Promotions', icon: 'pi pi-percentage', command: () => this.router.navigate(['/client/promotions']) },
            { label: 'Mes Commandes', icon: 'pi pi-list', command: () => this.router.navigate(['/client/mes-commandes']) },
            { label: 'Panier', icon: 'pi pi-shopping-cart', command: () => this.router.navigate(['/client/panier']) },
            { separator: true },
            { label: 'Déconnexion', icon: 'pi pi-sign-out', command: () => this.authService.logout() }
        ];

        this.cartService.cart$.subscribe(items => {
            this.cartCount = items.reduce((sum, i) => sum + i.quantite, 0);
        });

        this.promotionService.getActivePromotions().subscribe({
            next: (promos) => { this.promoCount = promos.length; },
            error: () => {}
        });
    }
}
