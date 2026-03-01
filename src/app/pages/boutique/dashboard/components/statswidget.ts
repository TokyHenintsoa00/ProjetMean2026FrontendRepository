import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeService } from '@/pages/service/commande.service';
import { ProduitService } from '@/pages/service/produit.service';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    template: `
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Commandes</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ totalCommandes }}</div>
                </div>
                <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-shopping-cart text-blue-500 text-xl!"></i>
                </div>
            </div>
            <span class="text-primary font-medium">{{ commandesEnAttente }} </span>
            <span class="text-muted-color">en attente</span>
        </div>
    </div>

    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Chiffre d'affaires</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ chiffreAffaires | number:'1.2-2' }} AR</div>
                </div>
                <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-dollar text-orange-500 text-xl!"></i>
                </div>
            </div>
            <span [class]="caVariation >= 0 ? 'text-green-500 font-medium' : 'text-red-500 font-medium'">
                <i [class]="caVariation >= 0 ? 'pi pi-arrow-up mr-1' : 'pi pi-arrow-down mr-1'"></i>{{ caVariation >= 0 ? '+' : '' }}{{ caVariation | number:'1.0-0' }}%
            </span>
            <span class="text-muted-color"> vs semaine préc.</span>
        </div>
    </div>

    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Produits</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ totalProduits }}</div>
                </div>
                <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-box text-cyan-500 text-xl!"></i>
                </div>
            </div>
            <span class="text-red-500 font-medium">{{ produitsEnRupture }} </span>
            <span class="text-muted-color">en rupture de stock</span>
        </div>
    </div>

    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
        <div class="card mb-0">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">Ticket moyen</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ ticketMoyen | number:'1.2-2' }} AR</div>
                </div>
                <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-chart-line text-purple-500 text-xl!"></i>
                </div>
            </div>
            <span class="text-primary font-medium">{{ commandesLivrees }} </span>
            <span class="text-muted-color">commandes livrées</span>
        </div>
    </div>
    `
})
export class StatsWidget implements OnInit {
    totalCommandes = 0;
    commandesEnAttente = 0;
    commandesLivrees = 0;
    chiffreAffaires = 0;
    totalProduits = 0;
    ticketMoyen = 0;
    caVariation = 0;
    produitsEnRupture = 0;

    constructor(
        private commandeService: CommandeService,
        private produitService: ProduitService
    ) {}

    ngOnInit() {
        this.commandeService.getBoutiqueOrders().subscribe({
            next: (commandes: any[]) => {
                this.totalCommandes = commandes.length;
                this.commandesEnAttente = commandes.filter(c => c.statut === 'en_attente').length;
                this.commandesLivrees = commandes.filter(c => c.statut === 'livree').length;
                const nonAnnulees = commandes.filter(c => c.statut !== 'annulee');
                this.chiffreAffaires = nonAnnulees.reduce((sum, c) => sum + (c.total || 0), 0);
                this.ticketMoyen = nonAnnulees.length > 0 ? this.chiffreAffaires / nonAnnulees.length : 0;

                const now = new Date();
                const startThisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                const startPrevWeek = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
                const caThis = nonAnnulees
                    .filter(c => new Date(c.created_at) >= startThisWeek)
                    .reduce((s, c) => s + (c.total || 0), 0);
                const caPrev = nonAnnulees
                    .filter(c => { const d = new Date(c.created_at); return d >= startPrevWeek && d < startThisWeek; })
                    .reduce((s, c) => s + (c.total || 0), 0);
                this.caVariation = caPrev > 0 ? ((caThis - caPrev) / caPrev) * 100 : (caThis > 0 ? 100 : 0);
            }
        });

        this.produitService.getMyProducts().subscribe({
            next: (produits: any[]) => {
                this.totalProduits = produits.length;
                this.produitsEnRupture = produits.filter(p =>
                    p.variantes?.some((v: any) => v.stock === 0)
                ).length;
            }
        });
    }
}
