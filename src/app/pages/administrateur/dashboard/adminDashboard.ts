// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { TagModule } from 'primeng/tag';
// import { RouterModule } from '@angular/router';
// import { CommandeService } from '@/pages/service/commande.service';
// import { BoutiqueService } from '@/pages/service/boutique.service';
// import { DashboardAminService } from '@/pages/service/DasboardAdmin.service';
// import { Chart } from 'chart.js/auto';
// @Component({
//     selector: 'app-adminDashboard',
//     standalone: true,
//     imports: [CommonModule, TagModule, RouterModule],
//     template: `

// <!-- ===== WELCOME ===== -->
// <div class="ad-welcome">
//     <div class="ad-welcome-left">
//         <i class="pi pi-shield ad-welcome-icon"></i>
//         <div>
//             <h1 class="ad-welcome-title">Tableau de bord Admin</h1>
//             <p class="ad-welcome-sub">Vue d'ensemble de la plateforme CentreMall</p>
//         </div>
//     </div>
// </div>

// <!-- ===== KPI CARDS ===== -->
// <div class="ad-kpi-grid">
//     <div class="ad-kpi-card ad-kpi-blue">
//         <div class="ad-kpi-icon-wrap"><i class="pi pi-shop"></i></div>
//         <div class="ad-kpi-body">
//             <span class="ad-kpi-label">Total Boutiques</span>
//             <span class="ad-kpi-val">{{ totalBoutiques }}</span>
//             <span class="ad-kpi-sub">enregistrées</span>
//         </div>
//     </div>

//     <div class="ad-kpi-card ad-kpi-amber">
//         <div class="ad-kpi-icon-wrap"><i class="pi pi-shopping-cart"></i></div>
//         <div class="ad-kpi-body">
//             <span class="ad-kpi-label">Total Commandes</span>
//             <span class="ad-kpi-val">{{ stats.totalCommandes }}</span>
//             <span class="ad-kpi-sub">toutes boutiques</span>
//         </div>
//     </div>

//     <div class="ad-kpi-card ad-kpi-green">
//         <div class="ad-kpi-icon-wrap"><i class="pi pi-dollar"></i></div>
//         <div class="ad-kpi-body">
//             <span class="ad-kpi-label">Revenu Total</span>
//             <span class="ad-kpi-val">{{ stats.revenueTotal | number:'1.0-0' }} <small>DT</small></span>
//             <span class="ad-kpi-sub">hors annulées</span>
//         </div>
//     </div>

//     <div class="ad-kpi-card ad-kpi-purple">
//         <div class="ad-kpi-icon-wrap"><i class="pi pi-clock"></i></div>
//         <div class="ad-kpi-body">
//             <span class="ad-kpi-label">Validations en attente</span>
//             <span class="ad-kpi-val">{{ boutiquesEnAttente }}</span>
//             <span class="ad-kpi-sub">à valider</span>
//         </div>
//     </div>
// </div>
// <!-- ===== BOTTOM SECTION ===== -->
// <div class="ad-card ad-chart-card" style="margin-bottom: 1rem;">
//     <div class="ad-card-hdr">
//         <i class="pi pi-chart-line"></i>
//         <span>Statistiques Utilisateurs</span>
//         <div class="ad-filter">
//             <button (click)="changeFilter('month')" [class.active]="filterType === 'month'">Par Mois</button>
//             <button (click)="changeFilter('year')" [class.active]="filterType === 'year'">Par Année</button>
//             @if (filterType === 'month') {
//                 <select (change)="changeYear(+$any($event.target).value)">
//                     @for (y of availableYears; track y) {
//                         <option [value]="y" [selected]="y === selectedYear">{{ y }}</option>
//                     }
//                 </select>
//             }
//         </div>
//     </div>
//     <div class="ad-chart-body">
//         <canvas #userChartCanvas></canvas>
//     </div>
// </div>

// <div class="ad-bottom">

//     <!-- Recent Orders pleine largeur -->
//     <div class="ad-card ad-recent-orders ad-recent-full">
//         <div class="ad-card-hdr">
//             <i class="pi pi-clock"></i>
//             <span>Dernières commandes</span>
//             <a routerLink="/admin/home/commandes" class="ad-card-link">Voir tout →</a>
//         </div>
//         <table class="ad-table">
//             <thead>
//                 <tr>
//                     <th>N°</th>
//                     <th>Client</th>
//                     <th>Boutique</th>
//                     <th>Total</th>
//                     <th>Statut</th>
//                     <th>Date</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 @for (cmd of recentCommandes; track cmd._id) {
//                     <tr class="ad-table-row" [routerLink]="['/admin/home/commandes', cmd._id]">
//                         <td><span class="ad-order-num">{{ cmd.numero_commande }}</span></td>
//                         <td>{{ cmd.client?.prenom_client }} {{ cmd.client?.nom_client }}</td>
//                         <td class="ad-muted">{{ cmd.boutique?.nom_boutique }}</td>
//                         <td><span class="ad-total">{{ cmd.total | number:'1.2-2' }} DT</span></td>
//                         <td><p-tag [value]="getStatutLabel(cmd.statut)" [severity]="getStatutSeverity(cmd.statut)"></p-tag></td>
//                         <td class="ad-muted">{{ cmd.created_at | date:'dd/MM/yyyy' }}</td>
//                     </tr>
//                 }
//                 @if (recentCommandes.length === 0) {
//                     <tr><td colspan="6" class="ad-empty-cell">Aucune commande</td></tr>
//                 }
//             </tbody>
//         </table>
//     </div>

//     <!-- Top Boutiques -->
//     @if (stats.topBoutiques && stats.topBoutiques.length > 0) {
//         <div class="ad-card ad-top-boutiques">
//             <div class="ad-card-hdr">
//                 <i class="pi pi-chart-bar"></i>
//                 <span>Top Boutiques</span>
//             </div>
//             <div class="ad-top-list">
//                 @for (b of stats.topBoutiques; track b.nom_boutique; let i = $index) {
//                     <div class="ad-top-row">
//                         <div class="ad-top-rank">{{ i + 1 }}</div>
//                         <div class="ad-top-info">
//                             <span class="ad-top-name">{{ b.nom_boutique }}</span>
//                             <span class="ad-top-orders">{{ b.count }} commande(s)</span>
//                         </div>
//                         <span class="ad-top-rev">{{ b.total | number:'1.2-2' }} DT</span>
//                     </div>
//                 }
//             </div>
//         </div>
//     }

// </div>
// <style>
// .ad-welcome { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem; }
// .ad-welcome-left { display:flex; align-items:center; gap:0.75rem; }
// .ad-welcome-icon { font-size:2rem; color:#f59e0b; }
// .ad-welcome-title { margin:0; font-size:1.5rem; font-weight:800; color:#0f172a; }
// .ad-welcome-sub { margin:0; font-size:0.85rem; color:#64748b; }

// /* KPI grid */
// .ad-kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; margin-bottom:1.25rem; }
// .ad-kpi-card { background:white; border-radius:14px; border:1px solid #e2e8f0; padding:1.25rem; display:flex; align-items:center; gap:1rem; box-shadow:0 1px 4px rgba(0,0,0,0.05); transition:transform 0.15s,box-shadow 0.15s; }
// .ad-kpi-card:hover { transform:translateY(-2px); box-shadow:0 4px 16px rgba(0,0,0,0.08); }
// .ad-kpi-icon-wrap { width:52px; height:52px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:1.4rem; flex-shrink:0; }
// .ad-kpi-blue .ad-kpi-icon-wrap { background:#dbeafe; color:#2563eb; }
// .ad-kpi-amber .ad-kpi-icon-wrap { background:#fef3c7; color:#f59e0b; }
// .ad-kpi-green .ad-kpi-icon-wrap { background:#dcfce7; color:#16a34a; }
// .ad-kpi-purple .ad-kpi-icon-wrap { background:#ede9fe; color:#7c3aed; }
// .ad-kpi-body { display:flex; flex-direction:column; min-width:0; }
// .ad-kpi-label { font-size:0.75rem; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:0.25rem; }
// .ad-kpi-val { font-size:1.6rem; font-weight:800; color:#0f172a; line-height:1; margin-bottom:0.2rem; }
// .ad-kpi-val small { font-size:0.9rem; font-weight:600; color:#64748b; }
// .ad-kpi-sub { font-size:0.72rem; color:#94a3b8; }

// /* Bottom section */
// .ad-bottom {
//     display: grid;
//     grid-template-columns: 1fr 300px; /* Recent orders large, Top Boutiques à droite */
//     gap: 1rem;
//     margin-bottom: 1rem;
// }
// .ad-card { background:white; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 1px 4px rgba(0,0,0,0.05); overflow:hidden; }
// .ad-card-hdr { display:flex; align-items:center; gap:0.5rem; padding:1rem 1.25rem; background:#f8fafc; border-bottom:1px solid #e2e8f0; font-size:0.88rem; font-weight:700; color:#0f172a; }
// .ad-card-hdr .pi { color:#f59e0b; }
// .ad-card-link { margin-left:auto; font-size:0.78rem; color:#0369a1; font-weight:600; text-decoration:none; }
// .ad-card-link:hover { text-decoration:underline; }

// /* Top boutiques */
// .ad-top-list { padding:0.5rem 0; }
// .ad-top-row { display:flex; align-items:center; gap:0.75rem; padding:0.7rem 1.25rem; border-bottom:1px solid #f1f5f9; transition:background 0.15s; }
// .ad-top-row:hover { background:#fffbeb; }
// .ad-top-row:last-child { border-bottom:none; }
// .ad-top-rank { width:24px; height:24px; border-radius:50%; background:#0f172a; color:white; font-size:0.72rem; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
// .ad-top-row:first-child .ad-top-rank { background:#f59e0b; }
// .ad-top-info { flex:1; min-width:0; }
// .ad-top-name { display:block; font-size:0.85rem; font-weight:600; color:#1e293b; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
// .ad-top-orders { display:block; font-size:0.72rem; color:#94a3b8; }
// .ad-top-rev { font-size:0.85rem; font-weight:700; color:#b45309; white-space:nowrap; }

// /* Recent orders table */
// .ad-table { width:100%; border-collapse:collapse; }
// .ad-table thead tr { background:#f8fafc; }
// .ad-table thead th { padding:0.65rem 1rem; font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748b; text-align:left; border-bottom:1px solid #e2e8f0; }
// .ad-table-row { border-bottom:1px solid #f1f5f9; cursor:pointer; transition:background 0.15s; }
// .ad-table-row:hover { background:#fffbeb; }
// .ad-table-row:last-child { border-bottom:none; }
// .ad-table-row td { padding:0.75rem 1rem; font-size:0.82rem; vertical-align:middle; }
// .ad-order-num { font-weight:700; color:#0369a1; font-family:monospace; font-size:0.8rem; }
// .ad-total { font-weight:700; color:#b45309; }
// .ad-muted { color:#64748b; }
// .ad-empty-cell { text-align:center; padding:2rem; color:#94a3b8; }

// @media (max-width:1100px) { .ad-kpi-grid { grid-template-columns:repeat(2,1fr); } .ad-bottom { grid-template-columns:1fr; } }
// @media (max-width:600px) { .ad-kpi-grid { grid-template-columns:1fr; } }



// /* Chart body avec hauteur fixe */
// .ad-chart-body {
//     padding: 1rem 1.25rem 1.25rem;
//     height: 260px;
//     position: relative;
// }

// /* Boutons filtre Par Mois / Par Année */
// .ad-filter {
//     margin-left: auto;
//     display: flex;
//     align-items: center;
//     gap: 0.4rem;
// }
// .ad-filter button {
//     padding: 0.28rem 0.75rem;
//     border-radius: 20px;
//     border: 1.5px solid #e2e8f0;
//     background: white;
//     font-size: 0.73rem;
//     font-weight: 600;
//     color: #64748b;
//     cursor: pointer;
//     transition: all 0.15s;
// }
// .ad-filter button.active {
//     background: #f59e0b;
//     border-color: #f59e0b;
//     color: white;
//     box-shadow: 0 2px 8px rgba(245,158,11,0.3);
// }
// .ad-filter button:hover:not(.active) {
//     border-color: #f59e0b;
//     color: #b45309;
// }
// .ad-filter select {
//     padding: 0.28rem 0.6rem;
//     border-radius: 8px;
//     border: 1.5px solid #e2e8f0;
//     font-size: 0.73rem;
//     color: #475569;
//     background: white;
//     cursor: pointer;
//     outline: none;
//     transition: border-color 0.15s;
// }
// .ad-filter select:focus {
//     border-color: #f59e0b;
// }









// </style>
//     `
// })
// export class AdminDashboard implements OnInit {
//     stats: any = { totalCommandes: 0, revenueTotal: 0, commandesParStatut: [], topBoutiques: [] };
//     totalBoutiques = 0;
//     boutiquesEnAttente = 0;
//     recentCommandes: any[] = [];
//     @ViewChild('userChartCanvas') userChartCanvas!: ElementRef;

//     chart: any;
//     filterType: 'month' | 'year' = 'month';

//     selectedYear = new Date().getFullYear();
//     availableYears: number[] = [];
    
//     constructor(
//         private commandeService: CommandeService,
//         private boutiqueService: BoutiqueService,
//          private dashboardAdminService: DashboardAminService
//     ) {}

//     ngOnInit() {

//         this.initChartData();

//         this.commandeService.getStats().subscribe({
//             next: (data) => this.stats = data,
//             error: (err) => console.error(err)
//         });
//         this.commandeService.getAllOrders().subscribe({
//             next: (data) => this.recentCommandes = data.slice(0, 10),
//             error: (err) => console.error(err)
//         });
//         this.boutiqueService.getBoutiques().subscribe({
//             next: (data: any[]) => {
//                 this.totalBoutiques = data.length;
//                 this.boutiquesEnAttente = data.filter((b: any) =>
//                     b.status_boutique?.nom_status === 'Pending' || b.status_boutique === '6986f4f4e38c7e27ea86c045'
//                 ).length;
//             },
//             error: (err) => console.error(err)
//         });
//     }

//     initChartData() {
//     this.dashboardAdminService.getUsersByYear().subscribe(res => {
//         this.availableYears = res.data.map((d: any) => d.year);

//         // Sélectionne l'année courante si disponible, sinon la dernière
//         const currentYear = new Date().getFullYear();
//         this.selectedYear = this.availableYears.includes(currentYear)
//             ? currentYear
//             : this.availableYears[this.availableYears.length - 1];

//         this.loadChart();
//     });
// }

//    loadChart() {
//     const MOIS = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];

//     if (this.filterType === 'month') {
//         this.dashboardAdminService.getUsersByMonth().subscribe(res => {
//             const filtered = res.data.filter((d: any) => d.year === this.selectedYear);

//             const monthData = Array(12).fill(0);
//             filtered.forEach((d: any) => {
//                 monthData[d.month - 1] = d.total;
//             });

//             // setTimeout garantit que le canvas est dans le DOM avant de dessiner
//             setTimeout(() => this.createChart(MOIS, monthData), 0);
//         });
//     } else {
//         this.dashboardAdminService.getUsersByYear().subscribe(res => {
//             const labels = res.data.map((d: any) => String(d.year));
//             const data   = res.data.map((d: any) => d.total);
//             setTimeout(() => this.createChart(labels, data), 0);
//         });
//     }
// }
// changeFilter(type: 'month' | 'year') {
//     this.filterType = type;
//     this.loadChart();
// }
// changeYear(year: any) {
//     this.selectedYear = +year; // + force la conversion string → number
//     this.loadChart();
// }
    
//     createChart(labels: any[], data: any[]) {
//     // Sécurité : on ne dessine que si le canvas existe vraiment
//     if (!this.userChartCanvas?.nativeElement) return;

//     if (this.chart) {
//         this.chart.destroy();
//         this.chart = null;
//     }

//     const canvas   = this.userChartCanvas.nativeElement;
//     const ctx      = canvas.getContext('2d');

//     const gradient = ctx.createLinearGradient(0, 0, 0, 300);
//     gradient.addColorStop(0,    'rgba(245, 158, 11, 0.30)');
//     gradient.addColorStop(0.65, 'rgba(245, 158, 11, 0.06)');
//     gradient.addColorStop(1,    'rgba(245, 158, 11, 0)');

//     this.chart = new Chart(canvas, {
//         type: 'line',
//         data: {
//             labels,
//             datasets: [{
//                 label: 'Utilisateurs',
//                 data,
//                 fill: true,
//                 backgroundColor: gradient,
//                 borderColor: '#f59e0b',
//                 pointBackgroundColor: '#ffffff',
//                 pointBorderColor: '#f59e0b',
//                 pointBorderWidth: 2.5,
//                 pointRadius: 5,
//                 pointHoverRadius: 8,
//                 pointHoverBackgroundColor: '#f59e0b',
//                 pointHoverBorderColor: '#ffffff',
//                 pointHoverBorderWidth: 2,
//                 tension: 0.45,
//                 borderWidth: 2.5
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             animation: { duration: 700, easing: 'easeInOutQuart' },
//             interaction: { mode: 'index', intersect: false },
//             plugins: {
//                 legend: {
//                     display: true,
//                     position: 'top',
//                     align: 'end',
//                     labels: {
//                         color: '#64748b',
//                         font: { size: 12, weight: 'bold' },
//                         usePointStyle: true,
//                         pointStyle: 'circle'
//                     }
//                 },
//                 tooltip: {
//                     backgroundColor: '#0f172a',
//                     titleColor: '#f59e0b',
//                     bodyColor: '#e2e8f0',
//                     borderColor: 'rgba(245,158,11,0.3)',
//                     borderWidth: 1,
//                     padding: 12,
//                     cornerRadius: 10,
//                     displayColors: false,
//                     callbacks: {
//                         title: (items) => `📅 ${items[0].label}`,
//                         label: (item)  => `👤 ${item.formattedValue} utilisateur(s)`
//                     }
//                 }
//             },
//             scales: {
//                 x: {
//                     grid:   { display: false },
//                     border: { display: false },
//                     ticks:  { color: '#94a3b8', font: { size: 11, weight: 'bold' } }
//                 },
//                 y: {
//                     beginAtZero: true,
//                     grid:   { color: '#f1f5f9' },
//                     border: { display: false, dash: [4, 4] },
//                     ticks:  { color: '#94a3b8', font: { size: 11 }, stepSize: 1, padding: 8 }
//                 }
//             }
//         }
//     });
// }    


//     getStatutLabel(statut: string): string {
//         const labels: Record<string, string> = {
//             en_attente: 'En attente', confirmee: 'Confirmée', en_preparation: 'En préparation',
//             prete: 'Prête', livree: 'Livrée', annulee: 'Annulée'
//         };
//         return labels[statut] || statut;
//     }

//     getStatutSeverity(statut: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
//         const s: Record<string, 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast'> = {
//             en_attente: 'warn', confirmee: 'info', en_preparation: 'info',
//             prete: 'success', livree: 'contrast', annulee: 'danger'
//         };
//         return s[statut] ?? 'info';
//     }
// }



import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule }                              from '@angular/common';
import { RouterModule }                              from '@angular/router';
import { TagModule }                                 from 'primeng/tag';
import { Chart }                                     from 'chart.js/auto';

import { CommandeService }      from '@/pages/service/commande.service';
import { BoutiqueService }      from '@/pages/service/boutique.service';
import { DashboardAminService } from '@/pages/service/DasboardAdmin.service';

/* ─────────────────────────────────────────────
   Types locaux
───────────────────────────────────────────── */
type StatutSeverity = 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast';

const STATUT_LABELS: Record<string, string> = {
    en_attente    : 'En attente',
    confirmee     : 'Confirmée',
    en_preparation: 'En préparation',
    prete         : 'Prête',
    livree        : 'Livrée',
    annulee       : 'Annulée',
};

const STATUT_SEVERITIES: Record<string, StatutSeverity> = {
    en_attente    : 'warn',
    confirmee     : 'info',
    en_preparation: 'info',
    prete         : 'success',
    livree        : 'contrast',
    annulee       : 'danger',
};

const MOIS = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];

const ROLE_FILTERS: { label: string; id: string | null }[] = [
    { label: 'Tous',    id: null },
    { label: 'Manager', id: '697b0d19b784b5da2ab3ba22' },
    { label: 'Client',  id: '697b0d46b784b5da2ab3ba24' },
];

/* ─────────────────────────────────────────────
   Composant
───────────────────────────────────────────── */
@Component({
    selector   : 'app-adminDashboard',
    standalone : true,
    imports    : [CommonModule, TagModule, RouterModule],
    template   : `

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

<!-- ===== CHART ===== -->
<div class="ad-card ad-chart-card" style="margin-bottom: 1rem;">
    <div class="ad-card-hdr">
        <i class="pi pi-chart-line"></i>
        <span>Statistiques Utilisateurs</span>

        <div class="ad-filter">
            <!-- Filtre période -->
            <button (click)="changeFilter('month')" [class.active]="filterType === 'month'">Par Mois</button>
            <button (click)="changeFilter('year')"  [class.active]="filterType === 'year'">Par Année</button>

            @if (filterType === 'month') {
                <select (change)="changeYear(+$any($event.target).value)">
                    @for (y of availableYears; track y) {
                        <option [value]="y" [selected]="y === selectedYear">{{ y }}</option>
                    }
                </select>
            }

            <!-- Séparateur -->
            <span class="ad-filter-sep"></span>

            <!-- Filtre rôle -->
            <select (change)="changeRole($any($event.target).value || null)" class="ad-filter-role-select">
                @for (r of roleFilters; track r.label) {
                    <option [value]="r.id ?? ''" [selected]="selectedRole === r.id">
                        {{ r.label }}
                    </option>
                }
            </select>
        </div>
    </div>

    <div class="ad-chart-body">
        <canvas #userChartCanvas></canvas>
    </div>
</div>

<!-- ===== BOTTOM SECTION ===== -->
<div class="ad-bottom">

    <!-- Dernières commandes -->
    <div class="ad-card ad-recent-orders ad-recent-full">
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
                        <td>
                            <p-tag
                                [value]="getStatutLabel(cmd.statut)"
                                [severity]="getStatutSeverity(cmd.statut)">
                            </p-tag>
                        </td>
                        <td class="ad-muted">{{ cmd.created_at | date:'dd/MM/yyyy' }}</td>
                    </tr>
                }

                @if (recentCommandes.length === 0) {
                    <tr><td colspan="6" class="ad-empty-cell">Aucune commande</td></tr>
                }
            </tbody>
        </table>
    </div>

    <!-- Top Boutiques -->
    @if (stats.topBoutiques?.length > 0) {
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

</div>

<style>
/* ── Welcome ── */
.ad-welcome         { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem; }
.ad-welcome-left    { display:flex; align-items:center; gap:0.75rem; }
.ad-welcome-icon    { font-size:2rem; color:#f59e0b; }
.ad-welcome-title   { margin:0; font-size:1.5rem; font-weight:800; color:#0f172a; }
.ad-welcome-sub     { margin:0; font-size:0.85rem; color:#64748b; }

/* ── KPI Grid ── */
.ad-kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; margin-bottom:1.25rem; }

.ad-kpi-card        { background:white; border-radius:14px; border:1px solid #e2e8f0; padding:1.25rem; display:flex; align-items:center; gap:1rem; box-shadow:0 1px 4px rgba(0,0,0,0.05); transition:transform 0.15s, box-shadow 0.15s; }
.ad-kpi-card:hover  { transform:translateY(-2px); box-shadow:0 4px 16px rgba(0,0,0,0.08); }

.ad-kpi-icon-wrap               { width:52px; height:52px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:1.4rem; flex-shrink:0; }
.ad-kpi-blue   .ad-kpi-icon-wrap { background:#dbeafe; color:#2563eb; }
.ad-kpi-amber  .ad-kpi-icon-wrap { background:#fef3c7; color:#f59e0b; }
.ad-kpi-green  .ad-kpi-icon-wrap { background:#dcfce7; color:#16a34a; }
.ad-kpi-purple .ad-kpi-icon-wrap { background:#ede9fe; color:#7c3aed; }

.ad-kpi-body  { display:flex; flex-direction:column; min-width:0; }
.ad-kpi-label { font-size:0.75rem; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:0.25rem; }
.ad-kpi-val   { font-size:1.6rem; font-weight:800; color:#0f172a; line-height:1; margin-bottom:0.2rem; }
.ad-kpi-val small { font-size:0.9rem; font-weight:600; color:#64748b; }
.ad-kpi-sub   { font-size:0.72rem; color:#94a3b8; }

/* ── Card base ── */
.ad-card        { background:white; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 1px 4px rgba(0,0,0,0.05); overflow:hidden; }
.ad-card-hdr    { display:flex; align-items:center; gap:0.5rem; padding:1rem 1.25rem; background:#f8fafc; border-bottom:1px solid #e2e8f0; font-size:0.88rem; font-weight:700; color:#0f172a; }
.ad-card-hdr .pi { color:#f59e0b; }
.ad-card-link   { margin-left:auto; font-size:0.78rem; color:#0369a1; font-weight:600; text-decoration:none; }
.ad-card-link:hover { text-decoration:underline; }

/* ── Chart ── */
.ad-chart-body { padding:1rem 1.25rem 1.25rem; height:260px; position:relative; }

/* ── Filter ── */
.ad-filter       { margin-left:auto; display:flex; align-items:center; gap:0.4rem; }
.ad-filter button { padding:0.28rem 0.75rem; border-radius:20px; border:1.5px solid #e2e8f0; background:white; font-size:0.73rem; font-weight:600; color:#64748b; cursor:pointer; transition:all 0.15s; }
.ad-filter button.active            { background:#f59e0b; border-color:#f59e0b; color:white; box-shadow:0 2px 8px rgba(245,158,11,0.3); }
.ad-filter button:hover:not(.active) { border-color:#f59e0b; color:#b45309; }
.ad-filter select { padding:0.28rem 0.6rem; border-radius:8px; border:1.5px solid #e2e8f0; font-size:0.73rem; color:#475569; background:white; cursor:pointer; outline:none; transition:border-color 0.15s; }
.ad-filter select:focus { border-color:#f59e0b; }
.ad-filter-sep          { width:1px; height:18px; background:#e2e8f0; margin:0 0.15rem; }

/* Dropdown rôle */
.ad-filter-role-select         { padding:0.28rem 0.6rem; border-radius:8px; border:1.5px solid #e2e8f0; font-size:0.73rem; color:#475569; background:white; cursor:pointer; outline:none; transition:border-color 0.15s, color 0.15s; font-weight:600; }
.ad-filter-role-select:focus   { border-color:#f59e0b; }
.ad-filter-role-select:hover   { border-color:#f59e0b; color:#b45309; }

/* ── Bottom layout ── */
.ad-bottom { display:grid; grid-template-columns:1fr 300px; gap:1rem; margin-bottom:1rem; }

/* ── Table ── */
.ad-table              { width:100%; border-collapse:collapse; }
.ad-table thead tr     { background:#f8fafc; }
.ad-table thead th     { padding:0.65rem 1rem; font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748b; text-align:left; border-bottom:1px solid #e2e8f0; }
.ad-table-row          { border-bottom:1px solid #f1f5f9; cursor:pointer; transition:background 0.15s; }
.ad-table-row:hover    { background:#fffbeb; }
.ad-table-row:last-child { border-bottom:none; }
.ad-table-row td       { padding:0.75rem 1rem; font-size:0.82rem; vertical-align:middle; }
.ad-order-num          { font-weight:700; color:#0369a1; font-family:monospace; font-size:0.8rem; }
.ad-total              { font-weight:700; color:#b45309; }
.ad-muted              { color:#64748b; }
.ad-empty-cell         { text-align:center; padding:2rem; color:#94a3b8; }

/* ── Top boutiques ── */
.ad-top-list               { padding:0.5rem 0; }
.ad-top-row                { display:flex; align-items:center; gap:0.75rem; padding:0.7rem 1.25rem; border-bottom:1px solid #f1f5f9; transition:background 0.15s; }
.ad-top-row:hover          { background:#fffbeb; }
.ad-top-row:last-child     { border-bottom:none; }
.ad-top-rank               { width:24px; height:24px; border-radius:50%; background:#0f172a; color:white; font-size:0.72rem; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.ad-top-row:first-child .ad-top-rank { background:#f59e0b; }
.ad-top-info               { flex:1; min-width:0; }
.ad-top-name               { display:block; font-size:0.85rem; font-weight:600; color:#1e293b; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.ad-top-orders             { display:block; font-size:0.72rem; color:#94a3b8; }
.ad-top-rev                { font-size:0.85rem; font-weight:700; color:#b45309; white-space:nowrap; }

/* ── Responsive ── */
@media (max-width: 1100px) {
    .ad-kpi-grid { grid-template-columns: repeat(2, 1fr); }
    .ad-bottom   { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
    .ad-kpi-grid { grid-template-columns: 1fr; }
}
</style>
    `
})
export class AdminDashboard implements OnInit {

    /* ── State ── */
    stats: any = {
        totalCommandes   : 0,
        revenueTotal     : 0,
        commandesParStatut: [],
        topBoutiques     : [],
    };

    totalBoutiques      = 0;
    boutiquesEnAttente  = 0;
    recentCommandes: any[] = [];

    /* ── Chart ── */
    @ViewChild('userChartCanvas') userChartCanvas!: ElementRef;
    chart: Chart | null = null;

    filterType    : 'month' | 'year' = 'month';
    selectedYear  : number = new Date().getFullYear();
    availableYears: number[] = [];
    selectedRole  : string | null = null;
    readonly roleFilters = ROLE_FILTERS;

    /* ─────────────────────────────────────────── */
    constructor(
        private commandeService     : CommandeService,
        private boutiqueService     : BoutiqueService,
        private dashboardAdminService: DashboardAminService,
    ) {}

    /* ─────────────────────────────────────────── */
    ngOnInit(): void {
        this.initChartData();
        this.loadStats();
        this.loadRecentOrders();
        this.loadBoutiques();
    }

    /* ── Data loaders ── */
    private loadStats(): void {
        this.commandeService.getStats().subscribe({
            next : (data) => this.stats = data,
            error: (err)  => console.error(err),
        });
    }

    private loadRecentOrders(): void {
        this.commandeService.getAllOrders().subscribe({
            next : (data) => this.recentCommandes = data.slice(0, 10),
            error: (err)  => console.error(err),
        });
    }

    private loadBoutiques(): void {
        this.boutiqueService.getBoutiques().subscribe({
            next: (data: any[]) => {
                this.totalBoutiques     = data.length;
                this.boutiquesEnAttente = data.filter((b: any) =>
                    b.status_boutique?.nom_status === 'Pending' ||
                    b.status_boutique             === '6986f4f4e38c7e27ea86c045'
                ).length;
            },
            error: (err) => console.error(err),
        });
    }

    /* ── Chart init ── */
    private initChartData(): void {
        this.dashboardAdminService.getUsersByYear(this.selectedRole).subscribe(res => {
            this.availableYears = res.data.map((d: any) => d.year);

            const currentYear  = new Date().getFullYear();
            this.selectedYear  = this.availableYears.includes(currentYear)
                ? currentYear
                : this.availableYears[this.availableYears.length - 1];

            this.loadChart();
        });
    }

    private loadChart(): void {
        if (this.filterType === 'month') {
            this.dashboardAdminService.getUsersByMonth(this.selectedRole).subscribe(res => {
                const monthData = Array(12).fill(0);

                res.data
                    .filter((d: any) => d.year === this.selectedYear)
                    .forEach((d: any) => { monthData[d.month - 1] = d.total; });

                setTimeout(() => this.createChart(MOIS, monthData), 0);
            });
        } else {
            this.dashboardAdminService.getUsersByYear(this.selectedRole).subscribe(res => {
                const labels = res.data.map((d: any) => String(d.year));
                const data   = res.data.map((d: any) => d.total);
                setTimeout(() => this.createChart(labels, data), 0);
            });
        }
    }

    /* ── Chart creation ── */
    private createChart(labels: string[], data: number[]): void {
        if (!this.userChartCanvas?.nativeElement) return;

        this.chart?.destroy();
        this.chart = null;

        const canvas  = this.userChartCanvas.nativeElement;
        const ctx     = canvas.getContext('2d');

        /* Couleur dynamique selon le rôle sélectionné */
        const COLOR_MAP: Record<string, string> = {
            '697b0d19b784b5da2ab3ba22': '#7c3aed', // Manager → violet
            '697b0d46b784b5da2ab3ba24': '#0369a1', // Client  → bleu
        };
        const mainColor = this.selectedRole ? (COLOR_MAP[this.selectedRole] ?? '#f59e0b') : '#f59e0b';
        const rgbMap: Record<string, string> = {
            '#7c3aed': '124,58,237',
            '#0369a1': '3,105,161',
            '#f59e0b': '245,158,11',
        };
        const rgb = rgbMap[mainColor];

        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0,    `rgba(${rgb}, 0.30)`);
        gradient.addColorStop(0.65, `rgba(${rgb}, 0.06)`);
        gradient.addColorStop(1,    `rgba(${rgb}, 0)`);

        this.chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label              : this.selectedRole === '697b0d19b784b5da2ab3ba22' ? 'Managers'
                                       : this.selectedRole === '697b0d46b784b5da2ab3ba24' ? 'Clients'
                                       : 'Utilisateurs',
                    data,
                    fill              : true,
                    backgroundColor   : gradient,
                    borderColor       : mainColor,
                    borderWidth       : 2.5,
                    tension           : 0.45,
                    pointBackgroundColor  : '#ffffff',
                    pointBorderColor      : mainColor,
                    pointBorderWidth      : 2.5,
                    pointRadius           : 5,
                    pointHoverRadius      : 8,
                    pointHoverBackgroundColor: mainColor,
                    pointHoverBorderColor : '#ffffff',
                    pointHoverBorderWidth : 2,
                }],
            },
            options: {
                responsive        : true,
                maintainAspectRatio: false,
                animation         : { duration: 700, easing: 'easeInOutQuart' },
                interaction       : { mode: 'index', intersect: false },
                plugins: {
                    legend: {
                        display : true,
                        position: 'top',
                        align   : 'end',
                        labels  : {
                            color      : '#64748b',
                            font       : { size: 12, weight: 'bold' },
                            usePointStyle: true,
                            pointStyle : 'circle',
                        },
                    },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        titleColor     : mainColor,
                        bodyColor      : '#e2e8f0',
                        borderColor    : `rgba(${rgb},0.3)`,
                        borderWidth    : 1,
                        padding        : 12,
                        cornerRadius   : 10,
                        displayColors  : false,
                        callbacks: {
                            title : (items) => `📅 ${items[0].label}`,
                            label : (item)  => `👤 ${item.formattedValue} utilisateur(s)`,
                        },
                    },
                },
                scales: {
                    x: {
                        grid  : { display: false },
                        border: { display: false },
                        ticks : { color: '#94a3b8', font: { size: 11, weight: 'bold' } },
                    },
                    y: {
                        beginAtZero: true,
                        grid  : { color: '#f1f5f9' },
                        border: { display: false, dash: [4, 4] },
                        ticks : { color: '#94a3b8', font: { size: 11 }, stepSize: 1, padding: 8 },
                    },
                },
            },
        });
    }

    /* ── Public event handlers ── */
    changeFilter(type: 'month' | 'year'): void {
        this.filterType = type;
        this.loadChart();
    }

    changeYear(year: number): void {
        this.selectedYear = +year;
        this.loadChart();
    }

    changeRole(roleId: string | null): void {
        this.selectedRole = roleId;
        this.loadChart();
    }

    /* ── Helpers ── */
    getStatutLabel(statut: string): string {
        return STATUT_LABELS[statut] ?? statut;
    }

    getStatutSeverity(statut: string): StatutSeverity {
        return STATUT_SEVERITIES[statut] ?? 'info';
    }
}