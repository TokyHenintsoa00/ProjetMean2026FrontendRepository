

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoutiqueService } from '../service/boutique.service';

@Component({
    selector: 'app-voir-all-boutique',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `<div class="boutiques-page">
        <!-- En-tête -->
        <div class="page-header">
            <div class="container">
                <h1 class="page-title">Nos Boutiques Partenaires</h1>
                <p class="page-subtitle">Découvrez toutes nos boutiques de confiance</p>
            </div>
        </div>

        <!-- Barre de recherche -->
        <div class="search-section">
            <div class="container">
                <div class="search-wrapper">
                    <div class="search-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <input 
                            #filter
                            type="text" 
                            [(ngModel)]="searchTerm"
                            (input)="filterBoutiques()"
                            placeholder="Rechercher une boutique par nom, localisation, catégorie..."
                            class="search-input"
                        />
                        <button *ngIf="searchTerm" (click)="clearSearch()" class="clear-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="results-info">
                        <span class="results-count">
                            {{ filteredBoutiques.length }} boutique(s) trouvée(s)
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Liste des boutiques -->
        <div class="boutiques-container">
            <div class="container">
                <!-- Message si aucune boutique -->
                <div *ngIf="loading" class="loading-state">
                    <div class="spinner"></div>
                    <p>Chargement des boutiques...</p>
                </div>

                <div *ngIf="!loading && filteredBoutiques.length === 0" class="empty-state">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <h3>Aucune boutique trouvée</h3>
                    <p>Essayez avec d'autres mots-clés</p>
                </div>

                <!-- Grille des boutiques - Style Westfield -->
                <div class="boutiques-grid" *ngIf="!loading && filteredBoutiques.length > 0">
                    <div *ngFor="let boutique of filteredBoutiques" class="boutique-card">
                        
                        <!-- Logo principal - Style Westfield -->
                        <div class="logo-header">
                            <div class="logo-wrapper">
                                <img 
                                    [src]="getLogoUrl(boutique)" 
                                    [alt]="boutique.nom_boutique"
                                    (error)="onImageError($event)"
                                    class="brand-logo"
                                />
                            </div>
                            
                            <!-- Catégorie badge -->
                            <div class="category-badge" *ngIf="boutique.id_categorie">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                                <span>{{ boutique.id_categorie.nom }}</span>
                            </div>
                        </div>
                        
                        <!-- Contenu -->
                        <div class="card-body">
                            <div class="header-section">
                                <h3 class="brand-name">{{ boutique.nom_boutique }}</h3>
                                
                                <div class="status-indicator" [ngClass]="getStatusClass(boutique.status)">
                                    <span class="dot"></span>
                                    <span class="label">{{ getStatusLabel(boutique.status) }}</span>
                                </div>
                            </div>
                            
                            <p class="description">{{ boutique.description_boutique }}</p>
                            
                            <!-- Meta info -->
                            <div class="meta-info">
                                <div class="location-row" *ngIf="boutique.location">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    <span>{{ boutique.location }}</span>
                                </div>
                                
                                <div class="location-row" *ngIf="!boutique.location">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    <span class="no-location">Non définie</span>
                                </div>
                                
                                <div class="rating-row" *ngIf="boutique.rating">
                                    <div class="stars">
                                        <span *ngFor="let star of [1,2,3,4,5]" 
                                              class="star" 
                                              [class.filled]="star <= boutique.rating">★</span>
                                    </div>
                                    <span class="rating-value">{{ boutique.rating }}/5</span>
                                </div>
                            </div>
                            
                            <!-- Action -->
                            <button class="cta-button" (click)="visitBoutique(boutique)">
                                <span>Découvrir</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    styles: [`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .boutiques-page {
            min-height: 100vh;
            background: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 24px;
        }

        /* En-tête */
        .page-header {
            background: #10b981;
            color: white;
            padding: 80px 24px;
            text-align: center;
        }

        .page-title {
            font-size: 48px;
            font-weight: 300;
            margin: 0 0 16px 0;
            letter-spacing: -1px;
        }

        .page-subtitle {
            font-size: 16px;
            font-weight: 300;
            opacity: 0.9;
            margin: 0;
            letter-spacing: 0.5px;
        }

        /* Barre de recherche */
        .search-section {
            background: #f9fafb;
            padding: 32px 24px;
            border-bottom: 1px solid #e5e7eb;
        }

        .search-wrapper {
            max-width: 700px;
            margin: 0 auto;
        }

        .search-box {
            position: relative;
            display: flex;
            align-items: center;
            margin-bottom: 16px;
        }

        .search-icon {
            position: absolute;
            left: 18px;
            color: #6b7280;
            pointer-events: none;
        }

        .search-input {
            width: 100%;
            padding: 14px 18px 14px 48px;
            font-size: 15px;
            border: 1px solid #d1d5db;
            border-radius: 0;
            outline: none;
            transition: all 0.2s ease;
            font-family: inherit;
            background: white;
        }

        .search-input:focus {
            border-color: #10b981;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        .clear-btn {
            position: absolute;
            right: 12px;
            background: transparent;
            border: none;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #6b7280;
            transition: color 0.2s ease;
        }

        .clear-btn:hover {
            color: #10b981;
        }

        .results-info {
            text-align: center;
        }

        .results-count {
            color: #6b7280;
            font-size: 13px;
            font-weight: 400;
            letter-spacing: 0.3px;
        }

        /* États de chargement et vide */
        .loading-state,
        .empty-state {
            text-align: center;
            padding: 100px 24px;
        }

        .spinner {
            width: 40px;
            height: 40px;
            border: 2px solid #e5e7eb;
            border-top-color: #10b981;
            border-radius: 50%;
            animation: spin 0.7s linear infinite;
            margin: 0 auto 24px;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .empty-state svg {
            color: #d1d5db;
            margin-bottom: 24px;
        }

        .empty-state h3 {
            font-size: 20px;
            color: #374151;
            margin: 0 0 8px 0;
            font-weight: 400;
        }

        .empty-state p {
            color: #6b7280;
            margin: 0;
            font-size: 14px;
        }

        /* Grille des boutiques */
        .boutiques-container {
            padding: 48px 24px 80px;
            background: #f9fafb;
        }

        .boutiques-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 24px;
        }

        /* Card Boutique - Style Westfield avec couleur verte */
        .boutique-card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
            cursor: pointer;
        }

        .boutique-card:hover {
            box-shadow: 0 8px 24px rgba(16, 185, 129, 0.15);
            transform: translateY(-4px);
            border-color: #10b981;
        }

        /* Logo Header */
        .logo-header {
            background: #ffffff;
            padding: 48px 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #f3f4f6;
            min-height: 200px;
            position: relative;
        }

        .logo-wrapper {
            width: 100%;
            max-width: 180px;
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .brand-logo {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            transition: all 0.3s ease;
            filter: grayscale(0%);
        }

        .boutique-card:hover .brand-logo {
            transform: scale(1.05);
        }

        /* Badge de catégorie */
        .category-badge {
            position: absolute;
            top: 16px;
            left: 16px;
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.2);
            border-radius: 20px;
            font-size: 11px;
            font-weight: 500;
            color: #059669;
            text-transform: capitalize;
            letter-spacing: 0.3px;
            backdrop-filter: blur(4px);
        }

        .category-badge svg {
            flex-shrink: 0;
        }

        /* Corps de la card */
        .card-body {
            padding: 24px;
            display: flex;
            flex-direction: column;
            flex: 1;
        }

        .header-section {
            margin-bottom: 16px;
        }

        .brand-name {
            font-size: 18px;
            font-weight: 500;
            color: #111827;
            margin: 0 0 12px 0;
            letter-spacing: 0.3px;
            line-height: 1.3;
        }

        /* Status indicator avec couleur verte */
        .status-indicator {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 12px;
            border-radius: 2px;
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 0.8px;
            text-transform: uppercase;
        }

        .status-indicator .dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
        }

        .status-indicator.active {
            background: #d1fae5;
            color: #065f46;
        }

        .status-indicator.active .dot {
            background: #10b981;
        }

        .status-indicator.inactive {
            background: #fee2e2;
            color: #991b1b;
        }

        .status-indicator.inactive .dot {
            background: #dc2626;
        }

        /* Description */
        .description {
            color: #6b7280;
            font-size: 13px;
            line-height: 1.6;
            margin: 0 0 20px 0;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            flex: 1;
            font-weight: 300;
        }

        /* Meta info */
        .meta-info {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 20px;
            padding-top: 16px;
            border-top: 1px solid #f3f4f6;
        }

        .location-row,
        .rating-row {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            color: #6b7280;
        }

        .location-row svg,
        .rating-row svg {
            flex-shrink: 0;
            color: #9ca3af;
        }

        .no-location {
            color: #9ca3af;
            font-style: italic;
        }

        .stars {
            display: flex;
            gap: 2px;
        }

        .star {
            color: #e5e7eb;
            font-size: 14px;
            line-height: 1;
        }

        .star.filled {
            color: #10b981;
        }

        .rating-value {
            font-size: 11px;
            font-weight: 500;
            color: #6b7280;
        }

        /* CTA Button avec couleur verte */
        .cta-button {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 14px 24px;
            background: #10b981;
            color: white;
            border: none;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            letter-spacing: 1px;
            text-transform: uppercase;
            font-family: inherit;
        }

        .cta-button:hover {
            background: #059669;
            gap: 12px;
        }

        .cta-button:active {
            background: #047857;
        }

        .cta-button svg {
            transition: transform 0.3s ease;
        }

        .cta-button:hover svg {
            transform: translateX(4px);
        }

        /* Responsive */
        @media (max-width: 1024px) {
            .boutiques-grid {
                grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                gap: 20px;
            }
        }

        @media (max-width: 768px) {
            .page-title {
                font-size: 36px;
            }

            .page-subtitle {
                font-size: 14px;
            }

            .boutiques-grid {
                grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                gap: 16px;
            }

            .logo-header {
                padding: 36px 24px;
                min-height: 160px;
            }

            .logo-wrapper {
                max-width: 140px;
                height: 100px;
            }

            .card-body {
                padding: 20px;
            }

            .category-badge {
                font-size: 10px;
                padding: 5px 12px;
            }
        }

        @media (max-width: 480px) {
            .container {
                padding: 0 16px;
            }

            .boutiques-container {
                padding: 32px 16px 48px;
            }

            .boutiques-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .page-header {
                padding: 60px 16px;
            }

            .brand-name {
                font-size: 16px;
            }
        }
    `]
})
export class VoirAllBoutique implements OnInit {
    @ViewChild('filter') filter!: ElementRef;
    
    boutiques: any[] = [];
    filteredBoutiques: any[] = [];
    searchTerm: string = '';
    loading: boolean = true;
    baseUrl: string = 'http://localhost:5000'; // Ajustez selon votre API

    constructor(private boutiqueService: BoutiqueService) {}

    ngOnInit(): void {
        this.loadBoutiques();
    }

    loadBoutiques(): void {
        this.loading = true;
        this.boutiqueService.getAllActiveBoutique().subscribe({
            next: (data: any[]) => {
                console.log('=== Données brutes reçues ===', data);
                
                this.boutiques = data.map((shop: any) => {
                    // Extraire le nom du status depuis l'objet status
                    let statusValue = 'active';
                    if (shop.status) {
                        if (typeof shop.status === 'object' && shop.status.nom_status) {
                            statusValue = shop.status.nom_status;
                        } else if (typeof shop.status === 'string') {
                            statusValue = shop.status;
                        }
                    }
                    
                    // Extraire la catégorie
                    let categoryName = null;
                    let categoryId = null;
                    if (shop.id_categorie) {
                        if (typeof shop.id_categorie === 'object' && shop.id_categorie.nom) {
                            categoryName = shop.id_categorie.nom;
                            categoryId = shop.id_categorie._id;
                        }
                    }

                    // Corriger le chemin du logo
                    let logoUrl = null;
                    if (shop.logo && shop.logo.length > 0) {
                        const originalUrl = shop.logo[0].url;
                        // Remplacer /uploads/logoboutique/ par /uploads/logo/
                        logoUrl = originalUrl.replace('/uploads/logoboutique/', '/uploads/logo/');
                    }
                    
                    const mapped = {
                        _id: shop._id,
                        nom_boutique: shop.nom_boutique || 'Boutique sans nom',
                        description_boutique: shop.description_boutique || 'Aucune description disponible',
                        logo: logoUrl,
                        photo_boutique: shop.photo_boutique || [],
                        location: shop.location || null,
                        rating: shop.rating !== null && shop.rating !== undefined ? shop.rating : null,
                        status: statusValue,
                        loyer: shop.loyer || null,
                        id_categorie: categoryName ? {
                            _id: categoryId,
                            nom: categoryName
                        } : null
                    };
                    
                    console.log('Mapped boutique:', mapped);
                    return mapped;
                });
                
                this.filteredBoutiques = this.boutiques;
                this.loading = false;
                
                console.log('=== Boutiques finales ===', this.boutiques);
                console.log('=== Total boutiques ===', this.boutiques.length);
            },
            error: (error) => {
                console.error('Erreur lors du chargement des boutiques:', error);
                this.loading = false;
            }
        });
    }

    filterBoutiques(): void {
        const term = this.searchTerm.toLowerCase().trim();
        
        if (!term) {
            this.filteredBoutiques = this.boutiques;
            return;
        }

        this.filteredBoutiques = this.boutiques.filter(boutique => 
            boutique.nom_boutique?.toLowerCase().includes(term) ||
            boutique.location?.toLowerCase().includes(term) ||
            boutique.description_boutique?.toLowerCase().includes(term) ||
            boutique.id_categorie?.nom?.toLowerCase().includes(term)
        );
    }

    clearSearch(): void {
        this.searchTerm = '';
        this.filteredBoutiques = this.boutiques;
        this.filter.nativeElement.focus();
    }

    visitBoutique(boutique: any): void {
        // Implémentez la logique de navigation vers la boutique
        console.log('Visite de la boutique:', boutique);
        // Exemple: this.router.navigate(['/boutique', boutique._id]);
    }

    getLogoUrl(boutique: any): string {
        if (boutique.logo) {
            return this.baseUrl + boutique.logo;
        }
        return this.getPlaceholderImage();
    }

    getStatusClass(status: string): string {
        return status?.toLowerCase() === 'active' ? 'active' : 'inactive';
    }

    getStatusLabel(status: string): string {
        return status?.toLowerCase() === 'active' ? 'Actif' : 'Inactif';
    }

    formatLoyer(loyer: number): string {
        if (!loyer) return '';
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'MGA', // Ariary malgache
            minimumFractionDigits: 0
        }).format(loyer);
    }

    getPlaceholderImage(): string {
        return 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22200%22 height=%22200%22/%3E%3Ctext fill=%22%23999%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2224%22%3ELogo%3C/text%3E%3C/svg%3E';
    }

    onImageError(event: any): void {
        event.target.src = this.getPlaceholderImage();
    }
}