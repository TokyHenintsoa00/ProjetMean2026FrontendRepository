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
import { CategorieService } from '@/pages/service/categorie.service';

@Component({
    selector: 'app-gestion-categorie',
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
<div class="gc-header">
    <div class="gc-header-left">
        <div class="gc-header-icon"><i class="pi pi-tags"></i></div>
        <div>
            <h1 class="gc-title">Gestion des catégories</h1>
            <p class="gc-subtitle">{{ filtered.length }} / {{ categories.length }} catégorie(s)</p>
        </div>
    </div>
    <button class="gc-add-btn" (click)="openAdd()">
        <i class="pi pi-plus"></i> Nouvelle catégorie
    </button>
</div>

<!-- ===== KPI ===== -->
<div class="gc-kpi-row">
    <div class="gc-kpi">
        <span class="gc-kpi-val">{{ categories.length }}</span>
        <span class="gc-kpi-label">Total</span>
    </div>
    <div class="gc-kpi gc-kpi-root">
        <span class="gc-kpi-val">{{ rootCount() }}</span>
        <span class="gc-kpi-label">Racines</span>
    </div>
    <div class="gc-kpi gc-kpi-sub">
        <span class="gc-kpi-val">{{ subCount() }}</span>
        <span class="gc-kpi-label">Sous-catégories</span>
    </div>
</div>

<!-- ===== FILTERS ===== -->
<div class="gc-filters">
    <div class="gc-search-wrap">
        <i class="pi pi-search gc-search-icon"></i>
        <input class="gc-search-input" type="text"
               placeholder="Rechercher une catégorie..."
               [(ngModel)]="searchTerm" (input)="applyFilter()" />
        @if (searchTerm) {
            <button class="gc-search-clear" (click)="searchTerm=''; applyFilter()">
                <i class="pi pi-times"></i>
            </button>
        }
    </div>
    <div class="gc-chips">
        <div class="gc-chip" [class.gc-chip-active]="typeFilter === 'all'" (click)="typeFilter='all'; applyFilter()">
            Tous <span class="gc-chip-count">{{ categories.length }}</span>
        </div>
        <div class="gc-chip" [class.gc-chip-active]="typeFilter === 'root'" (click)="typeFilter='root'; applyFilter()">
            Racines <span class="gc-chip-count">{{ rootCount() }}</span>
        </div>
        <div class="gc-chip" [class.gc-chip-active]="typeFilter === 'sub'" (click)="typeFilter='sub'; applyFilter()">
            Sous-catégories <span class="gc-chip-count">{{ subCount() }}</span>
        </div>
    </div>
</div>

<!-- ===== TABLE ===== -->
@if (filtered.length > 0) {
    <div class="gc-table-wrap">
        <table class="gc-table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Type</th>
                    <th>Catégorie parente</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @for (cat of filtered; track cat._id) {
                    <tr class="gc-row">
                        <td>
                            <div class="gc-name-cell">
                                @if (!cat.parent) {
                                    <i class="pi pi-folder gc-icon-root"></i>
                                } @else {
                                    <i class="pi pi-folder-open gc-icon-sub"></i>
                                }
                                <span class="gc-name">{{ cat.nom }}</span>
                            </div>
                        </td>
                        <td>
                            @if (!cat.parent) {
                                <span class="gc-badge gc-badge-root">Racine</span>
                            } @else {
                                <span class="gc-badge gc-badge-sub">Sous-catégorie</span>
                            }
                        </td>
                        <td>
                            @if (cat.parent) {
                                <span class="gc-parent-name">{{ cat.parent.nom }}</span>
                            } @else {
                                <span class="gc-no-parent">—</span>
                            }
                        </td>
                        <td>
                            <div class="gc-actions">
                                <button class="gc-btn-edit" (click)="openEdit(cat)" title="Modifier">
                                    <i class="pi pi-pencil"></i>
                                </button>
                                <button class="gc-btn-delete" (click)="confirmDelete(cat)" title="Supprimer">
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
    <div class="gc-empty">
        <i class="pi pi-tags gc-empty-icon"></i>
        <h3>Aucune catégorie trouvée</h3>
        <p>Modifiez votre recherche ou créez une nouvelle catégorie.</p>
    </div>
}

<!-- ===== DIALOG ===== -->
<p-dialog [(visible)]="showDialog"
          [header]="editing ? 'Modifier la catégorie' : 'Nouvelle catégorie'"
          [modal]="true" [style]="{width:'440px'}" [closable]="true">
    <div class="gc-form">
        <div class="gc-form-row">
            <label class="gc-form-label">Nom <span class="gc-required">*</span></label>
            <input class="gc-form-input" type="text" [(ngModel)]="form.nom"
                   placeholder="Ex: Électronique, Vêtements..." />
        </div>
        <div class="gc-form-row">
            <label class="gc-form-label">Catégorie parente <span class="gc-optional">(optionnel)</span></label>
            <p-select appendTo="body"
                      [options]="parentOptions"
                      [(ngModel)]="form.parent"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="— Aucune (catégorie racine) —"
                      styleClass="w-full"
                      [showClear]="true">
            </p-select>
        </div>
    </div>
    <ng-template pTemplate="footer">
        <button class="gc-dialog-cancel" (click)="showDialog = false">Annuler</button>
        <button class="gc-dialog-save" (click)="save()" [disabled]="!form.nom.trim()">
            <i class="pi pi-check"></i> {{ editing ? 'Enregistrer' : 'Créer' }}
        </button>
    </ng-template>
</p-dialog>

<style>
.gc-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.25rem; }
.gc-header-left { display:flex; align-items:center; gap:0.75rem; }
.gc-header-icon { width:46px; height:46px; border-radius:12px; background:#fef3c7; display:flex; align-items:center; justify-content:center; font-size:1.3rem; color:#f59e0b; }
.gc-title { margin:0; font-size:1.35rem; font-weight:800; color:#0f172a; }
.gc-subtitle { margin:0; font-size:0.85rem; color:#64748b; }
.gc-add-btn { display:flex; align-items:center; gap:0.5rem; padding:0.6rem 1.2rem; background:#f59e0b; color:#fff; border:none; border-radius:10px; font-size:0.875rem; font-weight:700; cursor:pointer; transition:background 0.15s; }
.gc-add-btn:hover { background:#d97706; }

.gc-kpi-row { display:flex; gap:1rem; margin-bottom:1.25rem; flex-wrap:wrap; }
.gc-kpi { display:flex; flex-direction:column; align-items:center; gap:2px; background:white; border:1.5px solid #e2e8f0; border-radius:12px; padding:0.8rem 1.4rem; min-width:90px; }
.gc-kpi-val { font-size:1.5rem; font-weight:800; color:#0f172a; }
.gc-kpi-label { font-size:0.72rem; color:#64748b; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; }
.gc-kpi-root .gc-kpi-val { color:#f59e0b; }
.gc-kpi-sub .gc-kpi-val { color:#0369a1; }

.gc-filters { display:flex; flex-wrap:wrap; align-items:center; gap:0.75rem; margin-bottom:1.25rem; }
.gc-search-wrap { position:relative; max-width:320px; display:flex; align-items:center; }
.gc-search-icon { position:absolute; left:0.9rem; color:#94a3b8; font-size:0.95rem; }
.gc-search-input { width:100%; padding:0.6rem 2.5rem 0.6rem 2.5rem; border:1.5px solid #e2e8f0; border-radius:8px; background:white; color:#1e293b; font-size:0.875rem; outline:none; transition:border-color 0.2s; }
.gc-search-input:focus { border-color:#f59e0b; }
.gc-search-clear { position:absolute; right:0.75rem; background:none; border:none; cursor:pointer; color:#94a3b8; font-size:0.8rem; }
.gc-chips { display:flex; flex-wrap:wrap; gap:0.4rem; }
.gc-chip { display:flex; align-items:center; gap:0.4rem; padding:0.3rem 0.75rem; border-radius:20px; border:1.5px solid #e2e8f0; background:white; font-size:0.78rem; font-weight:500; color:#475569; cursor:pointer; transition:all 0.15s; }
.gc-chip:hover { border-color:#f59e0b; color:#92400e; }
.gc-chip-active { border-color:#f59e0b; background:#fffbeb; color:#92400e; font-weight:700; }
.gc-chip-count { background:#e2e8f0; color:#64748b; font-size:0.65rem; font-weight:700; padding:0.1rem 0.4rem; border-radius:10px; }
.gc-chip-active .gc-chip-count { background:#f59e0b; color:#1a1a1a; }

.gc-table-wrap { background:white; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 1px 4px rgba(0,0,0,0.05); overflow:hidden; }
.gc-table { width:100%; border-collapse:collapse; }
.gc-table thead tr { background:#f8fafc; border-bottom:1px solid #e2e8f0; }
.gc-table thead th { padding:0.75rem 1rem; font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.07em; color:#64748b; text-align:left; }
.gc-row { border-bottom:1px solid #f1f5f9; transition:background 0.15s; }
.gc-row:hover { background:#fffbeb; }
.gc-row:last-child { border-bottom:none; }
.gc-row td { padding:0.85rem 1rem; vertical-align:middle; font-size:0.875rem; }

.gc-name-cell { display:flex; align-items:center; gap:0.5rem; }
.gc-icon-root { color:#f59e0b; font-size:1rem; }
.gc-icon-sub { color:#0369a1; font-size:1rem; }
.gc-name { font-weight:600; color:#1e293b; }

.gc-badge { display:inline-block; font-size:0.7rem; font-weight:700; padding:0.2rem 0.65rem; border-radius:20px; text-transform:uppercase; letter-spacing:0.5px; }
.gc-badge-root { background:#fef3c7; color:#92400e; }
.gc-badge-sub { background:#dbeafe; color:#1d4ed8; }

.gc-parent-name { font-weight:500; color:#475569; font-size:0.82rem; }
.gc-no-parent { color:#cbd5e1; }

.gc-actions { display:flex; gap:0.4rem; }
.gc-btn-edit, .gc-btn-delete { background:none; border:1.5px solid #e2e8f0; border-radius:8px; width:34px; height:34px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:0.9rem; transition:all 0.15s; }
.gc-btn-edit { color:#64748b; }
.gc-btn-edit:hover { border-color:#f59e0b; color:#f59e0b; background:#fffbeb; }
.gc-btn-delete { color:#dc2626; }
.gc-btn-delete:hover { border-color:#dc2626; background:#fff1f2; }

.gc-empty { text-align:center; padding:3rem; background:white; border-radius:12px; border:1px solid #e2e8f0; color:#64748b; }
.gc-empty-icon { font-size:2.5rem; color:#cbd5e1; display:block; margin-bottom:0.75rem; }
.gc-empty h3 { margin:0 0 0.4rem; color:#0f172a; }
.gc-empty p { margin:0; font-size:0.875rem; }

.gc-form { display:flex; flex-direction:column; gap:1rem; padding:0.5rem 0; }
.gc-form-row { display:flex; flex-direction:column; gap:0.35rem; }
.gc-form-label { font-size:0.78rem; font-weight:700; color:#374151; text-transform:uppercase; letter-spacing:0.4px; }
.gc-required { color:#ef4444; }
.gc-optional { color:#94a3b8; font-weight:400; text-transform:none; letter-spacing:0; }
.gc-form-input { width:100%; padding:0.6rem 0.8rem; border:1.5px solid #e2e8f0; border-radius:8px; font-size:0.875rem; color:#1e293b; outline:none; transition:border-color 0.2s; box-sizing:border-box; }
.gc-form-input:focus { border-color:#f59e0b; }

.gc-dialog-cancel { padding:0.55rem 1.1rem; background:white; border:1.5px solid #e2e8f0; border-radius:8px; font-size:0.875rem; font-weight:600; color:#475569; cursor:pointer; transition:all 0.15s; }
.gc-dialog-cancel:hover { border-color:#94a3b8; }
.gc-dialog-save { display:flex; align-items:center; gap:0.4rem; padding:0.55rem 1.1rem; background:#f59e0b; border:none; border-radius:8px; font-size:0.875rem; font-weight:700; color:#fff; cursor:pointer; transition:background 0.15s; }
.gc-dialog-save:hover:not(:disabled) { background:#d97706; }
.gc-dialog-save:disabled { opacity:0.5; cursor:not-allowed; }
</style>
    `
})
export class GestionCategorie implements OnInit {
    categories: any[] = [];
    filtered: any[] = [];
    searchTerm = '';
    typeFilter: 'all' | 'root' | 'sub' = 'all';

    showDialog = false;
    editing: any = null;
    form = { nom: '', parent: null as string | null };

    parentOptions: { label: string; value: string }[] = [];

    constructor(
        private categorieService: CategorieService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.load();
    }

    load() {
        this.categorieService.getAllForAdmin().subscribe({
            next: (data: any[]) => {
                this.categories = data;
                this.applyFilter();
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les catégories' })
        });
    }

    buildParentOptions(excludeId?: string) {
        this.parentOptions = this.categories
            .filter(c => c._id !== excludeId)
            .map(c => ({
                label: c.parent ? `↳ ${c.nom} (sous ${c.parent.nom})` : c.nom,
                value: c._id
            }));
    }

    applyFilter() {
        let result = [...this.categories];
        if (this.typeFilter === 'root') result = result.filter(c => !c.parent);
        if (this.typeFilter === 'sub')  result = result.filter(c => !!c.parent);
        if (this.searchTerm) {
            const t = this.searchTerm.toLowerCase();
            result = result.filter(c =>
                c.nom.toLowerCase().includes(t) ||
                c.parent?.nom?.toLowerCase().includes(t)
            );
        }
        this.filtered = result;
    }

    rootCount() { return this.categories.filter(c => !c.parent).length; }
    subCount()  { return this.categories.filter(c => !!c.parent).length; }

    openAdd() {
        this.editing = null;
        this.form = { nom: '', parent: null };
        this.buildParentOptions();
        this.showDialog = true;
    }

    openEdit(cat: any) {
        this.editing = cat;
        this.form = {
            nom: cat.nom,
            parent: cat.parent?._id ?? null
        };
        this.buildParentOptions(cat._id);
        this.showDialog = true;
    }

    save() {
        if (!this.form.nom.trim()) return;
        const payload = { nom: this.form.nom.trim(), parent: this.form.parent || null };

        if (this.editing) {
            this.categorieService.updateCategorie(this.editing._id, payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Catégorie mise à jour' });
                    this.showDialog = false;
                    this.load();
                },
                error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Modification échouée' })
            });
        } else {
            this.categorieService.createCategorie(payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Catégorie créée' });
                    this.showDialog = false;
                    this.load();
                },
                error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Création échouée' })
            });
        }
    }

    confirmDelete(cat: any) {
        this.confirmationService.confirm({
            message: `Supprimer la catégorie <b>${cat.nom}</b> ?<br><small>Les sous-catégories éventuelles deviendront des catégories racines.</small>`,
            header: 'Confirmation',
            icon: 'pi pi-trash',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.categorieService.deleteCategorie(cat._id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Catégorie supprimée' });
                        this.load();
                    },
                    error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppression échouée' })
                });
            }
        });
    }
}
