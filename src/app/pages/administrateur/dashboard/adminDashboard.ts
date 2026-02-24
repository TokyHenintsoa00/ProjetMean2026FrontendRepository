import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import { CommandeService } from '@/pages/service/commande.service';
import { BoutiqueService } from '@/pages/service/boutique.service';

@Component({
    selector: 'app-adminDashboard',
    standalone: true,
    imports: [CommonModule, TagModule, RouterModule],
    template: `

<!-- ===== WELCOME ===== -->
<div class="ad-welcome">
    <div class="ad-welcome-left">
        <i class="pi pi-shield ad-welcome-icon"></i>
        <div>
            <h1 class="ad-welcome-title">Tableau de bord Admin</h1>
            <p class="ad-welcome-sub">Vue d'ensemble de la plateforme CentreMall</p>
        </div>
    </div>
</div>

<!-- ===== KPI CARDS ===== -->
<div class="ad-kpi-grid">
    <div class="ad-kpi-card ad-kpi-blue">
        <div class="ad-kpi-icon-wrap"><i class="pi pi-shop"></i></div>
        <div class="ad-kpi-body">
            <span class="ad-kpi-label">Total Boutiques</span>
            <span class="ad-kpi-val">{{ totalBoutiques }}</span>
            <span class="ad-kpi-sub">enregistrées</span>
        </div>
    </div>

    <div class="ad-kpi-card ad-kpi-amber">
        <div class="ad-kpi-icon-wrap"><i class="pi pi-shopping-cart"></i></div>
        <div class="ad-kpi-body">
            <span class="ad-kpi-label">Total Commandes</span>
            <span class="ad-kpi-val">{{ stats.totalCommandes }}</span>
            <span class="ad-kpi-sub">toutes boutiques</span>
        </div>
    </div>

    <div class="ad-kpi-card ad-kpi-green">
        <div class="ad-kpi-icon-wrap"><i class="pi pi-dollar"></i></div>
        <div class="ad-kpi-body">
            <span class="ad-kpi-label">Revenu Total</span>
            <span class="ad-kpi-val">{{ stats.revenueTotal | number:'1.0-0' }} <small>DT</small></span>
            <span class="ad-kpi-sub">hors annulées</span>
        </div>
    </div>

    <div class="ad-kpi-card ad-kpi-purple">
        <div class="ad-kpi-icon-wrap"><i class="pi pi-clock"></i></div>
        <div class="ad-kpi-body">
            <span class="ad-kpi-label">Validations en attente</span>
            <span class="ad-kpi-val">{{ boutiquesEnAttente }}</span>
            <span class="ad-kpi-sub">à valider</span>
        </div>
    </div>
</div>

<!-- ===== BOTTOM SECTION ===== -->
<div class="ad-bottom">

    <!-- Top Boutiques -->
    @if (stats.topBoutiques && stats.topBoutiques.length > 0) {
        <div class="ad-card ad-top-boutiques">
            <div class="ad-card-hdr">
                <i class="pi pi-chart-bar"></i>
                <span>Top Boutiques</span>
            </div>
            <div class="ad-top-list">
                @for (b of stats.topBoutiques; track b.nom_boutique; let i = $index) {
                    <div class="ad-top-row">
                        <div class="ad-top-rank">{{ i + 1 }}</div>
                        <div class="ad-top-info">
                            <span class="ad-top-name">{{ b.nom_boutique }}</span>
                            <span class="ad-top-orders">{{ b.count }} commande(s)</span>
                        </div>
                        <span class="ad-top-rev">{{ b.total | number:'1.2-2' }} DT</span>
                    </div>
                }
            </div>
        </div>
    }

    <!-- Recent Orders -->
    <div class="ad-card ad-recent-orders">
        <div class="ad-card-hdr">
            <i class="pi pi-clock"></i>
            <span>Dernières commandes</span>
            <a routerLink="/admin/home/commandes" class="ad-card-link">Voir tout →</a>
        </div>
        <table class="ad-table">
            <thead>
                <tr>
                    <th>N°</th>
                    <th>Client</th>
                    <th>Boutique</th>
                    <th>Total</th>
                    <th>Statut</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                @for (cmd of recentCommandes; track cmd._id) {
                    <tr class="ad-table-row" [routerLink]="['/admin/home/commandes', cmd._id]">
                        <td><span class="ad-order-num">{{ cmd.numero_commande }}</span></td>
                        <td>{{ cmd.client?.prenom_client }} {{ cmd.client?.nom_client }}</td>
                        <td class="ad-muted">{{ cmd.boutique?.nom_boutique }}</td>
                        <td><span class="ad-total">{{ cmd.total | number:'1.2-2' }} DT</span></td>
                        <td><p-tag [value]="getStatutLabel(cmd.statut)" [severity]="getStatutSeverity(cmd.statut)"></p-tag></td>
                        <td class="ad-muted">{{ cmd.created_at | date:'dd/MM/yyyy' }}</td>
                    </tr>
                }
                @if (recentCommandes.length === 0) {
                    <tr><td colspan="6" class="ad-empty-cell">Aucune commande</td></tr>
                }
            </tbody>
        </table>
    </div>
</div>

<style>
.ad-welcome { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem; }
.ad-welcome-left { display:flex; align-items:center; gap:0.75rem; }
.ad-welcome-icon { font-size:2rem; color:#f59e0b; }
.ad-welcome-title { margin:0; font-size:1.5rem; font-weight:800; color:#0f172a; }
.ad-welcome-sub { margin:0; font-size:0.85rem; color:#64748b; }

/* KPI grid */
.ad-kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; margin-bottom:1.25rem; }
.ad-kpi-card { background:white; border-radius:14px; border:1px solid #e2e8f0; padding:1.25rem; display:flex; align-items:center; gap:1rem; box-shadow:0 1px 4px rgba(0,0,0,0.05); transition:transform 0.15s,box-shadow 0.15s; }
.ad-kpi-card:hover { transform:translateY(-2px); box-shadow:0 4px 16px rgba(0,0,0,0.08); }
.ad-kpi-icon-wrap { width:52px; height:52px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:1.4rem; flex-shrink:0; }
.ad-kpi-blue .ad-kpi-icon-wrap { background:#dbeafe; color:#2563eb; }
.ad-kpi-amber .ad-kpi-icon-wrap { background:#fef3c7; color:#f59e0b; }
.ad-kpi-green .ad-kpi-icon-wrap { background:#dcfce7; color:#16a34a; }
.ad-kpi-purple .ad-kpi-icon-wrap { background:#ede9fe; color:#7c3aed; }
.ad-kpi-body { display:flex; flex-direction:column; min-width:0; }
.ad-kpi-label { font-size:0.75rem; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:0.25rem; }
.ad-kpi-val { font-size:1.6rem; font-weight:800; color:#0f172a; line-height:1; margin-bottom:0.2rem; }
.ad-kpi-val small { font-size:0.9rem; font-weight:600; color:#64748b; }
.ad-kpi-sub { font-size:0.72rem; color:#94a3b8; }

/* Bottom section */
.ad-bottom { display:grid; grid-template-columns:300px 1fr; gap:1rem; }
.ad-card { background:white; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 1px 4px rgba(0,0,0,0.05); overflow:hidden; }
.ad-card-hdr { display:flex; align-items:center; gap:0.5rem; padding:1rem 1.25rem; background:#f8fafc; border-bottom:1px solid #e2e8f0; font-size:0.88rem; font-weight:700; color:#0f172a; }
.ad-card-hdr .pi { color:#f59e0b; }
.ad-card-link { margin-left:auto; font-size:0.78rem; color:#0369a1; font-weight:600; text-decoration:none; }
.ad-card-link:hover { text-decoration:underline; }

/* Top boutiques */
.ad-top-list { padding:0.5rem 0; }
.ad-top-row { display:flex; align-items:center; gap:0.75rem; padding:0.7rem 1.25rem; border-bottom:1px solid #f1f5f9; transition:background 0.15s; }
.ad-top-row:hover { background:#fffbeb; }
.ad-top-row:last-child { border-bottom:none; }
.ad-top-rank { width:24px; height:24px; border-radius:50%; background:#0f172a; color:white; font-size:0.72rem; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.ad-top-row:first-child .ad-top-rank { background:#f59e0b; }
.ad-top-info { flex:1; min-width:0; }
.ad-top-name { display:block; font-size:0.85rem; font-weight:600; color:#1e293b; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.ad-top-orders { display:block; font-size:0.72rem; color:#94a3b8; }
.ad-top-rev { font-size:0.85rem; font-weight:700; color:#b45309; white-space:nowrap; }

/* Recent orders table */
.ad-table { width:100%; border-collapse:collapse; }
.ad-table thead tr { background:#f8fafc; }
.ad-table thead th { padding:0.65rem 1rem; font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748b; text-align:left; border-bottom:1px solid #e2e8f0; }
.ad-table-row { border-bottom:1px solid #f1f5f9; cursor:pointer; transition:background 0.15s; }
.ad-table-row:hover { background:#fffbeb; }
.ad-table-row:last-child { border-bottom:none; }
.ad-table-row td { padding:0.75rem 1rem; font-size:0.82rem; vertical-align:middle; }
.ad-order-num { font-weight:700; color:#0369a1; font-family:monospace; font-size:0.8rem; }
.ad-total { font-weight:700; color:#b45309; }
.ad-muted { color:#64748b; }
.ad-empty-cell { text-align:center; padding:2rem; color:#94a3b8; }

@media (max-width:1100px) { .ad-kpi-grid { grid-template-columns:repeat(2,1fr); } .ad-bottom { grid-template-columns:1fr; } }
@media (max-width:600px) { .ad-kpi-grid { grid-template-columns:1fr; } }
</style>
    `
})
export class AdminDashboard implements OnInit {
    stats: any = { totalCommandes: 0, revenueTotal: 0, commandesParStatut: [], topBoutiques: [] };
    totalBoutiques = 0;
    boutiquesEnAttente = 0;
    recentCommandes: any[] = [];

    constructor(
        private commandeService: CommandeService,
        private boutiqueService: BoutiqueService
    ) {}

    ngOnInit() {
        this.commandeService.getStats().subscribe({
            next: (data) => this.stats = data,
            error: (err) => console.error(err)
        });
        this.commandeService.getAllOrders().subscribe({
            next: (data) => this.recentCommandes = data.slice(0, 10),
            error: (err) => console.error(err)
        });
        this.boutiqueService.getBoutiques().subscribe({
            next: (data: any[]) => {
                this.totalBoutiques = data.length;
                this.boutiquesEnAttente = data.filter((b: any) =>
                    b.status_boutique?.nom_status === 'Pending' || b.status_boutique === '6986f4f4e38c7e27ea86c045'
                ).length;
            },
            error: (err) => console.error(err)
        });
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
