import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { BoutiqueService } from '@/pages/service/boutique.service';
import { environment } from '@env/environment';

@Component({
    selector: 'app-accueil-client',
    standalone: true,
    imports: [CommonModule, RouterModule, ButtonModule, RippleModule, DividerModule],
    template: `

<!-- ===== HERO SECTION ===== -->
<div id="hero" class="relative overflow-hidden" style="min-height: calc(100vh - 128px); min-height: 560px;">

    <!-- Image carousel background -->
    <div class="absolute inset-0 z-0">
        <div *ngFor="let image of images; let i = index"
             class="absolute inset-0 transition-all duration-[2000ms] ease-in-out"
             [class.opacity-100]="currentImageIndex === i"
             [class.opacity-0]="currentImageIndex !== i">
            <img [src]="image" [alt]="'Background ' + (i+1)"
                 class="w-full h-full object-cover object-[50%_30%]" />
            <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>
    </div>

    <!-- Content -->
    <div class="relative z-10 h-full flex items-center py-16">
        <div class="container mx-auto px-6 lg:px-20">
            <div class="max-w-3xl">

                <!-- Badge -->
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span class="text-white text-sm font-medium">Nouveau centre commercial</span>
                </div>

                <!-- Title -->
                <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in">
                    <span class="text-white">Bienvenue dans</span>
                    <span class="block text-white">Notre Centre Commercial</span>
                </h1>

                <!-- Description -->
                <p class="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                    Découvrez une expérience shopping unique avec plus de 200 boutiques,
                    restaurants et espaces de loisirs pour toute la famille.
                </p>

                <!-- CTA -->
                <div class="flex flex-wrap gap-4">
                    <button pButton pRipple type="button" label="Demande de boutique"
                            style="background-color: #161d2b !important;"
                            (click)="router.navigate(['/demandeBoutiqueClient'])"
                            class="!border !border-blue-500/30 !px-8 !py-4 !text-lg !font-semibold !text-white hover:!border-blue-400/50 hover:brightness-110 transition-all">
                    </button>
                    <button pButton pRipple type="button" label="Voir le catalogue"
                            style="background-color: #f59e0b !important; color: #1a1a1a !important; border-color: #f59e0b !important;"
                            (click)="router.navigate(['/client/catalogue'])"
                            class="!px-8 !py-4 !text-lg !font-bold transition-all">
                    </button>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-3 gap-6 mt-12 max-w-sm">
                    <div class="text-center">
                        <div class="text-3xl font-bold text-white mb-1">{{ boutiques.length || '200' }}+</div>
                        <div class="text-sm text-gray-300">Boutiques</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-white mb-1">50+</div>
                        <div class="text-sm text-gray-300">Restaurants</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-white mb-1">24/7</div>
                        <div class="text-sm text-gray-300">Accès</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Carousel indicators -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        <button *ngFor="let image of images; let i = index"
                class="group relative h-1 rounded-full transition-all overflow-hidden cursor-pointer"
                [class.w-12]="currentImageIndex === i"
                [class.w-8]="currentImageIndex !== i"
                (click)="goToImage(i)">
            <div class="absolute inset-0 bg-white/30"></div>
            <div class="absolute inset-0 bg-white transition-all"
                 [class.w-full]="currentImageIndex === i"
                 [class.w-0]="currentImageIndex !== i"></div>
        </button>
    </div>

    <!-- Scroll arrow -->
    <div class="absolute bottom-8 right-8 z-20 animate-bounce">
        <div class="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <i class="pi pi-chevron-down text-white"></i>
        </div>
    </div>
</div>

<!-- ===== FEATURES / BOUTIQUES SECTION ===== -->
<div id="features" class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
    <div class="grid grid-cols-12 gap-4 justify-center">

        <div class="col-span-12 text-center mt-20 mb-6">
            <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Nos boutiques partenaires</div>
            <span class="text-muted-color text-2xl">Découvrez nos boutiques de confiance</span>
        </div>

        <div class="col-span-12 mt-10 mb-8 overflow-hidden">
            <div class="carousel-container" (mouseenter)="pauseCarousel()" (mouseleave)="resumeCarousel()">
                <div class="carousel-track" [ngStyle]="getTrackStyle()">
                    <div *ngFor="let boutique of displayBoutiques" class="carousel-item">
                        <div class="boutique-card">
                            <!-- Logo -->
                            <div class="logo-container">
                                <img [src]="boutique.logo ? baseUrl + boutique.logo : fallbackLogo"
                                     [alt]="boutique.nom_boutique"
                                     class="boutique-logo"
                                     (error)="onImageError($event)" />
                                <div class="status-badge" [ngClass]="getStatusClass(boutique.status)">
                                    {{ getStatusLabel(boutique.status) }}
                                </div>
                            </div>
                            <!-- Info -->
                            <div class="boutique-content">
                                <h3 class="boutique-title">{{ boutique.nom_boutique }}</h3>
                                <div class="boutique-meta">
                                    <div class="location-badge">
                                        <i class="pi pi-map-marker" style="font-size:0.85rem;flex-shrink:0;"></i>
                                        {{ boutique.location }}
                                    </div>
                                    <div class="rating">
                                        <span *ngFor="let star of [1,2,3,4,5]" class="star"
                                              [class.filled]="star <= (boutique.rating || 0)">★</span>
                                        <span class="rating-text">{{ boutique.rating || 0 }}</span>
                                    </div>
                                </div>
                                <p class="boutique-description">{{ boutique.description }}</p>
                                <button class="view-btn" (click)="router.navigate(['/visiteBoutique', boutique._id])">
                                    <span>Visiter la boutique</span>
                                    <i class="pi pi-arrow-right" style="font-size:0.9rem;transition:transform 0.3s;"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-span-12 text-center mb-20">
            <button class="explore-btn" (click)="router.navigate(['/allboutique'])">
                <span>Voir toutes nos boutiques</span>
                <i class="pi pi-home" style="font-size:1.1rem;transition:transform 0.3s;"></i>
            </button>
        </div>
    </div>
</div>


<style>
@keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 1s ease-out; }

/* ── Boutique carousel ── */
.carousel-container {
    width: 100%; overflow: hidden; position: relative; padding: 20px 0;
}
.carousel-track {
    display: flex; gap: 2.5rem; will-change: transform;
}
.carousel-item {
    flex: 0 0 auto; width: 320px;
}
.boutique-card {
    background: white; border-radius: 24px; overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
    height: 100%; display: flex; flex-direction: column;
    border: 1px solid rgba(0,0,0,0.05);
}
.boutique-card:hover { transform: translateY(-12px) scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
.logo-container {
    position: relative; width: 100%; height: 220px;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
    padding: 30px; overflow: hidden;
}
.boutique-logo {
    max-width: 100%; max-height: 100%; width: auto; height: auto;
    object-fit: contain; transition: transform 0.4s ease;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
}
.boutique-card:hover .boutique-logo { transform: scale(1.1); }
.status-badge {
    position: absolute; top: 15px; right: 15px;
    padding: 8px 16px; border-radius: 30px;
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.5px; background: #6c757d; color: white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.status-badge.active { background: linear-gradient(135deg, #10b981, #059669); animation: pulse-green 2s infinite; }
.status-badge.pending { background: linear-gradient(135deg, #f59e0b, #d97706); }
.status-badge.suspend { background: linear-gradient(135deg, #ef4444, #dc2626); }
@keyframes pulse-green {
    0%,100% { box-shadow: 0 4px 12px rgba(16,185,129,0.4); }
    50% { box-shadow: 0 4px 20px rgba(16,185,129,0.6); }
}
.boutique-content {
    padding: 1.75rem; flex: 1; display: flex;
    flex-direction: column; gap: 1rem;
}
.boutique-title {
    font-size: 1.4rem; font-weight: 800; color: #1a202c; margin: 0;
    line-height: 1.3;
    display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden;
}
.boutique-meta {
    display: flex; justify-content: space-between;
    align-items: center; gap: 1rem;
}
.location-badge {
    display: flex; align-items: center; gap: 0.5rem;
    color: #64748b; font-size: 0.85rem; font-weight: 500;
    padding: 6px 12px; background: #f1f5f9; border-radius: 20px;
    flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.rating { display: flex; align-items: center; gap: 0.2rem; flex-shrink: 0; }
.star { color: #e2e8f0; font-size: 1.1rem; line-height: 1; }
.star.filled { color: #fbbf24; text-shadow: 0 0 4px rgba(251,191,36,0.3); }
.rating-text { margin-left: 0.4rem; color: #1a202c; font-weight: 700; font-size: 0.85rem; }
.boutique-description {
    color: #64748b; line-height: 1.6; margin: 0; flex: 1;
    display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden; font-size: 0.9rem;
}
.view-btn {
    background: linear-gradient(135deg, #1f2933, #111827);
    color: #e5e7eb; border: 1px solid rgba(255,255,255,0.1);
    padding: 0.85rem 1.5rem; border-radius: 12px;
    font-weight: 700; font-size: 0.9rem; cursor: pointer;
    transition: all 0.3s ease;
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    margin-top: auto; box-shadow: 0 6px 20px rgba(0,0,0,0.6);
}
.view-btn:hover { background: linear-gradient(135deg, #374151, #1f2937); transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,0.8); }
.explore-btn {
    display: inline-flex; align-items: center; gap: 12px;
    padding: 16px 32px; font-size: 18px; font-weight: 600;
    color: white; background: #1e2832; border: none;
    border-radius: 50px; cursor: pointer;
    transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(30,40,50,0.4);
}
.explore-btn:hover { transform: translateY(-2px); background: #2a3642; box-shadow: 0 6px 20px rgba(30,40,50,0.6); }

@media (max-width: 768px) {
    .carousel-item { width: 280px; }
    .logo-container { height: 180px; padding: 20px; }
    .boutique-title { font-size: 1.2rem; }
}
</style>
    `
})
export class AccueilClient implements OnInit, OnDestroy {

    // ── Hero ──
    images: string[] = [
        'assets/images/excited-friends-enjoying-shopping.jpg',
        'assets/images/indoor-hotel-view.jpg',
        'assets/images/young-woman-shopping-clothes.jpg'
    ];
    currentImageIndex = 0;
    private heroInterval: any;

    // ── Boutiques carousel ──
    boutiques: any[] = [];
    displayBoutiques: any[] = [];
    private carouselPosition = 0;
    private animationId: any;
    private isPaused = false;
    private speed = 0.5;
    private lastTimestamp = 0;
    private readonly itemWidth = 320 + 40; // card width + gap

    baseUrl = environment.apiUrl;
    fallbackLogo = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22200%22 height=%22200%22/%3E%3Ctext fill=%22%23999%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2224%22%3ELogo%3C/text%3E%3C/svg%3E';

    constructor(
        private boutiqueService: BoutiqueService,
        public router: Router
    ) {}

    ngOnInit() {
        // Hero carousel
        this.heroInterval = setInterval(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        }, 5000);

        // Boutiques
        this.boutiqueService.getAllActiveBoutique().subscribe({
            next: (data: any[]) => {
                this.boutiques = data.map((shop: any) => {
                    let statusValue = 'active';
                    if (shop.status) {
                        if (typeof shop.status === 'object' && shop.status.nom_status) {
                            statusValue = shop.status.nom_status;
                        } else if (typeof shop.status === 'string') {
                            statusValue = shop.status;
                        }
                    }
                    let logoUrl = null;
                    if (shop.logo && shop.logo.length > 0) {
                        logoUrl = shop.logo[0].url.replace('/uploads/logoboutique/', '/uploads/logo/');
                    }
                    return {
                        _id: shop._id,
                        nom_boutique: shop.nom_boutique || 'Boutique sans nom',
                        description: shop.description_boutique || 'Aucune description disponible',
                        logo: logoUrl,
                        location: shop.location || 'Non défini',
                        rating: shop.rating ?? 4.5,
                        status: statusValue
                    };
                });
                this.displayBoutiques = [...this.boutiques, ...this.boutiques, ...this.boutiques];
                setTimeout(() => this.startCarousel(), 100);
            },
            error: () => {}
        });
    }

    ngOnDestroy() {
        if (this.heroInterval) clearInterval(this.heroInterval);
        if (this.animationId) cancelAnimationFrame(this.animationId);
    }

    goToImage(index: number) { this.currentImageIndex = index; }

    startCarousel() {
        if (this.boutiques.length === 0) return;
        const blockWidth = this.boutiques.length * this.itemWidth;
        this.carouselPosition = 0;

        const animate = (timestamp: number) => {
            if (!this.lastTimestamp) this.lastTimestamp = timestamp;
            const delta = timestamp - this.lastTimestamp;
            this.lastTimestamp = timestamp;

            if (!this.isPaused) {
                this.carouselPosition += this.speed * (delta / 16.67);
                if (this.carouselPosition >= blockWidth * 2) this.carouselPosition -= blockWidth;
            }
            this.animationId = requestAnimationFrame(animate);
        };
        this.animationId = requestAnimationFrame(animate);
    }

    getTrackStyle() { return { transform: `translateX(-${this.carouselPosition}px)` }; }
    pauseCarousel() { this.isPaused = true; }
    resumeCarousel() { this.isPaused = false; this.lastTimestamp = 0; }

    onImageError(event: any) { event.target.src = this.fallbackLogo; }

    getStatusClass(status: string) {
        return { active: status === 'active', pending: status === 'pending', suspend: status === 'suspend' };
    }
    getStatusLabel(status: string): string {
        if (!status) return 'Active';
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
}
