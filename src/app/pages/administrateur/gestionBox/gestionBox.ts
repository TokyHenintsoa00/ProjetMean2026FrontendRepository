import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BoxService } from '@/pages/service/box.service';

@Component({
    selector: 'app-gestion-box',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        TagModule, ButtonModule, SelectModule, DialogModule,
        InputTextModule, TextareaModule, ToastModule, ConfirmDialogModule
    ],
    providers: [MessageService, ConfirmationService],
    template: `
<p-toast></p-toast>
<p-confirmDialog></p-confirmDialog>

<!-- ===== HEADER ===== -->
<div class="gb-header">
    <div class="gb-header-left">
        <div class="gb-header-icon"><i class="pi pi-building"></i></div>
        <div>
            <h1 class="gb-title">Gestion des Box</h1>
            <p class="gb-subtitle">{{ filteredBoxes.length }} / {{ boxes.length }} box(es)</p>
        </div>
    </div>
    <button class="gb-add-btn" (click)="openAddDialog()">
        <i class="pi pi-plus"></i> Nouveau box
    </button>
</div>

<!-- ===== KPI CHIPS ===== -->
<div class="gb-kpi-row">
    <div class="gb-kpi">
        <span class="gb-kpi-val">{{ boxes.length }}</span>
        <span class="gb-kpi-label">Total</span>
    </div>
    <div class="gb-kpi gb-kpi-libre">
        <span class="gb-kpi-val">{{ countByStatut('libre') }}</span>
        <span class="gb-kpi-label">Libres</span>
    </div>
    <div class="gb-kpi gb-kpi-occupe">
        <span class="gb-kpi-val">{{ countByStatut('occupe') }}</span>
        <span class="gb-kpi-label">Occupés</span>
    </div>
    <div class="gb-kpi gb-kpi-travaux">
        <span class="gb-kpi-val">{{ countByStatut('en_travaux') }}</span>
        <span class="gb-kpi-label">En travaux</span>
    </div>
    <div class="gb-kpi gb-kpi-contrat">
        <span class="gb-kpi-val">{{ countContratActif() }}</span>
        <span class="gb-kpi-label">Sous contrat</span>
    </div>
</div>

<!-- ===== FILTERS ===== -->
<div class="gb-filters">
    <div class="gb-search-wrap">
        <i class="pi pi-search gb-search-icon"></i>
        <input class="gb-search-input" type="text"
               placeholder="Rechercher par N°, étage..."
               [(ngModel)]="searchTerm" (input)="applyFilters()" />
        @if (searchTerm) {
            <button class="gb-search-clear" (click)="searchTerm=''; applyFilters()">
                <i class="pi pi-times"></i>
            </button>
        }
    </div>
    <div class="gb-chips">
        <div class="gb-chip" [class.gb-chip-active]="selectedStatut === null" (click)="selectedStatut=null; applyFilters()">
            Tous <span class="gb-chip-count">{{ boxes.length }}</span>
        </div>
        @for (s of statutOptions; track s.value) {
            <div class="gb-chip" [class.gb-chip-active]="selectedStatut === s.value"
                 (click)="selectedStatut = s.value; applyFilters()">
                {{ s.label }} <span class="gb-chip-count">{{ countByStatut(s.value) }}</span>
            </div>
        }
    </div>
    <div class="gb-etage-wrap">
        <p-select appendTo="body" [options]="etageOptions" [(ngModel)]="selectedEtage" (onChange)="applyFilters()"
                  optionLabel="label" optionValue="value" placeholder="Tous les étages"
                  styleClass="gb-etage-select"></p-select>
    </div>
</div>

<!-- ===== TABLE ===== -->
@if (filteredBoxes.length > 0) {
    <div class="gb-table-wrap">
        <table class="gb-table">
            <thead>
                <tr>
                    <th>N° Box</th>
                    <th>Étage</th>
                    <th>Superficie</th>
                    <th>Boutique attribuée</th>
                    <th>Statut</th>
                    <th>Description</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @for (box of filteredBoxes; track box._id) {
                    <tr class="gb-row">
                        <td><span class="gb-numero">{{ box.numero }}</span></td>
                        <td><span class="gb-etage-badge">{{ box.etage }}</span></td>
                        <td><span class="gb-superficie">{{ box.superficie }} m²</span></td>
                        <td>
                            @if (box.boutique_id) {
                                <div class="gb-boutique-cell">
                                    <i class="pi pi-shop gb-boutique-icon"></i>
                                    <span class="gb-boutique-name">{{ box.boutique_id?.nom_boutique || box.boutique_id }}</span>
                                </div>
                            } @else {
                                <span class="gb-no-boutique">—</span>
                            }
                        </td>
                        <td>
                            <div class="gb-statut-cell">
                                <p-tag [value]="getStatutLabel(box.statut)"
                                       [severity]="getStatutSeverity(box.statut)"></p-tag>
                                @if (box.contrat_actif) {
                                    <span class="gb-contrat-badge" [title]="'Expire : ' + (box.contrat_actif.date_fin | date:'dd/MM/yyyy')">
                                        <i class="pi pi-file-check"></i> Contrat actif
                                    </span>
                                }
                            </div>
                        </td>
                        <td><span class="gb-desc">{{ box.description || '—' }}</span></td>
                        <td (click)="$event.stopPropagation()">
                            <div class="gb-actions">
                                <button class="gb-btn-edit" (click)="openEditDialog(box)" title="Modifier">
                                    <i class="pi pi-pencil"></i>
                                </button>
                                @if (box.statut === 'libre' && !box.contrat_actif) {
                                    <button class="gb-btn-attribuer" (click)="ouvrirCreationContrat(box)" title="Créer un contrat pour ce box">
                                        <i class="pi pi-file-plus"></i>
                                    </button>
                                }
                                @if (box.statut === 'occupe') {
                                    @if (box.contrat_actif) {
                                        <button class="gb-btn-locked" disabled title="Sous contrat actif — résiliez le contrat d'abord">
                                            <i class="pi pi-lock"></i>
                                        </button>
                                    } @else {
                                        <button class="gb-btn-liberer" (click)="confirmerLiberer(box)" title="Libérer le box">
                                            <i class="pi pi-unlock"></i>
                                        </button>
                                    }
                                }
                                @if (box.statut !== 'occupe' && !box.contrat_actif) {
                                    <button class="gb-btn-delete" (click)="confirmerSupprimer(box)" title="Supprimer">
                                        <i class="pi pi-trash"></i>
                                    </button>
                                }
                            </div>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    </div>
} @else {
    <div class="gb-empty">
        <i class="pi pi-building gb-empty-icon"></i>
        <h3>Aucun box trouvé</h3>
        <p>Modifiez vos filtres ou ajoutez un nouveau box.</p>
    </div>
}

<!-- ===== DIALOG ADD/EDIT ===== -->
<p-dialog [(visible)]="showFormDialog"
          [header]="editingBox ? 'Modifier le box' : 'Nouveau box'"
          [modal]="true" [style]="{width:'480px'}" [closable]="true">
    <div class="gb-form">
        <div class="gb-form-row">
            <label class="gb-form-label">N° Box <span class="gb-required">*</span></label>
            <input pInputText [(ngModel)]="form.numero" placeholder="Ex: A-001" class="gb-form-input" />
        </div>
        <div class="gb-form-row">
            <label class="gb-form-label">Étage <span class="gb-required">*</span></label>
            <p-select appendTo="body" [options]="etageOptions.slice(1)" [(ngModel)]="form.etage"
                      optionLabel="label" optionValue="value"
                      styleClass="w-full"></p-select>
        </div>
        <div class="gb-form-row">
            <label class="gb-form-label">Superficie (m²)</label>
            <input pInputText type="number" [(ngModel)]="form.superficie" placeholder="Ex: 45" class="gb-form-input" />
        </div>
        <div class="gb-form-row">
            <label class="gb-form-label">Statut</label>
            <p-select appendTo="body" [options]="statutOptions" [(ngModel)]="form.statut"
                      optionLabel="label" optionValue="value"
                      styleClass="w-full"></p-select>
        </div>
        <div class="gb-form-row">
            <label class="gb-form-label">Description</label>
            <textarea pTextarea [(ngModel)]="form.description" placeholder="Description du box..."
                      rows="3" class="gb-form-input"></textarea>
        </div>
    </div>
    <ng-template pTemplate="footer">
        <button class="gb-dialog-cancel" (click)="showFormDialog = false">Annuler</button>
        <button class="gb-dialog-save" (click)="saveBox()" [disabled]="!form.numero">
            <i class="pi pi-check"></i> {{ editingBox ? 'Enregistrer' : 'Créer' }}
        </button>
    </ng-template>
</p-dialog>

<style>
.gb-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.25rem; }
.gb-header-left { display:flex; align-items:center; gap:0.75rem; }
.gb-header-icon { width:46px; height:46px; border-radius:12px; background:#fef3c7; display:flex; align-items:center; justify-content:center; font-size:1.3rem; color:#f59e0b; }
.gb-title { margin:0; font-size:1.35rem; font-weight:800; color:#0f172a; }
.gb-subtitle { margin:0; font-size:0.85rem; color:#64748b; }
.gb-add-btn { display:flex; align-items:center; gap:0.5rem; padding:0.6rem 1.2rem; background:#f59e0b; color:#fff; border:none; border-radius:10px; font-size:0.875rem; font-weight:700; cursor:pointer; transition:background 0.15s; }
.gb-add-btn:hover { background:#d97706; }

.gb-kpi-row { display:flex; gap:1rem; margin-bottom:1.25rem; flex-wrap:wrap; }
.gb-kpi { display:flex; flex-direction:column; align-items:center; gap:2px; background:white; border:1.5px solid #e2e8f0; border-radius:12px; padding:0.8rem 1.4rem; min-width:90px; }
.gb-kpi-val { font-size:1.5rem; font-weight:800; color:#0f172a; }
.gb-kpi-label { font-size:0.72rem; color:#64748b; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; }
.gb-kpi-libre .gb-kpi-val { color:#16a34a; }
.gb-kpi-occupe .gb-kpi-val { color:#0369a1; }
.gb-kpi-travaux .gb-kpi-val { color:#d97706; }
.gb-kpi-contrat .gb-kpi-val { color:#1d4ed8; }

.gb-filters { display:flex; flex-wrap:wrap; align-items:center; gap:0.75rem; margin-bottom:1.25rem; }
.gb-search-wrap { position:relative; max-width:320px; display:flex; align-items:center; }
.gb-search-icon { position:absolute; left:0.9rem; color:#94a3b8; font-size:0.95rem; }
.gb-search-input { width:100%; padding:0.6rem 2.5rem 0.6rem 2.5rem; border:1.5px solid #e2e8f0; border-radius:8px; background:white; color:#1e293b; font-size:0.875rem; outline:none; transition:border-color 0.2s; }
.gb-search-input:focus { border-color:#f59e0b; }
.gb-search-clear { position:absolute; right:0.75rem; background:none; border:none; cursor:pointer; color:#94a3b8; font-size:0.8rem; }
.gb-chips { display:flex; flex-wrap:wrap; gap:0.4rem; }
.gb-chip { display:flex; align-items:center; gap:0.4rem; padding:0.3rem 0.75rem; border-radius:20px; border:1.5px solid #e2e8f0; background:white; font-size:0.78rem; font-weight:500; color:#475569; cursor:pointer; transition:all 0.15s; }
.gb-chip:hover { border-color:#f59e0b; color:#92400e; }
.gb-chip-active { border-color:#f59e0b; background:#fffbeb; color:#92400e; font-weight:700; }
.gb-chip-count { background:#e2e8f0; color:#64748b; font-size:0.65rem; font-weight:700; padding:0.1rem 0.4rem; border-radius:10px; }
.gb-chip-active .gb-chip-count { background:#f59e0b; color:#1a1a1a; }
::ng-deep .gb-etage-select { min-width:180px; }

.gb-table-wrap { background:white; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 1px 4px rgba(0,0,0,0.05); overflow:hidden; }
.gb-table { width:100%; border-collapse:collapse; }
.gb-table thead tr { background:#f8fafc; border-bottom:1px solid #e2e8f0; }
.gb-table thead th { padding:0.75rem 1rem; font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.07em; color:#64748b; text-align:left; white-space:nowrap; }
.gb-row { border-bottom:1px solid #f1f5f9; transition:background 0.15s; }
.gb-row:hover { background:#fffbeb; }
.gb-row:last-child { border-bottom:none; }
.gb-row td { padding:0.85rem 1rem; vertical-align:middle; font-size:0.875rem; }
.gb-numero { font-weight:700; color:#0369a1; font-family:monospace; font-size:0.85rem; }
.gb-etage-badge { display:inline-block; background:#f1f5f9; color:#475569; font-size:0.75rem; font-weight:600; padding:0.2rem 0.6rem; border-radius:6px; }
.gb-superficie { font-weight:600; color:#334155; }
.gb-boutique-cell { display:flex; align-items:center; gap:0.4rem; }
.gb-boutique-icon { color:#f59e0b; font-size:0.85rem; }
.gb-boutique-name { font-weight:600; color:#1e293b; font-size:0.82rem; }
.gb-no-boutique { color:#cbd5e1; font-size:0.85rem; }
.gb-desc { font-size:0.78rem; color:#64748b; max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; display:block; }
.gb-statut-cell { display:flex; flex-direction:column; gap:0.3rem; align-items:flex-start; }
.gb-contrat-badge { display:inline-flex; align-items:center; gap:0.25rem; background:#dbeafe; color:#1d4ed8; font-size:0.64rem; font-weight:700; padding:0.15rem 0.5rem; border-radius:10px; white-space:nowrap; }

.gb-actions { display:flex; gap:0.4rem; }
.gb-btn-edit, .gb-btn-attribuer, .gb-btn-liberer, .gb-btn-delete { background:none; border:1.5px solid #e2e8f0; border-radius:8px; width:34px; height:34px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:0.9rem; transition:all 0.15s; }
.gb-btn-edit { color:#64748b; }
.gb-btn-edit:hover { border-color:#f59e0b; color:#f59e0b; background:#fffbeb; }
.gb-btn-attribuer { color:#0369a1; }
.gb-btn-attribuer:hover { border-color:#0369a1; background:#eff6ff; }
.gb-btn-liberer { color:#16a34a; }
.gb-btn-liberer:hover { border-color:#16a34a; background:#f0fdf4; }
.gb-btn-delete { color:#dc2626; }
.gb-btn-delete:hover { border-color:#dc2626; background:#fff1f2; }
.gb-btn-locked { background:none; border:1.5px solid #fca5a5; border-radius:8px; width:34px; height:34px; display:flex; align-items:center; justify-content:center; cursor:not-allowed; font-size:0.9rem; color:#f87171; opacity:0.7; }

.gb-empty { text-align:center; padding:3rem; background:white; border-radius:12px; border:1px solid #e2e8f0; color:#64748b; }
.gb-empty-icon { font-size:2.5rem; color:#cbd5e1; display:block; margin-bottom:0.75rem; }
.gb-empty h3 { margin:0 0 0.4rem; color:#0f172a; }
.gb-empty p { margin:0; font-size:0.875rem; }

.gb-form { display:flex; flex-direction:column; gap:1rem; padding:0.5rem 0; }
.gb-form-row { display:flex; flex-direction:column; gap:0.35rem; }
.gb-form-label { font-size:0.78rem; font-weight:700; color:#374151; text-transform:uppercase; letter-spacing:0.4px; }
.gb-required { color:#ef4444; }
.gb-form-input { width:100%; padding:0.6rem 0.8rem; border:1.5px solid #e2e8f0; border-radius:8px; font-size:0.875rem; color:#1e293b; outline:none; }
.gb-form-input:focus { border-color:#f59e0b; }


.gb-dialog-cancel { padding:0.55rem 1.1rem; background:white; border:1.5px solid #e2e8f0; border-radius:8px; font-size:0.875rem; font-weight:600; color:#475569; cursor:pointer; transition:all 0.15s; }
.gb-dialog-cancel:hover { border-color:#94a3b8; }
.gb-dialog-save { display:flex; align-items:center; gap:0.4rem; padding:0.55rem 1.1rem; background:#f59e0b; border:none; border-radius:8px; font-size:0.875rem; font-weight:700; color:#fff; cursor:pointer; transition:background 0.15s; }
.gb-dialog-save:hover:not(:disabled) { background:#d97706; }
.gb-dialog-save:disabled { opacity:0.5; cursor:not-allowed; }
</style>
    `
})
export class GestionBox implements OnInit {
    boxes: any[] = [];
    filteredBoxes: any[] = [];
    boutiques: any[] = [];

    searchTerm = '';
    selectedStatut: string | null = null;
    selectedEtage: string | null = null;

    showFormDialog = false;
    editingBox: any = null;
    form = { numero: '', etage: 'RDC', superficie: null as number | null, statut: 'libre', description: '' };

    statutOptions = [
        { label: 'Libre',       value: 'libre' },
        { label: 'Occupé',      value: 'occupe' },
        { label: 'En travaux',  value: 'en_travaux' }
    ];

    etageOptions = [
        { label: 'Tous les étages', value: null },
        { label: 'RDC',             value: 'RDC' },
        { label: 'Étage 1',         value: 'Étage 1' },
        { label: 'Étage 2',         value: 'Étage 2' }
    ];

    constructor(
        private boxService: BoxService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.loadBoxes();
    }

    loadBoxes() {
        this.boxService.getAllWithBoutique().subscribe({
            next: (data) => { this.boxes = data; this.applyFilters(); },
            error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les boxes' })
        });
    }

    applyFilters() {
        let result = [...this.boxes];
        if (this.selectedStatut) result = result.filter(b => b.statut === this.selectedStatut);
        if (this.selectedEtage)  result = result.filter(b => b.etage === this.selectedEtage);
        if (this.searchTerm) {
            const t = this.searchTerm.toLowerCase();
            result = result.filter(b =>
                b.numero?.toLowerCase().includes(t) ||
                b.etage?.toLowerCase().includes(t) ||
                b.boutique_id?.nom_boutique?.toLowerCase().includes(t)
            );
        }
        this.filteredBoxes = result;
    }

    countByStatut(statut: string): number {
        return this.boxes.filter(b => b.statut === statut).length;
    }

    countContratActif(): number {
        return this.boxes.filter(b => !!b.contrat_actif).length;
    }

    // ── ADD / EDIT ──────────────────────────────────────────
    openAddDialog() {
        this.editingBox = null;
        this.form = { numero: '', etage: 'RDC', superficie: null, statut: 'libre', description: '' };
        this.showFormDialog = true;
    }

    openEditDialog(box: any) {
        this.editingBox = box;
        this.form = {
            numero: box.numero,
            etage: box.etage,
            superficie: box.superficie,
            statut: box.statut,
            description: box.description || ''
        };
        this.showFormDialog = true;
    }

    saveBox() {
        if (!this.form.numero) return;
        const payload = { ...this.form };
        if (this.editingBox) {
            this.boxService.update(this.editingBox._id, payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Box modifié' });
                    this.showFormDialog = false;
                    this.loadBoxes();
                },
                error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Modification échouée' })
            });
        } else {
            this.boxService.create(payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Box créé' });
                    this.showFormDialog = false;
                    this.loadBoxes();
                },
                error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Création échouée' })
            });
        }
    }

    // ── ATTRIBUTION → crée un contrat avec le box pré-sélectionné ───────────
    ouvrirCreationContrat(box: any) {
        this.router.navigate(['/admin/home/contrats/ajouter'], { state: { box } });
    }

    confirmerLiberer(box: any) {
        this.confirmationService.confirm({
            message: `Libérer le box <b>${box.numero}</b> ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.boxService.liberer(box._id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Box libéré' });
                        this.loadBoxes();
                    },
                    error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Libération échouée' })
                });
            }
        });
    }

    // ── DELETE ───────────────────────────────────────────────
    confirmerSupprimer(box: any) {
        this.confirmationService.confirm({
            message: `Supprimer le box <b>${box.numero}</b> définitivement ?`,
            header: 'Confirmation',
            icon: 'pi pi-trash',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.boxService.delete(box._id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Box supprimé' });
                        this.loadBoxes();
                    },
                    error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppression échouée' })
                });
            }
        });
    }

    // ── HELPERS ──────────────────────────────────────────────
    getStatutLabel(statut: string): string {
        return { libre: 'Libre', occupe: 'Occupé', en_travaux: 'En travaux' }[statut] || statut;
    }

    getStatutSeverity(statut: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
        return ({ libre: 'success', occupe: 'info', en_travaux: 'warn' } as any)[statut] ?? 'secondary';
    }
}
