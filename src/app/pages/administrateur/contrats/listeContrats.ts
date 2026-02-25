import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ContratService } from '@/pages/service/contrat.service';

@Component({
    selector: 'app-listeContrats',
    standalone: true,
    imports: [
        CommonModule, FormsModule, TableModule, ButtonModule, InputTextModule,
        IconFieldModule, InputIconModule, TagModule, ToastModule, ConfirmDialogModule,
        SelectModule, TooltipModule
    ],
    providers: [ConfirmationService, MessageService],
    template: `
<div class="page-container">
    <p-toast></p-toast>
    <p-confirmDialog></p-confirmDialog>

    <!-- Header -->
    <div class="page-header">
        <div>
            <h1 class="page-title"><i class="pi pi-file-edit"></i> Gestion des Contrats</h1>
            <p class="page-subtitle">Liste de tous les contrats de location</p>
        </div>
        <button pButton type="button" label="Nouveau contrat" icon="pi pi-plus"
            class="btn-primary" (click)="goToAjouter()"></button>
    </div>

    <!-- Stats -->
    <div class="stats-row">
        <div class="stat-card">
            <div class="stat-icon"><i class="pi pi-file-edit"></i></div>
            <div><div class="stat-value">{{ total }}</div><div class="stat-label">Total</div></div>
        </div>
        <div class="stat-card actif">
            <div class="stat-icon"><i class="pi pi-check-circle"></i></div>
            <div><div class="stat-value">{{ countByStatut('actif') }}</div><div class="stat-label">Actifs</div></div>
        </div>
        <div class="stat-card expire">
            <div class="stat-icon"><i class="pi pi-clock"></i></div>
            <div><div class="stat-value">{{ countByStatut('expire') }}</div><div class="stat-label">Expirés</div></div>
        </div>
        <div class="stat-card resilie">
            <div class="stat-icon"><i class="pi pi-ban"></i></div>
            <div><div class="stat-value">{{ countByStatut('resilie') }}</div><div class="stat-label">Résiliés</div></div>
        </div>
    </div>

    <!-- Table -->
    <div class="table-card">
        <p-table
            #dt
            [value]="contrats"
            [loading]="loading"
            [rows]="10"
            [paginator]="true"
            [rowHover]="true"
            [showGridlines]="true"
            styleClass="custom-table"
            [globalFilterFields]="['boutiqueName','boxNumero','statut']"
        >
            <ng-template pTemplate="caption">
                <div class="caption-bar">
                    <p-iconField>
                        <p-inputIcon styleClass="pi pi-search"></p-inputIcon>
                        <input pInputText type="text" placeholder="Rechercher..."
                            (input)="dt.filterGlobal($any($event.target).value, 'contains')" class="search-input">
                    </p-iconField>
                    <p-select
                        [options]="statutOptions"
                        [(ngModel)]="selectedStatut"
                        placeholder="Tous les statuts"
                        (onChange)="filterByStatut($event.value)"
                        optionLabel="label" optionValue="value"
                        [showClear]="true"
                        styleClass="statut-select">
                    </p-select>
                </div>
            </ng-template>

            <ng-template pTemplate="header">
                <tr>
                    <th>Boutique</th>
                    <th>Box</th>
                    <th>Date début</th>
                    <th>Date fin</th>
                    <th>Durée</th>
                    <th>Loyer/mois</th>
                    <th>Caution</th>
                    <th>Statut</th>
                    <th>Renouvellement</th>
                    <th style="width:130px; text-align:center;">Actions</th>
                </tr>
            </ng-template>

            <ng-template pTemplate="body" let-c>
                <tr class="clickable-row" (click)="viewDetail(c)">
                    <td>
                        <div class="boutique-cell">
                            <i class="pi pi-shopping-bag boutique-icon"></i>
                            <span class="boutique-name">{{ c.boutiqueName }}</span>
                        </div>
                    </td>
                    <td>
                        @if (c.boxNumero) {
                            <div class="box-cell">
                                <span class="box-badge">
                                    <i class="pi pi-hashtag"></i>{{ c.boxNumero }}
                                </span>
                                @if (c.boxEtage) {
                                <span class="box-etage-badge">
                                    <i class="pi pi-building"></i>{{ c.boxEtage }}
                                </span>
                                }
                                @if (c.boxSuperficie) {
                                <span class="box-surf-badge">{{ c.boxSuperficie }} m²</span>
                                }
                            </div>
                        } @else {
                            <span class="na">—</span>
                        }
                    </td>
                    <td>{{ c.date_debut | date:'dd/MM/yyyy' }}</td>
                    <td>{{ c.date_fin | date:'dd/MM/yyyy' }}</td>
                    <td><span class="duree-badge">{{ c.duree_mois }} mois</span></td>
                    <td><strong class="loyer-amount">{{ c.loyer?.montant_mensuel | number }} {{ c.loyer?.devise }}</strong></td>
                    <td>{{ c.caution | number }} MGA</td>
                    <td (click)="$event.stopPropagation()">
                        <span class="statut-badge" [class]="'statut-' + c.statut">
                            <i class="pi" [class]="statutIcon(c.statut)"></i>
                            {{ statutLabel(c.statut) }}
                        </span>
                    </td>
                    <td>
                        @if (c.renouvellement_auto) {
                            <span class="renew-badge"><i class="pi pi-refresh"></i> Auto</span>
                        } @else {
                            <span class="na">Manuel</span>
                        }
                    </td>
                    <td style="text-align:center;" (click)="$event.stopPropagation()">
                        <button pButton type="button" icon="pi pi-eye" class="action-btn view-btn"
                            pTooltip="Voir détail" tooltipPosition="top"
                            (click)="viewDetail(c)"></button>
                        <button pButton type="button" icon="pi pi-pencil" class="action-btn edit-btn"
                            pTooltip="Modifier" tooltipPosition="top"
                            (click)="goToEdit(c)"></button>
                        <button pButton type="button" icon="pi pi-trash" class="action-btn del-btn"
                            pTooltip="Supprimer" tooltipPosition="top"
                            (click)="confirmDelete(c)"></button>
                    </td>
                </tr>
            </ng-template>

            <ng-template pTemplate="emptymessage">
                <tr>
                    <td colspan="10" class="empty-msg">
                        <i class="pi pi-inbox"></i>
                        <p>Aucun contrat trouvé</p>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>
</div>
    `,
    styles: [`
:host {
    --primary: #f59e0b;
    --primary-dark: #d97706;
    --card: #ffffff;
    --text-900: #0f172a;
    --text-600: #475569;
    --text-400: #94a3b8;
    --border: #e2e8f0;
    --border-100: #f8fafc;
    --shadow: 0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04);
    --shadow-lg: 0 4px 8px rgba(15,23,42,0.06), 0 12px 28px rgba(15,23,42,0.08);
    --radius: 1rem;
}

.page-container { padding:2rem; max-width:1600px; margin:0 auto; animation:fadeIn 0.35s ease; }
@keyframes fadeIn { from{opacity:0;transform:translateY(10px);} to{opacity:1;transform:translateY(0);} }

/* ── Header ── */
.page-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:2rem; }
.page-title { font-size:1.6rem; font-weight:800; color:var(--text-900); margin:0 0 0.25rem 0; display:flex; align-items:center; gap:0.625rem; letter-spacing:-0.025em; }
.page-title i { color:var(--primary); font-size:1.35rem; }
.page-subtitle { color:var(--text-600); font-size:0.9rem; margin:0; }

/* ── Primary button ── */
::ng-deep .btn-primary { background:var(--primary) !important; border:none !important; color:white !important; font-weight:700 !important; padding:0.65rem 1.4rem !important; border-radius:0.75rem !important; box-shadow:0 2px 8px rgba(245,158,11,0.3) !important; transition:all 0.2s !important; }
::ng-deep .btn-primary:enabled:hover { background:var(--primary-dark) !important; box-shadow:0 4px 16px rgba(245,158,11,0.4) !important; transform:translateY(-1px) !important; }

/* ── Stat cards ── */
.stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; margin-bottom:2rem; }
.stat-card { background:var(--card); border-radius:var(--radius); padding:1.25rem 1.5rem; display:flex; align-items:center; gap:1.1rem; border:1px solid var(--border); box-shadow:var(--shadow); position:relative; overflow:hidden; transition:transform 0.2s, box-shadow 0.2s; }
.stat-card:hover { transform:translateY(-2px); box-shadow:var(--shadow-lg); }
.stat-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:var(--border); border-radius:0 0 1rem 1rem; }
.stat-card.actif::after { background:#10b981; }
.stat-card.expire::after { background:#f59e0b; }
.stat-card.resilie::after { background:#ef4444; }
.stat-icon { width:44px; height:44px; border-radius:0.75rem; background:rgba(245,158,11,0.1); display:flex; align-items:center; justify-content:center; color:var(--primary); font-size:1.1rem; flex-shrink:0; }
.stat-card.actif .stat-icon { background:rgba(16,185,129,0.1); color:#10b981; }
.stat-card.expire .stat-icon { background:rgba(245,158,11,0.1); color:#d97706; }
.stat-card.resilie .stat-icon { background:rgba(239,68,68,0.1); color:#ef4444; }
.stat-value { font-size:1.65rem; font-weight:800; color:var(--text-900); line-height:1; letter-spacing:-0.02em; }
.stat-label { font-size:0.76rem; color:var(--text-600); font-weight:500; margin-top:3px; }

/* ── Table card ── */
.table-card { background:var(--card); border-radius:var(--radius); box-shadow:var(--shadow-lg); border:1px solid var(--border); overflow:hidden; }

/* ── Caption bar ── */
.caption-bar { display:flex; align-items:center; gap:1rem; padding:1.1rem 1.5rem; background:var(--card); border-bottom:1px solid var(--border); }
.search-input { border-radius:0.625rem !important; border:1.5px solid var(--border) !important; padding:0.6rem 1rem 0.6rem 2.5rem !important; font-size:0.875rem !important; background:var(--border-100) !important; color:var(--text-900) !important; transition:all 0.2s !important; min-width:260px; }
.search-input:focus { border-color:var(--primary) !important; background:white !important; box-shadow:0 0 0 3px rgba(245,158,11,0.12) !important; outline:none !important; }
::ng-deep .statut-select .p-select { border-radius:0.625rem !important; border:1.5px solid var(--border) !important; background:var(--border-100) !important; }

/* ── Table header ── */
::ng-deep .custom-table .p-datatable-thead > tr > th { background:var(--border-100) !important; color:var(--text-600) !important; font-weight:700; font-size:0.72rem; text-transform:uppercase; letter-spacing:0.06em; border-bottom:2px solid var(--border) !important; padding:0.875rem 1rem !important; }

/* ── Rows ── */
::ng-deep .custom-table .p-datatable-tbody > tr { transition:background 0.15s; border-left:3px solid transparent; cursor:pointer; }
::ng-deep .custom-table .p-datatable-tbody > tr:hover { background:#fefce8 !important; border-left-color:var(--primary); }
::ng-deep .custom-table .p-datatable-tbody > tr > td { padding:0.875rem 1rem !important; border-bottom:1px solid var(--border-100) !important; color:var(--text-900); font-size:0.875rem; }

/* ── Cells ── */
.boutique-cell { display:flex; align-items:center; gap:8px; }
.boutique-icon { color:var(--primary); font-size:0.95rem; }
.boutique-name { font-weight:600; color:var(--text-900); }
.box-cell { display:flex; flex-direction:column; gap:0.25rem; }
.box-badge { display:inline-flex; align-items:center; gap:0.3rem; background:rgba(245,158,11,0.08); color:#92400e; border:1px solid rgba(245,158,11,0.25); padding:0.18rem 0.5rem; border-radius:0.375rem; font-size:0.75rem; font-weight:700; }
.box-badge .pi { font-size:0.68rem; }
.box-etage-badge { display:inline-flex; align-items:center; gap:0.3rem; background:var(--border-100); color:var(--text-600); border:1px solid var(--border); padding:0.18rem 0.5rem; border-radius:0.375rem; font-size:0.72rem; font-weight:600; }
.box-etage-badge .pi { font-size:0.68rem; }
.box-surf-badge { display:inline-flex; align-items:center; background:#eff6ff; color:#1e40af; border:1px solid #bfdbfe; padding:0.18rem 0.45rem; border-radius:0.375rem; font-size:0.7rem; font-weight:600; }
.duree-badge { background:var(--border-100); color:var(--text-600); padding:0.22rem 0.625rem; border-radius:9999px; font-size:0.78rem; font-weight:600; border:1px solid var(--border); }
.loyer-amount { color:var(--primary-dark); font-weight:700; }
.na { color:var(--text-400); font-size:0.85rem; }
.renew-badge { display:inline-flex; align-items:center; gap:4px; background:#ecfdf5; color:#065f46; border:1px solid #a7f3d0; padding:0.22rem 0.625rem; border-radius:9999px; font-size:0.78rem; font-weight:600; }

/* ── Status badges ── */
.statut-badge { display:inline-flex; align-items:center; gap:5px; padding:0.28rem 0.75rem; border-radius:9999px; font-size:0.75rem; font-weight:700; }
.statut-actif { background:#ecfdf5; color:#065f46; border:1px solid #a7f3d0; }
.statut-expire { background:#fffbeb; color:#92400e; border:1px solid #fde68a; }
.statut-resilie { background:#fef2f2; color:#991b1b; border:1px solid #fecaca; }
.statut-en_renouvellement { background:#eff6ff; color:#1e40af; border:1px solid #bfdbfe; }

/* ── Action buttons ── */
.action-btn { width:30px !important; height:30px !important; padding:0 !important; border-radius:0.5rem !important; margin:0 2px !important; }
::ng-deep .view-btn { color:#0369a1 !important; background:transparent !important; border:1px solid #bae6fd !important; }
::ng-deep .view-btn:hover { background:#e0f2fe !important; }
::ng-deep .edit-btn { color:#d97706 !important; background:transparent !important; border:1px solid #fde68a !important; }
::ng-deep .edit-btn:hover { background:#fffbeb !important; }
::ng-deep .del-btn { color:#dc2626 !important; background:transparent !important; border:1px solid #fecaca !important; }
::ng-deep .del-btn:hover { background:#fef2f2 !important; }

/* ── Empty ── */
.empty-msg { text-align:center; padding:3rem 1rem !important; color:var(--text-400); }
.empty-msg i { font-size:2.5rem; display:block; margin-bottom:0.875rem; opacity:0.45; }

/* ── Paginator ── */
::ng-deep .custom-table .p-paginator { background:var(--border-100) !important; border-top:1px solid var(--border) !important; padding:0.625rem 1rem !important; }
::ng-deep .custom-table .p-paginator .p-paginator-pages .p-paginator-page.p-highlight { background:var(--primary) !important; color:white !important; border-radius:0.5rem !important; }

@media (max-width:1024px) { .stats-row { grid-template-columns:repeat(2,1fr); } }
@media (max-width:600px) { .stats-row { grid-template-columns:1fr; } .page-header { flex-direction:column; gap:1rem; } }
    `]
})
export class ListeContrats {
    contrats: any[] = [];
    loading = true;
    selectedStatut: string | null = null;

    statutOptions = [
        { label: 'Actif',               value: 'actif' },
        { label: 'Expiré',              value: 'expire' },
        { label: 'Résilié',             value: 'resilie' },
        { label: 'En renouvellement',   value: 'en_renouvellement' }
    ];

    constructor(
        private contratService: ContratService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit() { this.loadContrats(); }

    loadContrats() {
        this.loading = true;
        this.contratService.getAll().subscribe({
            next: (data) => {
                this.contrats = data.map(c => ({
                    ...c,
                    boutiqueName: c.boutique_id?.nom_boutique || '—',
                    boxNumero: c.box_id?.numero || null,
                    boxEtage: c.box_id?.etage || null,
                    boxSuperficie: c.box_id?.superficie || null
                }));
                this.loading = false;
            },
            error: () => { this.loading = false; }
        });
    }

    get total() { return this.contrats.length; }

    countByStatut(s: string) {
        return this.contrats.filter(c => c.statut === s).length;
    }

    statutLabel(s: string) {
        const map: any = { actif:'Actif', expire:'Expiré', resilie:'Résilié', en_renouvellement:'Renouvellement' };
        return map[s] || s;
    }

    statutIcon(s: string) {
        const map: any = { actif:'pi-check-circle', expire:'pi-clock', resilie:'pi-ban', en_renouvellement:'pi-refresh' };
        return map[s] || 'pi-circle';
    }

    filterByStatut(value: string | null) {
        // p-table global filter handles UI; this is a hook for future custom logic
    }

    viewDetail(c: any) {
        this.router.navigate(['/admin/home/contrats/detail', c._id]);
    }

    goToAjouter() {
        this.router.navigate(['/admin/home/contrats/ajouter']);
    }

    goToEdit(c: any) {
        this.router.navigate(['/admin/home/contrats/ajouter'], { state: { contrat: c } });
    }

    confirmDelete(c: any) {
        this.confirmationService.confirm({
            message: `Supprimer le contrat de <strong>${c.boutiqueName}</strong> ? Tous les paiements associés seront aussi supprimés.`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Supprimer',
            rejectLabel: 'Annuler',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.contratService.delete(c._id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: 'Contrat supprimé avec succès' });
                        this.loadContrats();
                    },
                    error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de supprimer' })
                });
            }
        });
    }
}
