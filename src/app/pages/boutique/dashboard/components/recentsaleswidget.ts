import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ProduitService } from '@/pages/service/produit.service';

interface StockLine {
    nom: string;
    stock: number;
    prixUnitaire: number;
    valeur: number;
}

@Component({
    standalone: true,
    selector: 'app-recent-sales-widget',
    imports: [DecimalPipe],
    template: `
    <div class="card mb-8!">
        <div class="flex items-center justify-between mb-5">
            <div class="font-semibold text-xl">Valeur du stock</div>
            <div class="text-right">
                <div class="text-2xl font-bold text-surface-900 dark:text-surface-0">{{ valeurTotale | number:'1.2-2' }} AR</div>
                <div class="text-sm text-muted-color">{{ totalUnites }} unités en stock</div>
            </div>
        </div>

        @if (loading) {
            <div class="flex items-center justify-center py-8 text-muted-color">
                <i class="pi pi-spinner pi-spin mr-2"></i> Chargement...
            </div>
        } @else if (lines.length === 0) {
            <div class="flex flex-col items-center justify-center py-8 text-muted-color">
                <i class="pi pi-inbox text-4xl mb-3"></i>
                <span>Aucun stock disponible</span>
            </div>
        } @else {
            @for (line of lines; track line.nom; let last = $last) {
                <div class="flex items-center justify-between py-3" [class.border-b]="!last" [class.border-surface]="!last">
                    <div class="flex-1 min-w-0 mr-4">
                        <div class="font-medium text-surface-900 dark:text-surface-0 truncate">{{ line.nom }}</div>
                        <div class="text-xs text-muted-color mt-0.5">
                            {{ line.stock }} unités × {{ line.prixUnitaire | number:'1.2-2' }} AR
                        </div>
                    </div>
                    <div class="text-right flex-shrink-0">
                        <div class="font-semibold text-surface-900 dark:text-surface-0">{{ line.valeur | number:'1.2-2' }} AR</div>
                        <div class="text-xs text-muted-color">{{ getPercent(line.valeur) | number:'1.0-0' }}%</div>
                    </div>
                </div>
            }
        }
    </div>
    `
})
export class RecentSalesWidget implements OnInit {
    valeurTotale = 0;
    totalUnites = 0;
    lines: StockLine[] = [];
    loading = true;

    constructor(private produitService: ProduitService) {}

    ngOnInit() {
        this.produitService.getMyProducts().subscribe({
            next: (produits: any[]) => {
                const all: StockLine[] = [];
                for (const p of produits) {
                    for (const v of (p.variantes || [])) {
                        const stock = v.stock || 0;
                        if (stock <= 0) continue;
                        const prix = this.getLatestPrix(v);
                        all.push({
                            nom: p.nom_produit + (v.combinaison_label ? ` (${v.combinaison_label})` : ''),
                            stock,
                            prixUnitaire: prix,
                            valeur: stock * prix
                        });
                    }
                }
                all.sort((a, b) => b.valeur - a.valeur);
                this.valeurTotale = all.reduce((s, l) => s + l.valeur, 0);
                this.totalUnites = all.reduce((s, l) => s + l.stock, 0);
                this.lines = all.slice(0, 8);
                this.loading = false;
            },
            error: () => { this.loading = false; }
        });
    }

    getLatestPrix(variante: any): number {
        if (!variante.historique_prix?.length) return 0;
        const sorted = [...variante.historique_prix].sort((a: any, b: any) =>
            new Date(b.date || b.created_at || 0).getTime() - new Date(a.date || a.created_at || 0).getTime()
        );
        return sorted[0].prix_hors_taxe || sorted[0].prix || 0;
    }

    getPercent(valeur: number): number {
        return this.valeurTotale > 0 ? (valeur / this.valeurTotale) * 100 : 0;
    }
}
