import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CommandeService } from '@/pages/service/commande.service';

interface TopProduit {
    nom_produit: string;
    quantite: number;
    ca: number;
    percent: number;
}

@Component({
    standalone: true,
    selector: 'app-best-selling-widget',
    imports: [DecimalPipe],
    template: `
    <div class="card">
        <div class="flex items-center justify-between mb-6">
            <div class="font-semibold text-xl">Top produits vendus</div>
            <span class="text-muted-color text-sm">Par quantité</span>
        </div>

        @if (loading) {
            <div class="flex items-center justify-center py-8 text-muted-color">
                <i class="pi pi-spinner pi-spin mr-2"></i> Chargement...
            </div>
        } @else if (topProduits.length === 0) {
            <div class="flex flex-col items-center justify-center py-8 text-muted-color">
                <i class="pi pi-inbox text-4xl mb-3"></i>
                <span>Aucune vente enregistrée</span>
            </div>
        } @else {
            <ul class="list-none p-0 m-0">
                @for (p of topProduits; track p.nom_produit; let i = $index) {
                    <li class="flex flex-col mb-5">
                        <div class="flex justify-between items-center mb-2">
                            <div class="flex items-center gap-2 min-w-0 flex-1">
                                <span class="w-6 h-6 rounded-full bg-surface-200 dark:bg-surface-600 flex items-center justify-center text-xs font-bold text-surface-700 dark:text-surface-200 flex-shrink-0">
                                    {{ i + 1 }}
                                </span>
                                <span class="font-medium text-surface-900 dark:text-surface-0 truncate">{{ p.nom_produit }}</span>
                            </div>
                            <div class="text-right ml-3 flex-shrink-0">
                                <div class="font-semibold text-surface-900 dark:text-surface-0">{{ p.quantite }} unités</div>
                                <div class="text-xs text-muted-color">{{ p.ca | number:'1.2-2' }} AR</div>
                            </div>
                        </div>
                        <div class="w-full bg-surface-200 dark:bg-surface-600 rounded-full" style="height: 6px;">
                            <div class="h-full rounded-full transition-all duration-500"
                                 [style.width.%]="p.percent"
                                 [style.background-color]="barColors[i]">
                            </div>
                        </div>
                    </li>
                }
            </ul>
        }
    </div>
    `
})
export class BestSellingWidget implements OnInit {
    topProduits: TopProduit[] = [];
    loading = true;
    barColors = ['#6366f1', '#06b6d4', '#f59e0b', '#10b981', '#ec4899'];

    constructor(private commandeService: CommandeService) {}

    ngOnInit() {
        this.commandeService.getBoutiqueOrders().subscribe({
            next: (commandes: any[]) => {
                const map = new Map<string, { quantite: number; ca: number }>();
                for (const c of commandes.filter(c => c.statut !== 'annulee')) {
                    for (const l of (c.lignes || [])) {
                        const key = l.nom_produit || 'Produit';
                        const entry = map.get(key) || { quantite: 0, ca: 0 };
                        entry.quantite += l.quantite || 0;
                        entry.ca += l.sous_total || 0;
                        map.set(key, entry);
                    }
                }
                const sorted = [...map.entries()]
                    .sort((a, b) => b[1].quantite - a[1].quantite)
                    .slice(0, 5);
                const maxQty = sorted[0]?.[1].quantite || 1;
                this.topProduits = sorted.map(([nom_produit, v]) => ({
                    nom_produit,
                    quantite: v.quantite,
                    ca: v.ca,
                    percent: Math.round((v.quantite / maxQty) * 100)
                }));
                this.loading = false;
            },
            error: () => { this.loading = false; }
        });
    }
}
