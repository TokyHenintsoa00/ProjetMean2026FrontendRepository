import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { CommandeService } from '@/pages/service/commande.service';

@Component({
    selector: 'app-liste-commandes-admin',
    standalone: true,
    imports: [CommonModule, FormsModule, TagModule, ButtonModule, SelectModule, InputTextModule],
    template: `
<!-- ===== HEADER ===== -->
<div class="lc-header">
    <div class="lc-header-left">
        <div class="lc-header-icon"><i class="pi pi-shopping-bag"></i></div>
        <div>
            <h1 class="lc-title">Toutes les commandes</h1>
            <p class="lc-subtitle">{{ filteredCommandes.length }} / {{ commandes.length }} commande(s)</p>
        </div>
    </div>
</div>

<!-- ===== FILTERS ===== -->
<div class="lc-filters">
    <div class="lc-search-wrap">
        <i class="pi pi-search lc-search-icon"></i>
        <input class="lc-search-input" type="text"
               placeholder="Rechercher par N°, client, boutique..."
               [(ngModel)]="searchTerm" (input)="applyFilters()" />
        @if (searchTerm) {
            <button class="lc-search-clear" (click)="searchTerm=''; applyFilters()">
                <i class="pi pi-times"></i>
            </button>
        }
    </div>

    <div class="lc-stat-chips">
        <div class="lc-chip" [class.lc-chip-active]="selectedStatut === null" (click)="selectedStatut=null; applyFilters()">
            Tous <span class="lc-chip-count">{{ commandes.length }}</span>
        </div>
        @for (opt of statutOptions; track opt.value) {
            <div class="lc-chip" [class.lc-chip-active]="selectedStatut === opt.value"
                 (click)="selectedStatut = opt.value; applyFilters()">
                {{ opt.label }}
                <span class="lc-chip-count">{{ countByStatut(opt.value) }}</span>
            </div>
        }
    </div>
</div>

<!-- ===== TABLE ===== -->
@if (filteredCommandes.length > 0) {
    <div class="lc-table-wrap">
        <table class="lc-table">
            <thead>
                <tr>
                    <th>N° Commande</th>
                    <th>Client</th>
                    <th>Boutique</th>
                    <th>Total</th>
                    <th>Statut</th>
                    <th>Date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @for (cmd of filteredCommandes; track cmd._id) {
                    <tr class="lc-row" (click)="goToDetail(cmd)">
                        <td><span class="lc-order-num">{{ cmd.numero_commande }}</span></td>
                        <td>
                            <div class="lc-client">
                                <div class="lc-avatar">{{ getInitials(cmd.client) }}</div>
                                <div>
                                    <span class="lc-client-name">{{ cmd.client?.prenom_client }} {{ cmd.client?.nom_client }}</span>
                                    <span class="lc-client-email">{{ cmd.client?.email }}</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <span class="lc-boutique"><i class="pi pi-shop"></i> {{ cmd.boutique?.nom_boutique }}</span>
                        </td>
                        <td><span class="lc-total">{{ cmd.total | number:'1.2-2' }} AR</span></td>
                        <td><p-tag [value]="getStatutLabel(cmd.statut)" [severity]="getStatutSeverity(cmd.statut)"></p-tag></td>
                        <td>
                            <span class="lc-date">{{ cmd.created_at | date:'dd/MM/yyyy' }}</span>
                            <span class="lc-time">{{ cmd.created_at | date:'HH:mm' }}</span>
                        </td>
                        <td (click)="$event.stopPropagation()">
                            <button class="lc-detail-btn" (click)="goToDetail(cmd)" title="Voir la facture">
                                <i class="pi pi-eye"></i>
                            </button>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    </div>
} @else {
    <div class="lc-empty">
        <i class="pi pi-inbox lc-empty-icon"></i>
        <h3>Aucune commande trouvée</h3>
        <p>Modifiez vos filtres ou attendez de nouvelles commandes.</p>
    </div>
}

<style>
.lc-header { display:flex; align-items:center; margin-bottom:1.25rem; gap:0.75rem; }
.lc-header-left { display:flex; align-items:center; gap:0.75rem; }
.lc-header-icon { width:46px; height:46px; border-radius:12px; background:#fef3c7; display:flex; align-items:center; justify-content:center; font-size:1.3rem; color:#f59e0b; }
.lc-title { margin:0; font-size:1.35rem; font-weight:800; color:#0f172a; }
.lc-subtitle { margin:0; font-size:0.85rem; color:#64748b; }

.lc-filters { display:flex; flex-direction:column; gap:0.75rem; margin-bottom:1.25rem; }
.lc-search-wrap { position:relative; max-width:480px; display:flex; align-items:center; }
.lc-search-icon { position:absolute; left:0.9rem; color:#94a3b8; font-size:0.95rem; }
.lc-search-input { width:100%; padding:0.65rem 2.5rem 0.65rem 2.5rem; border:1.5px solid #e2e8f0; border-radius:8px; background:white; color:#1e293b; font-size:0.875rem; outline:none; transition:border-color 0.2s; }
.lc-search-input:focus { border-color:#f59e0b; }
.lc-search-clear { position:absolute; right:0.75rem; background:none; border:none; cursor:pointer; color:#94a3b8; font-size:0.8rem; padding:0.25rem; }
.lc-search-clear:hover { color:#475569; }

.lc-stat-chips { display:flex; flex-wrap:wrap; gap:0.4rem; }
.lc-chip { display:flex; align-items:center; gap:0.4rem; padding:0.3rem 0.75rem; border-radius:20px; border:1.5px solid #e2e8f0; background:white; font-size:0.78rem; font-weight:500; color:#475569; cursor:pointer; transition:all 0.15s; }
.lc-chip:hover { border-color:#f59e0b; color:#92400e; }
.lc-chip-active { border-color:#f59e0b; background:#fffbeb; color:#92400e; font-weight:700; }
.lc-chip-count { background:#e2e8f0; color:#64748b; font-size:0.65rem; font-weight:700; padding:0.1rem 0.4rem; border-radius:10px; min-width:18px; text-align:center; }
.lc-chip-active .lc-chip-count { background:#f59e0b; color:#1a1a1a; }

.lc-table-wrap { background:white; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 1px 4px rgba(0,0,0,0.05); overflow:hidden; }
.lc-table { width:100%; border-collapse:collapse; }
.lc-table thead tr { background:#f8fafc; border-bottom:1px solid #e2e8f0; }
.lc-table thead th { padding:0.75rem 1rem; font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.07em; color:#64748b; text-align:left; white-space:nowrap; }
.lc-row { border-bottom:1px solid #f1f5f9; cursor:pointer; transition:background 0.15s; }
.lc-row:hover { background:#fffbeb; }
.lc-row:last-child { border-bottom:none; }
.lc-row td { padding:0.85rem 1rem; vertical-align:middle; font-size:0.875rem; }
.lc-order-num { font-weight:700; color:#0369a1; font-family:monospace; font-size:0.82rem; }
.lc-client { display:flex; align-items:center; gap:0.6rem; }
.lc-avatar { width:32px; height:32px; border-radius:50%; background:#e0e7ff; color:#4f46e5; font-size:0.72rem; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.lc-client-name { display:block; font-size:0.875rem; font-weight:600; color:#1e293b; }
.lc-client-email { display:block; font-size:0.72rem; color:#94a3b8; }
.lc-boutique { display:flex; align-items:center; gap:0.35rem; font-size:0.82rem; color:#475569; }
.lc-boutique .pi { color:#94a3b8; font-size:0.8rem; }
.lc-total { font-weight:700; color:#b45309; }
.lc-date { display:block; font-size:0.82rem; font-weight:500; color:#1e293b; }
.lc-time { display:block; font-size:0.72rem; color:#94a3b8; }
.lc-detail-btn { background:none; border:1.5px solid #e2e8f0; border-radius:8px; width:34px; height:34px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#64748b; font-size:0.95rem; transition:all 0.15s; }
.lc-detail-btn:hover { border-color:#f59e0b; color:#f59e0b; background:#fffbeb; }

.lc-empty { text-align:center; padding:3rem; background:white; border-radius:12px; border:1px solid #e2e8f0; color:#64748b; }
.lc-empty-icon { font-size:2.5rem; color:#cbd5e1; display:block; margin-bottom:0.75rem; }
.lc-empty h3 { margin:0 0 0.4rem; color:#0f172a; }
.lc-empty p { margin:0; font-size:0.875rem; }
</style>
    `
})
export class ListeCommandesAdmin implements OnInit {
    commandes: any[] = [];
    filteredCommandes: any[] = [];
    searchTerm = '';
    selectedStatut: string | null = null;

    statutOptions = [
        { label: 'En attente', value: 'en_attente' },
        { label: 'Confirmée', value: 'confirmee' },
        { label: 'En préparation', value: 'en_preparation' },
        { label: 'Prête', value: 'prete' },
        { label: 'Livrée', value: 'livree' },
        { label: 'Annulée', value: 'annulee' }
    ];

    constructor(
        private commandeService: CommandeService,
        private router: Router
    ) {}

    ngOnInit() {
        this.commandeService.getAllOrders().subscribe({
            next: (data) => { this.commandes = data; this.filteredCommandes = data; },
            error: (err) => console.error(err)
        });
    }

    applyFilters() {
        let result = [...this.commandes];
        if (this.selectedStatut) result = result.filter(c => c.statut === this.selectedStatut);
        if (this.searchTerm) {
            const t = this.searchTerm.toLowerCase();
            result = result.filter(c =>
                c.numero_commande?.toLowerCase().includes(t) ||
                c.client?.nom_client?.toLowerCase().includes(t) ||
                c.client?.prenom_client?.toLowerCase().includes(t) ||
                c.boutique?.nom_boutique?.toLowerCase().includes(t)
            );
        }
        this.filteredCommandes = result;
    }

    countByStatut(statut: string): number {
        return this.commandes.filter(c => c.statut === statut).length;
    }

    getInitials(client: any): string {
        if (!client) return '?';
        return ((client.prenom_client?.[0] || '') + (client.nom_client?.[0] || '')).toUpperCase();
    }

    goToDetail(cmd: any) {
        this.router.navigate(['/admin/home/commandes', cmd._id]);
    }

    getStatutLabel(statut: string): string {
        const labels: Record<string, string> = {
            en_attente: 'En attente', confirmee: 'Confirmée', en_preparation: 'En préparation',
            prete: 'Prête', livree: 'Livrée', annulee: 'Annulée'
        };
        return labels[statut] || statut;
    }

    getStatutSeverity(statut: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
        const s: Record<string, 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast'> = {
            en_attente: 'warn', confirmee: 'info', en_preparation: 'info',
            prete: 'success', livree: 'contrast', annulee: 'danger'
        };
        return s[statut] ?? 'info';
    }
}
