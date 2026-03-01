import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoutiqueService } from '@/pages/service/boutique.service';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

interface Boutique {
    _id: string;
    nom_boutique: string;
    description: string;
    logo: string | null;  // On stocke juste l'URL maintenant
    photo_boutique?: Array<{
        url: string;
        filename: string;
    }>;
    location: string;
    rating: number;
    status: string;  // On stocke juste le nom_status maintenant
}

@Component({
    selector: 'features-widget',
    standalone: true,
    imports: [CommonModule],
    template: `
     <div id="features" class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
        <div class="grid grid-cols-12 gap-4 justify-center">
            <div class="col-span-12 text-center mt-20 mb-6">
                <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Nos boutiques partenaires</div>
                <span class="text-muted-color text-2xl">Découvrez nos boutiques de confiance</span>
            </div>
            
            <div class="col-span-12 mt-10 mb-8 overflow-hidden">
                <div class="carousel-container" (mouseenter)="pauseCarousel()" (mouseleave)="resumeCarousel()">
                    <div class="carousel-track" [ngStyle]="getTrackStyle()">
                        <div *ngFor="let boutique of displayBoutiques; let i = index" class="carousel-item">
                            <div class="boutique-card">
                                <!-- Logo principal en grand -->
                                <div class="logo-container">
                                    <img 
                                        [src]="boutique.logo ? baseUrl + boutique.logo : 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22200%22 height=%22200%22/%3E%3Ctext fill=%22%23999%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2224%22%3ELogo%3C/text%3E%3C/svg%3E'" 
                                        [alt]="boutique.nom_boutique"
                                        class="boutique-logo"
                                        (error)="onImageError($event)"
                                    />
                                    <div class="status-badge" [ngClass]="getStatusClass(boutique.status)">
                                        {{ getStatusLabel(boutique.status) }}
                                    </div>
                                </div>
                                
                                <!-- Informations de la boutique -->
                                <div class="boutique-content">
                                    <h3 class="boutique-title">{{ boutique.nom_boutique }}</h3>
                                    
                                    <div class="boutique-meta">
                                        <div class="location-badge">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                <circle cx="12" cy="10" r="3"></circle>
                                            </svg>
                                            {{ boutique.location }}
                                        </div>
                                        
                                        <div class="rating">
                                            <span *ngFor="let star of [1,2,3,4,5]" class="star" [class.filled]="star <= (boutique.rating || 0)">
                                                ★
                                            </span>
                                            <span class="rating-text">{{ boutique.rating || 0 }}</span>
                                        </div>
                                    </div>
                                    
                                    <p class="boutique-description">{{ boutique.description }}</p>
                                    
                                    <button class="view-btn" (click) = "visiterBoutique(boutique._id)">
                                        <span>Visiter la boutique</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Bouton Voir nos boutiques -->
            <div class="col-span-12 text-center mb-20">
                <button class="explore-btn" (click)="navigateToBoutiques()">
                    <span>Voir nos boutiques</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                </button>
            </div>
        </div>
    </div>
    `,
    styles: [`
        .carousel-container {
            width: 100%;
            overflow: hidden;
            position: relative;
            padding: 20px 0;
        }

        .carousel-track {
            display: flex;
            gap: 2.5rem;
            will-change: transform;
        }

        .carousel-item {
            flex: 0 0 auto;
            width: 320px;
        }

        .boutique-card {
            background: white;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            height: 100%;
            display: flex;
            flex-direction: column;
            border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .boutique-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        /* Container du logo */
        .logo-container {
            position: relative;
            width: 100%;
            height: 220px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
            padding: 30px;
            overflow: hidden;
        }

        .boutique-logo {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            object-fit: contain;
            transition: transform 0.4s ease;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
        }

        .boutique-card:hover .boutique-logo {
            transform: scale(1.1);
        }

        .status-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            padding: 8px 16px;
            border-radius: 30px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            background: #6c757d;
            color: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .status-badge.active {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            animation: pulse 2s infinite;
        }

        .status-badge.pending {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        }

        .status-badge.suspend {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }

        @keyframes pulse {
            0%, 100% {
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
            }
            50% {
                box-shadow: 0 4px 20px rgba(16, 185, 129, 0.6);
            }
        }

        /* Contenu de la boutique */
        .boutique-content {
            padding: 1.75rem;
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .boutique-title {
            font-size: 1.4rem;
            font-weight: 800;
            color: #1a202c;
            margin: 0;
            line-height: 1.3;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .boutique-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }

        .location-badge {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #64748b;
            font-size: 0.85rem;
            font-weight: 500;
            padding: 6px 12px;
            background: #f1f5f9;
            border-radius: 20px;
            flex: 1;
            min-width: 0;
        }

        .location-badge svg {
            flex-shrink: 0;
        }

        .rating {
            display: flex;
            align-items: center;
            gap: 0.2rem;
        }

        .star {
            color: #e2e8f0;
            font-size: 1.1rem;
            line-height: 1;
        }

        .star.filled {
            color: #fbbf24;
            text-shadow: 0 0 4px rgba(251, 191, 36, 0.3);
        }

        .rating-text {
            margin-left: 0.4rem;
            color: #1a202c;
            font-weight: 700;
            font-size: 0.85rem;
        }

        .boutique-description {
            color: #64748b;
            line-height: 1.6;
            margin: 0;
            flex: 1;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-size: 0.9rem;
        }

        .view-btn {
            background: linear-gradient(135deg, #1f2933 0%, #111827 100%);
            color: #e5e7eb;
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.85rem 1.5rem;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin-top: auto;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
        }

        .view-btn:hover {
            background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
        }

        .view-btn svg {
            stroke: #e5e7eb;
            transition: transform 0.3s ease;
        }

        .view-btn:hover svg {
            transform: translateX(4px);
        }

        @media (max-width: 768px) {
            .carousel-item {
                width: 280px;
            }

            .logo-container {
                height: 180px;
                padding: 20px;
            }

            .boutique-title {
                font-size: 1.2rem;
            }
        }


        /* Nouveau style pour le bouton Voir nos boutiques */
        .explore-btn {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 16px 32px;
            font-size: 18px;
            font-weight: 600;
            color: white;
            background: #1e2832;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(30, 40, 50, 0.4);
        }
        
        .explore-btn:hover {
            transform: translateY(-2px);
            background: #2a3642;
            box-shadow: 0 6px 20px rgba(30, 40, 50, 0.6);
        }
        
        .explore-btn:active {
            transform: translateY(0);
        }
        
        .explore-btn svg {
            transition: transform 0.3s ease;
        }
        
        .explore-btn:hover svg {
            transform: translateX(4px);
        }

    `]
})
export class FeaturesWidget implements OnInit, OnDestroy {
    boutiques: Boutique[] = [];
    displayBoutiques: Boutique[] = [];
    private currentPosition: number = 0;
    private animationId: any;
    private isPaused: boolean = false;
    private speed: number = 0.5;
    private lastTimestamp: number = 0;
    private itemWidth: number = 320 + 40; // largeur de carte + gap

    baseUrl = environment.apiUrl;

    constructor(
        private boutiqueService: BoutiqueService,
        private router :Router
    ) {}

    ngOnInit() {
        this.loadBoutiques();
    }

    ngOnDestroy() {
        this.stopCarousel();
    }

    loadBoutiques() {
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
                        description: shop.description_boutique || 'Aucune description disponible',
                        logo: logoUrl,
                        photo_boutique: shop.photo_boutique || [],
                        location: shop.location || 'Non défini',
                        rating: shop.rating !== null && shop.rating !== undefined ? shop.rating : 4.5,
                        status: statusValue
                    };
                    
                    //console.log('Mapped boutique:', mapped);
                    return mapped;
                });

                // Créer 3 copies pour l'effet carousel infini
                this.displayBoutiques = [
                    ...this.boutiques, 
                    ...this.boutiques,
                    ...this.boutiques
                ];
                
                console.log('=== Boutiques finales ===', this.boutiques);
                console.log('=== Total cards affichées ===', this.displayBoutiques.length);
                
                setTimeout(() => this.startCarousel(), 100);  
            },
            error: (error) => {
                console.error('Erreur lors du chargement des boutiques:', error);
            }
        });
    }

    startCarousel() {
        if (this.boutiques.length === 0) return;

        const blockWidth = this.boutiques.length * this.itemWidth;
        this.currentPosition = 0;

        const animate = (timestamp: number) => {
            if (!this.lastTimestamp) {
                this.lastTimestamp = timestamp;
            }

            const deltaTime = timestamp - this.lastTimestamp;
            this.lastTimestamp = timestamp;

            if (!this.isPaused) {
                this.currentPosition += this.speed * (deltaTime / 16.67);

                // Reset quand on dépasse le 2ème bloc
                if (this.currentPosition >= blockWidth * 2) {
                    this.currentPosition -= blockWidth;
                }
            }

            this.animationId = requestAnimationFrame(animate);
        };

        this.animationId = requestAnimationFrame(animate);
    }

    getTrackStyle() {
        return {
            'transform': `translateX(-${this.currentPosition}px)`
        };
    }

    pauseCarousel() {
        this.isPaused = true;
    }

    resumeCarousel() {
        this.isPaused = false;
        this.lastTimestamp = 0;
    }

    stopCarousel() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    onImageError(event: any) {
        event.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22200%22 height=%22200%22/%3E%3Ctext fill=%22%23999%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2224%22%3ELogo%3C/text%3E%3C/svg%3E';
    }

    getStatusClass(status: string): { [key: string]: boolean } {
        return {
            'active': status === 'active',
            'pending': status === 'pending',
            'suspend': status === 'suspend'
        };
    }

    getStatusLabel(status: string): string {
        if (!status) return 'Active';
        
        // Première lettre en majuscule
        return status.charAt(0).toUpperCase() + status.slice(1);
    }

    navigateToBoutiques() {
        
        this.router.navigate(['/allboutique'])
        // Implémentez la navigation vers la page des boutiques
        // Exemple avec Angular Router:
        // this.router.navigate(['/boutiques']);
        
        // Ou avec window.location:
        // window.location.href = '/boutiques';
        
        console.log('Navigation vers la page des boutiques');
    }


    visiterBoutique(id:string)
    {
       
        console.log("id :"+id);
        this.router.navigate(['/visiteBoutique',id]);
        
    }

}