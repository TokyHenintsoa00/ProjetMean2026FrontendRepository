import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { BoutiqueService } from '@/pages/service/boutique.service';
import { Router } from '@angular/router';

@Component({
    selector: 'hero-widget',
    imports: [CommonModule, ButtonModule, RippleModule],
    template: `
        <div
            id="hero"
            class="relative h-screen min-h-[600px] overflow-hidden"
        >
            <!-- Carrousel d'images en arrière-plan avec effet Ken Burns -->
            <div class="absolute inset-0 z-0">
               <div
                    *ngFor="let image of images; let i = index"
                    class="absolute inset-0 transition-all duration-[2000ms] ease-in-out"
                    [class.opacity-100]="currentImageIndex === i"
                    [class.opacity-0]="currentImageIndex !== i"
                    class="absolute inset-0 transition-all duration-[2000ms] ease-in-out
                    scale-100 md:scale-105">
                    <img
                        [src]="image"
                        alt="Background {{i + 1}}"
                        class="
                            w-full h-full object-cover
                            object-[50%_20%]
                            sm:object-[50%_30%]
                            md:object-[center_35%]
                        "
                    />

                    <!-- Gradient overlay moderne -->
                    <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                </div>
            </div>

            <!-- Contenu centré avec glassmorphism -->
            <div class="relative z-10 h-full flex items-center">
                <div class="container mx-auto px-6 lg:px-20">
                    <div class="max-w-3xl">
                        <!-- Badge moderne -->
                        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span class="text-white text-sm font-medium">Nouveau centre commercial</span>
                        </div>

                        <!-- Titre avec animation -->
                        <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in">
                            <span class="text-white">
                                Bienvenue dans
                            </span>
                            <span class="block text-white">
                                Notre Centre Commercial
                            </span>
                        </h1>


                        <!-- Description -->
                        <p class="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                            Découvrez une expérience shopping unique avec plus de 200 boutiques, 
                            restaurants et espaces de loisirs pour toute la famille.
                        </p>

                        <!-- Boutons modernes -->
                        <div class="flex flex-wrap gap-4">
                            <button 
                                pButton 
                                pRipple 
                                type="button" 
                                label="Demande de boutique" 
                                style="background-color: #161d2b !important;"
                                (click)="createBoutiqueByClient()"
                                class="!border !border-blue-500/30 !px-8 !py-4 !text-lg !font-semibold !text-white hover:!border-blue-400/50 hover:brightness-110 transition-all"
                            ></button>
                            
                        </div>

                        <!-- Stats modernessssssss -->
                        <div class="grid grid-cols-3 gap-6 mt-12">
                            <div class="text-center">
                                <div class="text-3xl font-bold text-white mb-1">200+</div>
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

            <!-- Indicateurs modernes en bas -->
            <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
                <button
                    *ngFor="let image of images; let i = index"
                    class="group relative h-1 rounded-full transition-all overflow-hidden cursor-pointer"
                    [class.w-12]="currentImageIndex === i"
                    [class.w-8]="currentImageIndex !== i"
                    (click)="goToImage(i)"
                >
                    <div class="absolute inset-0 bg-white/30"></div>
                    <div 
                        class="absolute inset-0 bg-white transition-all"
                        [class.w-full]="currentImageIndex === i"
                        [class.w-0]="currentImageIndex !== i"
                    ></div>
                </button>
            </div>

            <!-- Flèche scroll down -->
            <div class="absolute bottom-8 right-8 z-20 animate-bounce">
                <div class="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <i class="pi pi-chevron-down text-white"></i>
                </div>
            </div>
        </div>

        <style>
            @keyframes fade-in {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .animate-fade-in {
                animation: fade-in 1s ease-out;
            }
        </style>
    `
})
export class HeroWidget implements OnInit, OnDestroy {
    images: string[] = [
        'assets/images/excited-friends-enjoying-shopping.jpg',
        'assets/images/indoor-hotel-view.jpg',
        'assets/images/young-woman-shopping-clothes.jpg'
    ];

    constructor(
        private boutiqueService:BoutiqueService,
        private router:Router
    ){}

    isDesktop(): boolean {
        return window.innerWidth >= 768;
    }

    createBoutiqueByClient()
    {
        this.router.navigate(['demandeBoutiqueClient']);
    }

    currentImageIndex: number = 0;
    private intervalId: any;

    ngOnInit() {
        this.intervalId = setInterval(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        }, 5000);
    }

    ngOnDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    goToImage(index: number) {
        this.currentImageIndex = index;
    }
}
