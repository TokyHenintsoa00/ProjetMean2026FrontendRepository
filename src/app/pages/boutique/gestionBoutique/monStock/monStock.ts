import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ProduitService } from '@/pages/service/produit.service';

interface StockRow {
    produitId: string;
    produitNom: string;
    varianteId: string;
    combinaison: any[];
    is_default: boolean;
    reference: string;
    stock: number;
}

@Component({
    selector: 'app-mon-stock',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        SelectModule,
        TableModule,
        ToastModule,
        TagModule,
        DialogModule
    ],
    providers: [MessageService],
    template: `
    <p-toast></p-toast>

    <!-- ===== DIALOG ENTRÉE EN STOCK ===== -->
    <p-dialog header="Entrée en stock" [(visible)]="dialogVisible"
              [modal]="true" [style]="{width:'480px'}" [closable]="true"
              (onHide)="resetForm()">

        <div class="flex flex-column gap-4 pt-2">

            <!-- Produit -->
            <div class="flex flex-column gap-1">
                <label class="font-semibold text-sm text-900">Produit <span class="text-red-500">*</span></label>
                <p-select appendTo="body" [options]="produits"
                          [(ngModel)]="form.produit"
                          optionLabel="nom_produit"
                          placeholder="Sélectionner un produit"
                          [filter]="true" filterBy="nom_produit"
                          (ngModelChange)="onProduitChange()"
                          styleClass="w-full">
                    <ng-template pTemplate="selectedItem" let-p>
                        <span>{{ p?.nom_produit }}</span>
                    </ng-template>
                    <ng-template pTemplate="item" let-p>
                        <div class="flex flex-column">
                            <span class="font-semibold">{{ p.nom_produit }}</span>
                            <span class="text-500 text-xs">{{ p.variantes?.length || 0 }} variante(s)</span>
                        </div>
                    </ng-template>
                </p-select>
            </div>

            <!-- Variante -->
            <div class="flex flex-column gap-1">
                <label class="font-semibold text-sm text-900">Variante <span class="text-red-500">*</span></label>
                <p-select appendTo="body" [options]="varianteOptions"
                          [(ngModel)]="form.varianteId"
                          optionLabel="label" optionValue="value"
                          placeholder="Sélectionner une variante"
                          [disabled]="!form.produit"
                          styleClass="w-full">
                    <ng-template pTemplate="item" let-v>
                        <div class="flex justify-between w-full">
                            <span>{{ v.label }}</span>
                            <span class="text-500 text-xs ml-3">Stock actuel : {{ v.stock }}</span>
                        </div>
                    </ng-template>
                </p-select>
            </div>

            <!-- Quantité -->
            <div class="flex flex-column gap-1">
                <label class="font-semibold text-sm text-900">Quantité à ajouter <span class="text-red-500">*</span></label>
                <p-inputnumber [(ngModel)]="form.quantite"
                               [min]="1" [showButtons]="true"
                               buttonLayout="horizontal"
                               incrementButtonIcon="pi pi-plus"
                               decrementButtonIcon="pi pi-minus"
                               styleClass="w-full"></p-inputnumber>
                @if (form.varianteId) {
                    <span class="text-500 text-xs mt-1">
                        Stock actuel : {{ getStockActuel() }}
                        &nbsp;→&nbsp;
                        <strong class="text-primary">{{ getStockActuel() + (form.quantite || 0) }}</strong>
                    </span>
                }
            </div>
        </div>

        <ng-template pTemplate="footer">
            <button pButton label="Annuler" icon="pi pi-times"
                    [text]="true" severity="secondary"
                    (click)="dialogVisible = false"></button>
            <button pButton label="Enregistrer" icon="pi pi-check"
                    [loading]="form.saving"
                    [disabled]="!form.produit || !form.varianteId || !form.quantite || form.quantite < 1"
                    (click)="saveEntree()"></button>
        </ng-template>
    </p-dialog>

    <div class="page-container">
        <div class="page-header">
            <div>
                <h2 class="page-title"><i class="pi pi-warehouse"></i> Gestion du Stock</h2>
                <p class="page-subtitle">Consultez le stock par variante</p>
            </div>
            <button pButton label="Entrée en stock" icon="pi pi-plus"
                    (click)="openDialog()"></button>
        </div>

        <!-- Filtre -->
        <div class="flex items-center gap-3 mb-4">
            <label class="font-semibold text-900 text-sm">Filtrer par produit :</label>
            <p-select appendTo="body" [options]="produitFilterOptions" [(ngModel)]="selectedFilter"
                      optionLabel="label" optionValue="value"
                      placeholder="Tous les produits"
                      [showClear]="true"
                      (ngModelChange)="applyFilter()"
                      styleClass="w-20rem">
            </p-select>
            <span class="text-500 text-sm">{{ filteredRows.length }} ligne(s)</span>
        </div>

        <!-- Loading -->
        <div *ngIf="loading" class="flex items-center justify-center p-8">
            <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
        </div>

        <!-- Tableau -->
        <div class="table-card" *ngIf="!loading">
        <p-table [value]="filteredRows"
                 [paginator]="true" [rows]="15"
                 styleClass="custom-table"
                 [tableStyle]="{'min-width': '45rem'}"
                 [rowHover]="true"
                 [showCurrentPageReport]="true"
                 currentPageReportTemplate="{first} - {last} sur {totalRecords} variantes">

            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="produitNom">Produit <p-sortIcon field="produitNom"></p-sortIcon></th>
                    <th>Variante</th>
                    <th>Référence</th>
                    <th pSortableColumn="stock">Stock actuel <p-sortIcon field="stock"></p-sortIcon></th>
                </tr>
            </ng-template>

            <ng-template pTemplate="body" let-row>
                <tr>
                    <td><span class="font-semibold">{{ row.produitNom }}</span></td>
                    <td>
                        <span *ngIf="row.is_default" class="text-500 italic">Par défaut</span>
                        <span *ngIf="!row.is_default">{{ formatCombinaison(row.combinaison) }}</span>
                    </td>
                    <td>{{ row.reference || '-' }}</td>
                    <td>
                        <p-tag [value]="row.stock + ' unités'"
                               [severity]="row.stock > 10 ? 'success' : row.stock > 0 ? 'warn' : 'danger'"></p-tag>
                    </td>
                </tr>
            </ng-template>

            <ng-template pTemplate="emptymessage">
                <tr>
                    <td colspan="4" class="text-center p-8">
                        <i class="pi pi-warehouse text-6xl text-400 mb-3 block"></i>
                        <p class="text-600">Aucune variante trouvée</p>
                    </td>
                </tr>
            </ng-template>
        </p-table>
        </div>
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
::ng-deep .custom-table .p-datatable-tbody > tr > td { padding:1rem !important; border-bottom:1px solid var(--border-100) !important; border-right:none !important; border-left:none !important; border-top:none !important; }
::ng-deep .custom-table .p-paginator { background:var(--border-100) !important; border-top:1px solid var(--border) !important; padding:0.75rem 1.5rem !important; border-bottom:none !important; border-left:none !important; border-right:none !important; }
::ng-deep .custom-table .p-paginator .p-paginator-pages .p-paginator-page { color:var(--text-600) !important; border-radius:0.375rem; font-weight:500; }
::ng-deep .custom-table .p-paginator .p-paginator-pages .p-paginator-page.p-highlight { background:var(--primary) !important; color:#fff !important; }
::ng-deep .p-button:not(.p-button-text):not(.p-button-outlined):not(.p-button-link) { background:var(--primary) !important; border-color:var(--primary) !important; color:#fff !important; }
::ng-deep .p-button:not(.p-button-text):not(.p-button-outlined):not(.p-button-link):enabled:hover { background:var(--primary-dark) !important; border-color:var(--primary-dark) !important; }
    `]
})
export class MonStock implements OnInit {

    produits: any[] = [];
    allRows: StockRow[] = [];
    filteredRows: StockRow[] = [];
    loading = true;

    produitFilterOptions: { label: string; value: string }[] = [];
    selectedFilter: string | null = null;

    dialogVisible = false;
    varianteOptions: { label: string; value: string; stock: number }[] = [];

    form: {
        produit: any;
        varianteId: string;
        quantite: number;
        saving: boolean;
    } = { produit: null, varianteId: '', quantite: 1, saving: false };

    constructor(
        private produitService: ProduitService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.loadStock();
    }

    loadStock() {
        this.loading = true;
        this.produitService.getMyProducts().subscribe({
            next: (produits: any[]) => {
                this.produits = produits;
                this.allRows = [];
                for (const produit of produits) {
                    for (const v of (produit.variantes || [])) {
                        this.allRows.push({
                            produitId: produit._id,
                            produitNom: produit.nom_produit,
                            varianteId: v._id,
                            combinaison: v.combinaison || [],
                            is_default: v.is_default,
                            reference: v.reference || '',
                            stock: v.stock || 0
                        });
                    }
                }
                this.produitFilterOptions = [
                    ...new Map(produits.map(p => [p._id, { label: p.nom_produit, value: p._id }])).values()
                ];
                this.filteredRows = [...this.allRows];
                this.loading = false;
            },
            error: () => { this.loading = false; }
        });
    }

    applyFilter() {
        if (!this.selectedFilter) {
            this.filteredRows = [...this.allRows];
        } else {
            this.filteredRows = this.allRows.filter(r => r.produitId === this.selectedFilter);
        }
    }

    openDialog() {
        this.resetForm();
        this.dialogVisible = true;
    }

    resetForm() {
        this.form = { produit: null, varianteId: '', quantite: 1, saving: false };
        this.varianteOptions = [];
    }

    onProduitChange() {
        this.form.varianteId = '';
        if (!this.form.produit) { this.varianteOptions = []; return; }
        this.varianteOptions = (this.form.produit.variantes || []).map((v: any) => ({
            label: v.is_default ? 'Par défaut' : this.formatCombinaison(v.combinaison),
            value: v._id,
            stock: v.stock || 0
        }));
    }

    getStockActuel(): number {
        if (!this.form.produit || !this.form.varianteId) return 0;
        const v = (this.form.produit.variantes || []).find((x: any) => x._id === this.form.varianteId);
        return v?.stock || 0;
    }

    saveEntree() {
        if (!this.form.produit || !this.form.varianteId || !this.form.quantite) return;
        this.form.saving = true;
        const stockActuel = this.getStockActuel();
        const newStock = stockActuel + this.form.quantite;

        this.produitService.updateStock(this.form.produit._id, this.form.varianteId, newStock).subscribe({
            next: () => {
                // Mettre à jour le stock dans la variante du produit en mémoire
                const v = (this.form.produit.variantes || []).find((x: any) => x._id === this.form.varianteId);
                if (v) v.stock = newStock;

                // Mettre à jour la ligne dans le tableau
                const row = this.allRows.find(r => r.produitId === this.form.produit._id && r.varianteId === this.form.varianteId);
                if (row) row.stock = newStock;

                this.form.saving = false;
                this.dialogVisible = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Stock mis à jour',
                    detail: `${this.form.produit.nom_produit} — nouveau stock : ${newStock}`,
                    life: 3000
                });
                this.resetForm();
            },
            error: () => {
                this.form.saving = false;
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Mise à jour échouée', life: 3000 });
            }
        });
    }

    formatCombinaison(combinaison: any[]): string {
        if (!combinaison || combinaison.length === 0) return 'Par défaut';
        return combinaison.map((c: any) => `${c.attribut}: ${c.valeur}`).join(' | ');
    }
}
