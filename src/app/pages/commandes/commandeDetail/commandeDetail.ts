import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommandeService } from '@/pages/service/commande.service';

@Component({
    selector: 'app-commande-detail',
    standalone: true,
    imports: [CommonModule, ButtonModule, TagModule, ToastModule, ConfirmDialogModule],
    providers: [MessageService, ConfirmationService],
    template: `
<p-toast></p-toast>
<p-confirmDialog></p-confirmDialog>

<!-- ===== LOADING ===== -->
@if (loading) {
    <div class="cd-loading">
        <i class="pi pi-spin pi-spinner"></i>
        <p>Chargement de la commande...</p>
    </div>
}

@if (!loading && !commande) {
    <div class="cd-loading">
        <i class="pi pi-exclamation-circle"></i>
        <p>Commande introuvable</p>
        <button pButton label="Retour" icon="pi pi-arrow-left" (click)="goBack()"></button>
    </div>
}

@if (!loading && commande) {

    <!-- ===== TOOLBAR ===== -->
    <div class="cd-toolbar no-print">
        <button pButton label="Retour" icon="pi pi-arrow-left" [text]="true" (click)="goBack()"></button>
        <div class="cd-toolbar-right">
            <p-tag [value]="getStatutLabel(commande.statut)"
                   [severity]="getStatutSeverity(commande.statut)"
                   [style]="{'font-size':'0.9rem','padding':'0.4rem 0.9rem'}"></p-tag>
            <button pButton label="Imprimer" icon="pi pi-print" [outlined]="true"
                    (click)="printInvoice()"></button>
        </div>
    </div>

    <!-- ===== INVOICE ===== -->
    <div class="invoice-page" id="invoice-print">

        <!-- ─── HEADER ─── -->
        <div class="inv-header">
            <div class="inv-brand">
                <i class="pi pi-shopping-bag"></i>
                <span>CentreMall</span>
            </div>
            <div class="inv-title-block">
                <div class="inv-title">FACTURE</div>
                <table class="inv-meta-table">
                    <tr>
                        <td class="inv-meta-label">N° Commande</td>
                        <td class="inv-meta-val">{{ commande.numero_commande }}</td>
                    </tr>
                    <tr>
                        <td class="inv-meta-label">Date</td>
                        <td class="inv-meta-val">{{ commande.created_at | date:'dd/MM/yyyy HH:mm' }}</td>
                    </tr>
                    <tr>
                        <td class="inv-meta-label">Mode</td>
                        <td class="inv-meta-val">{{ commande.mode_retrait === 'livraison' ? 'Livraison à domicile' : 'Retrait en boutique' }}</td>
                    </tr>
                    <tr class="no-print">
                        <td class="inv-meta-label">Statut</td>
                        <td class="inv-meta-val">
                            <p-tag [value]="getStatutLabel(commande.statut)"
                                   [severity]="getStatutSeverity(commande.statut)"></p-tag>
                        </td>
                    </tr>
                    <tr class="print-only" style="display:none;">
                        <td class="inv-meta-label">Statut</td>
                        <td class="inv-meta-val">{{ getStatutLabel(commande.statut) }}</td>
                    </tr>
                </table>
            </div>
        </div>

        <!-- ─── PARTIES ─── -->
        <div class="inv-parties">
            <div class="inv-party">
                <div class="inv-party-title">FACTURÉ À (CLIENT)</div>
                <div class="inv-party-name">{{ commande.client?.prenom_client }} {{ commande.client?.nom_client }}</div>
                <div class="inv-party-info">{{ commande.client?.email }}</div>
                @if (commande.adresse_livraison) {
                    <div class="inv-party-info" style="margin-top:0.4rem;">
                        <i class="pi pi-map-marker" style="margin-right:0.3rem;"></i>
                        {{ commande.adresse_livraison }}
                    </div>
                }
            </div>
            <div class="inv-party">
                <div class="inv-party-title">BOUTIQUE</div>
                <div class="inv-party-name">{{ commande.boutique?.nom_boutique }}</div>
                @if (commande.boutique?.adresse_boutique) {
                    <div class="inv-party-info">{{ commande.boutique.adresse_boutique }}</div>
                }
            </div>
        </div>

        <!-- ─── NOTE CLIENT ─── -->
        @if (commande.note_client) {
            <div class="inv-note">
                <i class="pi pi-comment"></i>
                <span><strong>Note client :</strong> {{ commande.note_client }}</span>
            </div>
        }

        <!-- ─── ITEMS TABLE ─── -->
        <table class="inv-table">
            <thead>
                <tr>
                    <th style="text-align:left; width:35%;">Désignation</th>
                    <th style="text-align:left; width:25%;">Variante</th>
                    <th style="text-align:right; width:15%;">Prix unitaire</th>
                    <th style="text-align:center; width:10%;">Qté</th>
                    <th style="text-align:right; width:15%;">Sous-total</th>
                </tr>
            </thead>
            <tbody>
                @for (ligne of commande.lignes; track ligne._id) {
                    <tr>
                        <td class="inv-td-produit">{{ ligne.nom_produit }}</td>
                        <td class="inv-td-variante">{{ ligne.combinaison_label || 'Standard' }}</td>
                        <td class="inv-td-right">{{ ligne.prix_unitaire | number:'1.2-2' }} DT</td>
                        <td class="inv-td-center">{{ ligne.quantite }}</td>
                        <td class="inv-td-right inv-td-bold">{{ ligne.sous_total | number:'1.2-2' }} DT</td>
                    </tr>
                }
            </tbody>
        </table>

        <!-- ─── TOTALS ─── -->
        <div class="inv-total-section">
            <div class="inv-total-row">
                <span class="inv-total-label">TOTAL TTC</span>
                <span class="inv-total-val">{{ commande.total | number:'1.2-2' }} DT</span>
            </div>
        </div>

        <!-- ─── STATUS STEPPER ─── -->
        @if (commande.statut !== 'annulee') {
            <div class="inv-stepper-wrap">
                <div class="inv-stepper-title">Suivi de commande</div>
                <div class="inv-stepper">
                    @for (step of statusSteps; track step.key; let i = $index) {
                        <div class="stepper-step"
                             [class.step-done]="isStepDone(step.key)"
                             [class.step-current]="isStepCurrent(step.key)">
                            @if (i > 0) {
                                <div class="step-connector"
                                     [class.step-connector-done]="isStepDone(step.key) || isStepCurrent(step.key)"></div>
                            }
                            <div class="step-dot">
                                @if (isStepDone(step.key)) {
                                    <i class="pi pi-check"></i>
                                } @else {
                                    <i class="pi {{ step.icon }}"></i>
                                }
                            </div>
                            <div class="step-label">{{ step.label }}</div>
                        </div>
                    }
                </div>
            </div>
        } @else {
            <div class="inv-cancelled-banner">
                <i class="pi pi-times-circle"></i>
                <span>Commande annulée</span>
                <span class="inv-cancelled-date">le {{ commande.updated_at | date:'dd/MM/yyyy' }}</span>
            </div>
        }

        <!-- ─── INVOICE FOOTER ─── -->
        <div class="inv-footer">
            <span>CentreMall — Merci de votre confiance</span>
            <span>Document généré le {{ today | date:'dd/MM/yyyy HH:mm' }}</span>
        </div>
    </div>

    <!-- ===== ACTIONS PANEL (no print) ===== -->
    @if (mode === 'boutique' && getAvailableActions().length > 0) {
        <div class="action-panel no-print">
            <div class="action-panel-header">
                <i class="pi pi-sliders-h"></i>
                <span>Actions sur cette commande</span>
            </div>
            <div class="action-btn-group">
                @for (action of getAvailableActions(); track action.value) {
                    <button pButton
                            [label]="action.label"
                            [icon]="'pi ' + action.icon"
                            [severity]="action.severity"
                            [loading]="processingAction"
                            (click)="confirmChangeStatut(action)">
                    </button>
                }
            </div>
        </div>
    }

    @if (mode === 'client' && commande.statut === 'en_attente') {
        <div class="action-panel action-panel-danger no-print">
            <div class="action-panel-header">
                <i class="pi pi-cog"></i>
                <span>Actions disponibles</span>
            </div>
            <button pButton label="Annuler ma commande" icon="pi pi-times"
                    severity="danger" [outlined]="true"
                    [loading]="processingAction"
                    (click)="confirmCancel()">
            </button>
            <p class="action-panel-hint">L'annulation n'est possible que si votre commande est encore en attente.</p>
        </div>
    }

}

<style>
/* ===== GLOBAL ===== */
* { box-sizing: border-box; }

/* ===== TOOLBAR ===== */
.cd-toolbar {
    max-width: 960px; margin: 0 auto 1.25rem; padding: 0 0.5rem;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;
}
.cd-toolbar-right { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }

/* ===== LOADING / ERROR ===== */
.cd-loading {
    text-align: center; padding: 5rem 2rem; color: #94a3b8;
    display: flex; flex-direction: column; align-items: center; gap: 1rem;
}
.cd-loading i { font-size: 3rem; }
.cd-loading p { font-size: 1.05rem; font-weight: 500; color: #64748b; }

/* ===== INVOICE PAGE ===== */
.invoice-page {
    max-width: 960px; margin: 0 auto 2rem;
    background: white; border-radius: 16px;
    box-shadow: 0 4px 32px rgba(0,0,0,0.1);
    padding: 3rem;
}

/* ─── HEADER ─── */
.inv-header {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 2.5rem; padding-bottom: 1.75rem;
    border-bottom: 3px solid #4f46e5;
}
.inv-brand {
    display: flex; align-items: center; gap: 0.5rem;
    font-size: 1.6rem; font-weight: 800; color: #4f46e5;
}
.inv-brand i { font-size: 2.2rem; }
.inv-title-block { text-align: right; }
.inv-title {
    font-size: 2.2rem; font-weight: 900; color: #1e293b;
    letter-spacing: 0.12em; margin-bottom: 0.9rem;
}
.inv-meta-table td { padding: 0.18rem 0.5rem; font-size: 0.875rem; }
.inv-meta-label { color: #64748b; font-weight: 500; text-align: right; }
.inv-meta-val { font-weight: 600; color: #1e293b; padding-left: 1rem; }

/* ─── PARTIES ─── */
.inv-parties {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;
    margin-bottom: 1.75rem;
}
.inv-party {
    background: #f8fafc; border-radius: 12px;
    padding: 1.25rem 1.5rem; border-left: 4px solid #4f46e5;
}
.inv-party-title {
    font-size: 0.68rem; font-weight: 800; letter-spacing: 0.1em;
    color: #4f46e5; text-transform: uppercase; margin-bottom: 0.6rem;
}
.inv-party-name { font-size: 1rem; font-weight: 700; color: #1e293b; margin-bottom: 0.2rem; }
.inv-party-info { font-size: 0.85rem; color: #64748b; }

/* ─── NOTE ─── */
.inv-note {
    background: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px;
    padding: 0.75rem 1.1rem; margin-bottom: 1.75rem;
    font-size: 0.875rem; color: #92400e;
    display: flex; align-items: flex-start; gap: 0.6rem;
}

/* ─── TABLE ─── */
.inv-table {
    width: 100%; border-collapse: collapse;
    margin-bottom: 0; border-radius: 8px; overflow: hidden;
}
.inv-table thead tr { background: #1e293b; color: white; }
.inv-table thead th {
    padding: 0.85rem 1rem; font-size: 0.75rem;
    font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase;
}
.inv-table tbody tr { border-bottom: 1px solid #f1f5f9; transition: background 0.15s; }
.inv-table tbody tr:hover { background: #f8fafc; }
.inv-table tbody tr:last-child { border-bottom: 2px solid #e2e8f0; }
.inv-td-produit { padding: 0.9rem 1rem; font-size: 0.9rem; font-weight: 600; color: #1e293b; }
.inv-td-variante { padding: 0.9rem 1rem; font-size: 0.82rem; color: #7c3aed; }
.inv-td-right { padding: 0.9rem 1rem; text-align: right; font-size: 0.9rem; color: #475569; }
.inv-td-center { padding: 0.9rem 1rem; text-align: center; font-size: 0.9rem; color: #475569; }
.inv-td-bold { font-weight: 700; color: #1e293b; }

/* ─── TOTAL ─── */
.inv-total-section { display: flex; justify-content: flex-end; }
.inv-total-row {
    display: flex; align-items: center; gap: 4rem;
    background: linear-gradient(135deg, #312e81, #4f46e5);
    color: white; padding: 1.1rem 2rem;
    border-radius: 0 0 12px 12px; min-width: 320px;
}
.inv-total-label {
    font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; opacity: 0.85;
}
.inv-total-val { font-size: 1.6rem; font-weight: 800; margin-left: auto; }

/* ─── STEPPER ─── */
.inv-stepper-wrap { margin: 2.5rem 0 1.5rem; }
.inv-stepper-title {
    font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; color: #94a3b8; margin-bottom: 1.25rem;
    text-align: center;
}
.inv-stepper { display: flex; align-items: flex-start; justify-content: center; }
.stepper-step {
    display: flex; flex-direction: column; align-items: center;
    gap: 0.6rem; flex: 1; position: relative;
}
.step-connector {
    position: absolute; top: 20px; right: 50%; left: -50%;
    height: 2px; background: #e2e8f0; z-index: 0;
    transition: background 0.3s;
}
.step-connector-done { background: #4f46e5; }
.step-dot {
    width: 40px; height: 40px; border-radius: 50%;
    background: #f1f5f9; border: 2px solid #e2e8f0;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem; color: #94a3b8;
    transition: all 0.3s; position: relative; z-index: 1;
}
.stepper-step.step-done .step-dot { background: #4f46e5; border-color: #4f46e5; color: white; }
.stepper-step.step-current .step-dot {
    background: white; border: 3px solid #4f46e5; color: #4f46e5;
    box-shadow: 0 0 0 5px #eef2ff;
}
.step-label { font-size: 0.72rem; font-weight: 500; color: #94a3b8; text-align: center; max-width: 80px; }
.stepper-step.step-done .step-label { color: #4f46e5; font-weight: 600; }
.stepper-step.step-current .step-label { color: #4f46e5; font-weight: 700; }

/* ─── CANCELLED BANNER ─── */
.inv-cancelled-banner {
    display: flex; align-items: center; justify-content: center; gap: 0.75rem;
    background: #fef2f2; border: 2px solid #fecaca; border-radius: 12px;
    padding: 1.25rem; margin: 2rem 0;
    color: #dc2626; font-weight: 700; font-size: 1.1rem;
}
.inv-cancelled-banner i { font-size: 1.4rem; }
.inv-cancelled-date { font-size: 0.85rem; font-weight: 400; color: #ef4444; }

/* ─── INVOICE FOOTER ─── */
.inv-footer {
    border-top: 1px solid #f1f5f9; margin-top: 2rem; padding-top: 1rem;
    display: flex; justify-content: space-between; align-items: center;
    color: #94a3b8; font-size: 0.78rem; flex-wrap: wrap; gap: 0.5rem;
}

/* ===== ACTION PANEL ===== */
.action-panel {
    max-width: 960px; margin: 0 auto 2rem;
    background: white; border-radius: 12px;
    padding: 1.5rem 2rem; border: 1px solid #e2e8f0;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}
.action-panel-header {
    display: flex; align-items: center; gap: 0.6rem;
    font-size: 1rem; font-weight: 700; color: #1e293b;
    margin-bottom: 1.1rem;
}
.action-panel-header i { color: #4f46e5; font-size: 1.1rem; }
.action-panel-danger .action-panel-header i { color: #ef4444; }
.action-btn-group { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.action-panel-hint {
    margin-top: 0.75rem; font-size: 0.8rem; color: #94a3b8;
}

/* ===== PRINT ===== */
@media print {
    .no-print { display: none !important; }
    .invoice-page {
        box-shadow: none; border-radius: 0;
        padding: 1cm; margin: 0; max-width: 100%;
    }
    .inv-header { margin-bottom: 1.5cm; }
    body { background: white; }
    .inv-table tbody tr:hover { background: transparent; }
}
</style>
    `,
})
export class CommandeDetail implements OnInit {

    commande: any = null;
    loading = true;
    processingAction = false;
    mode: 'client' | 'boutique' | 'admin' = 'client';
    today = new Date();

    statusSteps = [
        { key: 'en_attente',    label: 'En attente',      icon: 'pi-clock' },
        { key: 'confirmee',     label: 'Confirmée',        icon: 'pi-check-circle' },
        { key: 'en_preparation',label: 'En préparation',   icon: 'pi-cog' },
        { key: 'prete',         label: 'Prête',            icon: 'pi-box' },
        { key: 'livree',        label: 'Livrée',           icon: 'pi-check-square' },
    ];
    private statusOrder = ['en_attente', 'confirmee', 'en_preparation', 'prete', 'livree'];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private commandeService: CommandeService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id')!;
        this.mode = this.route.snapshot.data['mode'] || 'client';
        this.commandeService.getById(id).subscribe({
            next: (data) => { this.commande = data; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    isStepDone(key: string): boolean {
        if (!this.commande || this.commande.statut === 'annulee') return false;
        return this.statusOrder.indexOf(key) < this.statusOrder.indexOf(this.commande.statut);
    }

    isStepCurrent(key: string): boolean {
        return this.commande?.statut === key;
    }

    getAvailableActions(): any[] {
        const flow: Record<string, any[]> = {
            en_attente: [
                { label: 'Confirmer',            value: 'confirmee',      severity: 'success', icon: 'pi-check' },
                { label: 'Annuler',              value: 'annulee',        severity: 'danger',  icon: 'pi-times' }
            ],
            confirmee: [
                { label: 'Mettre en préparation', value: 'en_preparation', severity: 'info',    icon: 'pi-cog' },
                { label: 'Annuler',               value: 'annulee',        severity: 'danger',  icon: 'pi-times' }
            ],
            en_preparation: [
                { label: 'Marquer Prête',  value: 'prete',  severity: 'success',  icon: 'pi-box' }
            ],
            prete: [
                { label: 'Marquer Livrée', value: 'livree', severity: 'contrast', icon: 'pi-check-square' }
            ],
        };
        return flow[this.commande?.statut] || [];
    }

    confirmChangeStatut(action: any) {
        this.confirmationService.confirm({
            message: `Voulez-vous vraiment <strong>${action.label}</strong> la commande <strong>${this.commande.numero_commande}</strong> ?`,
            header: 'Confirmation',
            icon: 'pi pi-question-circle',
            acceptLabel: 'Oui, confirmer',
            rejectLabel: 'Annuler',
            acceptButtonStyleClass: action.value === 'annulee' ? 'p-button-danger' : 'p-button-primary',
            accept: () => this.changeStatut(action.value)
        });
    }

    changeStatut(statut: string) {
        if (!this.commande) return;
        this.processingAction = true;
        this.commandeService.updateOrderStatus(this.commande._id, statut).subscribe({
            next: () => {
                this.commande.statut = statut;
                this.commande.updated_at = new Date().toISOString();
                this.processingAction = false;
                this.messageService.add({
                    severity: 'success', summary: 'Statut mis à jour',
                    detail: this.getStatutLabel(statut), life: 3000
                });
            },
            error: () => {
                this.processingAction = false;
                this.messageService.add({
                    severity: 'error', summary: 'Erreur',
                    detail: 'Impossible de mettre à jour le statut', life: 3000
                });
            }
        });
    }

    confirmCancel() {
        this.confirmationService.confirm({
            message: `Voulez-vous vraiment annuler la commande <strong>${this.commande.numero_commande}</strong> ?`,
            header: 'Confirmer l\'annulation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui, annuler',
            rejectLabel: 'Non',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => this.cancelOrder()
        });
    }

    cancelOrder() {
        this.processingAction = true;
        this.commandeService.cancelOrder(this.commande._id).subscribe({
            next: () => {
                this.commande.statut = 'annulee';
                this.commande.updated_at = new Date().toISOString();
                this.processingAction = false;
                this.messageService.add({
                    severity: 'info', summary: 'Commande annulée',
                    detail: this.commande.numero_commande, life: 3000
                });
            },
            error: (err) => {
                this.processingAction = false;
                this.messageService.add({
                    severity: 'error', summary: 'Erreur',
                    detail: err.error?.message || 'Impossible d\'annuler', life: 3000
                });
            }
        });
    }

    printInvoice() { window.print(); }

    goBack() {
        if (this.mode === 'boutique') this.router.navigate(['/boutique/home/mesCommandes']);
        else if (this.mode === 'admin') this.router.navigate(['/admin/home/commandes']);
        else this.router.navigate(['/client/mes-commandes']);
    }

    getStatutLabel(statut: string): string {
        const labels: Record<string, string> = {
            en_attente: 'En attente', confirmee: 'Confirmée',
            en_preparation: 'En préparation', prete: 'Prête',
            livree: 'Livrée', annulee: 'Annulée'
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
