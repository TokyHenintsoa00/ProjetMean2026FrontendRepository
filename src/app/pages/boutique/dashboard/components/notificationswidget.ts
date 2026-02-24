import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import { ProduitService } from '@/pages/service/produit.service';

interface StockAlert {
    nom_produit: string;
    combinaison_label: string;
    stock: number;
    seuil_alerte: number;
    severity: 'rupture' | 'critique';
}

@Component({
    standalone: true,
    selector: 'app-notifications-widget',
    imports: [ButtonModule, TagModule, RouterModule],
    template: `
    <div class="card" style="height: 100%;">
        <div class="flex items-center justify-between mb-4">
            <div class="font-semibold text-xl">Alertes stock</div>
            @if (alerts.length > 0) {
                <p-tag [value]="alerts.length.toString()" severity="danger" />
            }
        </div>

        @if (loading) {
            <div class="flex items-center justify-center py-8 text-muted-color">
                <i class="pi pi-spinner pi-spin mr-2"></i> Chargement...
            </div>
        } @else if (alerts.length === 0) {
            <div class="flex flex-col items-center justify-center py-8 text-muted-color">
                <i class="pi pi-check-circle text-4xl text-green-500 mb-3"></i>
                <span>Aucune alerte de stock</span>
            </div>
        } @else {
            <ul class="list-none p-0 m-0 overflow-auto" style="max-height: 320px;">
                @for (alert of alerts; track $index) {
                    <li class="flex items-start gap-3 py-3 border-b border-surface last:border-0">
                        <div [class]="alert.severity === 'rupture'
                            ? 'w-10 h-10 flex-shrink-0 flex items-center justify-center bg-red-100 dark:bg-red-400/10 rounded-full'
                            : 'w-10 h-10 flex-shrink-0 flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-full'">
                            <i [class]="alert.severity === 'rupture' ? 'pi pi-times-circle text-red-500' : 'pi pi-exclamation-triangle text-orange-500'"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-medium text-surface-900 dark:text-surface-0 truncate">{{ alert.nom_produit }}</div>
                            <div class="text-sm text-muted-color truncate">{{ alert.combinaison_label }}</div>
                            <div class="flex items-center gap-2 mt-1 flex-wrap">
                                <p-tag
                                    [value]="alert.severity === 'rupture' ? 'Rupture' : 'Critique'"
                                    [severity]="alert.severity === 'rupture' ? 'danger' : 'warn'" />
                                <span class="text-xs text-muted-color">
                                    Stock : {{ alert.stock }} / Seuil : {{ alert.seuil_alerte }}
                                </span>
                            </div>
                        </div>
                    </li>
                }
            </ul>
        }

        <div class="mt-4 pt-4 border-t border-surface">
            <button pButton label="Gérer le stock" icon="pi pi-box" class="w-full" outlined [routerLink]="['/boutique/home/monStock']"></button>
        </div>
    </div>
    `
})
export class NotificationsWidget implements OnInit {
    alerts: StockAlert[] = [];
    loading = true;

    constructor(private produitService: ProduitService) {}

    ngOnInit() {
        this.produitService.getMyProducts().subscribe({
            next: (produits: any[]) => {
                this.alerts = [];
                for (const p of produits) {
                    for (const v of (p.variantes || [])) {
                        if (v.stock === 0) {
                            this.alerts.push({
                                nom_produit: p.nom_produit,
                                combinaison_label: v.combinaison_label || 'Standard',
                                stock: 0,
                                seuil_alerte: v.seuil_alerte || 0,
                                severity: 'rupture'
                            });
                        } else if (v.seuil_alerte > 0 && v.stock <= v.seuil_alerte) {
                            this.alerts.push({
                                nom_produit: p.nom_produit,
                                combinaison_label: v.combinaison_label || 'Standard',
                                stock: v.stock,
                                seuil_alerte: v.seuil_alerte,
                                severity: 'critique'
                            });
                        }
                    }
                }
                // Ruptures en premier
                this.alerts.sort((a, b) => (a.severity === 'rupture' ? -1 : 1));
                this.loading = false;
            },
            error: () => { this.loading = false; }
        });
    }
}
