import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { BoutiqueService } from '@/pages/service/boutique.service';
import { ContratService } from '@/pages/service/contrat.service';
import { PaiementService } from '@/pages/service/paiement.service';

@Component({
    selector: 'app-mon-contrat',
    standalone: true,
    imports: [
        CommonModule, FormsModule, TableModule, ButtonModule,
        SelectModule, DividerModule, TagModule, TooltipModule
    ],
    template: `
<div class="page-container">

    <!-- ── Header ── -->
    <div class="page-header">
        <div>
            <h2 class="page-title"><i class="pi pi-file-edit"></i> Mon Contrat de Location</h2>
            <p class="page-subtitle">Consultez votre contrat, votre emplacement et l'historique des paiements</p>
        </div>
    </div>

    <!-- ── Loading ── -->
    @if (loading) {
    <div class="flex flex-col items-center justify-center py-12 gap-3 text-600">
        <i class="pi pi-spin pi-spinner text-5xl text-primary"></i>
        <p class="text-sm">Chargement du contrat...</p>
    </div>
    }

    <!-- ── Aucun contrat ── -->
    @if (!loading && contrats.length === 0) {
    <div class="flex flex-col items-center justify-center py-12 gap-3 text-600">
        <i class="pi pi-file text-5xl"></i>
        <p class="font-semibold text-lg">Aucun contrat trouvé</p>
        <p class="text-sm text-center">Votre contrat de location n'a pas encore été enregistré.<br>Veuillez contacter l'administration.</p>
    </div>
    }

    <!-- ── Sélecteur si plusieurs contrats ── -->
    @if (!loading && contrats.length > 1) {
    <div class="mb-5 flex items-center gap-3">
        <label class="font-semibold text-700 whitespace-nowrap">Contrat :</label>
        <p-select appendTo="body"
            [options]="contrats"
            [(ngModel)]="contrat"
            optionLabel="label"
            placeholder="Sélectionner un contrat"
            (onChange)="onContratChange()"
            styleClass="w-full"
            [style]="{'max-width':'400px'}">
        </p-select>
    </div>
    }

    <!-- ── Contenu principal ── -->
    @if (!loading && contrat) {

    <!-- ── Statut badge ── -->
    <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-2">
            <span class="font-semibold text-700">Statut du contrat :</span>
            <span class="contrat-statut" [class]="'statut-' + contrat.statut">
                <i class="pi" [class]="statutIcon(contrat.statut)"></i>
                {{ statutLabel(contrat.statut) }}
            </span>
        </div>
        <span class="text-600 text-sm">
            <i class="pi pi-calendar mr-1"></i>
            Depuis le {{ contrat.date_debut | date:'dd/MM/yyyy' }}
        </span>
    </div>

    <!-- ── Info cards row ── -->
    <div class="grid mb-5" style="grid-template-columns: repeat(3, 1fr); gap: 1rem;">

        <!-- Box & Emplacement -->
        <div class="surface-50 border-round-lg p-4 border-1 surface-border">
            <div class="flex items-center gap-2 mb-3">
                <i class="pi pi-map-marker text-primary"></i>
                <span class="font-semibold text-700">Box / Emplacement</span>
            </div>
            @if (contrat.box_id) {
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <span class="box-chip num"><i class="pi pi-hashtag"></i> {{ contrat.box_id.numero }}</span>
                    <span class="box-chip etage"><i class="pi pi-building"></i> {{ contrat.box_id.etage }}</span>
                </div>
                @if (contrat.box_id.superficie) {
                <div class="flex items-center gap-1 text-600 text-sm">
                    <i class="pi pi-expand text-xs"></i>
                    {{ contrat.box_id.superficie }} m²
                </div>
                }
                <span class="box-chip mt-1" [class]="'box-statut-' + contrat.box_id.statut" style="display:inline-flex; width:fit-content;">
                    <i class="pi" [class]="contrat.box_id.statut === 'libre' ? 'pi-check-circle' : contrat.box_id.statut === 'occupe' ? 'pi-lock' : 'pi-wrench'"></i>
                    {{ contrat.box_id.statut === 'libre' ? 'Libre' : contrat.box_id.statut === 'occupe' ? 'Occupé' : 'En travaux' }}
                </span>
            </div>
            } @else {
            <span class="text-500">Non défini</span>
            }
        </div>

        <!-- Période du contrat -->
        <div class="surface-50 border-round-lg p-4 border-1 surface-border">
            <div class="flex items-center gap-2 mb-3">
                <i class="pi pi-calendar text-primary"></i>
                <span class="font-semibold text-700">Période</span>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex justify-between text-sm">
                    <span class="text-600">Début</span>
                    <strong>{{ contrat.date_debut | date:'dd/MM/yyyy' }}</strong>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-600">Fin</span>
                    <strong>{{ contrat.date_fin | date:'dd/MM/yyyy' }}</strong>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-600">Durée</span>
                    <strong>{{ contrat.duree_mois }} mois</strong>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-600">Renouvellement</span>
                    <span [class]="contrat.renouvellement_auto ? 'text-green-600 font-semibold' : 'text-600'">
                        {{ contrat.renouvellement_auto ? 'Automatique' : 'Manuel' }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Loyer -->
        <div class="surface-50 border-round-lg p-4 border-1 surface-border">
            <div class="flex items-center gap-2 mb-3">
                <i class="pi pi-money-bill text-primary"></i>
                <span class="font-semibold text-700">Loyer & Finances</span>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex justify-between text-sm">
                    <span class="text-600">Mensuel</span>
                    <strong class="text-primary text-lg">{{ contrat.loyer?.montant_mensuel | number }} {{ contrat.loyer?.devise }}</strong>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-600">Charges</span>
                    <strong>{{ contrat.loyer?.charges_mensuelles | number }} {{ contrat.loyer?.devise }}</strong>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-600">Charges incluses</span>
                    <span>{{ contrat.loyer?.charges_incluses ? 'Oui' : 'Non' }}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-600">Caution</span>
                    <strong>{{ contrat.caution | number }} {{ contrat.loyer?.devise }}</strong>
                </div>
            </div>
        </div>
    </div>

    <!-- ── Stats paiements ── -->
    <div class="grid mb-5" style="grid-template-columns: repeat(4, 1fr); gap: 1rem;">
        <div class="stat-card">
            <div class="stat-value">{{ periodes.length }}</div>
            <div class="stat-label"><i class="pi pi-calendar mr-1"></i> Périodes totales</div>
        </div>
        <div class="stat-card paye">
            <div class="stat-value">{{ countByStatut('paye') }}</div>
            <div class="stat-label"><i class="pi pi-check-circle mr-1"></i> Payés</div>
        </div>
        <div class="stat-card retard">
            <div class="stat-value">{{ countByStatut('en_retard') + countByStatut('partiel') }}</div>
            <div class="stat-label"><i class="pi pi-clock mr-1"></i> En retard</div>
        </div>
        <div class="stat-card non-enr">
            <div class="stat-value">{{ periodes.length - paiements.length }}</div>
            <div class="stat-label"><i class="pi pi-minus-circle mr-1"></i> Non enregistrés</div>
        </div>
    </div>

    <!-- ── Résumé financier ── -->
    <div class="surface-50 border-round-lg p-4 border-1 surface-border mb-5">
        <div class="flex gap-6 flex-wrap">
            <div class="flex flex-col gap-1">
                <span class="text-600 text-xs font-semibold uppercase">Total attendu (contrat)</span>
                <strong class="text-xl">{{ totalContratAttendu | number }} {{ contrat.loyer?.devise }}</strong>
            </div>
            <div class="flex flex-col gap-1">
                <span class="text-600 text-xs font-semibold uppercase">Total payé</span>
                <strong class="text-xl text-green-600">{{ totalPaye | number }} {{ contrat.loyer?.devise }}</strong>
            </div>
            <div class="flex flex-col gap-1">
                <span class="text-600 text-xs font-semibold uppercase">Solde restant</span>
                <strong class="text-xl" [class.text-red-500]="totalContratAttendu - totalPaye > 0"
                    [class.text-green-600]="totalContratAttendu - totalPaye <= 0">
                    {{ (totalContratAttendu - totalPaye) | number }} {{ contrat.loyer?.devise }}
                </strong>
            </div>
        </div>
    </div>

    <!-- ── Table périodes ── -->
    <div class="flex items-center justify-between mb-3">
        <div>
            <h3 class="font-semibold text-700 text-lg m-0">Périodes du contrat</h3>
            <p class="text-600 text-sm m-0">
                {{ periodes.length }} périodes · {{ paiements.length }} enregistrés · {{ periodes.length - paiements.length }} en attente
            </p>
        </div>
    </div>

    <div class="table-card">
    <p-table [value]="periodes" [loading]="loadingPaiements" [rows]="24"
        [paginator]="periodes.length > 24" styleClass="custom-table"
        [rowHover]="true" [showGridlines]="true">
        <ng-template pTemplate="header">
            <tr>
                <th style="width:110px">Période</th>
                <th style="width:150px">M. Attendu</th>
                <th style="width:160px">Date d'échéance</th>
                <th style="width:140px">M. Payé</th>
                <th style="width:140px">Date paiement</th>
                <th>Mode</th>
                <th>Référence</th>
                <th style="width:130px">Statut</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-item>
            <tr [class.row-pending]="!item.paiement">
                <td>
                    <span class="periode-chip">{{ item.periode }}</span>
                </td>
                <td>
                    <strong>{{ contrat.loyer?.montant_mensuel | number }}</strong>
                    <small class="text-500"> {{ contrat.loyer?.devise }}</small>
                </td>
                <td>
                    @if (item.paiement) {
                        <span class="text-sm"><i class="pi pi-calendar text-primary mr-1" style="font-size:0.75rem"></i>{{ item.paiement.date_echeance | date:'dd/MM/yyyy' }}</span>
                    } @else {
                        <span class="text-400 text-sm">Non définie</span>
                    }
                </td>
                <td>
                    @if (item.paiement) {
                        {{ item.paiement.montant_paye | number }}
                        <small class="text-500"> {{ contrat.loyer?.devise }}</small>
                    } @else {
                        <span class="text-400">—</span>
                    }
                </td>
                <td>
                    @if (item.paiement?.date_paiement) {
                        {{ item.paiement.date_paiement | date:'dd/MM/yyyy' }}
                    } @else {
                        <span class="text-400">—</span>
                    }
                </td>
                <td>
                    @if (item.paiement) {
                        <span class="mode-chip">{{ modeLabel(item.paiement.mode_paiement) }}</span>
                    } @else { <span class="text-400">—</span> }
                </td>
                <td>
                    @if (item.paiement?.reference) {
                        <code class="text-xs text-600">{{ item.paiement.reference }}</code>
                    } @else { <span class="text-400">—</span> }
                </td>
                <td>
                    @if (item.paiement) {
                        <span class="pay-badge" [class]="'pay-' + item.paiement.statut">
                            {{ payStatutLabel(item.paiement.statut) }}
                        </span>
                    } @else {
                        <span class="pay-badge pay-pending">Non enregistré</span>
                    }
                </td>
            </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
            <tr>
                <td colspan="8" class="text-center py-6 text-600">
                    <i class="pi pi-calendar-clock text-4xl block mb-3"></i>
                    <p>Aucune période générée</p>
                </td>
            </tr>
        </ng-template>
    </p-table>
    </div>

    }

</div>
    `,
    styles: [`
:host {
    --primary: #f59e0b; --primary-dark: #d97706; --card: #ffffff;
    --text-900: #0f172a; --text-600: #475569; --text-400: #94a3b8;
    --border: #e2e8f0; --border-100: #f8fafc;
    --shadow: 0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04);
    --radius: 1rem;
}
.page-container { padding: 2rem; }
.page-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:2rem; }
.page-title { font-size:1.75rem; font-weight:700; color:var(--text-900); display:flex; align-items:center; gap:0.75rem; margin:0; }
.page-title i { color:var(--primary); font-size:1.5rem; }
.page-subtitle { color:var(--text-600); font-size:0.875rem; margin:0.25rem 0 0; }
.table-card { background:var(--card); border-radius:var(--radius); border:1px solid var(--border); box-shadow:var(--shadow); overflow:hidden; }
::ng-deep .custom-table .p-datatable-thead > tr > th { background:var(--border-100) !important; color:var(--text-600) !important; font-size:0.75rem !important; font-weight:600 !important; text-transform:uppercase !important; letter-spacing:0.05em !important; padding:0.875rem 1rem !important; border-bottom:1px solid var(--border) !important; border-right:none !important; border-top:none !important; border-left:none !important; }
::ng-deep .custom-table .p-datatable-tbody > tr { background:#fff !important; color:var(--text-900) !important; transition:background 0.15s; }
::ng-deep .custom-table .p-datatable-tbody > tr:hover { background:#fefce8 !important; }
::ng-deep .custom-table .p-datatable-tbody > tr > td { padding:0.875rem 1rem !important; border-bottom:1px solid var(--border-100) !important; border-right:none !important; border-left:none !important; border-top:none !important; }
/* Statut contrat */
.contrat-statut { display:inline-flex; align-items:center; gap:6px; padding:0.35rem 1rem; border-radius:9999px; font-size:0.82rem; font-weight:700; }
.statut-actif { background:#d1fae5; color:#065f46; }
.statut-expire { background:#fef3c7; color:#92400e; }
.statut-resilie { background:#fee2e2; color:#991b1b; }
.statut-en_renouvellement { background:#dbeafe; color:#1e40af; }

/* Box chips */
.box-chip { display:inline-flex; align-items:center; gap:0.3rem; padding:0.25rem 0.6rem; border-radius:0.4rem; font-size:0.78rem; font-weight:700; }
.box-chip.num { background:rgba(var(--primary-color-rgb,245,158,11),0.1); border:1.5px solid rgba(245,158,11,0.3); color:#92400e; }
.box-chip.etage { background:#f3f4f6; border:1.5px solid #d1d5db; color:#374151; }
.box-chip.box-statut-libre { background:#d1fae5; border:1.5px solid #6ee7b7; color:#065f46; }
.box-chip.box-statut-occupe { background:#fee2e2; border:1.5px solid #fca5a5; color:#991b1b; }
.box-chip.box-statut-en_travaux { background:#fef3c7; border:1.5px solid #fcd34d; color:#92400e; }
.box-chip .pi { font-size:0.7rem; }

/* Stats */
.stat-card { text-align:center; padding:1.25rem 1rem; border-radius:0.75rem; background:#f9fafb; border:1px solid #e5e7eb; }
.stat-card.paye { background:#d1fae5; border-color:#6ee7b7; }
.stat-card.retard { background:#fef3c7; border-color:#fcd34d; }
.stat-card.non-enr { background:#f3f4f6; border:1.5px dashed #d1d5db; }
.stat-value { font-size:2rem; font-weight:800; color:#111827; line-height:1; }
.stat-label { font-size:0.78rem; color:#6b7280; font-weight:500; margin-top:4px; }

/* Table row pending */
::ng-deep .row-pending { background:#fafafa !important; }
::ng-deep .row-pending:hover { background:#fffbeb !important; }

/* Badges */
.periode-chip { font-family:monospace; font-weight:700; background:#f3f4f6; padding:0.2rem 0.6rem; border-radius:0.375rem; font-size:0.82rem; }
.mode-chip { background:#f3f4f6; padding:0.2rem 0.6rem; border-radius:9999px; font-size:0.75rem; font-weight:600; }
.pay-badge { display:inline-flex; align-items:center; padding:0.25rem 0.75rem; border-radius:9999px; font-size:0.75rem; font-weight:700; }
.pay-paye { background:#d1fae5; color:#065f46; }
.pay-en_retard { background:#fef3c7; color:#92400e; }
.pay-partiel { background:#dbeafe; color:#1e40af; }
.pay-impaye { background:#fee2e2; color:#991b1b; }
.pay-pending { background:#f9fafb; color:#9ca3af; border:1.5px dashed #d1d5db; }
    `]
})
export class MonContrat {
    loading = true;
    loadingPaiements = false;
    contrats: any[] = [];
    contrat: any = null;
    paiements: any[] = [];
    periodes: any[] = [];

    constructor(
        private boutiqueService: BoutiqueService,
        private contratService: ContratService,
        private paiementService: PaiementService
    ) {}

    ngOnInit() {
        this.boutiqueService.getMyBoutique().subscribe({
            next: (boutique: any) => {
                this.contratService.getAllByBoutique(boutique._id).subscribe({
                    next: (contrats: any[]) => {
                        this.contrats = contrats.map(c => ({
                            ...c,
                            label: `Contrat ${c.date_debut ? new Date(c.date_debut).toLocaleDateString('fr-FR') : '?'} → ${c.date_fin ? new Date(c.date_fin).toLocaleDateString('fr-FR') : '?'} (${c.statut})`
                        }));
                        if (contrats.length > 0) {
                            // Select active contract first, fallback to latest
                            this.contrat = contrats.find(c => c.statut === 'actif') || contrats[0];
                            this.loadPaiements();
                        } else {
                            this.loading = false;
                        }
                    },
                    error: () => { this.loading = false; }
                });
            },
            error: () => { this.loading = false; }
        });
    }

    loadPaiements() {
        this.loadingPaiements = true;
        this.paiementService.getAllByContrat(this.contrat._id).subscribe({
            next: (data: any[]) => {
                this.paiements = data;
                this.loadingPaiements = false;
                this.loading = false;
                this.buildPeriodes();
            },
            error: () => {
                this.loadingPaiements = false;
                this.loading = false;
            }
        });
    }

    onContratChange() {
        this.paiements = [];
        this.periodes = [];
        this.loadPaiements();
    }

    buildPeriodes() {
        if (!this.contrat?.date_debut || !this.contrat?.date_fin) return;
        const result: any[] = [];
        let cur = new Date(
            new Date(this.contrat.date_debut).getFullYear(),
            new Date(this.contrat.date_debut).getMonth(), 1
        );
        const last = new Date(
            new Date(this.contrat.date_fin).getFullYear(),
            new Date(this.contrat.date_fin).getMonth(), 1
        );
        while (cur <= last) {
            const y = cur.getFullYear();
            const m = String(cur.getMonth() + 1).padStart(2, '0');
            const key = `${y}-${m}`;
            const paiement = this.paiements.find(p => p.periode === key) || null;
            result.push({ periode: key, paiement });
            cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1);
        }
        this.periodes = result;
    }

    get totalContratAttendu() {
        return (this.contrat?.loyer?.montant_mensuel || 0) * this.periodes.length;
    }
    get totalPaye() {
        return this.paiements.reduce((s, p) => s + (p.montant_paye || 0), 0);
    }
    countByStatut(s: string) {
        return this.paiements.filter(p => p.statut === s).length;
    }

    statutLabel(s: string) {
        const map: any = { actif:'Actif', expire:'Expiré', resilie:'Résilié', en_renouvellement:'En renouvellement' };
        return map[s] || s;
    }
    statutIcon(s: string) {
        const map: any = { actif:'pi-check-circle', expire:'pi-clock', resilie:'pi-ban', en_renouvellement:'pi-refresh' };
        return map[s] || 'pi-circle';
    }
    payStatutLabel(s: string) {
        const map: any = { paye:'Payé', en_retard:'En retard', partiel:'Partiel', impaye:'Impayé' };
        return map[s] || s;
    }
    modeLabel(m: string) {
        const map: any = { especes:'Espèces', virement:'Virement', cheque:'Chèque', mobile_money:'Mobile Money' };
        return map[m] || m;
    }
}
