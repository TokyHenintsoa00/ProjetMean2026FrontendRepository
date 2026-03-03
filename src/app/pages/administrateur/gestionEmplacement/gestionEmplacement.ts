import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EmplacementService } from '@/pages/service/emplacement.service';

@Component({
    selector: 'app-gestion-emplacement',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        ButtonModule, DialogModule, InputTextModule,
        SelectModule, ToastModule, ConfirmDialogModule
    ],
    providers: [MessageService, ConfirmationService],
    template: `
<p-toast></p-toast>
<p-confirmDialog></p-confirmDialog>

<!-- ===== HEADER ===== -->
<div class="ge-header">
    <div class="ge-header-left">
        <div class="ge-header-icon"><i class="pi pi-map-marker"></i></div>
        <div>
            <h1 class="ge-title">Emplacements physiques</h1>
            <p class="ge-subtitle">{{ filtered.length }} / {{ emplacements.length }} emplacement(s)</p>
        </div>
    </div>
    <button class="ge-add-btn" (click)="openAdd()">
        <i class="pi pi-plus"></i> Nouvel emplacement
    </button>
</div>

<!-- ===== KPI ===== -->
<div class="ge-kpi-row">
    <div class="ge-kpi">
        <span class="ge-kpi-val">{{ emplacements.length }}</span>
        <span class="ge-kpi-label">Total</span>
    </div>
    <div class="ge-kpi ge-kpi-etage">
        <span class="ge-kpi-val">{{ countByType('etage') }}</span>
        <span class="ge-kpi-label">Étages</span>
    </div>
    <div class="ge-kpi ge-kpi-zone">
        <span class="ge-kpi-val">{{ countByType('zone') }}</span>
        <span class="ge-kpi-label">Zones</span>
    </div>
</div>

<!-- ===== FILTERS ===== -->
<div class="ge-filters">
    <div class="ge-search-wrap">
        <i class="pi pi-search ge-search-icon"></i>
        <input class="ge-search-input" type="text"
               placeholder="Rechercher un emplacement..."
               [(ngModel)]="searchTerm" (input)="applyFilter()" />
        @if (searchTerm) {
            <button class="ge-search-clear" (click)="searchTerm=''; applyFilter()">
                <i class="pi pi-times"></i>
            </button>
        }
    </div>
    <div class="ge-chips">
        <div class="ge-chip" [class.ge-chip-active]="typeFilter === 'all'" (click)="typeFilter='all'; applyFilter()">
            Tous <span class="ge-chip-count">{{ emplacements.length }}</span>
        </div>
        <div class="ge-chip" [class.ge-chip-active]="typeFilter === 'etage'" (click)="typeFilter='etage'; applyFilter()">
            Étages <span class="ge-chip-count">{{ countByType('etage') }}</span>
        </div>
        <div class="ge-chip" [class.ge-chip-active]="typeFilter === 'zone'" (click)="typeFilter='zone'; applyFilter()">
            Zones <span class="ge-chip-count">{{ countByType('zone') }}</span>
        </div>
    </div>
</div>

<!-- ===== TABLE ===== -->
@if (filtered.length > 0) {
    <div class="ge-table-wrap">
        <table class="ge-table">
            <thead>
                <tr>
                    <th>Couleur</th>
                    <th>Nom</th>
                    <th>Type</th>
                    <th>Étage parent</th>
                    <th>Description</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @for (emp of filtered; track emp._id) {
                    <tr class="ge-row">
                        <td>
                            <span class="ge-color-dot" [style.background]="emp.couleur"></span>
                        </td>
                        <td><span class="ge-name">{{ emp.nom }}</span></td>
                        <td>
                            @if (emp.type === 'etage') {
                                <span class="ge-badge ge-badge-etage"><i class="pi pi-building"></i> Étage</span>
                            } @else {
                                <span class="ge-badge ge-badge-zone"><i class="pi pi-th-large"></i> Zone</span>
                            }
                        </td>
                        <td>
                            @if (emp.type === 'zone' && emp.etage_id) {
                                <span class="ge-parent-badge" [style.background]="emp.etage_id.couleur + '22'" [style.color]="emp.etage_id.couleur">
                                    <i class="pi pi-building"></i> {{ emp.etage_id.nom }}
                                </span>
                            } @else {
                                <span class="ge-no-parent">—</span>
                            }
                        </td>
                        <td><span class="ge-desc">{{ emp.description || '—' }}</span></td>
                        <td>
                            <div class="ge-actions">
                                <button class="ge-btn-edit" (click)="openEdit(emp)" title="Modifier">
                                    <i class="pi pi-pencil"></i>
                                </button>
                                <button class="ge-btn-delete" (click)="confirmDelete(emp)" title="Supprimer">
                                    <i class="pi pi-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    </div>
} @else {
    <div class="ge-empty">
        <i class="pi pi-map-marker ge-empty-icon"></i>
        <h3>Aucun emplacement trouvé</h3>
        <p>Modifiez votre recherche ou créez un nouvel emplacement.</p>
    </div>
}

<!-- ===== DIALOG ===== -->
<p-dialog [(visible)]="showDialog"
          [header]="dialogHeader"
          [modal]="true" [style]="{width:'460px'}" [closable]="true">
    <div class="ge-form">
        <div class="ge-form-row">
            <label class="ge-form-label">Nom <span class="ge-required">*</span></label>
            <input class="ge-form-input" type="text" [(ngModel)]="form.nom"
                   placeholder="Ex: RDC, Étage 1, Zone A..." />
        </div>
        <div class="ge-form-row">
            <label class="ge-form-label">Type <span class="ge-required">*</span></label>
            <p-select appendTo="body"
                      [options]="typeOptions"
                      [(ngModel)]="form.type"
                      (onChange)="onTypeChange()"
                      optionLabel="label"
                      optionValue="value"
                      styleClass="w-full">
            </p-select>
        </div>
        @if (form.type === 'zone') {
            <div class="ge-form-row">
                <label class="ge-form-label">Étage parent <span class="ge-required">*</span></label>
                <p-select appendTo="body"
                          [options]="etageOptions"
                          [(ngModel)]="form.etage_id"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="— Sélectionner un étage —"
                          styleClass="w-full">
                    <ng-template pTemplate="option" let-opt>
                        <div class="ge-etage-option">
                            <span class="ge-etage-dot" [style.background]="opt.couleur"></span>
                            <span>{{ opt.label }}</span>
                        </div>
                    </ng-template>
                </p-select>
            </div>
        }
        <div class="ge-form-row">
            <label class="ge-form-label">Couleur d'identification</label>
            <div class="ge-color-row">
                <input type="color" [(ngModel)]="form.couleur" class="ge-color-picker" />
                <span class="ge-color-preview" [style.background]="form.couleur">{{ form.couleur }}</span>
                <div class="ge-color-presets">
                    @for (c of colorPresets; track c) {
                        <span class="ge-preset-dot" [style.background]="c"
                              [class.ge-preset-selected]="form.couleur === c"
                              (click)="form.couleur = c" [title]="c"></span>
                    }
                </div>
            </div>
        </div>
        <div class="ge-form-row">
            <label class="ge-form-label">Description</label>
            <input class="ge-form-input" type="text" [(ngModel)]="form.description"
                   placeholder="Description optionnelle..." />
        </div>
    </div>
    <ng-template pTemplate="footer">
        <button class="ge-dialog-cancel" (click)="showDialog = false">Annuler</button>
        <button class="ge-dialog-save" (click)="save()" [disabled]="!form.nom.trim()">
            <i class="pi pi-check"></i> {{ editing ? 'Enregistrer' : 'Créer' }}
        </button>
    </ng-template>
</p-dialog>

<style>
.ge-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.25rem; }
.ge-header-left { display:flex; align-items:center; gap:0.75rem; }
.ge-header-icon { width:46px; height:46px; border-radius:12px; background:#fef3c7; display:flex; align-items:center; justify-content:center; font-size:1.3rem; color:#f59e0b; }
.ge-title { margin:0; font-size:1.35rem; font-weight:800; color:#0f172a; }
.ge-subtitle { margin:0; font-size:0.85rem; color:#64748b; }
.ge-add-btn { display:flex; align-items:center; gap:0.5rem; padding:0.6rem 1.2rem; background:#f59e0b; color:#fff; border:none; border-radius:10px; font-size:0.875rem; font-weight:700; cursor:pointer; transition:background 0.15s; }
.ge-add-btn:hover { background:#d97706; }

.ge-kpi-row { display:flex; gap:1rem; margin-bottom:1.25rem; flex-wrap:wrap; }
.ge-kpi { display:flex; flex-direction:column; align-items:center; gap:2px; background:white; border:1.5px solid #e2e8f0; border-radius:12px; padding:0.8rem 1.4rem; min-width:90px; }
.ge-kpi-val { font-size:1.5rem; font-weight:800; color:#0f172a; }
.ge-kpi-label { font-size:0.72rem; color:#64748b; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; }
.ge-kpi-etage .ge-kpi-val { color:#7c3aed; }
.ge-kpi-zone .ge-kpi-val { color:#0369a1; }

.ge-filters { display:flex; flex-wrap:wrap; align-items:center; gap:0.75rem; margin-bottom:1.25rem; }
.ge-search-wrap { position:relative; max-width:320px; display:flex; align-items:center; }
.ge-search-icon { position:absolute; left:0.9rem; color:#94a3b8; font-size:0.95rem; }
.ge-search-input { width:100%; padding:0.6rem 2.5rem 0.6rem 2.5rem; border:1.5px solid #e2e8f0; border-radius:8px; background:white; color:#1e293b; font-size:0.875rem; outline:none; transition:border-color 0.2s; }
.ge-search-input:focus { border-color:#f59e0b; }
.ge-search-clear { position:absolute; right:0.75rem; background:none; border:none; cursor:pointer; color:#94a3b8; font-size:0.8rem; }
.ge-chips { display:flex; flex-wrap:wrap; gap:0.4rem; }
.ge-chip { display:flex; align-items:center; gap:0.4rem; padding:0.3rem 0.75rem; border-radius:20px; border:1.5px solid #e2e8f0; background:white; font-size:0.78rem; font-weight:500; color:#475569; cursor:pointer; transition:all 0.15s; }
.ge-chip:hover { border-color:#f59e0b; color:#92400e; }
.ge-chip-active { border-color:#f59e0b; background:#fffbeb; color:#92400e; font-weight:700; }
.ge-chip-count { background:#e2e8f0; color:#64748b; font-size:0.65rem; font-weight:700; padding:0.1rem 0.4rem; border-radius:10px; }
.ge-chip-active .ge-chip-count { background:#f59e0b; color:#1a1a1a; }

.ge-table-wrap { background:white; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 1px 4px rgba(0,0,0,0.05); overflow:hidden; }
.ge-table { width:100%; border-collapse:collapse; }
.ge-table thead tr { background:#f8fafc; border-bottom:1px solid #e2e8f0; }
.ge-table thead th { padding:0.75rem 1rem; font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.07em; color:#64748b; text-align:left; }
.ge-row { border-bottom:1px solid #f1f5f9; transition:background 0.15s; }
.ge-row:hover { background:#fffbeb; }
.ge-row:last-child { border-bottom:none; }
.ge-row td { padding:0.85rem 1rem; vertical-align:middle; font-size:0.875rem; }

.ge-color-dot { display:inline-block; width:20px; height:20px; border-radius:50%; border:2px solid rgba(0,0,0,0.1); flex-shrink:0; }
.ge-name { font-weight:700; color:#1e293b; }
.ge-badge { display:inline-flex; align-items:center; gap:0.3rem; font-size:0.72rem; font-weight:700; padding:0.25rem 0.7rem; border-radius:20px; }
.ge-badge-etage { background:#ede9fe; color:#6d28d9; }
.ge-badge-zone  { background:#dbeafe; color:#1d4ed8; }
.ge-desc { font-size:0.78rem; color:#64748b; max-width:220px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; display:block; }

.ge-actions { display:flex; gap:0.4rem; }
.ge-btn-edit, .ge-btn-delete { background:none; border:1.5px solid #e2e8f0; border-radius:8px; width:34px; height:34px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:0.9rem; transition:all 0.15s; }
.ge-btn-edit { color:#64748b; }
.ge-btn-edit:hover { border-color:#f59e0b; color:#f59e0b; background:#fffbeb; }
.ge-btn-delete { color:#dc2626; }
.ge-btn-delete:hover { border-color:#dc2626; background:#fff1f2; }

.ge-empty { text-align:center; padding:3rem; background:white; border-radius:12px; border:1px solid #e2e8f0; color:#64748b; }
.ge-empty-icon { font-size:2.5rem; color:#cbd5e1; display:block; margin-bottom:0.75rem; }
.ge-empty h3 { margin:0 0 0.4rem; color:#0f172a; }
.ge-empty p { margin:0; font-size:0.875rem; }

.ge-form { display:flex; flex-direction:column; gap:1rem; padding:0.5rem 0; }
.ge-form-row { display:flex; flex-direction:column; gap:0.35rem; }
.ge-form-label { font-size:0.78rem; font-weight:700; color:#374151; text-transform:uppercase; letter-spacing:0.4px; }
.ge-required { color:#ef4444; }
.ge-form-input { width:100%; padding:0.6rem 0.8rem; border:1.5px solid #e2e8f0; border-radius:8px; font-size:0.875rem; color:#1e293b; outline:none; transition:border-color 0.2s; box-sizing:border-box; }
.ge-form-input:focus { border-color:#f59e0b; }
.ge-color-row { display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap; }
.ge-color-picker { width:44px; height:36px; border:1.5px solid #e2e8f0; border-radius:8px; padding:2px; cursor:pointer; background:white; }
.ge-color-preview { display:inline-flex; align-items:center; justify-content:center; padding:0.25rem 0.75rem; border-radius:8px; font-size:0.75rem; font-weight:700; color:#fff; text-shadow:0 1px 2px rgba(0,0,0,0.4); min-width:70px; }
.ge-color-presets { display:flex; gap:0.35rem; flex-wrap:wrap; }
.ge-preset-dot { width:22px; height:22px; border-radius:50%; cursor:pointer; border:2px solid transparent; transition:transform 0.1s, border-color 0.1s; }
.ge-preset-dot:hover { transform:scale(1.15); }
.ge-preset-selected { border-color:#0f172a !important; transform:scale(1.15); }

.ge-parent-badge { display:inline-flex; align-items:center; gap:0.35rem; font-size:0.75rem; font-weight:700; padding:0.2rem 0.65rem; border-radius:20px; }
.ge-no-parent { color:#cbd5e1; font-size:0.85rem; }
.ge-etage-option { display:flex; align-items:center; gap:0.5rem; }
.ge-etage-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }

.ge-dialog-cancel { padding:0.55rem 1.1rem; background:white; border:1.5px solid #e2e8f0; border-radius:8px; font-size:0.875rem; font-weight:600; color:#475569; cursor:pointer; transition:all 0.15s; }
.ge-dialog-cancel:hover { border-color:#94a3b8; }
.ge-dialog-save { display:flex; align-items:center; gap:0.4rem; padding:0.55rem 1.1rem; background:#f59e0b; border:none; border-radius:8px; font-size:0.875rem; font-weight:700; color:#fff; cursor:pointer; transition:background 0.15s; }
.ge-dialog-save:hover:not(:disabled) { background:#d97706; }
.ge-dialog-save:disabled { opacity:0.5; cursor:not-allowed; }
</style>
    `
})
export class GestionEmplacement implements OnInit {
    emplacements: any[] = [];
    filtered: any[] = [];

    get dialogHeader(): string {
        return this.editing ? "Modifier l'emplacement" : 'Nouvel emplacement';
    }
    searchTerm = '';
    typeFilter: 'all' | 'etage' | 'zone' = 'all';

    showDialog = false;
    editing: any = null;
    form = { nom: '', type: 'etage', description: '', couleur: '#f59e0b', etage_id: null as string | null };

    typeOptions = [
        { label: 'Étage', value: 'etage' },
        { label: 'Zone',  value: 'zone'  }
    ];

    etageOptions: { label: string; value: string; couleur: string }[] = [];

    colorPresets = [
        '#f59e0b', '#ef4444', '#10b981', '#3b82f6',
        '#8b5cf6', '#ec4899', '#14b8a6', '#f97316',
        '#64748b', '#0f172a'
    ];

    constructor(
        private emplacementService: EmplacementService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() { this.load(); }

    load() {
        this.emplacementService.getAll().subscribe({
            next: (data) => {
                this.emplacements = data;
                this.etageOptions = data
                    .filter(e => e.type === 'etage')
                    .map(e => ({ label: e.nom, value: e._id, couleur: e.couleur }));
                this.applyFilter();
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les emplacements' })
        });
    }

    applyFilter() {
        let result = [...this.emplacements];
        if (this.typeFilter !== 'all') result = result.filter(e => e.type === this.typeFilter);
        if (this.searchTerm) {
            const t = this.searchTerm.toLowerCase();
            result = result.filter(e =>
                e.nom.toLowerCase().includes(t) ||
                e.description?.toLowerCase().includes(t) ||
                e.etage_id?.nom?.toLowerCase().includes(t)
            );
        }
        this.filtered = result;
    }

    countByType(type: string) { return this.emplacements.filter(e => e.type === type).length; }

    onTypeChange() {
        this.form.etage_id = null;
    }

    openAdd() {
        this.editing = null;
        this.form = { nom: '', type: 'etage', description: '', couleur: '#f59e0b', etage_id: null };
        this.showDialog = true;
    }

    openEdit(emp: any) {
        this.editing = emp;
        this.form = {
            nom: emp.nom,
            type: emp.type,
            description: emp.description || '',
            couleur: emp.couleur || '#64748b',
            etage_id: emp.etage_id?._id ?? null
        };
        this.showDialog = true;
    }

    save() {
        if (!this.form.nom.trim()) return;
        const payload: any = { ...this.form, nom: this.form.nom.trim() };
        if (payload.type === 'etage') payload.etage_id = null;

        if (this.editing) {
            this.emplacementService.update(this.editing._id, payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Emplacement mis à jour' });
                    this.showDialog = false;
                    this.load();
                },
                error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Modification échouée' })
            });
        } else {
            this.emplacementService.create(payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Emplacement créé' });
                    this.showDialog = false;
                    this.load();
                },
                error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Création échouée' })
            });
        }
    }

    confirmDelete(emp: any) {
        this.confirmationService.confirm({
            message: `Supprimer <b>${emp.nom}</b> ?<br><small>Les boxes associés à cet emplacement seront détachés.</small>`,
            header: 'Confirmation',
            icon: 'pi pi-trash',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.emplacementService.delete(emp._id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Emplacement supprimé' });
                        this.load();
                    },
                    error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppression échouée' })
                });
            }
        });
    }
}
