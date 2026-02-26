import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ContratService } from '@/pages/service/contrat.service';
import { BoutiqueService } from '@/pages/service/boutique.service';
import { BoxService } from '@/pages/service/box.service';

@Component({
    selector: 'app-ajouterContrat',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ButtonModule, InputTextModule, InputNumberModule,
        SelectModule, DatePickerModule, CheckboxModule, ToggleButtonModule,
        DividerModule, ToastModule, TextareaModule
    ],
    providers: [MessageService],
    template: `
<div class="page-container">
    <p-toast></p-toast>

    <!-- Header -->
    <div class="page-header">
        <div class="header-left">
            <button pButton type="button" icon="pi pi-arrow-left" label="Retour"
                class="p-button-text back-btn" (click)="goBack()"></button>
            <div>
                <h1 class="page-title">
                    <i class="pi pi-file-edit"></i>
                    {{ isEdit ? 'Modifier le contrat' : 'Nouveau contrat' }}
                </h1>
                <p class="page-subtitle">{{ isEdit ? 'Modifiez les informations du contrat' : 'Renseignez les informations du contrat de location' }}</p>
            </div>
        </div>
    </div>

    <div class="form-grid">

        <!-- ── Section Boutique & Box ── -->
        <div class="form-card full-width">
            <h3 class="section-title"><i class="pi pi-shopping-bag"></i> Boutique & Emplacement</h3>
            <div class="fields-row">
                <div class="field">
                    <label class="field-label">Boutique <span class="required">*</span></label>
                    <p-select
                        [options]="boutiques"
                        [(ngModel)]="form.boutique_id"
                        optionLabel="nom_boutique" optionValue="_id"
                        placeholder="Sélectionner une boutique"
                        [filter]="true" filterBy="nom_boutique"
                        styleClass="w-full">
                    </p-select>
                </div>
                <div class="field">
                    <label class="field-label">Box / Emplacement</label>
                    <p-select
                        [options]="boxes"
                        [(ngModel)]="form.box_id"
                        optionLabel="label" optionValue="_id"
                        placeholder="Sélectionner un box"
                        [filter]="true" filterBy="label"
                        [showClear]="true"
                        (onChange)="onBoxChange($event)"
                        styleClass="w-full">
                    </p-select>
                    <small class="field-hint">Laissez vide si non applicable</small>
                </div>
                <div class="field">
                    <label class="field-label">Numéro & Étage / Zone</label>
                    <div class="box-info-row">
                        <span class="box-info-chip" [class.empty]="!form.box_numero">
                            <i class="pi pi-hashtag"></i>
                            {{ form.box_numero || '—' }}
                        </span>
                        <span class="box-info-chip" [class.empty]="!form.box_etage">
                            <i class="pi pi-building"></i>
                            {{ form.box_etage || '—' }}
                        </span>
                    </div>
                    <small class="field-hint">Rempli automatiquement après sélection</small>
                </div>
            </div>
        </div>

        <!-- ── Section Dates ── -->
        <div class="form-card">
            <h3 class="section-title"><i class="pi pi-calendar"></i> Période du contrat</h3>
            <div class="fields-col">
                <div class="field">
                    <label class="field-label">Date de début <span class="required">*</span></label>
                    <p-datePicker [(ngModel)]="form.date_debut" dateFormat="dd/mm/yy"
                        [showIcon]="true" styleClass="w-full"
                        (onSelect)="calcDuree()"></p-datePicker>
                </div>
                <div class="field">
                    <label class="field-label">Date de fin <span class="required">*</span></label>
                    <p-datePicker [(ngModel)]="form.date_fin" dateFormat="dd/mm/yy"
                        [showIcon]="true" styleClass="w-full"
                        (onSelect)="calcDuree()"></p-datePicker>
                </div>
                <div class="field">
                    <label class="field-label">Durée (mois)</label>
                    <p-inputNumber [(ngModel)]="form.duree_mois" [min]="1"
                        placeholder="36" styleClass="w-full" [disabled]="true"></p-inputNumber>
                    <small class="field-hint">Calculée automatiquement</small>
                </div>
            </div>
        </div>

        <!-- ── Section Loyer ── -->
        <div class="form-card">
            <h3 class="section-title"><i class="pi pi-money-bill"></i> Loyer & Finances</h3>
            <div class="fields-col">
                <div class="field">
                    <label class="field-label">Loyer mensuel <span class="required">*</span></label>
                    <p-inputNumber [(ngModel)]="form.loyer.montant_mensuel" [min]="0"
                        mode="decimal" locale="fr-MG" [minFractionDigits]="0"
                        placeholder="1 500 000" styleClass="w-full"></p-inputNumber>
                </div>
                <div class="field">
                    <label class="field-label">Devise</label>
                    <p-select [options]="devises" [(ngModel)]="form.loyer.devise"
                        optionLabel="label" optionValue="value" styleClass="w-full"></p-select>
                </div>
                <div class="field">
                    <label class="field-label">Charges mensuelles</label>
                    <p-inputNumber [(ngModel)]="form.loyer.charges_mensuelles" [min]="0"
                        mode="decimal" locale="fr-MG" [minFractionDigits]="0"
                        placeholder="150 000" styleClass="w-full"></p-inputNumber>
                </div>
                <div class="field checkbox-field">
                    <p-checkbox [(ngModel)]="form.loyer.charges_incluses"
                        [binary]="true" label="Charges incluses dans le loyer"></p-checkbox>
                </div>
                <div class="field">
                    <label class="field-label">Caution (dépôt de garantie)</label>
                    <p-inputNumber [(ngModel)]="form.caution" [min]="0"
                        mode="decimal" locale="fr-MG" [minFractionDigits]="0"
                        placeholder="4 500 000" styleClass="w-full"></p-inputNumber>
                    <small class="field-hint">Généralement 3 mois de loyer</small>
                </div>
            </div>
        </div>

        <!-- ── Section Statut & Options ── -->
        <div class="form-card full-width">
            <h3 class="section-title"><i class="pi pi-cog"></i> Statut & Options</h3>
            <div class="fields-row">
                <div class="field">
                    <label class="field-label">Statut du contrat</label>
                    <p-select [options]="statutOptions" [(ngModel)]="form.statut"
                        optionLabel="label" optionValue="value" styleClass="w-full"></p-select>
                </div>
                <div class="field checkbox-field" style="justify-content:flex-end;">
                    <p-toggleButton
                        [(ngModel)]="form.renouvellement_auto"
                        onLabel="Renouvellement automatique activé"
                        offLabel="Renouvellement automatique désactivé"
                        onIcon="pi pi-check" offIcon="pi pi-times"
                        styleClass="toggle-renew">
                    </p-toggleButton>
                </div>
            </div>
        </div>

        <!-- ── Submit ── -->
        <div class="form-actions full-width">
            <button pButton type="button" label="Annuler" icon="pi pi-times"
                class="p-button-outlined cancel-btn" (click)="goBack()"></button>
            <button pButton type="button"
                [label]="isEdit ? 'Enregistrer les modifications' : 'Créer le contrat'"
                icon="pi pi-check" class="submit-btn"
                [disabled]="saving" (click)="save()">
            </button>
        </div>

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

.page-container { padding:2rem; max-width:1200px; margin:0 auto; animation:fadeIn 0.35s ease; }
@keyframes fadeIn { from{opacity:0;transform:translateY(10px);} to{opacity:1;transform:translateY(0);} }

/* ── Header ── */
.page-header { margin-bottom:2rem; }
.header-left { display:flex; align-items:flex-start; gap:1rem; }
.page-title { font-size:1.6rem; font-weight:800; color:var(--text-900); margin:0 0 0.25rem 0; display:flex; align-items:center; gap:0.625rem; letter-spacing:-0.025em; }
.page-title i { color:var(--primary); font-size:1.35rem; }
.page-subtitle { color:var(--text-600); font-size:0.9rem; margin:0; }
::ng-deep .back-btn { color:var(--text-600) !important; font-weight:600 !important; border-radius:0.625rem !important; }
::ng-deep .back-btn:hover { background:var(--border-100) !important; color:var(--text-900) !important; }

/* ── Form grid ── */
.form-grid { display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; }
.full-width { grid-column:1 / -1; }

/* ── Cards ── */
.form-card { background:var(--card); border-radius:var(--radius); padding:1.75rem; border:1px solid var(--border); box-shadow:var(--shadow); }
.section-title { font-size:0.95rem; font-weight:700; color:var(--text-900); display:flex; align-items:center; gap:0.5rem; margin:0 0 1.5rem 0; padding-bottom:0.875rem; border-bottom:2px solid var(--border); }
.section-title i { color:var(--primary); }

/* ── Fields ── */
.fields-row { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
.fields-col { display:flex; flex-direction:column; gap:1rem; }
.field { display:flex; flex-direction:column; gap:0.4rem; }
.field-label { font-size:0.82rem; font-weight:600; color:var(--text-600); }
.required { color:#ef4444; }
.field-hint { font-size:0.75rem; color:var(--text-400); }
.checkbox-field { flex-direction:row; align-items:center; padding-top:0.5rem; }

/* ── PrimeNG inputs ── */
::ng-deep .w-full { width:100% !important; }
::ng-deep .w-full .p-select,
::ng-deep .w-full .p-datepicker-input,
::ng-deep .w-full .p-inputnumber-input,
::ng-deep .w-full.p-inputtext { width:100% !important; border-radius:0.625rem !important; border-color:var(--border) !important; }
::ng-deep .p-select:focus-within,
::ng-deep .p-inputtext:focus,
::ng-deep .p-inputnumber-input:focus { border-color:var(--primary) !important; box-shadow:0 0 0 3px rgba(245,158,11,0.1) !important; }

::ng-deep .toggle-renew { border-radius:0.625rem !important; font-weight:600 !important; }
::ng-deep .toggle-renew.p-togglebutton-checked { background:var(--primary) !important; border-color:var(--primary) !important; }

/* ── Actions ── */
.form-actions { display:flex; justify-content:flex-end; gap:1rem; padding-top:0.5rem; }
::ng-deep .cancel-btn { border-color:var(--border) !important; color:var(--text-600) !important; border-radius:0.75rem !important; }
::ng-deep .submit-btn { background:var(--primary) !important; border:none !important; color:white !important; font-weight:700 !important; padding:0.65rem 2rem !important; border-radius:0.75rem !important; box-shadow:0 2px 8px rgba(245,158,11,0.3) !important; transition:all 0.2s !important; }
::ng-deep .submit-btn:enabled:hover { background:var(--primary-dark) !important; box-shadow:0 4px 16px rgba(245,158,11,0.4) !important; transform:translateY(-1px) !important; }
::ng-deep .submit-btn:disabled { opacity:0.55 !important; }

/* ── Box info chips ── */
.box-info-row { display:flex; gap:0.5rem; flex-wrap:wrap; }
.box-info-chip { display:inline-flex; align-items:center; gap:0.35rem; padding:0.45rem 0.875rem; border-radius:0.5rem; background:rgba(245,158,11,0.07); border:1.5px solid rgba(245,158,11,0.2); color:var(--text-900); font-size:0.875rem; font-weight:600; transition:all 0.2s; }
.box-info-chip i { color:var(--primary); font-size:0.78rem; }
.box-info-chip.empty { background:var(--border-100); border-color:var(--border); color:var(--text-400); font-weight:400; }
.box-info-chip.empty i { color:var(--text-400); }

@media (max-width:900px) { .form-grid { grid-template-columns:1fr; } .fields-row { grid-template-columns:1fr; } }
    `]
})
export class AjouterContrat {
    isEdit = false;
    saving = false;
    editId: string | null = null;
    boutiques: any[] = [];
    boxes: any[] = [];

    form = {
        boutique_id: '',
        box_id: '' as string | null,
        box_numero: '',
        box_etage: '',
        date_debut: null as Date | null,
        date_fin: null as Date | null,
        duree_mois: 0,
        loyer: { montant_mensuel: 0, devise: 'MGA', charges_incluses: false, charges_mensuelles: 0 },
        caution: 0,
        statut: 'actif',
        renouvellement_auto: false
    };

    devises = [
        { label: 'Ariary (MGA)', value: 'MGA' },
        { label: 'Euro (EUR)',   value: 'EUR' },
        { label: 'Dollar (USD)', value: 'USD' }
    ];

    statutOptions = [
        { label: 'Actif',               value: 'actif' },
        { label: 'Expiré',              value: 'expire' },
        { label: 'Résilié',             value: 'resilie' },
        { label: 'En renouvellement',   value: 'en_renouvellement' }
    ];

    constructor(
        private contratService: ContratService,
        private boutiqueService: BoutiqueService,
        private boxService: BoxService,
        private router: Router,
        private messageService: MessageService
    ) {
        const nav = this.router.getCurrentNavigation();
        const state = nav?.extras?.state as any;
        if (state?.contrat) {
            this.isEdit = true;
            this.prefill(state.contrat);
        }
    }

    ngOnInit() {
        this.boutiqueService.getAllBoutiqueForAdmin().subscribe({
            next: (data: any[]) => { this.boutiques = data; }
        });
        this.boxService.getAll().subscribe({
            next: (data: any[]) => {
                this.boxes = data.map(b => ({
                    ...b,
                    label: `${b.numero} — ${b.etage}${b.superficie ? ' (' + b.superficie + ' m²)' : ''}`
                }));
            }
        });
    }

    onBoxChange(event: any) {
        const selected = this.boxes.find(b => b._id === event.value);
        if (selected) {
            this.form.box_numero = selected.numero;
            this.form.box_etage  = selected.etage;
        } else {
            this.form.box_numero = '';
            this.form.box_etage  = '';
        }
    }

    prefill(c: any) {
        this.editId = c._id;
        this.form.boutique_id = c.boutique_id?._id || c.boutique_id;
        this.form.box_id     = c.box_id?._id || c.box_id || null;
        this.form.box_numero = c.box_id?.numero || '';
        this.form.box_etage  = c.box_id?.etage  || '';
        this.form.date_debut = c.date_debut ? new Date(c.date_debut) : null;
        this.form.date_fin   = c.date_fin   ? new Date(c.date_fin)   : null;
        this.form.duree_mois = c.duree_mois || 0;
        this.form.loyer = { ...c.loyer };
        this.form.caution = c.caution || 0;
        this.form.statut = c.statut || 'actif';
        this.form.renouvellement_auto = c.renouvellement_auto || false;
    }

    calcDuree() {
        if (this.form.date_debut && this.form.date_fin) {
            const d = new Date(this.form.date_debut);
            const f = new Date(this.form.date_fin);
            const months = (f.getFullYear() - d.getFullYear()) * 12 + (f.getMonth() - d.getMonth());
            this.form.duree_mois = Math.max(0, months);
        }
    }

    save() {
        if (!this.form.boutique_id) {
            this.messageService.add({ severity: 'warn', summary: 'Champ requis', detail: 'Veuillez sélectionner une boutique' });
            return;
        }
        if (!this.form.date_debut || !this.form.date_fin) {
            this.messageService.add({ severity: 'warn', summary: 'Champ requis', detail: 'Veuillez renseigner les dates' });
            return;
        }
        if (!this.form.loyer.montant_mensuel) {
            this.messageService.add({ severity: 'warn', summary: 'Champ requis', detail: 'Veuillez renseigner le loyer mensuel' });
            return;
        }

        this.saving = true;
        const payload: any = {
            boutique_id: this.form.boutique_id,
            date_debut: this.form.date_debut?.toISOString(),
            date_fin: this.form.date_fin?.toISOString(),
            duree_mois: this.form.duree_mois,
            loyer: this.form.loyer,
            caution: this.form.caution,
            statut: this.form.statut,
            renouvellement_auto: this.form.renouvellement_auto
        };
        if (this.form.box_id) payload.box_id = this.form.box_id;

        const req = this.isEdit && this.editId
            ? this.contratService.update(this.editId, payload)
            : this.contratService.create(payload);

        req.subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: this.isEdit ? 'Contrat mis à jour' : 'Contrat créé avec succès'
                });
                setTimeout(() => this.router.navigate(['/admin/home/contrats']), 1200);
            },
            error: (err) => {
                this.saving = false;
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err?.error?.message || 'Erreur serveur' });
            }
        });
    }

    goBack() { this.router.navigate(['/admin/home/contrats']); }
}
