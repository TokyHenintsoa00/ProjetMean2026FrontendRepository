import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PromotionService } from '@/pages/service/promotion.service';
import { ProduitService } from '@/pages/service/produit.service';

@Component({
    selector: 'app-mes-promotions',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ButtonModule, TagModule, ToastModule,
        DialogModule, InputTextModule, TextareaModule, SelectModule,
        InputNumberModule, DatePickerModule, MultiSelectModule, ConfirmDialogModule
    ],
    providers: [MessageService, ConfirmationService],
    template: `
<p-toast></p-toast>
<p-confirmDialog></p-confirmDialog>

<!-- ===== HEADER ===== -->
<div class="mp-header">
    <div class="mp-header-left">
        <div class="mp-header-icon"><i class="pi pi-tag"></i></div>
        <div>
            <h1 class="mp-title">Mes Promotions</h1>
            <p class="mp-subtitle">{{ promotions.length }} promotion(s) créée(s)</p>
        </div>
    </div>
    <button class="mp-btn-create" (click)="openCreate()">
        <i class="pi pi-plus"></i> Nouvelle promotion
    </button>
</div>

<!-- ===== LOADING ===== -->
@if (loading) {
    <div class="mp-loading">
        <i class="pi pi-spin pi-spinner"></i>
        <span>Chargement...</span>
    </div>
}

<!-- ===== EMPTY ===== -->
@if (!loading && promotions.length === 0) {
    <div class="mp-empty">
        <div class="mp-empty-icon"><i class="pi pi-tag"></i></div>
        <h2>Aucune promotion</h2>
        <p>Créez votre première promotion pour attirer plus de clients.</p>
        <button class="mp-btn-create" (click)="openCreate()">
            <i class="pi pi-plus"></i> Créer une promotion
        </button>
    </div>
}

<!-- ===== PROMOTIONS LIST ===== -->
@if (!loading && promotions.length > 0) {
    <div class="mp-grid">
        @for (promo of promotions; track promo._id) {
            <div class="mp-card" [class.mp-card-inactive]="!isActive(promo)">
                <!-- Card header -->
                <div class="mp-card-hdr">
                    <div class="mp-card-hdr-left">
                        <div class="mp-badge" [class.mp-badge-pct]="promo.type_reduction === 'pourcentage'" [class.mp-badge-fix]="promo.type_reduction === 'montant_fixe'">
                            @if (promo.type_reduction === 'pourcentage') {
                                -{{ promo.valeur_reduction }}%
                            } @else {
                                -{{ promo.valeur_reduction }} DT
                            }
                        </div>
                        <div>
                            <h3 class="mp-promo-name">{{ promo.nom }}</h3>
                            @if (promo.description) {
                                <p class="mp-promo-desc">{{ promo.description }}</p>
                            }
                        </div>
                    </div>
                    <div class="mp-card-hdr-right">
                        <p-tag [value]="getStatusLabel(promo)" [severity]="getStatusSeverity(promo)"></p-tag>
                    </div>
                </div>

                <!-- Card body -->
                <div class="mp-card-body">
                    <!-- Dates -->
                    <div class="mp-info-row">
                        <i class="pi pi-calendar"></i>
                        <span>{{ promo.date_debut | date:'dd/MM/yyyy' }} → {{ promo.date_fin | date:'dd/MM/yyyy' }}</span>
                    </div>

                    <!-- Products -->
                    <div class="mp-info-row">
                        <i class="pi pi-box"></i>
                        <span>
                            @if (promo.produits && promo.produits.length > 0) {
                                {{ promo.produits.length }} produit(s) concerné(s)
                            } @else {
                                <span class="mp-muted">Aucun produit associé</span>
                            }
                        </span>
                    </div>

                    <!-- Product chips -->
                    @if (promo.produits && promo.produits.length > 0) {
                        <div class="mp-product-chips">
                            @for (p of promo.produits.slice(0, 4); track p._id) {
                                <span class="mp-product-chip">{{ p.nom_produit }}</span>
                            }
                            @if (promo.produits.length > 4) {
                                <span class="mp-product-chip mp-chip-more">+{{ promo.produits.length - 4 }}</span>
                            }
                        </div>
                    }
                </div>

                <!-- Card footer -->
                <div class="mp-card-footer">
                    <button class="mp-btn-icon mp-btn-toggle" (click)="toggleActif(promo)" [title]="promo.actif ? 'Désactiver' : 'Activer'">
                        <i [class]="promo.actif ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
                        {{ promo.actif ? 'Désactiver' : 'Activer' }}
                    </button>
                    <div class="mp-card-actions">
                        <button class="mp-btn-icon" (click)="openEdit(promo)" title="Modifier">
                            <i class="pi pi-pencil"></i>
                        </button>
                        <button class="mp-btn-icon mp-btn-danger" (click)="confirmDelete(promo)" title="Supprimer">
                            <i class="pi pi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        }
    </div>
}

<!-- ===== DIALOG CREATE / EDIT ===== -->
<p-dialog [(visible)]="dialogVisible"
          [header]="editId ? 'Modifier la promotion' : 'Nouvelle promotion'"
          [modal]="true"
          [style]="{width: '620px', maxWidth: '95vw'}"
          [draggable]="false"
          [resizable]="false"
          styleClass="mp-dialog">

    <div class="mp-form">
        <!-- Nom -->
        <div class="mp-field">
            <label class="mp-label">Nom de la promotion <span class="mp-req">*</span></label>
            <input pInputText [(ngModel)]="form.nom" placeholder="Ex: Soldes d'été, Black Friday..." class="mp-input" />
        </div>

        <!-- Description -->
        <div class="mp-field">
            <label class="mp-label">Description</label>
            <textarea pTextarea [(ngModel)]="form.description" placeholder="Description optionnelle..." rows="2" class="mp-input"></textarea>
        </div>

        <!-- Type + Valeur -->
        <div class="mp-field-row">
            <div class="mp-field mp-field-half">
                <label class="mp-label">Type de réduction <span class="mp-req">*</span></label>
                <p-select [(ngModel)]="form.type_reduction"
                          [options]="typeOptions"
                          optionLabel="label" optionValue="value"
                          placeholder="Sélectionner..."
                          [style]="{width:'100%'}">
                </p-select>
            </div>
            <div class="mp-field mp-field-half">
                <label class="mp-label">Valeur <span class="mp-req">*</span></label>
                <p-inputnumber [(ngModel)]="form.valeur_reduction"
                               [min]="0"
                               [max]="form.type_reduction === 'pourcentage' ? 100 : 99999"
                               [suffix]="form.type_reduction === 'pourcentage' ? ' %' : ' DT'"
                               [style]="{width:'100%'}">
                </p-inputnumber>
            </div>
        </div>

        <!-- Dates -->
        <div class="mp-field-row">
            <div class="mp-field mp-field-half">
                <label class="mp-label">Date de début <span class="mp-req">*</span></label>
                <p-datepicker [(ngModel)]="form.date_debut"
                              dateFormat="dd/mm/yy"
                              [showIcon]="true"
                              [style]="{width:'100%'}">
                </p-datepicker>
            </div>
            <div class="mp-field mp-field-half">
                <label class="mp-label">Date de fin <span class="mp-req">*</span></label>
                <p-datepicker [(ngModel)]="form.date_fin"
                              dateFormat="dd/mm/yy"
                              [showIcon]="true"
                              [style]="{width:'100%'}">
                </p-datepicker>
            </div>
        </div>

        <!-- Produits -->
        <div class="mp-field">
            <label class="mp-label">Produits concernés</label>
            <p-multiselect [(ngModel)]="form.produits"
                           [options]="produitsOptions"
                           optionLabel="nom_produit"
                           optionValue="_id"
                           placeholder="Sélectionner des produits..."
                           [filter]="true"
                           filterPlaceholder="Rechercher..."
                           [style]="{width:'100%'}"
                           display="chip">
            </p-multiselect>
            <small class="mp-hint">Laissez vide pour appliquer à tous les produits de la boutique</small>
        </div>

        <!-- Actif -->
        <div class="mp-field mp-field-switch">
            <label class="mp-label">Statut</label>
            <div class="mp-toggle-wrap">
                <button class="mp-toggle-btn" [class.mp-toggle-on]="form.actif" (click)="form.actif = !form.actif">
                    <div class="mp-toggle-knob"></div>
                </button>
                <span class="mp-toggle-label">{{ form.actif ? 'Active' : 'Inactive' }}</span>
            </div>
        </div>
    </div>

    <ng-template pTemplate="footer">
        <div class="mp-dialog-footer">
            <button class="mp-btn-cancel" (click)="dialogVisible = false">Annuler</button>
            <button class="mp-btn-save" (click)="save()" [disabled]="saving">
                @if (saving) { <i class="pi pi-spin pi-spinner"></i> }
                {{ editId ? 'Enregistrer' : 'Créer la promotion' }}
            </button>
        </div>
    </ng-template>
</p-dialog>

<style>
.mp-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem; }
.mp-header-left { display:flex; align-items:center; gap:0.75rem; }
.mp-header-icon { width:46px; height:46px; border-radius:12px; background:#fef3c7; display:flex; align-items:center; justify-content:center; font-size:1.3rem; color:#f59e0b; }
.mp-title { margin:0; font-size:1.35rem; font-weight:800; color:#0f172a; }
.mp-subtitle { margin:0; font-size:0.85rem; color:#64748b; }

.mp-btn-create { display:flex; align-items:center; gap:0.5rem; padding:0.6rem 1.25rem; background:#f59e0b; color:white; border:none; border-radius:8px; font-size:0.875rem; font-weight:700; cursor:pointer; transition:background 0.15s; }
.mp-btn-create:hover { background:#d97706; }

.mp-loading { display:flex; align-items:center; justify-content:center; gap:0.75rem; padding:4rem; color:#64748b; }
.mp-loading .pi { font-size:1.5rem; color:#f59e0b; }
.mp-empty { text-align:center; padding:3rem; background:white; border-radius:14px; border:1px solid #e2e8f0; }
.mp-empty-icon { width:72px; height:72px; border-radius:50%; background:#fef3c7; margin:0 auto 1.25rem; display:flex; align-items:center; justify-content:center; font-size:1.8rem; color:#f59e0b; }
.mp-empty h2 { margin:0 0 0.4rem; color:#0f172a; }
.mp-empty p { margin:0 0 1.25rem; color:#64748b; font-size:0.875rem; }

.mp-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(340px, 1fr)); gap:1rem; }
.mp-card { background:white; border-radius:14px; border:1.5px solid #e2e8f0; box-shadow:0 1px 4px rgba(0,0,0,0.05); overflow:hidden; transition:box-shadow 0.2s; }
.mp-card:hover { box-shadow:0 4px 16px rgba(0,0,0,0.08); }
.mp-card-inactive { opacity:0.7; border-style:dashed; }

.mp-card-hdr { display:flex; align-items:flex-start; justify-content:space-between; padding:1rem 1.25rem; border-bottom:1px solid #f1f5f9; gap:0.75rem; }
.mp-card-hdr-left { display:flex; align-items:flex-start; gap:0.75rem; flex:1; min-width:0; }
.mp-badge { width:52px; height:52px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:800; flex-shrink:0; text-align:center; line-height:1.2; }
.mp-badge-pct { background:#fef3c7; color:#b45309; }
.mp-badge-fix { background:#dcfce7; color:#15803d; }
.mp-promo-name { margin:0 0 0.2rem; font-size:0.95rem; font-weight:700; color:#0f172a; }
.mp-promo-desc { margin:0; font-size:0.8rem; color:#64748b; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }

.mp-card-body { padding:0.85rem 1.25rem; display:flex; flex-direction:column; gap:0.5rem; }
.mp-info-row { display:flex; align-items:center; gap:0.5rem; font-size:0.82rem; color:#475569; }
.mp-info-row .pi { color:#94a3b8; font-size:0.85rem; width:14px; }
.mp-muted { color:#94a3b8; }
.mp-product-chips { display:flex; flex-wrap:wrap; gap:0.3rem; margin-top:0.25rem; }
.mp-product-chip { background:#f1f5f9; color:#475569; font-size:0.72rem; padding:0.15rem 0.55rem; border-radius:10px; font-weight:500; }
.mp-chip-more { background:#e2e8f0; color:#64748b; font-weight:700; }

.mp-card-footer { display:flex; align-items:center; justify-content:space-between; padding:0.65rem 1.25rem; background:#f8fafc; border-top:1px solid #f1f5f9; }
.mp-card-actions { display:flex; gap:0.4rem; }
.mp-btn-icon { display:flex; align-items:center; gap:0.35rem; background:none; border:1.5px solid #e2e8f0; border-radius:8px; padding:0.35rem 0.7rem; font-size:0.78rem; color:#475569; cursor:pointer; transition:all 0.15s; }
.mp-btn-icon:hover { border-color:#f59e0b; color:#b45309; background:#fffbeb; }
.mp-btn-toggle { color:#0369a1; }
.mp-btn-toggle:hover { border-color:#0369a1; color:#0369a1; background:#eff6ff; }
.mp-btn-danger:hover { border-color:#ef4444; color:#ef4444; background:#fef2f2; }

/* Dialog form */
.mp-form { display:flex; flex-direction:column; gap:1rem; padding:0.25rem 0; }
.mp-field { display:flex; flex-direction:column; gap:0.35rem; }
.mp-field-row { display:flex; gap:1rem; }
.mp-field-half { flex:1; min-width:0; }
.mp-label { font-size:0.8rem; font-weight:700; color:#374151; }
.mp-req { color:#ef4444; }
.mp-hint { font-size:0.73rem; color:#94a3b8; margin-top:0.15rem; }
.mp-input { width:100%; }
.mp-field-switch { flex-direction:row; align-items:center; justify-content:space-between; padding:0.5rem 0; }
.mp-toggle-wrap { display:flex; align-items:center; gap:0.5rem; }
.mp-toggle-btn { width:42px; height:24px; border-radius:12px; background:#e2e8f0; border:none; cursor:pointer; position:relative; transition:background 0.2s; padding:0; }
.mp-toggle-btn.mp-toggle-on { background:#f59e0b; }
.mp-toggle-knob { width:18px; height:18px; border-radius:50%; background:white; position:absolute; top:3px; left:3px; transition:left 0.2s; box-shadow:0 1px 3px rgba(0,0,0,0.2); }
.mp-toggle-btn.mp-toggle-on .mp-toggle-knob { left:21px; }
.mp-toggle-label { font-size:0.85rem; font-weight:600; color:#374151; }
.mp-dialog-footer { display:flex; justify-content:flex-end; gap:0.75rem; padding-top:0.5rem; }
.mp-btn-cancel { padding:0.55rem 1.25rem; background:white; border:1.5px solid #e2e8f0; border-radius:8px; color:#475569; font-size:0.875rem; font-weight:600; cursor:pointer; }
.mp-btn-cancel:hover { border-color:#94a3b8; }
.mp-btn-save { display:flex; align-items:center; gap:0.5rem; padding:0.55rem 1.5rem; background:#f59e0b; border:none; border-radius:8px; color:white; font-size:0.875rem; font-weight:700; cursor:pointer; transition:background 0.15s; }
.mp-btn-save:hover:not(:disabled) { background:#d97706; }
.mp-btn-save:disabled { opacity:0.6; cursor:not-allowed; }
@media (max-width:600px) { .mp-field-row { flex-direction:column; } .mp-grid { grid-template-columns:1fr; } }
</style>
    `
})
export class MesPromotions implements OnInit {
    promotions: any[] = [];
    produitsOptions: any[] = [];
    loading = true;
    dialogVisible = false;
    saving = false;
    editId: string | null = null;

    form: any = this.emptyForm();

    typeOptions = [
        { label: 'Pourcentage (%)', value: 'pourcentage' },
        { label: 'Montant fixe (DT)', value: 'montant_fixe' }
    ];

    constructor(
        private promotionService: PromotionService,
        private produitService: ProduitService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.load();
        this.produitService.getMyProducts().subscribe({
            next: (data: any[]) => { this.produitsOptions = data; },
            error: () => {}
        });
    }

    load() {
        this.loading = true;
        this.promotionService.getMyPromotions().subscribe({
            next: (data) => { this.promotions = data; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    emptyForm() {
        return {
            nom: '',
            description: '',
            type_reduction: 'pourcentage',
            valeur_reduction: 10,
            date_debut: null as Date | null,
            date_fin: null as Date | null,
            produits: [] as string[],
            actif: true
        };
    }

    openCreate() {
        this.editId = null;
        this.form = this.emptyForm();
        this.dialogVisible = true;
    }

    openEdit(promo: any) {
        this.editId = promo._id;
        this.form = {
            nom: promo.nom,
            description: promo.description || '',
            type_reduction: promo.type_reduction,
            valeur_reduction: promo.valeur_reduction,
            date_debut: new Date(promo.date_debut),
            date_fin: new Date(promo.date_fin),
            produits: (promo.produits || []).map((p: any) => p._id || p),
            actif: promo.actif
        };
        this.dialogVisible = true;
    }

    save() {
        if (!this.form.nom || !this.form.type_reduction || this.form.valeur_reduction == null || !this.form.date_debut || !this.form.date_fin) {
            this.messageService.add({ severity: 'warn', summary: 'Champs requis', detail: 'Veuillez remplir tous les champs obligatoires.', life: 3000 });
            return;
        }
        if (new Date(this.form.date_fin) <= new Date(this.form.date_debut)) {
            this.messageService.add({ severity: 'warn', summary: 'Dates invalides', detail: 'La date de fin doit être après la date de début.', life: 3000 });
            return;
        }
        this.saving = true;
        const body = { ...this.form };

        const obs = this.editId
            ? this.promotionService.updatePromotion(this.editId, body)
            : this.promotionService.createPromotion(body);

        obs.subscribe({
            next: () => {
                this.saving = false;
                this.dialogVisible = false;
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: this.editId ? 'Promotion modifiée' : 'Promotion créée', life: 3000 });
                this.load();
            },
            error: (err: any) => {
                this.saving = false;
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.error?.message || 'Une erreur est survenue', life: 3000 });
            }
        });
    }

    toggleActif(promo: any) {
        this.promotionService.updatePromotion(promo._id, { actif: !promo.actif }).subscribe({
            next: () => {
                promo.actif = !promo.actif;
                this.messageService.add({ severity: 'info', summary: 'Statut mis à jour', detail: promo.actif ? 'Promotion activée' : 'Promotion désactivée', life: 2500 });
            },
            error: (err: any) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.error?.message || 'Erreur', life: 3000 });
            }
        });
    }

    confirmDelete(promo: any) {
        this.confirmationService.confirm({
            message: `Voulez-vous vraiment supprimer la promotion <strong>${promo.nom}</strong> ?`,
            header: 'Confirmer la suppression',
            icon: 'pi pi-trash',
            acceptLabel: 'Supprimer',
            rejectLabel: 'Annuler',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.promotionService.deletePromotion(promo._id).subscribe({
                    next: () => {
                        this.promotions = this.promotions.filter(p => p._id !== promo._id);
                        this.messageService.add({ severity: 'success', summary: 'Supprimée', detail: 'Promotion supprimée', life: 2500 });
                    },
                    error: (err: any) => {
                        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.error?.message || 'Erreur', life: 3000 });
                    }
                });
            }
        });
    }

    isActive(promo: any): boolean {
        if (!promo.actif) return false;
        const now = new Date();
        return new Date(promo.date_debut) <= now && new Date(promo.date_fin) >= now;
    }

    getStatusLabel(promo: any): string {
        if (!promo.actif) return 'Inactive';
        const now = new Date();
        if (new Date(promo.date_debut) > now) return 'Planifiée';
        if (new Date(promo.date_fin) < now) return 'Expirée';
        return 'Active';
    }

    getStatusSeverity(promo: any): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
        const label = this.getStatusLabel(promo);
        const map: Record<string, 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast'> = {
            'Active': 'success',
            'Planifiée': 'info',
            'Expirée': 'secondary',
            'Inactive': 'danger'
        };
        return map[label] ?? 'secondary';
    }
}
