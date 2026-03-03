import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ContratService } from '@/pages/service/contrat.service';
import { PaiementService } from '@/pages/service/paiement.service';

@Component({
    selector: 'app-detailContrat',
    standalone: true,
    imports: [
        CommonModule, FormsModule, TableModule, ButtonModule, InputTextModule,
        InputNumberModule, SelectModule, DatePickerModule, DividerModule,
        DialogModule, ToastModule, ConfirmDialogModule, TagModule, TooltipModule, TextareaModule
    ],
    providers: [ConfirmationService, MessageService],
    template: `
<div class="page-container">
    <p-toast></p-toast>
    <p-confirmDialog></p-confirmDialog>

    <!-- Header -->
    <div class="page-header">
        <button pButton type="button" icon="pi pi-arrow-left" label="Retour"
            class="p-button-text back-btn" (click)="goBack()"></button>
        <div>
            <h1 class="page-title"><i class="pi pi-file-edit"></i> Détail du Contrat</h1>
            <p class="page-subtitle">Informations complètes et historique des paiements</p>
        </div>
    </div>

    @if (loading) {
    <div class="loading-box">
        <i class="pi pi-spin pi-spinner" style="font-size:2.5rem;color:var(--primary)"></i>
        <p>Chargement...</p>
    </div>
    }

    @if (!loading && contrat) {
    <div class="content-grid">

        <!-- ── Carte contrat ── -->
        <div class="info-card">
            <div class="card-head">
                <h2 class="card-title"><i class="pi pi-file-edit"></i> Contrat</h2>
                <span class="statut-badge" [class]="'statut-' + contrat.statut">
                    <i class="pi" [class]="statutIcon(contrat.statut)"></i>
                    {{ statutLabel(contrat.statut) }}
                </span>
            </div>

            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label"><i class="pi pi-shopping-bag"></i> Boutique</span>
                    <span class="info-value bold">{{ contrat.boutique_id?.nom_boutique }}</span>
                </div>
                <div class="info-item">
                    <span class="info-label"><i class="pi pi-map-marker"></i> Box / Emplacement</span>
                    @if (contrat.box_id) {
                    <div class="box-chips">
                        <span class="box-chip num">
                            <i class="pi pi-hashtag"></i> {{ contrat.box_id.numero }}
                        </span>
                        <span class="box-chip etage">
                            <i class="pi pi-building"></i> {{ contrat.box_id.etage }}
                        </span>
                        @if (contrat.box_id.superficie) {
                        <span class="box-chip surf">
                            <i class="pi pi-expand"></i> {{ contrat.box_id.superficie }} m²
                        </span>
                        }
                        <span class="box-chip" [class]="'box-statut-' + contrat.box_id.statut">
                            <i class="pi" [class]="contrat.box_id.statut === 'libre' ? 'pi-check-circle' : contrat.box_id.statut === 'occupe' ? 'pi-lock' : 'pi-wrench'"></i>
                            {{ contrat.box_id.statut === 'libre' ? 'Libre' : contrat.box_id.statut === 'occupe' ? 'Occupé' : 'En travaux' }}
                        </span>
                    </div>
                    } @else {
                    <span class="info-value">—</span>
                    }
                </div>
                <div class="info-item">
                    <span class="info-label"><i class="pi pi-calendar"></i> Date début</span>
                    <span class="info-value">{{ contrat.date_debut | date:'dd/MM/yyyy' }}</span>
                </div>
                <div class="info-item">
                    <span class="info-label"><i class="pi pi-calendar-times"></i> Date fin</span>
                    <span class="info-value">{{ contrat.date_fin | date:'dd/MM/yyyy' }}</span>
                </div>
                <div class="info-item">
                    <span class="info-label"><i class="pi pi-clock"></i> Durée</span>
                    <span class="info-value">{{ contrat.duree_mois }} mois</span>
                </div>
                <div class="info-item">
                    <span class="info-label"><i class="pi pi-refresh"></i> Renouvellement</span>
                    <span class="info-value">{{ contrat.renouvellement_auto ? 'Automatique' : 'Manuel' }}</span>
                </div>
            </div>

            <p-divider></p-divider>

            <div class="loyer-section">
                <h4 class="section-subtitle"><i class="pi pi-money-bill"></i> Loyer</h4>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Montant mensuel</span>
                        <span class="info-value loyer-amount">{{ contrat.loyer?.montant_mensuel | number }} {{ contrat.loyer?.devise }}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Charges mensuelles</span>
                        <span class="info-value">{{ contrat.loyer?.charges_mensuelles | number }} {{ contrat.loyer?.devise }}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Charges incluses</span>
                        <span class="info-value">{{ contrat.loyer?.charges_incluses ? 'Oui' : 'Non' }}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Caution</span>
                        <span class="info-value">{{ contrat.caution | number }} {{ contrat.loyer?.devise }}</span>
                    </div>
                </div>
            </div>

            <p-divider></p-divider>

            <div class="card-actions">
                <button pButton type="button" icon="pi pi-pencil" label="Modifier"
                    class="action-edit" (click)="goEdit()"></button>
                <p-select appendTo="body" [options]="statutOptions" [(ngModel)]="newStatut"
                    optionLabel="label" optionValue="value"
                    placeholder="Changer le statut" styleClass="statut-select"
                    (onChange)="changeStatut($event.value)">
                </p-select>
            </div>
        </div>

        <!-- ── Stats paiements ── -->
        <div class="stats-card">
            <h2 class="card-title"><i class="pi pi-chart-bar"></i> Résumé des paiements</h2>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">{{ periodes.length }}</div>
                    <div class="stat-label">Périodes</div>
                </div>
                <div class="stat-item paye">
                    <div class="stat-value">{{ countPaiement('paye') }}</div>
                    <div class="stat-label">Payés</div>
                </div>
                <div class="stat-item retard">
                    <div class="stat-value">{{ countPaiement('en_retard') + countPaiement('partiel') }}</div>
                    <div class="stat-label">En retard</div>
                </div>
                <div class="stat-item non-enr">
                    <div class="stat-value">{{ periodes.length - paiements.length }}</div>
                    <div class="stat-label">Non enreg.</div>
                </div>
            </div>
            <p-divider></p-divider>
            <div class="montant-resume">
                <div class="montant-row">
                    <span>Total attendu (contrat)</span>
                    <strong>{{ totalContratAttendu | number }} {{ contrat.loyer?.devise }}</strong>
                </div>
                <div class="montant-row">
                    <span>Total payé</span>
                    <strong class="green">{{ totalPaye | number }} {{ contrat.loyer?.devise }}</strong>
                </div>
                <div class="montant-row">
                    <span>Solde restant</span>
                    <strong [class.red]="totalContratAttendu - totalPaye > 0">{{ (totalContratAttendu - totalPaye) | number }} {{ contrat.loyer?.devise }}</strong>
                </div>
            </div>
        </div>

        <!-- ── Table périodes ── -->
        <div class="paiements-card">
            <div class="paiements-header">
                <div class="header-info">
                    <h2 class="card-title"><i class="pi pi-calendar-clock"></i> Périodes du contrat</h2>
                    <span class="periods-info">
                        <i class="pi pi-info-circle"></i>
                        {{ periodes.length }} périodes · {{ paiements.length }} enregistrés · {{ periodes.length - paiements.length }} en attente
                    </span>
                </div>
            </div>

            <p-table [value]="periodes" [loading]="loadingPaiements" [rows]="24"
                [paginator]="periodes.length > 24" styleClass="paiement-table"
                [rowHover]="true" [showGridlines]="true">
                <ng-template pTemplate="header">
                    <tr>
                        <th style="width:110px">Période</th>
                        <th style="width:140px">M. Attendu</th>
                        <th style="width:180px">Date d'échéance</th>
                        <th style="width:130px">M. Payé</th>
                        <th style="width:130px">Date paiement</th>
                        <th>Mode</th>
                        <th>Référence</th>
                        <th>Statut</th>
                        <th style="width:90px; text-align:center">Actions</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-item>
                    <tr [class.row-pending]="!item.paiement">
                        <!-- Période -->
                        <td>
                            <span class="periode-badge">{{ item.periode }}</span>
                        </td>
                        <!-- Montant attendu -->
                        <td>
                            <strong>{{ contrat.loyer?.montant_mensuel | number }}</strong>
                            <small class="devise"> {{ contrat.loyer?.devise }}</small>
                        </td>
                        <!-- Date d'échéance : DatePicker si pas de paiement, sinon texte -->
                        <td class="echeance-cell">
                            @if (item.paiement) {
                                <span class="echeance-text"><i class="pi pi-calendar"></i> {{ item.paiement.date_echeance | date:'dd/MM/yyyy' }}</span>
                            } @else {
                                <p-datePicker
                                    [(ngModel)]="item.echeance"
                                    dateFormat="dd/mm/yy"
                                    [showIcon]="true"
                                    placeholder="Définir l'échéance"
                                    styleClass="echeance-picker">
                                </p-datePicker>
                            }
                        </td>
                        <!-- M. payé -->
                        <td>
                            @if (item.paiement) {
                                {{ item.paiement.montant_paye | number }}
                                <small class="devise"> {{ contrat.loyer?.devise }}</small>
                            } @else {
                                <span class="na">—</span>
                            }
                        </td>
                        <!-- Date paiement -->
                        <td>
                            @if (item.paiement?.date_paiement) {
                                {{ item.paiement.date_paiement | date:'dd/MM/yyyy' }}
                            } @else {
                                <span class="na">—</span>
                            }
                        </td>
                        <!-- Mode -->
                        <td>
                            @if (item.paiement) {
                                <span class="mode-badge">{{ modeLabel(item.paiement.mode_paiement) }}</span>
                            } @else { <span class="na">—</span> }
                        </td>
                        <!-- Référence -->
                        <td>
                            @if (item.paiement) {
                                <span class="ref-text">{{ item.paiement.reference || '—' }}</span>
                            } @else { <span class="na">—</span> }
                        </td>
                        <!-- Statut -->
                        <td>
                            @if (item.paiement) {
                                <span class="pay-badge" [class]="'pay-' + item.paiement.statut">
                                    {{ payStatutLabel(item.paiement.statut) }}
                                </span>
                            } @else {
                                <span class="pay-badge pay-pending">Non enregistré</span>
                            }
                        </td>
                        <!-- Actions -->
                        <td style="text-align:center;">
                            @if (item.paiement) {
                                <button pButton type="button" icon="pi pi-pencil"
                                    class="action-btn edit-btn" pTooltip="Modifier"
                                    (click)="openEditPaiement(item.paiement)"></button>
                                <button pButton type="button" icon="pi pi-trash"
                                    class="action-btn del-btn" pTooltip="Supprimer"
                                    (click)="confirmDeletePaiement(item.paiement)"></button>
                            } @else {
                                <button pButton type="button" icon="pi pi-plus"
                                    class="action-btn create-btn" pTooltip="Enregistrer ce paiement"
                                    (click)="createForPeriode(item)"></button>
                            }
                        </td>
                    </tr>
                </ng-template>
                <ng-template pTemplate="emptymessage">
                    <tr><td colspan="9" class="empty-msg"><i class="pi pi-calendar"></i><p>Aucune période générée</p></td></tr>
                </ng-template>
            </p-table>
        </div>

    </div>
    }

</div>

<!-- Dialog Paiement -->
<p-dialog [(visible)]="showDialog" [modal]="true" [closable]="true"
    [style]="{width:'560px'}" [header]="editPaiementId ? 'Modifier le paiement' : 'Enregistrer un paiement'"
    [draggable]="false" [resizable]="false">

    <div class="dialog-body">

        <div class="dialog-fields">
            <div class="d-field">
                <label class="d-label">Période (AAAA-MM) <span class="required">*</span></label>
                <input pInputText [(ngModel)]="pForm.periode"
                    placeholder="2024-06" class="w-full" [disabled]="!!editPaiementId || periodeLocked">
            </div>
            <div class="d-field">
                <label class="d-label">Montant attendu (MGA) <span class="required">*</span></label>
                <p-inputNumber [(ngModel)]="pForm.montant_attendu" [min]="0"
                    mode="decimal" locale="fr-MG" styleClass="w-full"></p-inputNumber>
            </div>
            <div class="d-field">
                <label class="d-label">Montant payé (MGA)</label>
                <p-inputNumber [(ngModel)]="pForm.montant_paye" [min]="0"
                    mode="decimal" locale="fr-MG" styleClass="w-full"></p-inputNumber>
            </div>
            <div class="d-field">
                <label class="d-label">Date d'échéance <span class="required">*</span></label>
                <p-datePicker [(ngModel)]="pForm.date_echeance" dateFormat="dd/mm/yy"
                    [showIcon]="true" styleClass="w-full"></p-datePicker>
            </div>
            <div class="d-field">
                <label class="d-label">Date de paiement</label>
                <p-datePicker [(ngModel)]="pForm.date_paiement" dateFormat="dd/mm/yy"
                    [showIcon]="true" styleClass="w-full"></p-datePicker>
            </div>
            <div class="d-field">
                <label class="d-label">Mode de paiement</label>
                <p-select appendTo="body" [options]="modeOptions" [(ngModel)]="pForm.mode_paiement"
                    optionLabel="label" optionValue="value" styleClass="w-full"></p-select>
            </div>
            <div class="d-field">
                <label class="d-label">Statut</label>
                <p-select appendTo="body" [options]="payStatutOptions" [(ngModel)]="pForm.statut"
                    optionLabel="label" optionValue="value" styleClass="w-full"></p-select>
            </div>
            <div class="d-field">
                <label class="d-label">Référence</label>
                <input pInputText [(ngModel)]="pForm.reference"
                    placeholder="PAY-2024-06-B105" class="w-full">
            </div>
            <div class="d-field full">
                <label class="d-label">Notes</label>
                <textarea pTextarea [(ngModel)]="pForm.notes" rows="2"
                    placeholder="Remarques éventuelles..." class="w-full"></textarea>
            </div>
        </div>

    </div>

    <ng-template pTemplate="footer">
        <div class="dialog-footer">
            <button pButton type="button" label="Annuler" icon="pi pi-times"
                class="p-button-outlined" (click)="showDialog=false"></button>
            <button pButton type="button"
                [label]="editPaiementId ? 'Enregistrer' : 'Créer'"
                icon="pi pi-check" class="btn-primary"
                [disabled]="savingPaiement" (click)="savePaiement()"></button>
        </div>
    </ng-template>
</p-dialog>
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

.page-container { padding:2rem; max-width:1400px; margin:0 auto; animation:fadeIn 0.35s ease; }
@keyframes fadeIn { from{opacity:0;transform:translateY(10px);} to{opacity:1;transform:translateY(0);} }
.loading-box { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:4rem; gap:1rem; color:var(--text-400); }

/* ── Header ── */
.page-header { display:flex; align-items:flex-start; gap:1rem; margin-bottom:2rem; }
.page-title { font-size:1.6rem; font-weight:800; color:var(--text-900); margin:0 0 0.25rem 0; display:flex; align-items:center; gap:0.625rem; letter-spacing:-0.025em; }
.page-title i { color:var(--primary); font-size:1.35rem; }
.page-subtitle { color:var(--text-600); font-size:0.9rem; margin:0; }
::ng-deep .back-btn { color:var(--text-600) !important; font-weight:600 !important; border-radius:0.625rem !important; }

/* ── Layout ── */
.content-grid { display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; }
.paiements-card { grid-column:1 / -1; }

/* ── Cards ── */
.info-card, .stats-card, .paiements-card { background:var(--card); border-radius:var(--radius); padding:1.75rem; border:1px solid var(--border); box-shadow:var(--shadow); }
.card-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; }
.card-title { font-size:1rem; font-weight:700; color:var(--text-900); display:flex; align-items:center; gap:0.5rem; margin:0 0 1.25rem 0; }
.card-title i { color:var(--primary); }
.section-subtitle { font-size:0.875rem; font-weight:600; color:var(--text-600); display:flex; align-items:center; gap:0.4rem; margin:0 0 1rem 0; }
.section-subtitle i { color:var(--primary); }

/* ── Info grid ── */
.info-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
.info-item { display:flex; flex-direction:column; gap:3px; }
.info-label { font-size:0.72rem; font-weight:700; color:var(--text-400); display:flex; align-items:center; gap:4px; text-transform:uppercase; letter-spacing:0.06em; }
.info-label .pi { color:var(--primary); }
.info-value { font-size:0.9rem; font-weight:500; color:var(--text-900); }
.info-value.bold { font-weight:700; }
.info-value.loyer-amount { font-weight:800; color:var(--primary-dark); font-size:1.1rem; }

/* ── Box chips ── */
.box-chips { display:flex; flex-wrap:wrap; gap:0.35rem; margin-top:2px; }
.box-chip { display:inline-flex; align-items:center; gap:0.3rem; padding:0.25rem 0.625rem; border-radius:0.4rem; font-size:0.75rem; font-weight:700; }
.box-chip.num { background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.25); color:#92400e; }
.box-chip.etage { background:var(--border-100); border:1px solid var(--border); color:var(--text-600); }
.box-chip.surf { background:#eff6ff; border:1px solid #bfdbfe; color:#1e40af; }
.box-chip.box-statut-libre { background:#ecfdf5; border:1px solid #a7f3d0; color:#065f46; }
.box-chip.box-statut-occupe { background:#fef2f2; border:1px solid #fecaca; color:#991b1b; }
.box-chip.box-statut-en_travaux { background:#fffbeb; border:1px solid #fde68a; color:#92400e; }
.box-chip .pi { font-size:0.72rem; }

/* ── Statut badge ── */
.statut-badge { display:inline-flex; align-items:center; gap:5px; padding:0.28rem 0.75rem; border-radius:9999px; font-size:0.75rem; font-weight:700; }
.statut-actif { background:#ecfdf5; color:#065f46; border:1px solid #a7f3d0; }
.statut-expire { background:#fffbeb; color:#92400e; border:1px solid #fde68a; }
.statut-resilie { background:#fef2f2; color:#991b1b; border:1px solid #fecaca; }
.statut-en_renouvellement { background:#eff6ff; color:#1e40af; border:1px solid #bfdbfe; }

/* ── Card actions ── */
.card-actions { display:flex; align-items:center; gap:1rem; flex-wrap:wrap; }
::ng-deep .action-edit { background:var(--primary) !important; border:none !important; color:white !important; font-weight:600 !important; border-radius:0.625rem !important; box-shadow:0 2px 8px rgba(245,158,11,0.25) !important; }
::ng-deep .action-edit:hover { background:var(--primary-dark) !important; box-shadow:0 4px 12px rgba(245,158,11,0.35) !important; }
::ng-deep .statut-select .p-select { border-radius:0.625rem !important; border-color:var(--border) !important; }

/* ── Stats ── */
.stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0.875rem; margin-bottom:1rem; }
.stat-item { text-align:center; padding:1.1rem 0.75rem; border-radius:0.875rem; background:var(--border-100); border:1px solid var(--border); }
.stat-item.paye { background:#ecfdf5; border-color:#a7f3d0; }
.stat-item.retard { background:#fffbeb; border-color:#fde68a; }
.stat-item.impaye { background:#fef2f2; border-color:#fecaca; }
.stat-item.non-enr { background:var(--border-100); border:1.5px dashed var(--border); }
.stat-value { font-size:1.65rem; font-weight:800; color:var(--text-900); line-height:1; letter-spacing:-0.02em; }
.stat-label { font-size:0.72rem; font-weight:600; color:var(--text-600); margin-top:4px; }
.montant-resume { display:flex; flex-direction:column; gap:0; }
.montant-row { display:flex; justify-content:space-between; align-items:center; font-size:0.875rem; color:var(--text-600); padding:0.5rem 0; border-bottom:1px solid var(--border-100); }
.montant-row:last-child { border-bottom:none; }
.montant-row strong { color:var(--text-900); font-size:0.925rem; }
.montant-row strong.green { color:#059669; }
.montant-row strong.red { color:#ef4444; }

/* ── Paiements header ── */
.paiements-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.25rem; }
.header-info { display:flex; flex-direction:column; gap:0.35rem; }
.periods-info { font-size:0.8rem; color:var(--text-400); display:flex; align-items:center; gap:0.35rem; }
.periods-info .pi { color:var(--primary); }

/* ── Table ── */
::ng-deep .paiement-table .p-datatable-thead > tr > th { background:var(--border-100) !important; color:var(--text-600) !important; font-weight:700; font-size:0.72rem; text-transform:uppercase; letter-spacing:0.06em; border-bottom:2px solid var(--border) !important; padding:0.875rem 1rem !important; }
::ng-deep .paiement-table .p-datatable-tbody > tr > td { padding:0.875rem 1rem !important; border-bottom:1px solid var(--border-100) !important; font-size:0.875rem; color:var(--text-900); }
::ng-deep .paiement-table .p-datatable-tbody > tr:hover { background:#fefce8 !important; }

/* ── Badges ── */
.periode-badge { font-weight:700; color:var(--text-600); font-family:monospace; background:var(--border-100); padding:0.2rem 0.6rem; border-radius:0.375rem; font-size:0.8rem; border:1px solid var(--border); }
.mode-badge { background:var(--border-100); color:var(--text-600); padding:0.2rem 0.6rem; border-radius:9999px; font-size:0.72rem; font-weight:600; border:1px solid var(--border); }
.ref-text { font-family:monospace; font-size:0.78rem; color:var(--text-400); }
.pay-badge { display:inline-flex; align-items:center; padding:0.25rem 0.6rem; border-radius:9999px; font-size:0.72rem; font-weight:700; }
.pay-paye { background:#ecfdf5; color:#065f46; border:1px solid #a7f3d0; }
.pay-en_retard { background:#fffbeb; color:#92400e; border:1px solid #fde68a; }
.pay-partiel { background:#eff6ff; color:#1e40af; border:1px solid #bfdbfe; }
.pay-impaye { background:#fef2f2; color:#991b1b; border:1px solid #fecaca; }
.pay-pending { background:var(--border-100); color:var(--text-400); border:1.5px dashed var(--border); }
.na { color:var(--text-400); font-size:0.85rem; }
.devise { color:var(--text-400); font-size:0.73rem; }
.echeance-cell { min-width:170px; }
.echeance-text { display:inline-flex; align-items:center; gap:0.35rem; font-size:0.875rem; color:var(--text-900); }
.echeance-text .pi { color:var(--primary); font-size:0.72rem; }

/* ── Pending rows ── */
::ng-deep .paiement-table .row-pending { background:#fafafa !important; }
::ng-deep .paiement-table .row-pending:hover { background:#fefce8 !important; }
::ng-deep .echeance-picker { width:100% !important; }
::ng-deep .echeance-picker .p-datepicker-input { font-size:0.82rem !important; padding:0.4rem 0.6rem !important; border-radius:0.5rem !important; border:1.5px dashed var(--border) !important; background:var(--border-100) !important; }
::ng-deep .echeance-picker .p-datepicker-input:focus { border-color:var(--primary) !important; border-style:solid !important; box-shadow:0 0 0 2px rgba(245,158,11,0.12) !important; }

/* ── Action buttons ── */
.action-btn { width:30px !important; height:30px !important; padding:0 !important; border-radius:0.5rem !important; margin:0 2px !important; }
::ng-deep .edit-btn { color:#d97706 !important; background:transparent !important; border:1px solid #fde68a !important; }
::ng-deep .edit-btn:hover { background:#fffbeb !important; }
::ng-deep .del-btn { color:#dc2626 !important; background:transparent !important; border:1px solid #fecaca !important; }
::ng-deep .del-btn:hover { background:#fef2f2 !important; }
::ng-deep .create-btn { color:#059669 !important; background:transparent !important; border:1px solid #a7f3d0 !important; }
::ng-deep .create-btn:hover { background:#ecfdf5 !important; }
.empty-msg { text-align:center; padding:2.5rem 1rem !important; color:var(--text-400); }
.empty-msg i { font-size:2.5rem; display:block; margin-bottom:0.75rem; opacity:0.4; }

/* ── Dialog ── */
::ng-deep .p-dialog { border-radius:1rem !important; box-shadow:0 20px 60px rgba(15,23,42,0.2) !important; }
::ng-deep .p-dialog-header { background:var(--primary) !important; color:white !important; border-radius:1rem 1rem 0 0 !important; padding:1.25rem 1.5rem !important; font-weight:700 !important; }
::ng-deep .p-dialog-header-icon { color:white !important; }
.dialog-body { padding:1rem 0; }
.dialog-fields { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
.d-field { display:flex; flex-direction:column; gap:0.35rem; }
.d-field.full { grid-column:1 / -1; }
.d-label { font-size:0.78rem; font-weight:600; color:var(--text-600); }
.required { color:#ef4444; }
::ng-deep .w-full, ::ng-deep .w-full .p-select, ::ng-deep .w-full .p-inputnumber-input, ::ng-deep .w-full.p-inputtext { width:100% !important; }
.dialog-footer { display:flex; justify-content:flex-end; gap:0.75rem; }
::ng-deep .btn-primary { background:var(--primary) !important; border:none !important; color:white !important; font-weight:700 !important; border-radius:0.625rem !important; box-shadow:0 2px 8px rgba(245,158,11,0.25) !important; }
::ng-deep .btn-primary:hover { background:var(--primary-dark) !important; }

@media (max-width:900px) { .content-grid { grid-template-columns:1fr; } .stats-grid { grid-template-columns:repeat(2,1fr); } .dialog-fields { grid-template-columns:1fr; } }
    `]
})
export class DetailContrat {
    contrat: any = null;
    paiements: any[] = [];
    periodes: any[] = [];
    loading = true;
    loadingPaiements = false;
    newStatut = '';

    // Dialog
    showDialog = false;
    savingPaiement = false;
    editPaiementId: string | null = null;
    periodeLocked = false;

    pForm = {
        periode: '',
        montant_attendu: 0,
        montant_paye: 0,
        date_echeance: null as Date | null,
        date_paiement: null as Date | null,
        mode_paiement: 'virement',
        statut: 'impaye',
        reference: '',
        notes: ''
    };

    statutOptions = [
        { label: 'Actif',               value: 'actif' },
        { label: 'Expiré',              value: 'expire' },
        { label: 'Résilié',             value: 'resilie' },
        { label: 'En renouvellement',   value: 'en_renouvellement' }
    ];

    modeOptions = [
        { label: 'Espèces',        value: 'especes' },
        { label: 'Virement',       value: 'virement' },
        { label: 'Chèque',         value: 'cheque' },
        { label: 'Mobile Money',   value: 'mobile_money' }
    ];

    payStatutOptions = [
        { label: 'Payé',       value: 'paye' },
        { label: 'En retard',  value: 'en_retard' },
        { label: 'Partiel',    value: 'partiel' },
        { label: 'Impayé',     value: 'impaye' }
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private contratService: ContratService,
        private paiementService: PaiementService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        this.contratService.getById(id).subscribe({
            next: (data) => { this.contrat = data; this.newStatut = data.statut; this.loading = false; this.loadPaiements(id); },
            error: () => { this.loading = false; }
        });
    }

    loadPaiements(contrat_id: string) {
        this.loadingPaiements = true;
        this.paiementService.getAllByContrat(contrat_id).subscribe({
            next: (data) => {
                this.paiements = data;
                this.loadingPaiements = false;
                this.buildPeriodes();
            },
            error: () => { this.loadingPaiements = false; }
        });
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
            // Default écheance: 5th of the month
            const echeance = paiement ? null : new Date(y, cur.getMonth(), 5);
            result.push({ periode: key, paiement, echeance });
            cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1);
        }
        this.periodes = result;
    }

    createForPeriode(item: any) {
        this.editPaiementId = null;
        this.periodeLocked = true;
        this.pForm = {
            periode: item.periode,
            montant_attendu: this.contrat?.loyer?.montant_mensuel || 0,
            montant_paye: 0,
            date_echeance: item.echeance,
            date_paiement: null,
            mode_paiement: 'virement',
            statut: 'impaye',
            reference: '',
            notes: ''
        };
        this.showDialog = true;
    }

    get totalContratAttendu() {
        return (this.contrat?.loyer?.montant_mensuel || 0) * this.periodes.length;
    }
    get totalPaye() { return this.paiements.reduce((s, p) => s + (p.montant_paye || 0), 0); }
    countPaiement(s: string) { return this.paiements.filter(p => p.statut === s).length; }

    statutLabel(s: string) {
        const map: any = { actif:'Actif', expire:'Expiré', resilie:'Résilié', en_renouvellement:'Renouvellement' };
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

    changeStatut(statut: string) {
        if (!statut || statut === this.contrat.statut) return;
        this.contratService.updateStatut(this.contrat._id, statut).subscribe({
            next: () => {
                this.contrat.statut = statut;
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Statut mis à jour' });
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de changer le statut' })
        });
    }

    goEdit() {
        this.router.navigate(['/admin/home/contrats/ajouter'], { state: { contrat: this.contrat } });
    }

    openPaiementDialog() {
        this.editPaiementId = null;
        this.pForm = {
            periode: '',
            montant_attendu: this.contrat?.loyer?.montant_mensuel || 0,
            montant_paye: 0,
            date_echeance: null,
            date_paiement: null,
            mode_paiement: 'virement',
            statut: 'impaye',
            reference: '',
            notes: ''
        };
        this.showDialog = true;
    }

    openEditPaiement(p: any) {
        this.editPaiementId = p._id;
        this.periodeLocked = false;
        this.pForm = {
            periode: p.periode,
            montant_attendu: p.montant_attendu,
            montant_paye: p.montant_paye,
            date_echeance: p.date_echeance ? new Date(p.date_echeance) : null,
            date_paiement: p.date_paiement ? new Date(p.date_paiement) : null,
            mode_paiement: p.mode_paiement,
            statut: p.statut,
            reference: p.reference,
            notes: p.notes
        };
        this.showDialog = true;
    }

    savePaiement() {
        if (!this.pForm.periode || !this.pForm.montant_attendu || !this.pForm.date_echeance) {
            this.messageService.add({ severity: 'warn', summary: 'Champs requis', detail: 'Période, montant attendu et date d\'échéance sont obligatoires' });
            return;
        }
        this.savingPaiement = true;

        const payload: any = {
            montant_paye: this.pForm.montant_paye,
            date_paiement: this.pForm.date_paiement?.toISOString() || null,
            mode_paiement: this.pForm.mode_paiement,
            statut: this.pForm.statut,
            reference: this.pForm.reference,
            notes: this.pForm.notes
        };

        const req = this.editPaiementId
            ? this.paiementService.update(this.editPaiementId, payload)
            : this.paiementService.create({
                contrat_id: this.contrat._id,
                boutique_id: this.contrat.boutique_id?._id || this.contrat.boutique_id,
                periode: this.pForm.periode,
                montant_attendu: this.pForm.montant_attendu,
                montant_paye: this.pForm.montant_paye,
                date_echeance: this.pForm.date_echeance!.toISOString(),
                date_paiement: this.pForm.date_paiement?.toISOString(),
                mode_paiement: this.pForm.mode_paiement,
                statut: this.pForm.statut,
                reference: this.pForm.reference,
                notes: this.pForm.notes
            });

        req.subscribe({
            next: () => {
                this.showDialog = false;
                this.savingPaiement = false;
                this.periodeLocked = false;
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: this.editPaiementId ? 'Paiement mis à jour' : 'Paiement enregistré' });
                this.loadPaiements(this.contrat._id);
            },
            error: (err) => {
                this.savingPaiement = false;
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err?.error?.message || 'Erreur serveur' });
            }
        });
    }

    confirmDeletePaiement(p: any) {
        this.confirmationService.confirm({
            message: `Supprimer le paiement de la période <strong>${p.periode}</strong> ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Supprimer',
            rejectLabel: 'Annuler',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.paiementService.delete(p._id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: 'Paiement supprimé' });
                        this.loadPaiements(this.contrat._id);
                    },
                    error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de supprimer' })
                });
            }
        });
    }

    goBack() { this.router.navigate(['/admin/home/contrats']); }
}
